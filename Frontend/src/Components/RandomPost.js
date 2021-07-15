import React, { useEffect, useState } from "react";
import SimpleCard from "./SimpleCard";

export default function RandomPost() {
  const [post, setpost] = useState([]);

  const getRandomPost = () => {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    };
    const getPromise = new Promise((resolve, reject) => {
      fetch("http://localhost:3000/getall", requestOptions)
        .then((response) => {
          if (response.ok) {
            // gets run if request succeedsRT
            resolve(response.json());
          } else {
            // gets run if request fails
            return Promise.reject(response.status);
          }
        })
        .catch((err) => {
          console.log("error making get: ", err);
          reject(err);
        });
    }, 5000);
    getPromise
      .then((response) => {
        // from resolve
        setpost(response[0]);
        console.log("promise resolved: ", response);
      })
      .catch((message) => {
        // message from reject
        console.log("promise rejected, err: ", message);
      });
  };

  useEffect(() => {
    getRandomPost();
  }, []);

  return (
    <div className="post">
        <div className="postCard" >
            <SimpleCard id={post.id} text={post.text} date={post.date} initialLikes={post.likes} canLike={true} />
        </div>
    </div>
  );
}
