import React, { useState, useEffect, useRef } from 'react';

type ChatProps = {
  ms: string[];
  pushMS: (text: string) => void;
};

const Chat = ({ ms = [''], pushMS }: ChatProps) => {
  const [text, setText] = useState('');

  const push = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (text.length != 0) {
      pushMS(text);
      setText('');
    }
  };

  const onInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  return (
    <>
      <form onSubmit={push}>
        <input value={text} onInput={onInput} />
        <button type="submit">chat!</button>
      </form>
      {ms.map((item, index) => {
        return <p key={index}>{item}</p>;
      })}
    </>
  );
};

export default Chat;
