import React, { useState, useRef } from "react";
import Card from "../reusable/Card";
import { AiOutlineCaretLeft, AiOutlineCaretRight } from "react-icons/ai";

const TVShowsContainer = ({ searchResult, searchString }) => {
  let scrl = useRef(null);
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
        searchResult.filter((show) => show.media_type === "tv").length
      } tv shows related to '${searchString}'`}</h1>
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
            .filter((show) => show.media_type === "tv")
            .map((movie) => {
              return (
                <Card
                  id={movie.id}
                  title={movie.original_title}
                  imgPath={movie.backdrop_path}
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

export default TVShowsContainer;
