package main

import (
	"embed"
	"io/fs"
	"log"
	"music-visualizer-svelte/routes"
	"music-visualizer-svelte/utils"
	"net/http"
	"os"
	"path"
	"path/filepath"
	"slices"

	"github.com/gin-gonic/gin"
)

//go:embed all:client/dist
var fe embed.FS

func main() {

	p, _ := filepath.Abs(path.Join(utils.GetAbsPath(), "songs"))
	os.Setenv("songsPath", p)
	log.Println(p)
	if idx := slices.IndexFunc(os.Args, utils.FindIdx("--songs")); idx != -1 {
		p, _ := filepath.Abs(os.Args[idx+1])
		log.Println(p)
		if _, err := os.Stat(p); err == nil {
			os.Setenv("songsPath", p)
		}
	}

	gin.SetMode(gin.ReleaseMode)
	router := gin.Default()
	router.Static("songs/", os.Getenv("songsPath"))

	api := router.Group("/api")

	{
		api.GET("/localSongs", routes.LocalSongs)
		api.POST("/searchSongs", routes.SearchSongs)
		api.GET("/getSong/:id", routes.GetSong)
	}

	strippedFs, err := fs.Sub(fe, "client/dist")

	if err != nil {
		panic(err.Error())
	}

	router.StaticFS("/public", http.FS(strippedFs))

	router.GET("/", func(c *gin.Context) {
		html, err := fs.ReadFile(strippedFs, "index.html")
		if err != nil {
			c.String(http.StatusNotFound, "Not found")
			return
		}
		c.Data(http.StatusOK, "text/html; charset=utf-8", html)
	})

	router.Run(":3001")
}
