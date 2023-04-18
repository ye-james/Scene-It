import React from "react";
import { Routes, Route } from "react-router-dom";
import Nav from "../components/Nav/Nav";
import Search from "../components/Search";
import Home from "../components/Home/Home";
import MyListContainer from "../components/MyListContainer";

const App = () => {
  return (
    <>
      <Nav />
      <main className="main">
        <Search />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/my-list" element={<MyListContainer />} />
          <Route path="/explore" element={<h1>Explore</h1>} />
        </Routes>
      </main>
    </>
  );
};

export default App;
