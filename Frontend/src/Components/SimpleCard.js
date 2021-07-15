import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from "@material-ui/core/Checkbox";
import Favorite from "@material-ui/icons/Favorite";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function SimpleCard({id, text, date, likes, canLike}) {
  // const [likes, setLikes] = useState(likes);
  
  const updatePostLike = (liked) => {
    const requestBody = {
      id: id,
      liked: liked,
    };
    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(requestBody),
    };
    // cors error hidden by promise?
    const postPromise = new Promise((resolve, reject) => {
      fetch("http://localhost:3000/updatelike", requestOptions)
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

  const classes = useStyles();

  const handleChange = (event) => {
    // setLiked(event.target.checked);
    updatePostLike(event.target.checked);
  };

  const setupLikeButton = () => {
    return (
      (<FormControlLabel
        control={
          <Checkbox
            icon={<FavoriteBorder />}
            checkedIcon={<Favorite />}
            name="checkedH"
            onChange={handleChange}
          />
        }
      />)
    );
  };

  return (
    <Card className={classes.root}>
      {canLike === true ? setupLikeButton() : ""}
      <CardContent>
        <Typography variant="h5" component="h2">
          {text}
        </Typography>
        <Typography variant="body2" component="p">
          <br />
          {date}
        </Typography>
        <Typography variant="body2" component="p">
          <br />
          {likes}
        </Typography>
      </CardContent>
    </Card>
  );
}
