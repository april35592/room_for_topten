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
    border: 3px solid var(--theme-fore);
    border-radius: 20px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 500px;
    height: 500px;
    background-color: var(--theme-back);

    button {
      width: 150px;
      height: 40px;
      margin: 10px;
      border-radius: 15px;
      background-color: var(--theme-back);
      border: 3px solid var(--theme-fore);
    }
  }
`;

export const Article = styled.div`
  -ms-overflow-style: none; /* 인터넷 익스플로러 */
  scrollbar-width: none; /* 파이어폭스 */
  &::-webkit-scrollbar {
    display: none;
  }

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
