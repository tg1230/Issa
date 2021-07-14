import React, { useEffect, useState } from "react";
import ContentInput from "./ContentInput";
import SimpleCard from "./SimpleCard";


export default function ContentDisplay() {
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

  const setupSimpleCard = ({id, text, date, likes}) => {
    return (
        <div className="postCard" key={id}>
            <SimpleCard
            key={id}
            text={text}
            date={date}
            likes={likes}
            />
        </div>
      );
  }

    return (
        <div>
            <ContentInput updatePostDisplay={getAllPosts}/>
            <div className="postDisplay">
            {posts.map(post => setupSimpleCard(post))}
            </div>
        </div>
      );
}