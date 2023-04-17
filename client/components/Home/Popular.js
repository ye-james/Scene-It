import React, { useState, useEffect, useRef } from "react";
import Card from "../reusable/Card";
import { AiOutlineCaretLeft, AiOutlineCaretRight } from "react-icons/ai";

const Popular = () => {
  const [tvShows, setTVShows] = useState([]);

  let scrl = useRef(null);
  const [scrollX, setscrollX] = useState(0);
  const [scrolEnd, setscrolEnd] = useState(false);

  useEffect(() => {
    fetch("http://localhost:3000/", {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setTVShows(data.tvShows);
      });
  }, []);

  const slide = (shift) => {
    scrl.current.scrollLeft += shift;
    setscrollX(scrollX + shift);

    if (
      Math.floor(scrl.current.scrollWidth - scrl.current.scrollLeft) <=
      scrl.current.offsetWidth
    ) {
      setscrolEnd(true);
    } else {
      setscrolEnd(false);
    }
  };

  const scrollCheck = () => {
    setscrollX(scrl.current.scrollLeft);
    if (
      Math.floor(scrl.current.scrollWidth - scrl.current.scrollLeft) <=
      scrl.current.offsetWidth
    ) {
      setscrolEnd(true);
    } else {
      setscrolEnd(false);
    }
  };

  const setFavorite = (id) => {
    const data = {
      id,
    };

    fetch("http://localhost:3000/", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        const showIndex = tvShows.findIndex((show) => show.id === data.id);
        const updatedShow = {
          ...tvShows[showIndex],
          favorite: data.setFavorite,
        };
        const newTvShowsList = [...tvShows];
        newTvShowsList[showIndex] = updatedShow;
        setTVShows(newTvShowsList);
      });
  };

  return (
    <div className="home__popular">
      <h1>Popular TV Shows</h1>
      <div className="popular-container">
        {scrollX !== 0 && (
          <button className="scroll-prev" onClick={() => slide(-250)}>
            <AiOutlineCaretLeft />
          </button>
        )}
        <div
          className="scroll-container snaps-inline"
          ref={scrl}
          onScroll={scrollCheck}
        >
          {tvShows.length > 0 &&
            tvShows.map((show, key) => {
              return (
                <Card
                  key={key}
                  id={show.id}
                  imgPath={show.backdrop_path}
                  title={show.name}
                  summary={show.overview}
                  media_type={show.media_type}
                  setFavorite={setFavorite}
                  favorite={show.favorite}
                />
              );
            })}
        </div>
        {!scrolEnd && (
          <button className="scroll-next" onClick={() => slide(+250)}>
            <AiOutlineCaretRight />
          </button>
        )}
      </div>
    </div>
  );
};

export default Popular;
