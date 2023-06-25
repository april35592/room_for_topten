import styled from '@emotion/styled';

export const Chatroom = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 200px;

  div:first-child {
    width: 100%;
    padding: 5px;
    height: calc(100% - 50px);
    overflow-y: auto;

    p {
      width: 100%;
    }
  }

  form {
    width: 100%;
    height: 50px;

    input {
      margin: 5px;
      width: calc(100% - 95px);
      height: 40px;
      border-radius: 15px;
      margin: 5px;
      padding: 5px;
      border: 3px solid var(--theme-fore);
      &:focus {
        outline: none;
      }
    }

    button {
      margin: 5px 5px 5px 0;
      width: 80px;
      height: 40px;
      border-radius: 15px;
      border: 3px solid var(--theme-fore);
      background-color: var(--theme-black);
      color: var(--theme-white);
    }
  }
`;
