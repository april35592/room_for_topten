"use client";

import { useRouter } from "next/navigation";
import { use, useState } from "react";

const UserCount = () => {
  const [count, setCount] = useState(3);
  const router = useRouter();

  const upperCount = () => {
    if (count < 9) {
      setCount(count + 1);
    }
  };
  const lowerCount = () => {
    if (count > 3) {
      setCount(count - 1);
    }
  };

  const create_room = async () => {
    const data = await lendering(count);
    console.log(data);
    router.push(`/room?room_id=${data.room_id}&user_id=${data.user_id}`);
  };

  return (
    <>
      <p>인원수</p>
      <div>
        <button onClick={lowerCount}>-</button>
        <div>{count}</div>
        <button onClick={upperCount}>+</button>
      </div>
      <button onClick={create_room}>게임 생성</button>
    </>
  );
};

export const lendering = async (user_number = 0) => {
  return await fetch(`http://43.201.59.195/${user_number}`, {
    method: "POST",
    cache: "no-store",
  })
    .then((res) => {
      return res.json();
    })
    .then((json) => json);
};

export default UserCount;
