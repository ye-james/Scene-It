import React from "react";
import HeroContainer from "./HeroContainer";
import PopularContainer from "./PopularContainer";

const Home = () => {
  return (
    <div className="home-container">
      <h1 className="home__heading heading-primary">Trending Movies</h1>
      <HeroContainer />
      <PopularContainer />
    </div>
  );
};

export default Home;
