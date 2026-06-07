package utils

import (
	"log"
	"os"
	"path/filepath"
)

func RandomId(artistName string, songName string) string {
	return artistName + " " + songName
}

func GetAbsPath() string {
	dir, err := filepath.Abs(filepath.Dir(os.Args[0]))

	if err != nil {
		log.Fatal(err)
	}

	return dir
}

func FindIdx(matcher string) func(s string) bool {
	return func(s string) bool {
		return s == matcher
	}
}
