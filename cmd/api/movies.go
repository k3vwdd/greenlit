package main

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func (app *application) createMovieHandler(c *gin.Context) {
    c.String(http.StatusOK, "Create a new movie")
}

func (app *application) showMovieHandler(c *gin.Context) {
    id , err := app.readIDParam(c)
    if err != nil || id < 1 {
        c.String(http.StatusNotFound, "404 page not found")
        return
    }

    c.String(http.StatusOK, "show the details of the movie %d\n", id)
}





