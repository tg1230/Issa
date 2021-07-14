import React, { useEffect, useState } from "react";
import ContentInput from "./ContentInput";
import SimpleCard from "./SimpleCard";
import RandomPost from "./RandomPost";

export default function TopPosts({setupSimpleCard}) {
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
  }, [])


    return (
        <div className="postDisplay">
          {posts.map(post => setupSimpleCard(post))}
        </div>
      );
}