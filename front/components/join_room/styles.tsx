import styled from '@emotion/styled';

export const InputID = styled.input`
  width: 150px;
  height: 40px;
  border-radius: 15px;
  margin: 5px;
  padding: 5px;
  border: 3px solid var(--theme-fore);
  display: flex;
  justify-content: center;
  align-items: center;
  &:focus {
    outline: none;
  }
`;

export const Form = styled.form`
  display: flex;
  align-items: center;
  flex-direction: column;
`;
