import styled from "styled-components";

export const Nav = styled.nav``;

export const Btn = styled.button`
  width: 200px;
  height: 50px;
  background-color: #eec0c6;
  color: black;
  box-shadow: inset 0 0 0 3px var(--theme-indipink),
    inset 0 0 0 5px var(--theme-black);

  &.active {
    background-color: black;
    color: #eec0c6;
    box-shadow: inset 0 0 0 3px var(--theme-black),
      inset 0 0 0 5px var(--theme-indipink);
  }
`;
