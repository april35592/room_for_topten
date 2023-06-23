import styled from '@emotion/styled';

export const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const SpaceBetween = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const SetNumberNow = styled.p`
  width: 60px;
  height: 40px;
  border-radius: 25px;
  border: 3px solid var(--theme-fore);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: x-large;
`;

export const SetNumberBtn = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: var(--theme-black);
  color: var(--theme-white);
  box-shadow: inset 0 0 0 3px var(--theme-black), inset 0 0 0 5px var(--theme-white);
  font-size: x-large;
  margin: 5px;
`;

export const CreateBtn = styled.button`
  width: 150px;
  height: 40px;
  margin: 10px;
  border-radius: 15px;
  background-color: var(--theme-black);
  color: var(--theme-white);
  box-shadow: inset 0 0 0 3px var(--theme-black), inset 0 0 0 5px var(--theme-white);
`;
