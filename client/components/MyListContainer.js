import React, { useEffect, useState } from "react";

const MyListContainer = () => {
  useEffect(() => {
    fetch("http://localhost:3000/list")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      });
  }, []);
  return <h1>MyListContainer</h1>;
};

export default MyListContainer;
