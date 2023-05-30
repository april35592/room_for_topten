import React, { useState } from "react";
import "./Main.css";

const Main = ({ order, numbers }) => {
  const [now, setNow] = useState(1);
  const tabLeftRight = (e) => {
    if (e.target.value === "left" && now > 1) {
      setNow(now - 1);
    } else if (e.target.value === "right" && now < numbers.length) {
      setNow(now + 1);
    }
  };

  return (
    <section className="main">
      <p className="thisRound">
        <span className="order">{now}</span>번째 게임
      </p>
      <div className="cardTray">
        <button className="leftCard" value="left" onClick={tabLeftRight}>
          &lt;
        </button>
        <div className="cardSet">
          <div className="card">{numbers[now - 1][order - 1]}</div>
        </div>
        <button className="rightCard" value="right" onClick={tabLeftRight}>
          &gt;
        </button>
      </div>
      {now === order ? <p className="youArePD">You are PD!</p> : null}
    </section>
  );
};

export default Main;
