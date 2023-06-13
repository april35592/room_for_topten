import React, { useState, useEffect, useRef, RefObject } from 'react';
import { useParams } from 'react-router';

import URL from '@data/url';

import Loading from '@components/loading';
import Card from '@components/card';

const Game = ({ userID = '' }) => {
  const room_id = userID.slice(0, 4);
  const [game, setGame] = useState([0]);

  useEffect(() => {
    const load = async () => {
      const data = await lendering(room_id, userID);
      setGame(data.game);
    };
    load();
  }, []);

  return game.length === 1 ? <Loading /> : <Card game={game} />;
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
