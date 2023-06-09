import React from 'react';

import JoinRoom from '@components/join_room';
import SelectTab from '@components/select_tab';

const Join = () => {
  return (
    <>
      <JoinRoom />
      <SelectTab active="join" />
    </>
  );
};

export default Join;
