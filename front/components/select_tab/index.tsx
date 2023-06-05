"use client";
import Link from "next/link";
import { Nav, Btn } from "./styles";
import React from "react";

const SelectTab = ({ active = "create" }) => {
  return (
    <Nav>
      <Link href="/create">
        <Btn className={active === "create" ? "active" : ""}>Create</Btn>
      </Link>
      <Link href="/join">
        <Btn className={active === "join" ? "active" : ""}>Join</Btn>
      </Link>
    </Nav>
  );
};
export default SelectTab;
