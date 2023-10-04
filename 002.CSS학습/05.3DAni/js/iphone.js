// 움직이는 폰 + 무한글자이동 JS - iphone.js

// DOM 메서드 
import dFn from './dom.js';

/******************************************** 
    [ 아이폰 영역오버시 회전기능 ]
    1. 화면에 10등분된 투명 영역을 구현
    2. 이 영역이 이벤트 대상이 됨
    3. 오버시 변경대상인 아이폰에 회전값 변경
    4. 트랜지션으로 애니메이션 설정적용!
    5. 애니메이션 후에 이벤트박스를 보이게함
    (최초 width:0 -> width:100vw)
********************************************/

// 0.데이터 셋팅 : x,y축 회전 각도를 배열에 셋팅!
const iDeg = [
    // 상단영역
    [20,60],
    [20,30],
    [20,0],
    [20,-30],
    [20,-60],
    // 하단영역
    [-20,60],
    [-20,30],
    [-20,0],
    [-20,-30],
    [-20,-60],
];

// 1. 대상선정
// 1-1.이벤트 대상: .evt-box div
const evtBox = dFn.qsa('.evt-box div');
// 1-2.변경대상: .iphone
const iphone = dFn.qs('.iphone');

console.log('대상:',evtBox,iphone);

// 2. 이벤트설정
evtBox.forEach(ele=>dFn.addEvt(ele,'mouseenter',seeMe));

// 3. 함수 만들기 ///////////////////////
function seeMe(){
    console.log('나를봐!',this);
} ///////// seeMe 함수 /////////