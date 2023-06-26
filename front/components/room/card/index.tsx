import React from 'react';
import { useState } from 'react';

import { CardForm } from './styles';
import { RoundBtn } from '@styles/button';
import { Column, SpaceAround } from '@styles/div';

const Card = ({ game = [1], order = 0 }) => {
  const [num, setNum] = useState(1);
  const [question, setQuestion] = useState([]);
  const [answer, setAnswer] = useState([]);
  const [inputQuestion, setInputQuestion] = useState('');
  const [inputAnswer, setInputAnswer] = useState('');

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
    <Column>
      <p>{num}번째 게임입니다.</p>
      <p>{num === order ? '클릭하여 문제를 작성해주세요' : ''}</p>
      <SpaceAround>
        <RoundBtn onClick={tabLeft}>&lt;</RoundBtn>
        <CardForm>{game[num - 1]}</CardForm>
        <RoundBtn onClick={tabRight}>&gt;</RoundBtn>
      </SpaceAround>
      <p>클릭하여 답안을 작성해주세요</p>
    </Column>
  );
};

export default Card;
