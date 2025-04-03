package ui

import (
	"embed"
	"fmt"
	"io/fs"
	"net/http"
	"strings"

	"github.com/gin-gonic/contrib/static"
	"github.com/gin-gonic/gin"
)

//go:embed dist
var staticFS embed.FS

// AddRoutes serves the static file system for the UI React App.
func AddRoutes(router gin.IRouter) {
	embeddedBuildFolder := newStaticFileSystem()

	// First, serve static files from the dist directory
	router.Use(static.Serve("/", embeddedBuildFolder))

	// Handle React routing
	router.Use(func(c *gin.Context) {
		// Skip if it's an API route
		if strings.HasPrefix(c.Request.URL.Path, "/v1/") {
			c.Next()
			return
		}

		// Skip if it's a static file
		if strings.Contains(c.Request.URL.Path, ".") {
			c.Next()
			return
		}

		// For all other routes, serve index.html for client-side routing
		c.FileFromFS("dist/index.html", http.FS(staticFS))
	})
}

// ----------------------------------------------------------------------
// staticFileSystem serves files out of the embedded dist folder

type staticFileSystem struct {
	http.FileSystem
}

var _ static.ServeFileSystem = (*staticFileSystem)(nil)

func newStaticFileSystem() *staticFileSystem {
	sub, err := fs.Sub(staticFS, "dist")

	if err != nil {
		panic(err)
	}

	return &staticFileSystem{
		FileSystem: http.FS(sub),
	}
}

func (s *staticFileSystem) Exists(prefix string, path string) bool {
	distpath := fmt.Sprintf("dist%s", path)

	// support for folders
	if strings.HasSuffix(path, "/") {
		_, err := staticFS.ReadDir(strings.TrimSuffix(distpath, "/"))
		return err == nil
	}

	// support for files
	f, err := staticFS.Open(distpath)
	if f != nil {
		_ = f.Close()
	}
	return err == nil
}

// ----------------------------------------------------------------------
// fallbackFileSystem wraps a staticFileSystem and always serves /index.html
type fallbackFileSystem struct {
	staticFileSystem *staticFileSystem
}

var _ static.ServeFileSystem = (*fallbackFileSystem)(nil)
var _ http.FileSystem = (*fallbackFileSystem)(nil)

//func newFallbackFileSystem(staticFileSystem *staticFileSystem) *fallbackFileSystem {
//	return &fallbackFileSystem{
//		staticFileSystem: staticFileSystem,
//	}
//}

func (f *fallbackFileSystem) Open(path string) (http.File, error) {
	return f.staticFileSystem.Open("/index.html")
}

func (f *fallbackFileSystem) Exists(prefix string, path string) bool {
	return true
}
