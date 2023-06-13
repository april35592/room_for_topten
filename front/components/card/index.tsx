import React from 'react';
import { useState } from 'react';
import { CardTray, CardForm, Btn } from './styles';

const Card = ({ game = [1] }) => {
  const [num, setNum] = useState(1);

  const tabLeft = () => {
    if (num > 1) {
      setNum(num - 1);
    }
  };

  const tabRight = () => {
    if (num < game.length) {
      setNum(num + 1);
    }
  };

  return (
    <>
      <p>{num}번째 게임입니다.</p>
      <CardTray>
        <Btn onClick={tabLeft}>&lt;</Btn>
        <CardForm>{game[num - 1]}</CardForm>
        <Btn onClick={tabRight}>&gt;</Btn>
      </CardTray>
    </>
  );
};

export default Card;
