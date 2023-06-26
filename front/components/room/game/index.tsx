import React, { useState, useEffect } from 'react';

import URL from '@assets/url';

import Loading from '@components/loading/shuffle';
import Card from '@components/room/card';
import { Main } from './styles';

type GameProps = {
  children: React.ReactNode;
  userID: string;
  pushMS: (text: string) => void;
};

const Game = ({ children, userID, pushMS }: GameProps) => {
  const room_id = userID.slice(0, 4);
  const [game, setGame] = useState([0]);

  useEffect(() => {
    const load = async () => {
      const data = await lendering(room_id, userID);
      setGame(data.game);
    };
    load();
  }, []);

  return game.length === 1 ? (
    <Loading />
  ) : (
    <Main>
      {children}
      <Card game={game} order={Number(userID[5]) + 1} />
      <div></div>
    </Main>
  );
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
