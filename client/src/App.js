import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from "../components/Nav";

const App = () => {
  return (
    <div className="App">
      <Nav />
      <main>
        <Routes>
          <Route path="/" element={<h1>Home</h1>} />
          <Route path="/my-list" element={<h1>My List</h1>} />
          <Route path="/explore" element={<h1>Explore</h1>} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
