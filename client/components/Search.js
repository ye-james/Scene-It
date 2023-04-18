import React, { useState, useRef, useEffect } from "react";

const Search = () => {
  const inputRef = useRef(null);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      const data = {
        queryString: inputValue,
      };
      if (inputRef.current.value === inputValue && inputValue !== "") {
        fetch("http://localhost:3000/search", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            //"Content-Type": "application/x-www-form-urlencoded",
          },
          body: JSON.stringify(data),
        });
      }
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [inputValue, inputRef]);
  return (
    <div className="search-container">
      <input
        ref={inputRef}
        className="search-bar"
        placeholder="Search..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
    </div>
  );
};

export default Search;
