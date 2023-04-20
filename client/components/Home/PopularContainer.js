import React, { useState, useEffect, useRef, useContext } from "react";
import Card from "../reusable/Card";
import { StateContext } from "../../context/StateContext";
import { AiOutlineCaretLeft, AiOutlineCaretRight } from "react-icons/ai";

const PopularContainer = () => {
  const { popTVShows, setPopTVShows, list, setList } = useContext(StateContext);
  let scrl = useRef(null);
  const [scrollX, setscrollX] = useState(0);
  const [scrolEnd, setscrolEnd] = useState(false);

  useEffect(() => {
    // fetch("http://localhost:3000/list")
    //   .then((response) => response.json())
    //   .then((data) => {
    //     setList(data);
    //   });
    // setFetching(true);
    const getList = fetch("http://localhost:3000/list");
    const getMovies = fetch("http://localhost:3000");
    const getTVShows = fetch("http://localhost:3000/");

    Promise.all([getList, getMovies, getTVShows])
      .then((results) => Promise.all(results.map((r) => r.json())))
      .then((values) => {
        console.log(values);
        // setList(values[0]);
        // setPopMovies(values[1]);
        // setPopTVShows(values[2]);
        //setFetching(false);
      });
  }, []);

  // useEffect(() => {
  //   if (popTVShows.length === 0) {
  //     fetch("http://localhost:3000/", {
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     })
  //       .then((response) => response.json())
  //       .then((data) => {
  //         // setTVShows(data.tvShows);
  //         setPopTVShows(data.tvShows);
  //       });
  //   }
  // }, []);

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

  const setFavorite = (id, title, media_type) => {
    const data = {
      id,
      title,
      media_type,
    };

    fetch("http://localhost:3000/list/favorite", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        const showIndex = popTVShows.findIndex((show) => show.id === data.id);
        const updatedShow = {
          ...popTVShows[showIndex],
          favorite: data.setFavorite,
        };
        const newTvShowsList = [...popTVShows];
        newTvShowsList[showIndex] = updatedShow;
        setPopTVShows(newTvShowsList);

        //update list to reflect favorite changes
        console.log(data);
        const listIndex = list.findIndex((show) => show.id === data.id);
        const updatedListShow = {
          ...list[listIndex],
          favorite: data.setFavorite,
        };
        const newList = [...list];
        newList[listIndex] = updatedListShow;
        setList(newList);
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
          {popTVShows.length > 0 &&
            popTVShows.map((show, key) => {
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

export default PopularContainer;
