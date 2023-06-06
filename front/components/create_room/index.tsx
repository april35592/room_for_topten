import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Loading from '@components/loading';

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
    const data = await lendering(count);
    navigate(`/room/${data.room_id}/${data.user_id}`);
  };

  return loading ? (
    <Loading />
  ) : (
    <>
      <p>인원수</p>
      <div>
        <button onClick={lowerCount}>-</button>
        <div>{count}</div>
        <button onClick={upperCount}>+</button>
      </div>
      <button onClick={create_room}>게임 생성</button>
    </>
  );
};

export const lendering = async (user_number = 0) => {
  return await fetch(`http://43.201.59.195/${user_number}`, {
    method: 'POST',
    cache: 'no-store',
  })
    .then((res) => {
      return res.json();
    })
    .then((json) => json);
};

export default CreateRoom;
