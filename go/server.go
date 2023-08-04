package main

import (
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
	"time"
)

func handler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "GET,OPTIONS,PATCH,DELETE,POST,PUT")
	w.Header().Set(
		"Access-Control-Allow-Headers",
		"X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
	)

	if r.Method == "OPTIONS" {
		w.WriteHeader(http.StatusOK)
		return
	}

	headers := "Headers:\n"
	for k, v := range r.Header {
		headers += fmt.Sprintf("%s: %s\n", k, v[0])
	}

	body := "Body:\n"
	if r.Body != nil {
		defer r.Body.Close()

	}

	requestBody, err := io.ReadAll(r.Body)
	if err != nil {
		log.Fatal(err)
	}

	var data map[string]interface{}
	err = json.Unmarshal(requestBody, &data)
	if err != nil {
		log.Fatal(err)
	}

	for k, v := range data {
		body += fmt.Sprintf("%s: %v\n", k, v)
	}

	info := fmt.Sprintf("\n%s\n%s\n%s\n", r.Method, headers, body)

	log.Println(info)
	w.Write([]byte(time.Now().Format("en-US") + info))
}

func main() {
	http.HandleFunc("/", handler)
	http.ListenAndServe(":8080", nil)
}
