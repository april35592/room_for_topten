import React from "react";
import SelectCreateJoin from "./SelectCreateJoin";
import ThisIDtab from "./ThisIDtab";
import "./Footer.css";

const Footer = ({ id, nowTab, tabSwitch }) => {
  return (
    <footer>
      {nowTab === "main" ? (
        <ThisIDtab id={id} />
      ) : (
        <SelectCreateJoin tabSwitch={tabSwitch} />
      )}
    </footer>
  );
};

export default Footer;
