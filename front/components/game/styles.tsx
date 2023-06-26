import styled from '@emotion/styled';

export const Main = styled.main`
  width: 400px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 800px) {
    width: 100%;
    height: calc(100vh - 400px);
  }

  > p {
    margin: 5px;
    width: calc(100% - 10px);
  }
`;
