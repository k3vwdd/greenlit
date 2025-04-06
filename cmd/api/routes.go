package main

import (

	"github.com/gin-gonic/gin"
	"github.com/gin-gonic/contrib/cors"
	"github.com/k3vwdd/greenlit/ui"
)

func (app *application) routes() *gin.Engine {

    router := gin.Default()
    router.Use(cors.Default())
	router.Use(app.recoverPanic())
	router.HandleMethodNotAllowed = true
	router.NoMethod(app.methodNotAllowedResponse)
	router.NoRoute(app.notFoundResponse)

    router.GET("/v1/healthcheck", app.healthCheckHandler)
    router.POST("/v1/movies", app.createMovieHandler)
    router.GET("/v1/movies/:id", app.showMovieHandler)
    ui.AddRoutes(router)

    return router
}
