import React, { useEffect, useState } from "react";
import ContentInput from "./ContentInput";
import SimpleCard from "./SimpleCard";
import RandomPost from "./RandomPost";
import TopPosts from "./TopPosts";

export default function ContentDisplay() {

  const setupSimpleCard = ({ id, text, date, likes }) => {
    return (
      <div className="postCard" key={id}>
        <SimpleCard key={id} text={text} date={date} likes={likes} />
      </div>
    );
  };

  return (
    <div>
      <RandomPost setupSimpleCard={setupSimpleCard} />
      <ContentInput />
      <TopPosts setupSimpleCard={setupSimpleCard}/>
    </div>
  );
}
