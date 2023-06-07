import styled from '@emotion/styled';

export const Head = styled.header`
  width: 100%;
  height: 100px;
  background-color: var(--theme-black);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Title = styled.h1`
  font-family: var(--font-family-title);
  font-size: var(--font-size-title);
  color: var(--theme-white);
`;

export const HowTo = styled.button`
  width: 80px;
  height: 30px;
  border-radius: 10px;
  border: 3px solid var(--theme-indipink);
  color: var(--theme-indipink);
`;
