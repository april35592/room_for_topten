import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Now } from './styles';
import { create } from '@apis/create';
import { Btn, RoundBtn } from '@styles/button';
import { AlignCenter, Column } from '@styles/div';
import Loading from '@components/loading/shuffle';

const CreateRoom = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(3);

  const upperCount = () => {
    if (count < 9) {
      setCount(count + 1);
    }
  };
  const lowerCount = () => {
    if (count > 3) {
      setCount(count - 1);
    }
  };

  const create_room = async () => {
    setLoading(true);
    const data = await create(count);
    navigate(`/room/${data.room_id}`);
  };

  return loading ? (
    <Loading />
  ) : (
    <Column>
      <p>인원수</p>
      <AlignCenter>
        <RoundBtn onClick={lowerCount}>-</RoundBtn>
        <Now>{count}</Now>
        <RoundBtn onClick={upperCount}>+</RoundBtn>
      </AlignCenter>
      <Btn onClick={create_room}>게임 생성</Btn>
    </Column>
  );
};

export default CreateRoom;
