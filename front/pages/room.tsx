import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router';

import WS from '@components/room/websocket';
import MyName from '@components/room/myname';
import { Main } from '@styles/div';
import AccessContext from '@context/access';

const Room = () => {
  const access = useContext(AccessContext);
  const { room_id } = useParams();
  const [user_id, setID] = useState(access.latestAccess.slice(0, 4) === room_id ? access.latestAccess : '');

  useEffect(() => {
    if (user_id != access.latestAccess) access.newAccess(user_id);
  }, [user_id]);

  if (!room_id) {
    return <div>잘못된 경로입니다</div>;
  } else {
    return (
      <Main>
        <WS room_id={room_id} user_id={user_id} setID={setID}>
          <p>
            room id: {room_id}
            <br />
            my name: <MyName user_id={user_id} />
          </p>
        </WS>
      </Main>
    );
  }
};

export default Room;
