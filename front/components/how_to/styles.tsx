import styled from '@emotion/styled';

export const Div = styled.div`
  width: 100vw;
  height: 100vh;
  position: absolute;
  background-color: rgba(0, 0, 0, 0.5);
  overflow-y: auto;
  display: flex;
  justify-content: center;
  align-items: center;

  section {
    display: flex;
    border: 3px solid black;
    border-radius: 20px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 500px;
    height: 500px;
    background-color: white;

    button {
      width: 150px;
      height: 40px;
      margin: 10px;
      border-radius: 15px;
      background-color: white;
      border: 3px solid black;
    }
  }
`;

export const Article = styled.div`
  width: calc(100% - 30px);
  height: 440px;
  padding: 20px;
  overflow-y: auto;
  h2 {
    font-size: x-large;
    text-align: center;
  }
  p {
    margin: 10px 0;
  }
`;
