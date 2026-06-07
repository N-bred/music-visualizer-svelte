package routes

import (
	"io"
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/kkdai/youtube/v2"
)

func GetSong(c *gin.Context) {
	id := c.Param("id")
	yt := youtube.Client{}

	video, err := yt.GetVideo(id)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	formats := video.Formats.Type("audio")

	if len(formats) == 0 {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "no audio format found"})
		return
	}

	formats.Sort()
	targetFormat := &formats[0]

	c.Header("Content-Type", targetFormat.MimeType)
	c.Header("Connection", "keep-alive")

	stream, _, err := yt.GetStream(video, targetFormat)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	defer stream.Close()

	_, err = io.Copy(c.Writer, stream)

	if err != nil {
		log.Printf("Stream interrupted: %v\n", err.Error())
	}

}
