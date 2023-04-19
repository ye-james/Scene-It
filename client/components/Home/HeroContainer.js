import React, { useState, useEffect } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { Link, useLocation } from "react-router-dom";
const HeroContainer = () => {
  const [popularMovies, setPopularMovies] = useState([]);
  const location = useLocation();

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
  console.log(popularMovies);
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
              <Link
                to={`${movie.id}`}
                state={{
                  background: location,
                  id: movie.id,
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
