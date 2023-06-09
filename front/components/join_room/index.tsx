import React, { useEffect, useState, useRef } from 'react';
import './Join.css';

const JoinRoom = () => {
  const [id, setID] = useState('');
  const [order, setOrder] = useState(0);

  //   const submitID = (e) => {
  //     e.preventDefault();
  //     setID(inputID.current.value);
  //     try {
  //       const numbers = decrypt(id);
  //       if (numbers.length > 0) {
  //         setNumbers(numbers);
  //       }
  //     } catch {
  //       setNumbers([]);
  //     }
  //   };
  //   useEffect(() => {
  //     if (numbers.length > 0) {
  //       const orderBtns = document.querySelectorAll('.orderBtn');
  //       for (let btn of orderBtns) {
  //         if (btn.value <= numbers.length) {
  //           btn.addEventListener('click', () => {
  //             for (let btn of orderBtns) {
  //               btn.classList.remove('select');
  //             }
  //             btn.classList.add('select');
  //             setOrder(Number(btn.value));
  //           });
  //         } else {
  //           btn.classList.add('disabled');
  //         }
  //       }
  //     }
  //   });
  //   const clickJoin = () => {
  //     if (Array.isArray(numbers)) {
  //     }
  //   };
  return (
    <section className="join">
      <form className="joinInputTray">
        <p>id :</p>
        <input type="text" autoComplete="off" />
        <button type="submit">확인</button>
      </form>
      <div className="whatOrder">
        {order === 0 ? (
          <p className="whatJoinOrder">&gt; 당신의 차례를 선택하세요. 다른 사람과 중복되지 않도록 주의하세요.</p>
        ) : null}
        <div className="orderBtnGroup">
          <div>
            <button className="orderBtn" value="2">
              2nd
            </button>
            <button className="orderBtn" value="3">
              3rd
            </button>
            <button className="orderBtn" value="4">
              4th
            </button>
            <button className="orderBtn" value="5">
              5th
            </button>
          </div>
          <div>
            <button className="orderBtn" value="6">
              6th
            </button>
            <button className="orderBtn" value="7">
              7th
            </button>
            <button className="orderBtn" value="8">
              8th
            </button>
            <button className="orderBtn" value="9">
              9th
            </button>
          </div>
        </div>
        <p className="whatYourOrder">
          &gt; 게임 개설자는{' '}
          <button className="orderBtn" value="1">
            1st
          </button>
          의 순서를 받습니다.
        </p>
      </div>
      <button className="joinBtn">참가</button>
    </section>
  );
};

export default JoinRoom;
