import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import Card from '@components/card';
import Loading from '@components/loading';
import { Div } from './style';

const Room = () => {
  const { room_id, user_id } = useParams();
  const [game, setGame] = useState([]);

  if (!room_id) {
    return <div>잘못된 경로입니다</div>;
  } else {
    useEffect(() => {
      const load = async () => {
        const data = await lendering(room_id);
        setGame(data.game);
      };
      load();
    }, []);
    return (
      <Div>
        <p>id: {room_id}</p>
        {game.length === 0 ? <Loading /> : <Card game={game} />}
        <div></div>
      </Div>
    );
  }
};

export const lendering = async (room_id = '', order = 1) => {
  return await fetch(`http://43.201.59.195/${room_id}/${order}`, {
    method: 'GET',
    cache: 'no-store',
  }).then((res) => {
    return res.json();
  });
};

export default Room;
