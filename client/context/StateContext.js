import React, { useState, createContext, useEffect } from "react";

const StateContext = createContext(null);

const StateProvider = ({ children }) => {
  const [list, setList] = useState([]);
  const [popTVShows, setPopTVShows] = useState([]);
  const [popMovies, setPopMovies] = useState([]);
  const [searchResult, setSearchResult] = useState({});

  useEffect(() => {
    fetch("http://localhost:3000/list")
      .then((response) => response.json())
      .then((data) => {
        setList(data);
      });
  }, []);

  return (
    <StateContext.Provider
      value={{
        list,
        setList,
        popTVShows,
        setPopTVShows,
        popMovies,
        setPopMovies,
        searchResult,
        setSearchResult,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export { StateProvider, StateContext };
