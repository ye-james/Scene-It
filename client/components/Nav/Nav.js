import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Navdata } from "./Navdata";
import { AiOutlineCaretLeft, AiOutlineCaretRight } from "react-icons/ai";

const Nav = () => {
  const [open, setOpen] = useState(false);
  const iconStyles = { color: "#ffe3a2" };
  const toggleOpen = () => {
    setOpen(!open);
  };

  return (
    <nav className={open ? "nav navOpen" : "nav navClosed"}>
      <div className="nav__logo-container">LOGO</div>
      <button className="menuBtn" onClick={toggleOpen}>
        {open ? (
          <AiOutlineCaretLeft size={30} style={iconStyles} />
        ) : (
          <AiOutlineCaretRight size={30} style={iconStyles} />
        )}
      </button>
      <ul className="nav-list">
        {Navdata.map((item, key) => {
          return (
            <NavLink className="nav-item" key={key} to={item.link}>
              <div className="nav-icon">{item.icon ? item.icon : "icon"}</div>
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