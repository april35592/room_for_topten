import styled from '@emotion/styled';

export const Chatroom = styled.aside`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 400px;
  height: 100%;
  background-color: rgba(120, 120, 120, 0.3);

  @media (max-width: 800px) {
    width: 100%;
  }

  div:firstchild {
    width: 100%;
    padding: 5px;
    height: calc(100% - 50px);
    overflow-y: auto;

    p {
      width: 100%;
    }
  }

  @media (max-width: 800px) {
    height: 240px;

    @media (max-height: 620px) {
      height: calc(100% - 240px);
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
      background-color: var(--theme-back);
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
