package main

import (
	"fmt"
	"github.com/robfig/cron/v3"

	"github.com/rajikaimal/over-complicated-blog/tree/master/src/archive-service/archive"
)

func main() {
	fmt.Println("Running")

	//duration := time.ParseDuration("2s")
	c := cron.New()

	//change time duration
	c.AddFunc("@every 2s", func() {
		archive.RecieveMessage()
		fmt.Println("Running cron")
	})

	c.Start()

	<-make(chan int)
}
