import "./App.css";
import React from "react";
import ContentDisplay from "./Components/ContentDisplay.js";
import ContentInput from "./Components/ContentInput";

function App() {
  return (
    <div className="App">
      <h1>Daniel is a</h1>
     <ContentDisplay />
     <ContentInput />
    </div>
  );
}

export default App;
