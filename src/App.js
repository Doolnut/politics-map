import logo from "./logo.svg";
import "./App.css";
import React from "react";
import GenerateMap from "./components/map";

function App() {
  return (
    <div className="App">
      <header className="App-header">
      <div className="map"><GenerateMap></GenerateMap></div>
      <button></button>
      </header>
    </div>
  );
}

export default App;
