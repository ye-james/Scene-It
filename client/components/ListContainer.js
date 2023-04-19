import React, { useEffect, useState, useContext } from "react";
import { StateContext } from "../context/StateContext";
import ListItem from "./ListItem";
const ListContainer = () => {
  const { list, setList } = useContext(StateContext);
  // const [myList, setMyList] = useState([]);
  // useEffect(() => {
  //   fetch("http://localhost:3000/list")
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setMyList(data);
  //     });
  // }, []);
  // console.log("context list", list);
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
        console.log(data);
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
  return (
    <div className="list-container">
      <h1>Favorites</h1>
      <hr className="list-break" />
      <div className="favorites-container">
        {list.filter((show) => show.favorite).length > 0 ? (
          list
            .filter((show) => show.favorite)
            .map((item, key) => {
              console.log(item);
              return (
                <ListItem
                  key={key}
                  id={item.id}
                  setFavorite={setFavorite}
                  favorite={item.favorite}
                  title={item.name}
                  img_path={item.img_path}
                  media_type={item.media_type}
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
        {list.length > 0 ? (
          list
            .filter((show) => show.to_watch)
            .map((item, key) => {
              console.log(item);
              return (
                <ListItem
                  key={key}
                  id={item.id}
                  favorite={item.favorite}
                  title={item.name}
                  img_path={item.img_path}
                  media_type={item.media_type}
                />
              );
            })
        ) : (
          <h2>awkward.... nothing in favorites, go add some!</h2>
        )}
      </div>
    </div>
  );
};

export default ListContainer;
