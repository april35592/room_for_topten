import styled from '@emotion/styled';

export const CardTray = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

export const CardForm = styled.nav`
  width: 300px;
  height: 400px;
  border-radius: 15px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 5px 10px 2px rgba(0, 0, 0, 0.5), inset 0 0 0 5px var(--theme-fore);
  font-size: xx-large;
  font-family: var(--font-family-title);
  background-color: var(--theme-back);
  color: var(--theme-fore);
`;

export const Btn = styled.button`
  width: 50px;
  height: 50px;
  background-color: var(--theme-black);
  color: var(--theme-indipink);
  box-shadow: inset 0 0 0 3px var(--theme-black), inset 0 0 0 5px var(--theme-indipink);
  border-radius: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: var(--font-size-lg);
`;
