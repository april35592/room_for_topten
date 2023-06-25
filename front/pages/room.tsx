import React, { useState } from 'react';
import { useParams } from 'react-router';

import WS from '@components/websocket';

const Room = () => {
  const { room_id } = useParams();
  const [user_id, setID] = useState('');

  if (!room_id) {
    return <div>잘못된 경로입니다</div>;
  } else {
    return (
      <WS room_id={room_id} user_id={user_id} setID={setID}>
        room_id: {room_id}
      </WS>
    );
  }
};

export default Room;
