import React from 'react';
import { Link } from 'react-router-dom';

import { TabBtn } from './styles';
import { Width100 } from '@styles/div';

const SelectTab = ({ active = 'create' }) => {
  return (
    <Width100>
      <Link to="/">
        <TabBtn className={active === 'create' ? 'active' : ''}>Create</TabBtn>
      </Link>
      <Link to="/join">
        <TabBtn className={active === 'join' ? 'active' : ''}>Join</TabBtn>
      </Link>
    </Width100>
  );
};
export default SelectTab;
