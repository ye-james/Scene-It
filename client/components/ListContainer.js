import React, { useEffect, useState, useContext } from "react";
import { StateContext } from "../context/StateContext";
import ListItem from "./ListItem";
const ListContainer = () => {
  const { list, setList } = useContext(StateContext);

  const setFavorite = (id, title, media_type) => {
    const data = {
      id,
      title,
      media_type,
    };

    fetch("https://scene-it-server.vercel.app/list/favorite", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {

        const showIndex = list.findIndex((show) => show.id === data.id);
        const updatedShow = {
          ...list[showIndex],
          favorite: data.setFavorite,
        };
        const newList = [...list];
        newList[showIndex] = updatedShow;
        setList(newList);
      });
  };

  const addToWatchList = (id) => {

    const data = { id };
    fetch("https://scene-it-server.vercel.app//list/watchlist/delete", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {

      
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
  const deleteFromWatchList = (id) => {

    const data = { id };
    fetch("https://scene-it-server.vercel.app/list/watchlist/delete", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {

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

  const deleteFromWatchedList = (id) => {

    const data = { id };
    fetch("https://scene-it-server.vercel.app/list/watched/delete", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {

        const listIndex = list.findIndex((show) => show.id === data.id);
        const updatedListShow = {
          ...list[listIndex],
          watched: data.watched,
        };
        const newList = [...list];
        newList[listIndex] = updatedListShow;
        setList(newList);
      });
  };

  const addToWatchedList = (id) => {

    const data = { id };
    fetch("https://scene-it-server.vercel.app/list/watched/add", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {

        const listIndex = list.findIndex((show) => show.id === data.id);
        const updatedListShow = {
          ...list[listIndex],
          to_watch: false,
          watched: data.watched,
        };
        const newList = [...list];
        newList[listIndex] = updatedListShow;
        setList(newList);
      });
  };

  return (
    <div className="list-container">
      <h1>Favorites</h1>
      <hr className="list-break" />
      <div className="favorites-container">
        {list.filter((show) => show.favorite).length > 0 ? (
          list
            .filter((show) => show.favorite)
            .map((item, key) => {
              return (
                <ListItem
                  key={key}
                  id={item.id}
                  setFavorite={setFavorite}
                  favorite={item.favorite}
                  title={item.name}
                  img_path={item.img_path}
                  media_type={item.media_type}
                  container="favorite"
                />
              );
            })
        ) : (
          <h2>awkward.... nothing in favorites, go add some!</h2>
        )}
      </div>
      <h1>Watch List</h1>
      <hr className="list-break" />
      <div className="watchlist-container">
        {list.filter((show) => show.to_watch).length > 0 ? (
          list
            .filter((show) => show.to_watch)
            .map((item, key) => {

              return (
                <ListItem
                  key={key}
                  id={item.id}
                  favorite={item.favorite}
                  deleteFromWatchList={deleteFromWatchList}
                  title={item.name}
                  img_path={item.img_path}
                  media_type={item.media_type}
                  container="watchlist"
                  addToWatchedList={addToWatchedList}
                />
              );
            })
        ) : (
          <h2>awkward.... nothing in watch list, go add some!</h2>
        )}
      </div>
      <h1>Watched</h1>
      <hr className="list-break" />
      <div className="watched-container">
        {list.filter((show) => show.watched).length > 0 ? (
          list
            .filter((show) => show.watched)
            .map((item, key) => {

              return (
                <ListItem
                  key={key}
                  id={item.id}
                  favorite={item.favorite}
                  deleteFromWatchedList={deleteFromWatchedList}
                  title={item.name}
                  img_path={item.img_path}
                  media_type={item.media_type}
                  container="watched"
                />
              );
            })
        ) : (
          <h2>
            awkward.... nothing in the watched list, go add some or watch
            something!
          </h2>
        )}
      </div>
    </div>
  );
};

export default ListContainer;
