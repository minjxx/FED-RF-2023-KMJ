// 보그 PJ 회원가입 페이지 JS - member.js

/********************************************** 
    [ 사용자 입력폼 유효성 검사 ]
    - 이벤트 종류 : blur(포커스가 빠질때 발생)
    - 제이쿼리 이벤트 메서드 :  blur()
    - 이벤트 대상: 
    ->입력요소 중 text(아이디email2제외),password
        form.logF input[type=text][id!=email2],
        form.logF input[type=password],
    -> 요소뒤 대괄호는 속성선택자(CSS원래문법)
    [id!=email2] !=은 같지않다(제이쿼리용문법)

**********************************************/
$(`form.logF input[type=text][id!=email2],
form.logF input[type=password]`)
  // .on('blur',function(){})
  .blur(function () {
    // 1. 현재 블러가 발생한 요소의 아이디는?
    let cid = $(this).attr("id");
    // cid 는 current id 즉, 현재 아이디

    // 모든 공백 제거함수(get rid of Space)
    const groSpace = x => x.replace(/\s/g,'');
    // replace(정규식,바꿀문자)
    // 정규식은 슬래쉬 사이에 표현 : \s 공백문자
    // g는 global 즉, 전역적으로 찾으라는 플래그 문자

    // 2. 현재 블러가 발생한 요소의 값은?
    // 이름입력창(id=='mnm')이면 trim() 나머지는 groSpace()
    // 로 처리하여 공백을 제거한다!
    let cv = 
    cid=='mnm'? 
    $(this).val().trim():
    groSpace($(this).val());
    // 비?집:놀이동산
    
    // 입력창 공백처리후 재입력하기!
    $(this).val(cv);

    console.log("id는?", cid, "/값은?", cv);

    /************************************* 
        3. 빈값 여부 검사하기 (필수입력항목)
    *************************************/
    if (cv == "") {
      //메시지 출력하기
      $(this).siblings(".msg").text("필수입력!")
      .removeClass('on');
    } //////// if //////

    /**************************************** 
        4. 아이디일 경우 유효성 검사
        - 검사기준: 
        영문자로 시작하는 6~20글자 영문자/숫자
    ****************************************/
   else if(cid == 'mid'){
        // console.log('아이디 검사결과:',vReg(cv,cid));
        if(!vReg(cv,cid)){ // 아이디검사 불통과시 들어감(!NOT)
            $(this).siblings('.msg')
            .text('영문자로 시작하는 6~20글자 영문자/숫자')
            .removeClass('on');
        } //////// if ///////
        else{ // 통과시
            // 1. DB에 조회하여 같은 아이디가 있다면
            // '이미 사용중인 아이디입니다' 와 같은 메시지출력
            // 2. 만약 DB조회하여 같은 아이다가 없다면
            // '멋진 아이디네요~!'와 같은 메시지출력
            // 여기서 우선은 DB조회 못하므로 통과시 메시지로 출력
            // 메시지 띄우기
            $(this).siblings('.msg')
            .text('멋진 아이디네요~!')
            .addClass('on');
        } ////// else //////

   } /////////////// else if : 아이디검사 ///////

    /**************************************** 
        5. 비밀번호일 경우 유효성 검사
        - 검사기준: 
        특수문자,문자,숫자포함 형태의 5~15자리
    ****************************************/
   else if(cid == 'mpw'){
        // console.log('비밀번호 검사결과:',vReg(cv,cid));
        if(!vReg(cv,cid)){ // 비밀번호검사 불통과시 들어감(!NOT)
            $(this).siblings('.msg')
            .text('특수문자,문자,숫자포함 형태의 5~15자리');
        } //////// if ///////
        else{ // 통과시            
            // 메시지 지우기
            $(this).siblings('.msg').empty();
        } ////// else //////

   } /////////////// else if : 비밀번호검사 ///////

    /// 모두 통과일 경우 메시지 지우기 ///////
    else {
      $(this).siblings(".msg").empty();
      // empty() - 내용을 지우는 메서드
    } /////// else //////
  }); ///////////////// blur 메서드 /////////////////

  // 비밀번호 글자 보이기/숨기기 셋팅 //////////////
  let eyeNum = 1;
  $('.eye')
  .css({ // 처음상태는 중간줄있고 흐림
        textDecoration:'line-through',
        opacity: 0.5
  })
  .click((e)=>{
    // 1. 글자보이기 타입전환 : type='text|password'
    $('#mpw').attr('type',eyeNum?'text':'password');
    // 2. CSS 디자인 전환 (안보일때는 흐리게 중간줄표시)
    $(e.target).css({
        textDecoration:eyeNum?'none':'line-through',
        opacity: eyeNum ? 1 : 0.5
    })
    // 상태값 전환 (eyeNum이 1이면 0, 0이면 1 할당)
    eyeNum = eyeNum ? 0 : 1;
  })


/*////////////////////////////////////////////////////////
    함수명: vReg (validation with Regular Expression)
    기능: 값에 맞는 형식을 검사하여 리턴함
    (주의: 정규식을 따옴표로 싸지말아라!-싸면문자가됨!)
*/////////////////////////////////////////////////////////
function vReg(val, cid) {
    // val - 검사할값, cid - 처리구분아이디
    console.log("검사:"+val+"/"+cid);

    // 정규식 변수
    let reg;

    // 검사할 아이디에 따라 정규식을 변경함
    switch (cid) {
        case "mid": // 아이디
            reg = /^[a-z]{1}[a-z0-9]{5,19}$/g;
            // 영문자로 시작하는 6~20글자 영문자/숫자
            // /^[a-z]{1} 첫글자는 영문자로 체크!
            // [a-z0-9]{5,19} 첫글자 다음 문자는 영문 또는 숫자로
            // 최소 5글자에서 최대 19글자를 유효범위로 체크!
            // 첫글자 한글자를 더하면 최소 6글자에서 최대 20글자체크!
            break;
        case "mpw": // 비밀번호
            reg = /^.*(?=^.{5,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/;
            // 특수문자,문자,숫자포함 형태의 5~15자리
            // (?=^.{5,15}$) 시작부터 끝까지 전체 5~15자릿수 체크!
            // (?=.*\d) 숫자 사용체크!
            // (?=.*[a-zA-Z]) 영문자 대문자 또는 소문자 사용체크!
            // (?=.*[!@#$%^&+=]) 특수문자 사용체크!
            break;
        case "eml": // 이메일
            reg = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/;
            // 이메일 형식에 맞는지 검사하는 정규식
            break;
    } //////////// switch case문 //////////////////

    // //console.log("정규식:"+reg);

    // 정규식 검사를 위한 JS메서드 
    // -> 정규식.test(검사할값) : 결과 true/false
    return reg.test(val); //호출한 곳으로 검사결과리턴!

} //////////// vReg 함수 //////////////////////////////////
///////////////////////////////////////////////////////////