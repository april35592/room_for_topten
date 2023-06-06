"use client";

import Link from "next/link";
import { Head, Title, HowTo } from "./styles";

const Header = () => {
  return (
    <Head>
      <Link href="/">
        <Title>TOP TEN</Title>
      </Link>
      <HowTo>How To?</HowTo>
    </Head>
  );
};

export default Header;
