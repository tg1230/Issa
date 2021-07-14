import logo from "./logo.svg";
import "./App.css";
import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

function App() {
  const [post, setpost] = useState("");

  const handleChange = (event) => {
    setpost(event.target.value);
  };

  const handlePostSubmit = () => {
    const date = new Date();
    const requestBody = {
      post: post,
      date: date,
    };
    console.log("front: ", requestBody.date, requestBody.post)
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(requestBody),
    };
    // cors error hidden by promise?
    const postPromise = new Promise((resolve, reject) => {
      fetch("http://localhost:3000/post", requestOptions)
        .then((response) => {
          if (response.ok) {
            // gets run if request succeeds
            resolve("Success");
          } else {
            // gets run if request fails
            return Promise.reject(response.status);
          }
        })
        .catch((err) => {
          console.log("error uploading post: ", err);
          reject(err);
        });
    }, 5000);

    postPromise
      .then((message) => {
        // from resolve
        console.log("promise resolved");
      })
      .catch((message) => {
        // message from reject
        console.log("promise rejected, err: ", message);
      });
  };

  return (
    <div className="post">
      <TextField
        id="outlined-multiline-static"
        label="Multiline"
        multiline
        rows={4}
        variant="outlined"
        onChange={handleChange}
      />
      <Button variant="outlined" color="primary" onClick={handlePostSubmit}>
        Submit
      </Button>
    </div>
  );
}

export default App;
