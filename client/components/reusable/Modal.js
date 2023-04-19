import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AiOutlineCheckCircle } from "react-icons/ai";

const Modal = () => {
  const location = useLocation();
  console.log(location);
  const { id, favorite, media_type } = location.state;
  const navigate = useNavigate();
  const [show, setShow] = useState(null);

  useEffect(() => {
    // setSearchParams({ media: media_type });
    fetch(`http://localhost:3000/search/${id}?media=${media_type}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setShow(data);
      });
  }, []);

  return (
    <div className="modal">
      <div className="modal-container">
        <button className="modal-close" onClick={() => navigate(-1)}>
          X
        </button>
        <div className="modal-main">
          {show && (
            <React.Fragment>
              <div className="modal-img-container">
                <img
                  src={`https://image.tmdb.org/t/p/original/${show.backdrop_path}`}
                />
              </div>
              <div className="modal-body">
                <h1>{media_type === "tv" ? show.name : show.title}</h1>
                <hr />
                <div className="description">
                  {media_type === "tv" && (
                    <React.Fragment>
                      <p>
                        <span>
                          <strong># of seasons: </strong>
                        </span>
                        <span>{show.number_of_seasons}</span>
                      </p>
                      <p>
                        <span>
                          <strong># of episodes: </strong>
                        </span>
                        <span>{show.number_of_episodes}</span>
                      </p>
                    </React.Fragment>
                  )}

                  <p>{show.overview}</p>
                </div>
                <div className="modal-btns">
                  <button disabled={favorite}>
                    {favorite ? (
                      <span className="modal-btn">
                        <AiOutlineCheckCircle size={20} /> Favorite
                      </span>
                    ) : (
                      "Add To Favorite"
                    )}
                  </button>
                  <button className="btn-secondary">Add to Watchlist</button>
                </div>
              </div>
            </React.Fragment>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
