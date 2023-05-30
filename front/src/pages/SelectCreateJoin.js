import React, { useState, useRef } from "react";
import "./SelectCreateJoin.css";

const SelectCreateJoin = ({ tabSwitch }) => {
  const createBtn = useRef();
  const joinBtn = useRef();
  const [now, setNow] = useState("create");
  const clickBtn = (e) => {
    tabSwitch(e.target.value);
    if (now !== e.target.value) {
      setNow(e.target.value);
      createBtn.current.classList.toggle("select");
      joinBtn.current.classList.toggle("select");
    }
  };

  return (
    <section className="selectCreateOrJoin">
      <button
        className="createTabBtn select"
        ref={createBtn}
        value="create"
        onClick={clickBtn}
      >
        Create
      </button>
      <button
        className="joinTabBtn"
        ref={joinBtn}
        value="join"
        onClick={clickBtn}
      >
        Join
      </button>
    </section>
  );
};

export default SelectCreateJoin;
