import React from 'react';
import { Link } from 'react-router-dom';

import { Head, Title, HowTo } from './styles';

interface Props {
  openHow: () => void;
}

const Header = ({ openHow }: Props) => {
  return (
    <Head>
      <Link to="/">
        <Title>TOP TEN</Title>
      </Link>
      <HowTo onClick={openHow}>How To?</HowTo>
    </Head>
  );
};

export default Header;
