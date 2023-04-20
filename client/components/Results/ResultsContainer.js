import React, { useContext } from "react";
import { useLocation } from "react-router-dom";
import { StateContext } from "../../context/StateContext";
import MoviesContainer from "./MoviesContainer";
import TVShowsContainer from "./TVShowsContainer";

const ResultsContainer = () => {
  const { searchResult } = useContext(StateContext);
  const location = useLocation();
  const { searchString } = location.state;
  return (
    <div>
      ResultsContainer
      <MoviesContainer
        searchResult={searchResult}
        searchString={searchString}
      />
      <TVShowsContainer
        searchResult={searchResult}
        searchString={searchString}
      />
    </div>
  );
};

export default ResultsContainer;
