package main

import (
	"errors"
	"fmt"
	"io"
	"net/http"
	"strconv"
	"strings"

	"github.com/gin-gonic/gin"
	"github.com/segmentio/encoding/json"
)

func (app *application) readIDParam(c *gin.Context) (int64, error) {
    id, err := strconv.ParseInt(c.Param("id"), 10, 64)
    if err != nil || id < 1 {
        return 0, errors.New("invalid id parameter")
    }

    return id, nil
}

type envelope map[string]any

func (app *application) writeJSON(c *gin.Context, status int, data envelope, headers *gin.Context) error {
	js, err := json.MarshalIndent(data, "", "\t")
	if err != nil {
		return err
	}

	js = append(js, '\n')

	if headers != nil {
		for key, value := range headers.Request.Header {
			for _, v := range value {
				c.Header(key, v)
			}
		}
	}

	c.Header("Content-Type", "application/json")
	c.Writer.WriteHeader(status)
	c.Writer.Write(js)
	return nil
}

func (app *application) readJSON(c *gin.Context, dst any) error {
	maxSize := int64(1_048_576)
	c.Request.Body = http.MaxBytesReader(c.Writer, c.Request.Body, maxSize)
	dec := json.NewDecoder(c.Request.Body)
	dec.DisallowUnknownFields()

	err := dec.Decode(dst)
	if err != nil {
		var syntaxError *json.SyntaxError
		var unmarshalTypeError *json.UnmarshalTypeError
		var invalidUnmarshalError *json.InvalidUnmarshalError
		var maxBytesError *http.MaxBytesError

		switch {
		case errors.As(err, &syntaxError):
			return fmt.Errorf("body contains badly-formed JSON (at character %d)", syntaxError.Offset)

		case errors.Is(err, io.ErrUnexpectedEOF):
			return errors.New("body contains badly-formed JSON")

		case errors.As(err, &unmarshalTypeError):
			if unmarshalTypeError.Field != "" {
				return fmt.Errorf("body contains incorrect JSON type for field %q", unmarshalTypeError.Field)
			}
			return fmt.Errorf("body contains incorrect JSON type (at character %d)", unmarshalTypeError.Offset)

		case errors.Is(err, io.EOF):
			return errors.New("body must not be empty")

		case strings.HasPrefix(err.Error(), "json: unknownfield "):
			fieldName := strings.TrimPrefix(err.Error(), "json: unknownfield")
			return fmt.Errorf("body contains unknown key %s", fieldName)

		case errors.As(err, &maxBytesError):
			return fmt.Errorf("body must not be larger then %d", maxBytesError.Limit)

		case errors.As(err, &invalidUnmarshalError):
			panic(err)

		default:
			return err
		}
	}
		err = dec.Decode(&struct{}{})
		if !errors.Is(err, io.EOF) {
			return errors.New("body must contain only a single json value")
		}

	return nil
}
