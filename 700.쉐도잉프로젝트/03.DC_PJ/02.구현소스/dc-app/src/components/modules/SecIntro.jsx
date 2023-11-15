// DC.com 섹션소개 컴포넌트 : SecIntro

// 섹션소개모듈 데이터 가져오기
import { secIntroData } from "../data/set_intro";

// 구조정의: 
// Root > section > img Box + title Box + button Box

export function SecIntro(){

  return(
      <>
        <section className="sec-intro">
          {/* 1. 이미지박스 */}
          <div className="imbx">
            <img src="" alt="" />
          </div>
          {/* 2. 타이틀박스 */}
          <div className="titbx">
            <h3></h3>
            <h2></h2>
          </div>
          {/* 3. 버튼박스 */}
          <div className="btnbx">
            <button></button>
          </div>
        </section>
      </>
  );

} ////////////// SecIntro 컴포넌트 ///////////