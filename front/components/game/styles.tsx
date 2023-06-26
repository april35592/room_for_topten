import styled from '@emotion/styled';

export const Main = styled.main`
  width: 400px;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 800px) {
    width: 100%;
    height: calc(100vh - 340px);

    @media (max-height: 620px) {
      height: 298px;
    }
  }

  > p {
    margin: 5px;
    width: calc(100% - 10px);
  }
`;
