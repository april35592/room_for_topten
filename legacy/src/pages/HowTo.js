import React, { useRef } from "react";
import "./HowTo.css";

const How_to = ({ how, closeHow }) => {
  const back = useRef();
  const tabBack = (e) => {
    if (e.target === back.current) {
      closeHow();
    }
  };
  if (how) {
    return (
      <div className="howTo" ref={back} onClick={tabBack}>
        <section>
          <article className="howArticle">
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
              탑텐TV의 규칙과 문제는 제공되지 않습니다.
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
            <p>
              ID를 공유받은 다른 플레이어는
              <br />
              Join 탭에서 ID를 입력합니다.
              <br />
              그 후 사전에 정한 자신의 플레이어 순서를 선택한 후<br />
              참여를 클릭합니다.
            </p>
            <p></p>
            <p>
              모두가 방에 알맞게 들어왔다면
              <br />
              디스코드 등의 메신저를 함께 사용하여
              <br />
              게임을 플레이하시면 됩니다.
              <br />
            </p>
          </article>
          <button className="howCloseBtn" onClick={closeHow}>
            닫기
          </button>
        </section>
      </div>
    );
  } else {
    return null;
  }
};

export default How_to;
