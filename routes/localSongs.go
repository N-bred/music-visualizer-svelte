package routes

import (
	"log"
	"music-visualizer-svelte/utils"
	"net/http"
	"net/url"
	"os"
	"path"
	"strings"

	"github.com/dhowden/tag"
	"github.com/gin-gonic/gin"
)

type VideoMetadata struct {
	ID          string  `json:"id"`
	Title       string  `json:"title"`
	WebpageUrl  string  `json:"webpage_url"`
	Description string  `json:"description"`
	Duration    float64 `json:"duration"`
	ViewCount   int64   `json:"view_count"`
	Thumbnail   string  `json:"thumbnail"`
}

type Metadata struct {
	Id         string `json:"id"`
	ArtistName string `json:"artistName"`
	SongName   string `json:"songName"`
	FileName   string `json:"fileName"`
	Src        string `json:"src"`
}

func LocalSongs(c *gin.Context) {
	songsPath := os.Getenv("songsPath")
	songs, err := os.ReadDir(songsPath)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "No songs folder found"})
		return
	}

	var data []*Metadata = make([]*Metadata, 0)

	for _, song := range songs {
		songPath := path.Join(songsPath, song.Name())
		file, _ := os.Open(songPath)
		defer file.Close()

		metadata, err := tag.ReadFrom(file)

		if err != nil {
			log.Printf("Failed to parse metadata for: %v\n", file.Name())
			continue
		}

		src, _ := url.JoinPath("http://localhost:3001", "songs", song.Name())

		m := Metadata{
			Id:         utils.RandomId(metadata.Artist(), metadata.Title()),
			ArtistName: metadata.Artist(),
			SongName:   metadata.Title(),
			FileName:   metadata.Title() + "." + strings.ToLower(string(metadata.FileType())),
			Src:        src,
		}

		data = append(data, &m)
	}

	c.JSON(http.StatusOK, gin.H{"songs": data})

}
