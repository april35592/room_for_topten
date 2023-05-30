import React from "react";
import "./ThisIDtab.css";

const ThisIDtab = ({ id }) => {
  const copy = () => {
    navigator.clipboard.writeText(id);
  };

  return (
    <section className="thisIDtab">
      <p>ID :</p>
      <input
        type="text"
        className="thisID"
        value={id}
        onClick={copy}
        readOnly
      />
    </section>
  );
};

export default ThisIDtab;
