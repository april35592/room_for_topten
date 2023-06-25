import React, { useState } from 'react';
import { useParams } from 'react-router';

import WS from '@components/websocket';
import { Main } from '@styles/div';

const Room = () => {
  const { room_id } = useParams();
  const [user_id, setID] = useState('');

  if (!room_id) {
    return <div>잘못된 경로입니다</div>;
  } else {
    return (
      <Main>
        <WS room_id={room_id} user_id={user_id} setID={setID}>
          <p>
            room_id: {room_id}
            <br />
            user_id: {user_id}
          </p>
        </WS>
      </Main>
    );
  }
};

export default Room;
