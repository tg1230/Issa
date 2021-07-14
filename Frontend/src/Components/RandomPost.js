import React, { useEffect, useState } from "react";

export default function RandomPost({setupSimpleCard}) {
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
      }, [])

    return (
      <div className="post">
        {setupSimpleCard(post)}
      </div>
    );
  }