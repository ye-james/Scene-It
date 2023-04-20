import React from "react";
import { Link, useLocation, Outlet } from "react-router-dom";

const ListItem = ({
  id,
  setFavorite,
  title,
  img_path,
  favorite,
  media_type,
  container,
  addToWatchedList,
  deleteFromWatchedList,
  deleteFromWatchList,
}) => {
  const location = useLocation();
  const determineButton = () => {
    if (container === "favorite") {
      setFavorite(id, title, media_type);
    } else if (container === "watchlist") {
      deleteFromWatchList(id);
    } else {
      deleteFromWatchedList(id);
    }
  };
  return (
    <div className="list-card">
      <div className="wrapper">
        <img
          className="list-card-img"
          src={`https://image.tmdb.org/t/p/w500${img_path}`}
        />
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
          <h2>{title}</h2>
        </Link>
        <Outlet />
      </div>
      <div className="wrapper">
        {container === "watchlist" ? (
          <button onClick={() => addToWatchedList(id)}>Move to Watched</button>
        ) : null}
        {/* <p>Date added: 4/17/2023</p> */}
        <button onClick={() => determineButton()}>
          {/* <button onClick={() => setFavorite(id, title, media_type)}> */}
          Remove
        </button>
      </div>
    </div>
  );
};

export default ListItem;
