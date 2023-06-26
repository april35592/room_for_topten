import React, { useState, useEffect, useRef } from 'react';

import Chat from '@components/chat';
import Loading from '@components/loading/room';
import Game from '@components/game';
import URL from '@data/url';

type WSProps = {
  children: React.ReactNode;
  room_id: string;
  user_id: string;
  setID: React.Dispatch<React.SetStateAction<string>>;
};

const WS = ({ children, room_id, user_id, setID }: WSProps) => {
  const [ms, setMS] = useState([`room <${room_id}>에 입장중입니다.`]);
  const [on, setOn] = useState(false);
  let ws = useRef<WebSocket | null>(null);
  useEffect(() => {
    ws.current = new WebSocket(
      `ws://${URL.server_url}/manager/${room_id}${user_id != '' ? '?order=' + user_id[5] : ''}`,
    );
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
          if (on === false) {
            setOn(true);
            setMS([message.slice(7)]);
          } else {
            setMS([...ms, message.slice(7)]);
          }
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
      {user_id === '' ? (
        <Loading />
      ) : (
        <Game userID={user_id} pushMS={send_message}>
          {children}
        </Game>
      )}
      {ws === null ? null : <Chat ms={ms} pushMS={send_message} />}
    </>
  );
};

export default WS;
