import styled from '@emotion/styled';

export const TabBtn = styled.button<{ blue: boolean }>`
  width: 50%;
  height: 50px;
  background-color: ${({ blue }) => (blue ? 'var(--theme-skyblue)' : 'var(--theme-indipink)')};
  color: var(--theme-black);
  box-shadow: inset 0 0 0 3px ${({ blue }) => (blue ? 'var(--theme-skyblue)' : 'var(--theme-indipink)')},
    inset 0 0 0 5px var(--theme-black);

  &.active {
    background-color: var(--theme-black);
    color: ${({ blue }) => (blue ? 'var(--theme-skyblue)' : 'var(--theme-indipink)')};
    box-shadow: inset 0 0 0 3px var(--theme-black),
      inset 0 0 0 5px ${({ blue }) => (blue ? 'var(--theme-skyblue)' : 'var(--theme-indipink)')};
  }
`;
