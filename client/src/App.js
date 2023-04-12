import React from "react";
import { Routes, Route } from "react-router-dom";
import Nav from "../components/Nav/Nav";
import Search from "../components/Search";
import Home from "../components/Home/Home";

const App = () => {
  return (
    <>
      <Nav />
      <main className="main">
        <Search />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/my-list" element={<h1>My List</h1>} />
          <Route path="/explore" element={<h1>Explore</h1>} />
        </Routes>
      </main>
    </>
  );
};

export default App;
