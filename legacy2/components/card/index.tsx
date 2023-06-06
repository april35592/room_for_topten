"use client";

import { useState } from "react";
import { CardTray, CardForm, Btn } from "./styles";

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
    <CardTray>
      <Btn onClick={tabLeft}>&lt;</Btn>
      <CardForm>{game[number - 1]}</CardForm>
      <Btn onClick={tabRight}>&gt;</Btn>
    </CardTray>
  );
};

export default Card;
