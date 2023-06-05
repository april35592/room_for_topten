"use client";
import { useState } from "react";

const Card = ({ game = [] }) => {
  const [number, setNumber] = useState(1);

  const tabLeft = () => {
    if (number > 1) {
      setNumber(number - 1);
    }
  };

  const tabRight = () => {
    if (number < game.length) {
      setNumber(number + 1);
    }
  };

  return (
    <div>
      <button className="leftCard" onClick={tabLeft}>
        &lt;
      </button>
      <div width="200px">{game[number - 1]}</div>
      <button className="rightCard" onClick={tabRight}>
        &gt;
      </button>
    </div>
  );
};

export default Card;
