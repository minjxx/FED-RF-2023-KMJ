// 도깨비 PJ 메인 JS - main.js

// 모듈 불러오기 ///////
// DOM함수 모듈
import dFn from "./dom.js";
// 부드러운 스크롤 모듈
import { startSS, setPos } from "./smoothScroll23.js";
// 데이터 모듈
import { gridData, gnbData, previewData, clipData, linkData } from "./data_drama.js";

// 부드러운 스크롤 적용 //////////
startSS();

///////////////////////////////
// 모바일적용 여부 코드 ////////
let mob = 0; // 0-DT, 1-모바일
// 모바일 검사함수 /////
const chkMob = () => {
if($(window).width()<=1024)mob=1;
else mob=0;
console.log('모바일?',mob);

// 부가기능 : 모바일일때 서브메뉴 기본 스타일 지우기
if(mob) $('.smenu').attr('style','');

} /////// chkMob함수 ///////

// 모바일 검사함수 최초호출
chkMob();
// 화면 리사이즈 시 모바일 검사함수 호출
$(window).resize(chkMob);
//////////////////////////////////////

///////////////////////////////////
// 모바일시 기능구현 ///////////////
///////////////////////////////////
// 1. 햄버거 버튼 클릭시 메뉴 보이기/숨기기
// 대상: .ham / .header
const hEle = $('.header');
$('.ham').click(()=>{
  hEle.toggleClass('on');

  // is() 메서드 : 선택요소의 이름확인!
  console.log('지금.header에 .on있니?',hEle.is('.on'));
  // 만약 .header.on 이면 body에 스크롤바 숨기기
  if(hEle.is('.on')) 
    $('html,body').css({overflow:'hidden'});
  // 아니면 넣었던 스타일 지우기
  else $('html,body').attr('style','');

}); //////// click ////////////


// 2. 메뉴 클릭시 하위메뉴 보이기 //////
// 대상: .gnb>li
$('.gnb li').click(function(){
  if(!mob) return;//모바일 아니면 나가!
  console.log('나클릭?');
  // 서브메뉴 슬라이드 애니로 보이기/숨기기
  // 대상: .smenu
  $(this).find('.smenu') // 클릭된li 하위 .smenu
  .slideToggle(300,'easeInOutQuad') // 열거나 닫거나함
  .parent() // 부모로 올라감 li
  .siblings().find('.smenu') // 다른 li들 하위 .smenu
  .slideUp(300,'easeInOutQuad') // 스르륵 닫힘! 모두

}); //////////// click ////////////////

// 3. 스티키 메뉴 박스 드래그 하여 움직여보기
// 대상: .dokebi-menu ul
$('.dokebi-menu ul')
.draggable({
  axis:'x', // x축고정
}); /////////// draggable ////////////

//////////////////////////////////////////////



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

// 부드러운 스크롤 때문에 마우스휠 이벤트막기가
// 작동되어 캐릭터설명박스 작은 스크롤도 작동안됨!
// 따라서 이벤트 버블링을 막아줘야함!
// event.stopPropagation()
// 이벤트 객체의 이벤트 버블링 막아주는 메서드임!

// 대상: .desc-box
let desc_box = document.querySelectorAll(".desc-box");
// // console.log(desc_box);

// 모든 캐릭터 설명박스는 이벤트 버블링 막기!!!
// -> 여기서 마우스휠 됨!!!
desc_box.forEach((ele) => {
  // ele - 요소자신
  ele.onwheel = (e) => e.stopPropagation();
});

/**************************************** 
    [ 그리드박스 공통파트 데이터 구성하기 ]
    - 배열데이터를 이용하여 HTML코드 구성
  ****************************************/
// 1. 대상선정 : .grid-box (.live-box/.poster-box)
const gridBox = dFn.qsa(".grid-box");
// // console.log("대상:", gridBox);

// 2. 대상 코드넣기 함수 호출설정하기 ///////
gridBox.forEach((ele, idx) => makeGrid(ele, idx));

// 3. 그리드 스타일 데이터 생성하기 함수
function makeGrid(ele, idx) {
  // ele - 대상요소 / idx - 순번(데이터순번)
  // 1. 현장포토 데이터를 기반으로 HTML코드 만들기
  let hcode = "<ul>";

  // 반복코드 만들기 /////
  // 현장포토 데이터 - data_drama.js에서 가져옴
  gridData[idx].forEach((val) => {
    // html변수에 계속 넣기
    // 폴더경로는 idx가 0이면'live_photo'
    // 1이면'poster_img'로 셋팅함!
    hcode += ` <li>
              <figure>
                  <img src="images/${idx ? "poster_img" : "live_photo"}/${
      val.imgName
    }.jpg" alt="${val.title}">
                  <figcaption>${val.title}</figcaption>
              </figure>
          </li>
        `;
  }); //////// forEach /////////////

  hcode += "</ul>";

  //   // // console.log(hcode);

  // 2. 대상박스에 html코드 넣기
  ele.innerHTML = hcode;
} /////////// makeGrid함수 //////////////

/////////////////////////////
// [ GNB 서브메뉴 셋팅하기 ]
// 구조: div.smenu > aside.smbx > h2{1차메뉴} + (ol>li>a{2차메뉴})

// 1.대상선정 : .gnb > ul > li
// 서브메뉴 넣을 li는 하위 a요소의 텍스트가 gnbData 속성명 1차메뉴와
// 일치하는 경우 하위 메뉴를 넣어준다!
const gnbList = dFn.qsa(".gnb>ul>li");
// // console.log("메뉴:", gnbList, "/데이터:", gnbData);

// 3. 대상에 하위메뉴 태그 만들기
gnbList.forEach((ele) => {
  // 1.하위 a요소 텍스트 읽기
  let atxt = dFn.qsEl(ele, "a").innerText;

  // 2.GNB 데이터 읽기
  let gData = gnbData[atxt];
  // // // console.log('텍스트:',atxt,gData);

  // 3.해당 서브 데이터가 있을 경우 태그 만들어 넣기
  // Array.isArray(gData)로 배열여부를 확인함!
  // 배열값은 태그를 만들어 그자리에 출력: 배열.map().join('')
  if (gData) {
    // 데이터없으면 undefined -> false처리!
    // // console.log("만들어!", atxt);
    ele.innerHTML += `
        <div class="smenu">
          <aside class="smbx">
            <h2>${atxt}</h2>
            <ol>
            ${gData
              .map(
                (val) => `
              <li>
                <a href="#">${val}</a>
              </li>
            `
              )
              .join("")}
            </ol>
          </aside>
        </div>
      `;
  } ////////// if /////////
}); ///////// forEach ////////////

/************************************* 
  [ 상위메뉴 li오버시 하위메뉴 보이기 ]
  이벤트 대상: .gnb>ul>li
  변경 대상: .smenu
*************************************/
// 1. 대상선정
const gnb = dFn.qsa(".gnb>ul>li");

// 2. 이벤트 설정하기
// 이벤트 종류: mouseover / mouseout
gnb.forEach((ele) => {
  // 서브메뉴가 있을때만 이벤트 설정하기!
  // if문에서 undefined/null 은 false처리됨!
  if (dFn.qsEl(ele, ".smenu")) {
    dFn.addEvt(ele, "mouseover", overFn);
    dFn.addEvt(ele, "mouseout", outFn);
  }
});

// 3.함수만들기
function overFn() {
  if(mob)return; // 모바일이면 나감!
  // console.log('오버',this);
  // 1.하위 .smbx 높이값 알아오기
  let hv = dFn.qsEl(this, ".smbx").clientHeight;
  // // console.log("높이:", hv);
  // 2.하위 서브메뉴박스 만큼 .smenu 높이값 주기
  dFn.qsEl(this, ".smenu").style.height = hv + "px";
} //////////// overFn 함수 ////////////

function outFn() {
  if(mob)return; // 모바일이면 나감!
  // // // console.log('아웃',this);
  // 서브메뉴 박스 높이값 0만들기!
  dFn.qsEl(this, ".smenu").style.height = "0px";
} //////////// outFn 함수 ////////////

/////////////////////////////////////
/// 인트로 동영상 클릭시 플레이하기 ////
// 대상: .intro-mv-img
// 이벤트: click
// -> 가상요소 플레이버튼 클릭시
// 이벤트 버블링으로 본 박스가 반응함!

// 1. 대상 선정하기
const mvBox = dFn.qs(".intro-mv-img");

// 2. 이벤트 설정하기
dFn.addEvt(mvBox, "click", showMv);

// 이벤트연결 상태변수(한번만 실행키위한 변수)
let stsShowMv = 0;

// 3. 함수만들기
function showMv() {
  if (stsShowMv) return; // 돌아가!
  stsShowMv = 1; // 한번만실행

  // // console.log('보여줘~!!!!!');
  // 동영상 넣기
  // 대상: 나자신(.intro-mv-img)
  this.innerHTML = `
    <video src='./images/intro_mv.mp4' autoplay controls></video>
  `;

  // 가상요소 플레이버튼 없애기위해 .off지우기
  this.classList.remove("off");
} ///////// showMv 함수 ///////////

/////////////////////////////////////////////
// 오름차순 데이트를 내림차순으로 변경하여 화면에 뿌리기!

// 1. 데이터 정렬 변경하기
let preNewData = previewData.sort((x, y) => {
  // x,y는 배열값 앞뒤를 계속 가지고 들어옴
  // 배열값 중 idx속성값을 가져와서 숫자형변환후 사용
  let a = Number(x.idx);
  let b = Number(y.idx);

  // 배열 순서변경 메서드인 sort() 내부에 return값을
  // 사용하여 순서를 변경한 새로운 배열을 만들어준다!
  return a == b ? 0 : a > b ? -1 : 1;
  // 비?집:(눈?집:놀이동산)
});
// // console.log(preNewData);

// 2. 대상선정: .preview-box>div
const preBox = dFn.qsa(".preview-box>div");
// // console.log(preBox);

// 3. 대상을 순회하여 태그 넣기
// 데이터 : 역순정렬을 한 미리보기 데이터넣기
preBox.forEach((ele, idx) => {
  ele.innerHTML = `
    <div>
      <h3>${preNewData[idx].title}</h3>
      <p>${preNewData[idx].story}</p>
    </div>
  `;
}); //////// forEach ///////////////

///////////////////////////////////////////////
///////// 최신 동영상 영역 데이터 뿌리기 ////////
// 대상: .clip-box
const clipBox = dFn.qs(".clip-box");
// console.log(clipBox);

// 생성할 데이터
let clipCode = "";

// 데이터 매칭하여 태그만들기
// 배열데이터 이므로 forEach사용!
clipData.forEach((val) => {
  clipCode += `
    <li>
      <div class="clip-mv-box">
        <img src="./images/clip_img/${val.idx}.jpg" alt="${val.subtit}">
      </div>
      <h4>${val.subtit}</h4>
      <h3>${val.title}</h3>
    </li>
  `;
}); ////////// forEach /////////

// console.log(clipCode);

// 코드 넣기
clipBox.innerHTML = `<ul>${clipCode}</ul>`;

//////// 최신동영상 파트 이동기능 구현 //////////////
// 1. 요구사항 : 버튼 한번에 한 영상씩 이동
//              양쪽끝에가면 이동중단 해당방향 버튼 사라짐!

// 2. 대상선정
// 2-1. 이벤트 대상 : .btn-box button
const btnClip = dFn.qsa(".btn-box button");

// 2-2. 변경대상 : .clip-box ul
const clipList = dFn.qs(".clip-box ul");

// 3. 변수셋팅 ////////////////////////
// 3-1.리스트 개수
const CNT_LIST = dFn.qsaEl(clipList, "li").length;
// 3-2.화면당 리스트노출 개수
const LIMIT_LIST = 4;
// 3-3.이동 한계수
const LIMIT_MOVE = CNT_LIST - LIMIT_LIST;
// 3-4.이동 단위수 : 간격이동까지 고려한 한번에 이동할 단위 -25.5%
const BLOCK_NUM = 25.5;
// 3-5.이동회수 : 단위만큼 이동할 횟수
let mvNum = 0;

// // console.log(btnClip,clipList,'이동 한계수:',LIMIT_MOVE);

// 4. 이벤트 셋팅하기 ///////////////
btnClip.forEach((ele) => {
  dFn.addEvt(ele, "click", moveClip);
}); //////////// forEach ///////////

// 5. 함수 만들기 ////////////////
function moveClip() {
  // 1. 오른쪽 버튼 여부
  let isR = this.classList.contains("fa-chevron-right");
  // console.log("나야나!", isR);
  // 2. 버튼별 이동분기
  if (isR) {
    // 오른쪽버튼
    // 이동한계수를 체크하여 이동수를 증가시킴
    mvNum++;
    // 마지막한계수를 넘어가면 마지막 수에 고정!
    if (mvNum > LIMIT_MOVE){ 
      // 마지막수 고정
      mvNum = LIMIT_MOVE;
      // 마지막버튼 숨기기
      btnClip[1].style.display = 'none';
    }
    else{
      // 첫번째버튼 보이기
      btnClip[0].style.display = 'block';
    }
  } //////// if ////////
  else {
    // 왼쪽버튼
    // 이동한계수를 체크하여 이동수를 감소시킴
    mvNum--;
    // 첫번째한계수를 넘어가면 0에 고정!
    if (mvNum < 0){ 
      // 0에 고정
      mvNum = 0;
      // 첫번째버튼 숨기기
      btnClip[0].style.display = 'none';
    }
    else{
      // 마지막버튼 보이기
      btnClip[1].style.display = 'block';
    }
  } //////// if ////////

  // 3. 이동반영하기 : - (단위수*이동수) %
  clipList.style.left = -(BLOCK_NUM * mvNum) + "%";
} /////////// moveClip 함수 //////////


///////////////////////////////////////////
// 하단링크 콤보 박스 바인딩하기 ////////////
//////////////////////////////////////////
// 1. 요구사항 - 콤보박스에 맞는 데이터를 바인딩한다
// 2. 데이터 - linkData
// // console.log('하단콤보박스 데이터:',linkData);

// 3. 대상선정 : 바인딩할 콤보박스
// #brand, #corp
const brandBox = dFn.qs('#brand');
const corpBox = dFn.qs('#corp');
// console.log('콤보박스:',brandBox,corpBox);

// 4. 데이터 바인딩하기
// 4-1. 브랜드 바로가기 콤보박스 : 단순바인딩(option만)
// 데이터 대상: linkData.brand

// 내부초기화
brandBox.innerHTML = '';

linkData.brand.forEach(val=>{
  brandBox.innerHTML += 
  `<option value="${val}">${val}</option>`;
}); ///////// forEach ////////

// 4-2. 계열사 바로가기 콤보박스 : 
// -> 복합바인딩(optgroup>option)
// 데이터는 객체형이므로 속성만 모아 배열로 변환하여
// forEach를 사용한다!
const corpData = Object.keys(linkData.corp);

// 내부 초기화
corpBox.innerHTML = '';

// // console.log('계열사 데이터:',corpData);
corpData.forEach(val=>{
  corpBox.innerHTML += `
  <optgroup label="${val}">
    ${linkData.corp[val].map(v=>
      `<option value="${v}">${v}</option>`).join('')}
  </optgroup>
  `;
}); //////////// forEach /////////////

// 내부의 option요소는 배열데이터.map().join('')을 사용!
// 맵쬬잉~!!!
// map() 메서드 리마인딩!
// map()은 배열을 재구성하여 다시 같은 자리에 리턴하여
// 만들어진 새로운 배열을 변수에 담거나 그자리에 리턴한다
// 이때 배열값을 문자열 값으로 변환하는 join()을 사용하여
// 연결자를 빈값으로 처리하면 배열의 구분자 콤마가 없는
// 태그로만 연결된 순수한 태그 결과 문자열이 만들어진다!


/***************************************** 
  [ 복합바인딩 요소 구성형식 ]
  <optgroup label="Swedish Cars">
    <option value="volvo">Volvo</option>
    <option value="saab">Saab</option>
  </optgroup>
*****************************************/

/////////////////////////////////////////////

/// 제이쿼리로 기능구현하기 //////////////////

// 1. 서브컨텐츠 보이기 기능구현 /////////

// (1) 대상선정 : 
// 이벤트 대상 : .sub-view-box 하위 .partbox 또는 li
const subViewBox = 
$('.sub-view-box .partbox,.sub-view-box li');
// 변경대상 : .sub-cont
const subContBox = $('.sub-cont')
// console.log(subContBox);

// (2) 이벤트 함수 만들기 ////////
subViewBox.click(function(){
  console.log('나야나!',this);

  // 1. 제목 읽어오기
  let subTit = 
  $(this).parents('.sub-view-box').prev().text();
  // 나자신.부모들(특정클래스).이전형제().글자읽기();

  // 2. 내용 읽어오기
  let subItem = $(this).text();

  // 3. 서브박스 내용 넣기
  subContBox.html(`
    <button class="cbtn">×</button>
    <div class="sub-inbox inbox">
      <h1>${subTit}</h1>
      <div class="sub-item">
        ${subItem}
      </div>
    </div>
  `);

  // 3. 닫기버튼 이벤트설정
  $('.cbtn').click(()=>subContBox.hide())


  // 999. 서브박스 보이기
  subContBox.show();
}); /////////// click //////////