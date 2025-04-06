package main

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func (app *application) healthCheckHandler(c *gin.Context) {
	env := envelope{
		"status": "available",
		"system_info": map[string]string{
			"environment": app.config.env,
			"version": version,
		},
	}

	err := app.writeJSON(c, http.StatusOK, env, nil)
	if err != nil {
		app.serverErrorResponse(c, err)
	}
}
