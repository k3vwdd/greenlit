package main

import (
	"fmt"

	"github.com/gin-gonic/gin"
)


func (app *application) recoverPanic() gin.HandlerFunc {
	return func(c *gin.Context) {
		defer func() {
			if err := recover(); err != nil {
				c.Writer.Header().Set("Connection", "close")
				app.serverErrorResponse(c, fmt.Errorf("%s", err))
			}
		}()
		c.Next()
	}
}
