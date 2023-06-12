import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router';

import Chat from '@components/chat';
import Loading from '@components/loading';

import URL from '@data/url';

const Room = () => {
  const { room_id } = useParams();
  const [ms, setMS] = useState([`room <${room_id}>에 입장중입니다.`]);
  let ws = useRef<WebSocket | null>(null);

  if (!room_id) {
    return <div>잘못된 경로입니다</div>;
  } else {
    useEffect(() => {
      const connect = (room_id: string) => {
        ws.current = new WebSocket(`ws://${URL.server_url}/manager/${room_id}`);
        ws.current.onopen = () => {};
      };
      connect(room_id);
    }, []);

    useEffect(() => {
      if (ws.current) {
        ws.current.onmessage = (event: MessageEvent) => {
          setMS([...ms, event.data]);
        };
      }
    }, [ms]);

    const send_message = () => {
      if (ws.current) {
        ws.current.send('hi');
      }
    };

    return (
      <>
        <p>id: {room_id}</p>
        {ws === null ? <Loading /> : <Chat ms={ms} pushMS={send_message} />}
      </>
    );
  }
};

export default Room;
