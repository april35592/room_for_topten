import React, { useState, useEffect, useRef, RefObject } from 'react';
import { useParams } from 'react-router';

import URL from '@data/url';

import Card from '@components/card';
import Loading from '@components/loading';
import { Div } from './style';

const Room = () => {
  const { room_id } = useParams();
  const [game, setGame] = useState([]);
  const [ms, setMS] = useState([`room <${room_id}>에 입장하셨습니다.`]);
  let ws = useRef<WebSocket | null>(null);

  const send_message = () => {
    if (ws.current) {
      ws.current.send('hi');
    }
  };

  if (!room_id) {
    return <div>잘못된 경로입니다</div>;
  } else {
    useEffect(() => {
      const load = async () => {
        const data = await lendering(room_id);
        setGame(data.game);
        ws.current = new WebSocket(`ws://${URL.server_url}/manager/${room_id}`);
        ws.current.onopen = () => {
          if (ws.current) {
            ws.current.onopen = () => {
              if (ws.current) {
                ws.current.onmessage = (event: MessageEvent) => {
                  setMS([...ms, event.data]);
                };
              }
            };
          }
        };
      };
      load();
    }, []);

    return (
      <Div>
        <p>id: {room_id}</p>
        {game.length === 0 ? <Loading /> : <Card game={game} />}
        <button onClick={send_message}>chat!</button>
        {ms.map((item, index) => {
          return <p key={index}>{item}</p>;
        })}
      </Div>
    );
  }
};

export const lendering = async (room_id = '', order = 1) => {
  return await fetch(`http://${URL.server_url}/${room_id}/${room_id}_${order}`, {
    method: 'GET',
    cache: 'no-store',
    mode: 'cors',
  }).then((res) => {
    return res.json();
  });
};

export default Room;
