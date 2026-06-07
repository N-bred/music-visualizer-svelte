package routes

import (
	"fmt"
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/raitonoberu/ytsearch"
)

type SearchQuery struct {
	ArtistName string `json:"artistName"`
	SongName   string `json:"songName"`
}

func SearchSongs(c *gin.Context) {

	var searchQuery SearchQuery
	if err := c.ShouldBind(&searchQuery); err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "artistName and songName parameters are needed"})
		return
	}

	query := fmt.Sprintf("%v - %v", searchQuery.ArtistName, searchQuery.SongName)
	yt := ytsearch.Search(query)

	result, err := yt.Next()

	if err != nil {
		log.Fatal(err.Error())
	}

	c.JSON(http.StatusOK, gin.H{"data": result.Videos})
}
