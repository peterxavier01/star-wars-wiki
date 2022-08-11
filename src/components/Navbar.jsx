import React, { useState } from "react";

const Navbar = ({ setPage }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const toggleActiveState = (index) => {
    setActiveIndex(index);
  };

  return (
    <nav>
      <button
        onClick={() => {
          setPage("planets");
          toggleActiveState(0);
        }}
        className={activeIndex === 0 ? "active" : ""}
      >
        Planets
      </button>
      <button
        onClick={() => {
          setPage("people");
          toggleActiveState(1);
        }}
        className={activeIndex === 1 ? "active" : ""}
      >
        People
      </button>
      <button
        onClick={() => {
          setPage("species");
          toggleActiveState(2);
        }}
        className={activeIndex === 2 ? "active" : ""}
      >
        Species
      </button>
    </nav>
  );
};

export default Navbar;
