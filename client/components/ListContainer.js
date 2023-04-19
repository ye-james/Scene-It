import React, { useEffect, useState } from "react";
import ListItem from "./ListItem";
const ListContainer = () => {
  const [myList, setMyList] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3000/list")
      .then((response) => response.json())
      .then((data) => {
        setMyList(data);
        console.log(data);
      });
  }, []);

  const setFavorite = (id) => {
    const data = {
      id,
    };

    fetch("http://localhost:3000/list", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        const showIndex = myList.findIndex((show) => show.id === data.id);
        const updatedShow = {
          ...myList[showIndex],
          favorite: data.setFavorite,
        };
        const newList = [...myList];
        newList[showIndex] = updatedShow;
        setMyList(newList);
      });
  };

  return (
    <div className="list-container">
      <h1>Favorites</h1>
      <hr className="list-break" />
      <div className="favorites-container">
        {myList.length > 0 ? (
          myList.map((item, key) => {
            if (item.favorite)
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
    </div>
  );
};

export default ListContainer;
