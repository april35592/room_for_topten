import { Chatroom } from './styles';
import React, { useState, useEffect, useRef } from 'react';

type ChatProps = {
  ms: string[];
  pushMS: (text: string) => void;
};

const Chat = ({ ms, pushMS }: ChatProps) => {
  const [text, setText] = useState('');
  const input = useRef<HTMLInputElement>(null);
  const scroll = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (input.current) {
      input.current.focus();
    }
  }, []);

  const push = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (text.length != 0) {
      pushMS(text);
      setText('');
    }
    const ready = () => {
      if (scroll.current) {
        scroll.current.scrollTop = scroll.current.scrollHeight;
      }
    };
    window.setTimeout(ready, 50);
  };

  const onInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  return (
    <Chatroom>
      <div ref={scroll}>
        {ms.map((item, index) => {
          return <p key={index}>{item}</p>;
        })}
      </div>
      <form onSubmit={push}>
        <input value={text} onInput={onInput} ref={input} />
        <button type="submit">chat</button>
      </form>
    </Chatroom>
  );
};

export default Chat;
