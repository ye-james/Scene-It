import React, { useState } from "react";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";

const Card = ({ id, title, imgPath, summary, favorite, setFavorite }) => {
  const [cardHovered, setCardHovered] = useState(false);

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
                onClick={() => setFavorite(id)}
              />
            ) : (
              <AiOutlineStar
                className="favorites-icon"
                size={40}
                onClick={() => setFavorite(id)}
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

            <div className="card-details-summary">
              <h5 className="card-summary">Summary</h5>
            </div>
            <div className="card-summary-text">{summary}</div>
            <div className="card-actors">
              <span>Actor A</span>
              <span>Actor B</span>
            </div>
          </div>

          <div className="card-action-group">
            <button className="card-btn">Learn More</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
