import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { StateContext } from "../context/StateContext";

const Search = () => {
  const [inputValue, setInputValue] = useState("");
  const { setSearchResult } = useContext(StateContext);
  const navigate = useNavigate();

  const onEnterPress = (e) => {
    if (e.keyCode === 13) {
      const data = {
        queryString: inputValue,
      };
      fetch("http://localhost:3000/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((data) => {
          setSearchResult(data.results);
          navigate("/results", { state: { searchString: inputValue } });
        });
    }
  };

  return (
    <div className="search-container">
      <input
        className="search-bar"
        placeholder="Search..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={(e) => onEnterPress(e)}
      />
    </div>
  );
};

export default Search;
