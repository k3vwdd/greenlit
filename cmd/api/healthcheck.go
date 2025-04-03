package main

import (
	"net/http"

	"github.com/gin-gonic/gin"
)


func (app *application) healthCheckHandler(c *gin.Context) {
    c.String(http.StatusOK, "status: available\n")
    c.String(http.StatusOK, "environment: %s\n", app.config.env)
    c.String(http.StatusOK, "version: %s\n", version)
}
