import React from 'react';
import { Link } from 'react-router-dom';

import { Nav, Btn } from './styles';

const SelectTab = ({ active = 'create' }) => {
  return (
    <Nav>
      <Link to="/">
        <Btn className={active === 'create' ? 'active' : ''}>Create</Btn>
      </Link>
      <Link to="/join">
        <Btn className={active === 'join' ? 'active' : ''}>Join</Btn>
      </Link>
    </Nav>
  );
};
export default SelectTab;
