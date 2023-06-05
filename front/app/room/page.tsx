"use client";

import React from "react";
import { use } from "react";
import { useSearchParams } from "next/navigation";
import Card from "@/components/card";

const Main = () => {
  const searchParams = useSearchParams();
  const room_id = searchParams.get("room_id");
  const user_id = searchParams.get("user_id");

  if (!room_id) {
    return <div>잘못된 경로입니다</div>;
  } else {
    const data = use(lendering(room_id));
    const game = data.game;

    return (
      <>
        <Card game={game} />
      </>
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
