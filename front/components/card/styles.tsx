import styled from "styled-components";

export const CardTray = styled.div`
  width: 100%;
  height: 400px;
  border: 1px solid black;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

export const CardForm = styled.nav`
  width: 300px;
  height: 400px;
  border-radius: 15px;
  padding: 20px;
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 5px 10px 2px rgba(0, 0, 0, 0.5),
    inset 0 0 0 5px var(--theme-fore);
  font-size: xx-large;
  font-family: Black Han Sans;
  background-color: white;
  background: linear-gradient(to right, #7ee8fa, #eec0c6);
  color: black;
`;

export const Btn = styled.button`
  width: 50px;
  height: 50px;
  background-color: var(--theme-black);
  color: var(--theme-indipink);
  box-shadow: inset 0 0 0 3px var(--theme-black),
    inset 0 0 0 5px var(--theme-indipink);
  border-radius: 100%;
  display: flex;
  justify-content: center;
  font-size: var(--font-size-lg);
`;
