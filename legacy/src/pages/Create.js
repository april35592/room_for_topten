import React, { useState, useRef } from "react";
import "./Create.css";

const Create = ({ createRoom }) => {
  const [count, setCount] = useState(3);

  const setNumberPlus = useRef();
  const setNumberNow = useRef();
  const setNumberMinus = useRef();

  const settingCount = (e) => {
    if (e.target.value === "true" && count < 9) {
      setCount(count + 1);
    } else if (e.target.value === "false" && count > 3) {
      setCount(count - 1);
    }
  };

  const clickCreate = () => {
    createRoom(count);
  };

  return (
    <section className="create">
      <p>인원수</p>
      <div className="setNumber">
        <button
          className="setNumberMinus"
          value={false}
          ref={setNumberMinus}
          onClick={settingCount}
        >
          -
        </button>
        <div className="setNumberNow" ref={setNumberNow}>
          {count}
        </div>
        <button
          className="setNumberPlus"
          value={true}
          ref={setNumberPlus}
          onClick={settingCount}
        >
          +
        </button>
      </div>
      <button className="createBtn" onClick={clickCreate}>
        게임 생성
      </button>
    </section>
  );
};

export default Create;
