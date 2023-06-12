import React, { useState, useEffect, useRef } from 'react';

type ChatProps = {
  ms: string[];
  pushMS: () => void;
};

const Chat = ({ ms = [''], pushMS }: ChatProps) => {
  return (
    <>
      <button onClick={pushMS}>chat!</button>
      {ms.map((item, index) => {
        return <p key={index}>{item}</p>;
      })}
    </>
  );
};

export default Chat;
