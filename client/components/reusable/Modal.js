import React, { useEffect, useState, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { StateContext } from "../../context/StateContext";
import NoImg from "../../imgs/No_Image.jpg";

const Modal = () => {
  const location = useLocation();
  const { list, setList } = useContext(StateContext);
  console.log(location);
  const { id, favorite, media_type, title } = location.state;
  const navigate = useNavigate();
  const [show, setShow] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3000/search/${id}?media=${media_type}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("show", data);
        setShow(data);
      });
  }, []);
  const setFavorite = (id, title, media_type) => {
    const data = {
      id,
      title,
      media_type,
    };

    console.log("setFavorite data", data);
    fetch("http://localhost:3000/list/favorite", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        //update local state
        const updateShowObj = { ...show, favorite: data.setFavorite };
        setShow(updateShowObj);
      });
  };

  const addToWatchList = (id, title, media_type, action) => {
    const data = { id, title, media_type, action };
    console.log("being called", id);
    fetch("http://localhost:3000/list/watchlist/add", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("response from servfer", data);
        const listIndex = list.findIndex((show) => show.id === data.id);
        const updatedListShow = {
          ...list[listIndex],
          to_watch: data.to_watch,
        };
        const newList = [...list];
        newList[listIndex] = updatedListShow;
        setList(newList);
      });
  };

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
                  src={
                    show.backdrop_path
                      ? `https://image.tmdb.org/t/p/original/${show.backdrop_path}`
                      : NoImg
                  }
                />
              </div>
              <div className="modal-body">
                <h1>{media_type === "tv" ? show.name : show.title}</h1>
                <hr />
                <div className="modal-description">
                  {/* details for movies */}
                  {media_type === "movie" && (
                    <div className="modal-card-details">
                      <div className="modal-card-info">
                        <p>
                          <span>
                            <strong>Release date: </strong>
                          </span>
                          <span>{show.release_date}</span>
                        </p>
                        <p>
                          <span>
                            <strong>Runtime: </strong>
                          </span>
                          <span>{show.runtime} min</span>
                        </p>
                      </div>
                      <div>
                        <p>
                          <span>
                            <strong>Rating :</strong>{" "}
                          </span>
                          <strong>{Math.round(show.vote_average * 10)}</strong>
                          <span>/100</span>
                        </p>
                      </div>
                    </div>
                  )}

                  {/* details for TV shows */}
                  {media_type === "tv" && (
                    <div className="modal-card-details">
                      <div className="modal-card-info">
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
                        <p>
                          <span>
                            <strong>Released: </strong>
                          </span>
                          <span>{show.first_air_date}</span>
                        </p>
                      </div>
                      <div>
                        <p>
                          <span>
                            <strong>Rating :</strong>{" "}
                          </span>
                          <strong>{Math.round(show.vote_average * 10)}</strong>
                          <span>/100</span>
                        </p>
                      </div>
                    </div>
                  )}

                  <p>{show.overview}</p>

                  <div className="modal-tv-genre">
                    {show.genres.map((genre, key) => (
                      <span className="modal-genre" key={key}>
                        {genre.name}
                        <span>|</span>
                      </span>
                    ))}
                  </div>
                </div>
                {/* <hr /> */}
                <div className="modal-btns">
                  <button
                    disabled={favorite}
                    onClick={() => setFavorite(id, title, media_type)}
                  >
                    {favorite ? (
                      <span className="modal-btn">
                        <AiOutlineCheckCircle size={20} /> Favorited
                      </span>
                    ) : (
                      "Add To Favorite"
                    )}
                  </button>
                  <button
                    className="btn-secondary"
                    onClick={() => addToWatchList(id, title, media_type, "add")}
                  >
                    {
                      <span className="modal-btn">
                        {/* <AiOutlineCheckCircle size={20} />  */}
                        Add To Watchlist
                      </span>
                    }
                  </button>
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
