import React, { useState, useRef, useContext } from "react";
import Card from "../reusable/Card";
import { AiOutlineCaretLeft, AiOutlineCaretRight } from "react-icons/ai";
import { StateContext } from "../../context/StateContext";

const MoviesContainer = ({ searchResult, searchString }) => {
  let scrl = useRef(null);
  const { list, setList } = useContext(StateContext);
  const [scrollX, setscrollX] = useState(0);
  const [scrolEnd, setscrolEnd] = useState(false);

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

  return (
    <div>
      <h1>{`Showing ${
        searchResult.filter((show) => show.media_type === "movie").length
      } movies related to '${searchString}'`}</h1>
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
          {searchResult
            .filter((show) => show.media_type === "movie")
            .map((movie) => {
              const index = list.findIndex((item) => item.id === movie.id);
              const media = list[index];
              return (
                <Card
                  id={movie.id}
                  title={movie.original_title}
                  imgPath={movie.backdrop_path}
                  media_type={movie.media_type}
                  favorite={media ? media.favorite : false}
                  to_watch={media ? media.to_watch : false}
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

export default MoviesContainer;
