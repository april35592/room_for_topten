import { patchname } from '@apis/patchname';
import React, { useState, useEffect, useRef } from 'react';

const MyName = ({ user_id = '' }) => {
  const [user_name, setName] = useState('');
  const [edit_mode, setMode] = useState(false);
  const input = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (input.current) {
      input.current.focus();
    }
  }, [edit_mode]);

  const handleBlur = () => {
    if (user_name) {
      setMode(false);
      patchname(user_id, user_name);
    } else {
      if (input.current) {
        input.current.focus();
      }
    }
  };

  return (
    <>
      {edit_mode ? (
        <form>
          <input
            value={user_name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            onBlur={handleBlur}
            placeholder="닉네임을 입력해주세요"
            ref={input}
          />
        </form>
      ) : (
        <span
          onClick={() => {
            setMode(true);
          }}
        >
          {user_name ? user_name : '클릭하여 수정'}
        </span>
      )}
    </>
  );
};

export default MyName;
