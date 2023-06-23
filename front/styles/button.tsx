import styled from '@emotion/styled';

export const Btn = styled.button`
  width: 150px;
  height: 40px;
  margin: 5px;
  border-radius: 15px;
  background-color: var(--theme-black);
  color: var(--theme-white);
  box-shadow: inset 0 0 0 3px var(--theme-black), inset 0 0 0 5px var(--theme-white);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const RoundBtn = styled(Btn)`
  width: 40px;
  border-radius: 50%;
  font-size: var(--font-size-lg);
`;
