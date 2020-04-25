package main

import (
	"fmt"
	"github.com/gofiber/fiber"
	"os"

	"github.com/Kamva/mgm/v2"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type Category struct {
	// DefaultModel add _id,created_at and updated_at fields to the Model
	mgm.DefaultModel `bson:",inline"`
	Name             string `json:"name" bson:"name"`
}

func newCategory(name string) *Category {
	return &Category{
		Name: name,
	}
}

func main() {
	//Init mongo connection
	port := os.Getenv("PORT")
	mongoConnection := os.Getenv("dbConnection")
	t := false
	dbOptions := &options.ClientOptions{
		RetryWrites: &t,
	}

	err := mgm.SetDefaultConfig(nil, "fiction-paper", options.Client().ApplyURI(mongoConnection), dbOptions)

	if err != nil {
		fmt.Println("Connection error")
	}
	// Create new Fiber instance
	app := fiber.New()

	// Create new GET route on path "/api/v1"
	app.Get("/api/v1", func(c *fiber.Ctx) {
		c.Send("GET")
	})

	// Create new POST route on path "/api/v1"
	app.Post("/api/v1", func(c *fiber.Ctx) {

		cat := new(Category)
		if err := c.BodyParser(cat); err != nil {
			fmt.Println(err)
		}

		newCategoryToSave := newCategory(cat.Name)
		err := mgm.Coll(newCategoryToSave).Create(newCategoryToSave)

		if err != nil {
			c.Send("false")
		}

		fmt.Println(err)

		c.Send("True")
	})

	// Start server on http://localhost:3000
	app.Listen(port)
}
