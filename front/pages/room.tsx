import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router';

import Chat from '@components/chat';
import Loading from '@components/loading';
import Game from '@components/game';

import URL from '@data/url';

const Room = () => {
  const { room_id } = useParams();
  const [user_id, setID] = useState('');
  const [ms, setMS] = useState([`room <${room_id}>에 입장중입니다.`]);
  let ws = useRef<WebSocket | null>(null);

  if (!room_id) {
    return <div>잘못된 경로입니다</div>;
  } else {
    useEffect(() => {
      ws.current = new WebSocket(`ws://${URL.server_url}/manager/${room_id}`);
      ws.current.onopen = () => {
        if (ws.current) {
          ws.current.send('hello');
        }
      };
    }, []);

    useEffect(() => {
      if (ws.current) {
        ws.current.onmessage = (event: MessageEvent) => {
          const message = event.data;
          if (message.slice(0, 4) === 'myID') {
            setID(event.data.slice(7, 14));
          } else {
            setMS([...ms, message]);
          }
        };
      }
    }, [ms]);

    const send_message = (text: string) => {
      if (ws.current) {
        if (text.length != 0) {
          ws.current.send(text);
        }
      }
    };

    return (
      <>
        <p>id: {room_id}</p>
        {user_id === '' ? <Loading /> : <Game userID={user_id} />}
        {ws === null ? null : <Chat ms={ms} pushMS={send_message} />}
      </>
    );
  }
};

export default Room;
