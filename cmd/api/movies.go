package main

import (
	"fmt"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/k3vwdd/greenlit/internal/data"
	"github.com/k3vwdd/greenlit/internal/validator"
)


func (app *application) createMovieHandlerGET(c *gin.Context) {
}

func (app *application) createMovieHandler(c *gin.Context) {
	var input struct {
		Title 	string   		 `json:"title"`
		Year 	int32            `json:"year"`
		Runtime data.Runtime 	 `json:"runtime"`
		Genres  []string         `json:"genres"`
	}

	err := app.readJSON(c, &input)
	if err != nil {
		app.badRequestResponse(c, err)
		return
	}

	movie := &data.Movie{
		Title: input.Title,
		Year: input.Year,
		Runtime: input.Runtime,
		Genres: input.Genres,
	}

	v := validator.New()
	if data.ValidateMovie(v, movie); !v.Valid() {
		app.failedValidationResponse(c, v.Errors)
	}

	err = app.models.Movies.Insert(movie)
	if err != nil {
		app.serverErrorResponse(c, err)
		return
	}

	c.Header("Location", fmt.Sprintf("/v1/movies/%d", movie.ID))
	err = app.writeJSON(c, http.StatusCreated, envelope{"movie": movie}, nil)
	if err != nil {
		app.serverErrorResponse(c, err)
	}
}

func (app *application) showMovieHandler(c *gin.Context) {
    id , err := app.readIDParam(c)
    if err != nil || id < 1 {
		app.notFoundResponse(c)
        return
    }

	movie := data.Movie{
		ID: id,
		CreatedAt: time.Now(),
		Title: "CasaBlanca",
		Runtime: 299,
		Genres: []string{"drama", "comdey", "romance"},
		Version: 1,
	}

	err = app.writeJSON(c, http.StatusOK, envelope{"movie": movie}, nil)
	if err != nil {
		app.serverErrorResponse(c, err)
		return
	}

    c.String(http.StatusOK, "show the details of the movie %d\n", id)
}





