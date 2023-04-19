import React from "react";
import { Link, useLocation, Outlet } from "react-router-dom";

const ListItem = ({
  id,
  setFavorite,
  title,
  img_path,
  favorite,
  media_type,
}) => {
  const location = useLocation();
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
        {/* <p>Date added: 4/17/2023</p> */}
        <button onClick={() => setFavorite(id, title, media_type)}>
          Remove
        </button>
      </div>
    </div>
  );
};

export default ListItem;
