import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const JoinRoom = () => {
  const navigate = useNavigate();
  const [id, setID] = useState('');

  const submitID = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    navigate(`/room/${id}`);
  };
  return (
    <section className="join">
      <form className="joinInputTray" onSubmit={submitID}>
        <p>id :</p>
        <input
          type="text"
          autoComplete="off"
          onChange={(e) => {
            setID(e.target.value);
          }}
        />
        <button type="submit">게임 참여</button>
      </form>
    </section>
  );
};

export default JoinRoom;
