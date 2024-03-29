import React, { useRef } from 'react';
import { Div, Article } from './styles';

interface Props {
  closeHow: () => void;
}

const HowTo = ({ closeHow }: Props) => {
  const back = useRef() as React.MutableRefObject<HTMLDivElement>;

  const tabBack = (e: React.MouseEvent) => {
    if (e.target === back.current) {
      closeHow();
    }
  };

  return (
    <Div ref={back} onClick={tabBack}>
      <section>
        <Article>
          <h2>How To?</h2>
          <p>
            해당 프로그램은
            <br />
            보드게임 탑텐TV를 온라인에서도 즐길 수 있도록
            <br />
            1부터 10까지의 숫자 카드의
            <br />
            셔플과 분배를 도와주기 위한 도구입니다.
            <br />
          </p>
          <p>
            되도록 본 게임을 구매한 후 즐기시길 권장하며,
            <br />
            탑텐TV의 문제는 제공되지 않습니다.
          </p>
          <p></p>
          <p>
            선 플레이어는
            <br />
            create 탭에서 인원수를 설정 후 게임을 생성합니다.
            <br />
            그 후, 화면 하단의 ID 박스를 클릭하면
            <br />
            해당 게임의 ID가 복사가 되며,
            <br />이 아이디를 함께 플레이하는 사람들과 공유합니다.
          </p>
          <p></p>
          <p>해당 프로그램은 340x480px 이상의 화면에서만 지원됩니다.</p>
        </Article>
        <button className="howCloseBtn" onClick={closeHow}>
          닫기
        </button>
      </section>
    </Div>
  );
};

export default HowTo;
