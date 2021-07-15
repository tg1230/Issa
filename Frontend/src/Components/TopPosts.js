import React, { useEffect, useState } from "react";
import SimpleCard from "./SimpleCard";

export default function TopPosts() {
  const [posts, setposts] = useState([]);

  const getAllPosts = () => {
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
            // gets run if request succeeds
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
        setposts(response);
        console.log("promise resolved: ", response);
      })
      .catch((message) => {
        // message from reject
        console.log("promise rejected, err: ", message);
      });
  };

  useEffect(() => {
    getAllPosts();
  }, []);

  return (
    <div className="postDisplay">
      {posts.map(({id, text, date, likes}) => (
        <div className="postCard" key={id}>
          <SimpleCard
            key={id}
            text={text}
            date={date}
            likes={likes}
            canLike={false}
          />
        </div>
      ))}
    </div>
  );
}
