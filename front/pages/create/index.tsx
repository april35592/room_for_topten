import React from 'react';

import SelectTab from '@components/select_tab';
import CreateRoom from '@components/create_room';

const Create = () => {
  return (
    <>
      <CreateRoom />
      <SelectTab active="create" />
    </>
  );
};

export default Create;
