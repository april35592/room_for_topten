import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Div, SetNumber, SetNumberNow, SetNumberBtn, CreateBtn } from './styles';

import Loading from '@components/loading';
import URL from '@data/url';

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
    <Div>
      <p>인원수</p>
      <SetNumber>
        <SetNumberBtn onClick={lowerCount}>-</SetNumberBtn>
        <SetNumberNow>{count}</SetNumberNow>
        <SetNumberBtn onClick={upperCount}>+</SetNumberBtn>
      </SetNumber>
      <CreateBtn onClick={create_room}>게임 생성</CreateBtn>
    </Div>
  );
};

export const create = async (user_number = 0) => {
  if (10 > user_number && user_number > 2) {
    return await fetch(`http://${URL.server_url}/${user_number}`, {
      method: 'POST',
      cache: 'no-store',
    }).then((res) => {
      return res.json();
    });
  } else {
    return 'err count';
  }
};

export default CreateRoom;
