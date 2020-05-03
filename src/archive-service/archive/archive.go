package archive

import (
	"encoding/json"
	"fmt"
	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/sqs"
	"net/http"
)

type Post struct {
	Id      string
	Title   string
	Content string
}

func requestPost(blogId string, target interface{}) error {
	resp, err := http.Get("http://app.blog.io/post-service/api/v1/" + blogId)

	if err != nil {
		return err
	}

	resp.Body.Close()

	return json.NewDecoder(resp.Body).Decode(target)
}

func RecieveMessage() {
	sess, err := session.NewSession(&aws.Config{
		Region: aws.String("us-east-2")},
	)

	// Create a SQS service client.
	svc := sqs.New(sess)
	resultQueue, err := svc.GetQueueUrl(&sqs.GetQueueUrlInput{
		QueueName: aws.String("blog-archive"),
	})

	if err != nil {
		fmt.Println("Error", err)
		return
	}

	fmt.Println("Success", *resultQueue.QueueUrl)

	result, errMsg := svc.ReceiveMessage(&sqs.ReceiveMessageInput{
		QueueUrl: resultQueue.QueueUrl,
		AttributeNames: aws.StringSlice([]string{
			"SentTimestamp",
		}),
		MaxNumberOfMessages: aws.Int64(1),
		MessageAttributeNames: aws.StringSlice([]string{
			"All",
		}),
		// WaitTimeSeconds: timeoutPtr,
	})

	if errMsg != nil {
	}

	fmt.Printf("Received %d messages.\n", len(result.Messages))

	//Request post from post-service and comments from comment-service
	//Needs testing
	post := new(Post)
	requestPost("messageId", post)

	if len(result.Messages) > 0 {
		fmt.Println(result.Messages)

		delete_params := &sqs.DeleteMessageInput{
			QueueUrl:      resultQueue.QueueUrl,             // Required
			ReceiptHandle: result.Messages[0].ReceiptHandle, // Required
		}
		_, errDelete := svc.DeleteMessage(delete_params) // No response returned when successed.

		if errDelete != nil {
			fmt.Println(errDelete)
		}

		fmt.Printf("[Delete message] \nMessage ID: %s has beed deleted.\n\n", *result.Messages[0].MessageId)
	}

}
