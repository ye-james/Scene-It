import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Nav from "../components/Nav/Nav";
import Search from "../components/Search";
import Home from "../components/Home/Home";
import ListContainer from "../components/ListContainer";
import Modal from "../components/reusable/Modal";

const App = () => {
  const location = useLocation();
  const background = location.state && location.state.background;
  return (
    <>
      <Nav />
      <main className="main">
        <Search />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/:id"
            location={background || location}
            element={<Modal />}
          />
          <Route path="/my-list" element={<ListContainer />} />
          <Route
            location={background || location}
            path="/my-list/:id"
            element={<Modal />}
          />
          <Route path="/explore" element={<h1>Explore</h1>} />
        </Routes>
        {/* {background && (
          <Routes>
            <Route
              path="/:id"
              location={background || location}
              element={<Modal />}
            />
          </Routes>
        )} */}
      </main>
    </>
  );
};

export default App;
