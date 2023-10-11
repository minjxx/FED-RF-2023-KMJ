// 보그 PJ - 공통 모듈 JS : common.js

// DOM 메서드
import dFn from "./dom.js";

// 상단,하단 공통 데이터 불러오기
import tData from "./data/com_module.js";

// 부드러운 스크롤 모듈
import { startSS, setPos } from "./smoothScroll23.js";

// [1] 부드러운 스크롤 적용 //////////
startSS();
// 0. 새로고치면 스크롤바 위치캐싱후 맨위로 이동
setTimeout(() => {
    // 윈도우 스크롤 맨위로!
    window.scrollTo(0, 0);
    // 부드러운 스크롤 위치값 반영!
    setPos(0);
    // 안하면 원래 위치로 스크롤시 튐!
}, 400);
// 0. 스크롤바 트랙을 잡고 위치이동시 위치값 반영
dFn.addEvt(window, "mouseup", () => setPos(window.scrollY));
//////// mouseup /////////////

// 0. 키보드 방향키 이동시 위치값 반영
dFn.addEvt(window, "keyup", () => setPos(window.scrollY));
//////// mouseup /////////////


// [2] 상단/하단 공통모듈 적용하기
// 대상선정: . common-area
const comArea = dFn.qsa(".common-area");

console.log(tData, comArea);

// 상단영역 html 넣기
comArea[0].innerHTML = tData.topArea;
// 하단영역 html 넣기
comArea[1].innerHTML = tData.footerArea;


// [3] 스크롤 액션 적용 대상
// 대상 : 