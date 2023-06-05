import React from "react";
import { use } from "react";
import Card from "@/components/card";

const Main = ({ room_id = "mpqg" }) => {
  if (room_id === "") {
    return <div>잘못된 경로입니다</div>;
  } else {
    const lender = use(lendering(room_id));
    const game = lender.game;

    return (
      <div>
        <Card game={game} />
      </div>
    );
  }
};

export const lendering = async (room_id = "", order = 1) => {
  return await fetch(`http://43.201.59.195/${room_id}/${order}`, {
    method: "GET",
    cache: "no-store",
  }).then((res) => {
    return res.json();
  });
};

export default Main;
