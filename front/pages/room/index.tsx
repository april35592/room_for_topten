import React from 'react';
import { useParams } from 'react-router';

const Room = () => {
  const { room_id, user_id } = useParams();
  return (
    <>
      <p>
        room_id: {room_id}, user_id: {user_id}
      </p>
      <div></div>
    </>
  );
};

export default Room;
