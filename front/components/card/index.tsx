import React from 'react';
import { useState } from 'react';

import { CardForm } from './styles';
import { RoundBtn } from '@styles/button';
import { SpaceAround } from '@styles/div';

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
      <SpaceAround>
        <RoundBtn onClick={tabLeft}>&lt;</RoundBtn>
        <CardForm>{game[num - 1]}</CardForm>
        <RoundBtn onClick={tabRight}>&gt;</RoundBtn>
      </SpaceAround>
    </>
  );
};

export default Card;
