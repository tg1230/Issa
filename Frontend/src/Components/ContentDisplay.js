import React from "react";
import ContentInput from "./ContentInput";
import RandomPost from "./RandomPost";
import TopPosts from "./TopPosts";

export default function ContentDisplay() {

  return (
    <div>
      <RandomPost />
      <ContentInput />
      <TopPosts />
    </div>
  );
}
