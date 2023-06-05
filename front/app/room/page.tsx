import { use } from "react";

const Main = () => {
  if (true) {
    return <div>잘못된 경로입니다</div>;
  } else {
    const lender = use(lendering(room_id));
    return <div>{lender}</div>;
  }
};

export const lendering = async (room_id: string) => {
  return await fetch(`http://43.201.59.195/${room_id}`, {
    method: "GET",
    cache: "no-store",
  }).then((res) => {
    return res.json();
  });
};

export default Main;
