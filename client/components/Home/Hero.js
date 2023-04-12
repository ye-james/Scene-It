import React, { useState, useEffect } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

const Hero = () => {
  const [popularMovies, setPopularMovies] = useState([]);

  useEffect(() => {
    if (!popularMovies.length > 0) {
      fetch("http://localhost:3000", {
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setPopularMovies(data.movies);
        });
    }
  });
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
      {popularMovies.length > 0 &&
        popularMovies.map((movie, key) => {
          return (
            <div className="hero__item" key={key}>
              <img
                src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
              />
              <p className="legend">{movie.title}</p>
            </div>
          );
        })}
    </Carousel>
  );
};
export default Hero;
