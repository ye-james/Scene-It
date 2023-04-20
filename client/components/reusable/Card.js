import React, { useState } from "react";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import { Link, useLocation } from "react-router-dom";

const Card = ({
  id,
  title,
  imgPath,
  summary,
  favorite,
  setFavorite,
  media_type,
}) => {
  const [cardHovered, setCardHovered] = useState(false);
  const location = useLocation();
  return (
    <div
      className="card"
      onMouseEnter={() => setCardHovered(true)}
      onMouseLeave={() => setCardHovered(false)}
    >
      <div className="card-container">
        <div className="img-container">
          <img
            className="card-img"
            src={`https://image.tmdb.org/t/p/w500/${imgPath}`}
          />
          {cardHovered &&
            (favorite ? (
              <AiFillStar
                className="favorites-icon"
                size={40}
                onClick={() => setFavorite(id, title, media_type)}
              />
            ) : (
              <AiOutlineStar
                className="favorites-icon"
                size={40}
                onClick={() => setFavorite(id, title, media_type)}
              />
            ))}
        </div>
        <div className="card-details">
          <div className="card-details-wrapper">
            <h3>{title}</h3>
            <ul className="card-sub-details">
              <li>PG-13 / </li>
              <li>2 49min / </li>
              <li>Action, Superhero</li>
            </ul>

            {/* <div className="card-details-summary">
              <h5 className="card-summary">Summary</h5>
            </div>
            <div className="card-summary-text">{summary}</div> */}
            <div className="card-actors">
              <span>Actor A</span>
              <span>Actor B</span>
            </div>
          </div>

          <div className="card-action-group">
            <Link
              to={`${id}`}
              state={{
                background: location,
                id: id,
                title: title,
                favorite: favorite,
                media_type: media_type,
              }}
              className="list-link"
            >
              <button className="card-btn">Learn More</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
