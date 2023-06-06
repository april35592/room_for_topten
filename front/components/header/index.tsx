import React from 'react';
import { Link } from 'react-router-dom';

import { Head, Title, HowTo } from './styles';

const Header = () => {
  return (
    <Head>
      <Link to="/">
        <Title>TOP TEN</Title>
      </Link>
      <HowTo>How To?</HowTo>
    </Head>
  );
};

export default Header;
