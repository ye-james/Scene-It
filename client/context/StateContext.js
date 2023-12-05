import { get } from "mongoose";
import React, { useState, createContext, useEffect } from "react";

const StateContext = createContext(null);

const StateProvider = ({ children }) => {
  const [fetching, setFetching] = useState(true);
  const [list, setList] = useState([]);
  const [popTVShows, setPopTVShows] = useState([]);
  const [popMovies, setPopMovies] = useState([]);
  const [searchResult, setSearchResult] = useState({});

  useEffect(() => {
    //Use in local development
    // const getList = fetch("http://localhost:3000/list");
    // const getMedia = fetch("http://localhost:3000");
    const getList = fetch("https://scene-it-server.vercel.app/list");
    const getMedia = fetch("https://scene-it-server.vercel.app/");

    Promise.all([getList, getMedia])
      .then((results) => Promise.all(results.map((r) => r.json())))
      .then((values) => {
        setList(values[0]);
        setPopMovies(values[1].movies);
        setPopTVShows(values[1].tvShows);
        setFetching(false);
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
        fetching,
        setFetching,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export { StateProvider, StateContext };
