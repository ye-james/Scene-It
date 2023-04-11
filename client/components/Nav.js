import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Navdata } from "./Navdata";

const Nav = () => {
  const [open, setOpen] = useState(true);

  const toggleOpen = () => {
    setOpen(!open);
  };

  return (
    <nav className={open ? "nav" : "navClosed"}>
      <button className="menuBtn" onClick={toggleOpen}>
        {open ? "close" : "open"}
      </button>
      <ul className="nav-list">
        {Navdata.map((item, key) => {
          return (
            <NavLink className="nav-item" key={key} to={item.link}>
              <div className="nav-icon">icon</div>
              <div className={open ? "linkText" : "linkTextClosed"}>
                {item.title}
              </div>
            </NavLink>
          );
        })}
      </ul>
    </nav>
  );
};
export default Nav;
