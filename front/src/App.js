import React, { useState } from "react";
import "./App.css";
import HowTo from "./pages/HowTo";
import Header from "./pages/Header";
import Footer from "./pages/Footer";
import Create from "./pages/Create";
import Join from "./pages/Join";
import Main from "./pages/Main";
import arrayShuffle from "./fnc/arrayShuffle";
import encrypt from "./fnc/encrypt";

function App() {
  //title을 클릭하면 메인으로 돌아감
  const backHome = () => {
    setNowTab("create");
  };

  //howTo 페이지 출력 상태를 조정
  const [how, setHow] = useState(false);
  const openHow = () => {
    setHow(true);
  };
  const closeHow = () => {
    setHow(false);
  };

  //현재 페이지 출력을 조정
  const [nowTab, setNowTab] = useState("create");
  const tabSwitch = (now) => {
    if (now === "create") {
      setNowTab("create");
    } else if (now === "join") {
      setNowTab("join");
    } else {
      setNowTab("main");
    }
  };

  //Creat, Join을 통한 Room 생성을 조정

  const [order, setOrder] = useState(1);
  const [numbers, setNumbers] = useState([]);
  const [id, setID] = useState(null);

  const createRoom = (number) => {
    const numbers = [];
    for (let i = 0; i < number; i++) {
      numbers.push(
        arrayShuffle(["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"])
      );
    }
    settingRoom(1, numbers, encrypt(numbers));
  };

  const joinRoom = (order, numbers, id) => {
    settingRoom(order, numbers, id);
  };

  const settingRoom = (order, numbers, id) => {
    setOrder(order);
    setNumbers(numbers);
    setID(id);
    setNowTab("main");
  };

  return (
    <div className="App">
      <HowTo how={how} closeHow={closeHow} />
      <div className="container">
        <Header backHome={backHome} openHow={openHow} />
        {nowTab === "create" ? (
          <Create createRoom={createRoom} />
        ) : nowTab === "join" ? (
          <Join joinRoom={joinRoom} />
        ) : (
          <Main order={order} numbers={numbers} />
        )}
        <Footer nowTab={nowTab} id={id} tabSwitch={tabSwitch} />
      </div>
    </div>
  );
}

export default App;
