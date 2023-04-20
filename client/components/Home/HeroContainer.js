import React, { useState, useEffect, useContext } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { Link, useLocation } from "react-router-dom";
import { StateContext } from "../../context/StateContext";

const HeroContainer = () => {
  const { popMovies, setPopMovies } = useContext(StateContext);
  const location = useLocation();

  useEffect(() => {
    if (popMovies.length === 0) {
      fetch("http://localhost:3000", {
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          popMovies;
          setPopMovies(data.movies);
        });
    }
  }, []);

  return (
    <Carousel
      className="hero"
      centerMode
      centerSlidePercentage={60}
      infiniteLoop
      autoPlay
      showThumbs={false}
      interval={5000}
    >
      {popMovies.length > 0 &&
        popMovies.map((movie, key) => {
          return (
            <div className="hero__item" key={key}>
              <img
                src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
              />
              <Link
                to={`${movie.id}`}
                state={{
                  background: location,
                  id: movie.id,
                  title: movie.title,
                  media_type: movie.media_type,
                }}
              >
                <p className="legend">{movie.title}</p>
              </Link>
            </div>
          );
        })}
    </Carousel>
  );
};
export default HeroContainer;
