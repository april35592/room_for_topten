import React, { useState, useEffect } from 'react';

import URL from '@data/url';

import Loading from '@components/loading/shuffle';
import Card from '@components/card';

type GameProps = {
  userID: string;
  pushMS: (text: string) => void;
};

const Game = ({ userID, pushMS }: GameProps) => {
  const room_id = userID.slice(0, 4);
  const [game, setGame] = useState([0]);

  useEffect(() => {
    const load = async () => {
      const data = await lendering(room_id, userID);
      setGame(data.game);
    };
    load();
  }, []);

  return game.length === 1 ? <Loading /> : <Card game={game} order={Number(userID[5]) + 1} />;
};

export const lendering = async (room_id = '', user_id = `${room_id}_0`) => {
  return await fetch(`http://${URL.server_url}/${room_id}/${user_id}`, {
    method: 'GET',
    cache: 'no-store',
    mode: 'cors',
  }).then((res) => {
    return res.json();
  });
};

export default Game;
