import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { Btn } from '@styles/button';
import { InputID } from './styles';
import { Column } from '@styles/div';

const JoinRoom = () => {
  const navigate = useNavigate();
  const [id, setID] = useState('');
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
    <form onSubmit={submitID}>
      <Column>
        <span>id를 입력하세요</span>
        <InputID
          type="text"
          autoComplete="off"
          onChange={(e) => {
            setID(e.target.value);
          }}
          ref={input}
        />
        <Btn type="submit">게임 참여</Btn>
      </Column>
    </form>
  );
};

export default JoinRoom;
