// 도깨비 PJ 메인 JS - main.js

// DOM 함수 객체 //////////////
const domFn = {
    // 요소선택함수 ////////
    qs: (x) => document.querySelector(x),
    qsEl: (el, x) => el.querySelector(x),
    qsa: (x) => document.querySelectorAll(x),
    qsaEl: (el, x) => el.querySelectorAll(x),

    // 이벤트셋팅함수
    addEvt: (ele, evt, fn) => ele.addEventListener(evt, fn),
}; /////// domFn 객체 /////////////

// 로딩구역 호출설정
window.addEventListener("DOMContentLoaded", loadFn);

//// 로딩구역 함수 /////////////////
function loadFn() {
    // 로딩확인
    console.log("로딩완료!");

    // 부드러운 스크롤 적용 //////////
    startSS();

    // 부드러운 스크롤 때문에 마우스휠 이벤트막기가
    // 작동되어 캐릭터설명박스 작은 스크롤도 작동안됨!
    // 따라서 이벤트 버블링을 막아줘야함!
    // event.stopPropagation()
    // 이벤트 객체의 이벤트 버블링 막아주는 메서드임!

    // 대상: .desc-box
    let desc_box = document.querySelectorAll(".desc-box");
    console.log(desc_box);

    // 모든 캐릭터 설명박스는 이벤트 버블링 막기!!!
    // -> 여기서 마우스휠 됨!!!
    desc_box.forEach((ele) => {
        // ele - 요소자신
        ele.onwheel = (e) => e.stopPropagation();
    });

    /**************************************** 
      [ 현장포토파트 데이터 구성하기 ]
      - 배열데이터를 이용하여 HTML코드 구성
    ****************************************/
    // 1. 대상선정 : .live-box
    const liveBox = domFn.qs(".live-box");
    console.log("대상:", liveBox);

    // 2. 현장포토 데이터를 기반으로 HTML코드 만들기
    let hcode = "<ul>";

    // 반복코드 만들기 /////
    // 현장포토 데이터 - data_drama.js에서 가져옴
    liveData.forEach((val) => {
        // html변수에 계속 넣기
        hcode += ` <li>
              <figure>
                  <img src="images/live_photo/${val.imgName}.jpg" alt="${val.title}">
                  <figcaption>${val.title}</figcaption>
              </figure>
          </li>
        `;
    }); //////// forEach /////////////

    hcode += "</ul>";

    //   console.log(hcode);

    // 3. 대상박스에 html코드 넣기
    liveBox.innerHTML = hcode;
} ////////// loadFn함수 //////////////
//////////////////////////////////////

//////////////////////////////////////////////
// [ GNB 서브메뉴 셋팅하기 ]
// 구조 : div.smenu > aside.smbx > h2{1차메뉴} + (ul>li>a{2차메뉴})

// 1.대상선정 : .gnb > ul > li
// 서브메뉴 넣을 li는 하위 a요소의 텍스트가 gnbData속성명 1차 메뉴와
// 일치하는 경우 하위 메뉴를 넣어준다!
const gnbList = domFn.qsa('.gnb>ul>li');
console.log('메뉴:',gnbList,'/ 데이터:',gnbData)

// 3. 대상에 하위메뉴 태그 만들기
gnbList.forEach(ele=>{
    // 1. 하위 a요소 텍스트 읽기
    let atxt = domFn.qsEl(ele,'a').innerText;
    // 2. GNB 데이터 읽기
    let gData = gnbData[atxt];
    // console.log('텍스트:',atxt,gData);

    // 3. 해당 서브 데이터가 있을 경우 태그 만들어 넣기
    if(gData){ // 데어터없으면 undefined -> false처리!
        console.log('만들어!',atxt);
    } // if //////
}); //// forEach //////