import React, { useState, useEffect } from "react";
import Card from "../reusable/Card";

const Popular = () => {
  const [tvShows, setTVShows] = useState([]);

  useEffect(() => {
    if (!tvShows.length > 0) {
      fetch("http://localhost:3000/", {
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setTVShows(data.tvShows);
        });
    }
  });

  console.log(tvShows);
  return (
    <div className="home__popular">
      <h1>Popular TV Shows</h1>
      <div className="popular-container snaps-inline">
        {tvShows.length > 0 &&
          tvShows.map((show, key) => {
            return (
              <Card
                key={key}
                id={show.id}
                imgPath={show.backdrop_path}
                title={show.name}
                summary={show.overview}
              />
            );
          })}
      </div>
    </div>
  );
};

export default Popular;
