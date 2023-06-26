import React, { useState, useRef, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import AccessContext from '@context/access';
import { Btn } from '@styles/button';
import { Form, InputID } from './styles';

const JoinRoom = () => {
  const navigate = useNavigate();
  const access = useContext(AccessContext);
  const [id, setID] = useState(access.latestAccess.slice(0, 4));
  const input = useRef<HTMLInputElement>(null);

  const submitID = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate(`/room/${id}`);
  };

  useEffect(() => {
    if (input.current) {
      input.current.focus();
    }
  }, []);

  return (
    <Form onSubmit={submitID}>
      <span>id를 입력하세요</span>
      <InputID
        type="text"
        autoComplete="off"
        onChange={(e) => {
          setID(e.target.value);
        }}
        value={id}
        ref={input}
      />
      <Btn type="submit">게임 참여</Btn>
    </Form>
  );
};

export default JoinRoom;
