import React from "react";
import Hero from "./Hero";
import Popular from "./Popular";

const Home = () => {
  return (
    <div className="home-container">
      <h1 className="home__heading heading-primary">Trending Movies</h1>
      <Hero />
      <Popular />
    </div>
  );
};

export default Home;
