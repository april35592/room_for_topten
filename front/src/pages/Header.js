import React from "react";
import "./Header.css";

const Header = ({ backHome, openHow }) => {
  return (
    <header>
      <div className="titlebox">
        <h1 onClick={backHome}>TOP TEN</h1>
      </div>

      <button className="howBtn" onClick={openHow}>
        How To?
      </button>
    </header>
  );
};

export default Header;
