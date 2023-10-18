// progress 페이지 JS

// 요구사항1 : 원형 SVG를 각 %를 다르게 하여 숫자%와 함께
// 진행율을 애니메이션 하여 표현한다!

// 1. 대상선정
// 1-1. 버튼 : .act button
const btnAct = $(".act button");
// 1-2. 퍼센트원 : .btns
const btns = $(".btns");
// 1-3. 진행바 : .lineper
const lineper = $('.lineper');

console.log("대상:", lineper);

// 2. 이벤트 설정
// 대상.click() 하면 계속 이벤트 적용되므로
// 대상.one('click',함수) 한번만 이벤트 적용하는 메서드 사용!
// 제이쿼리는 내부적으로 여러요소는 개별적으로 for문으로
// 셋팅하므로 forEach같은 제어를 할 필요가 없다!

btnAct.one('click',function () {

    // 0. 선택버튼 텍스트 읽기
    let btxt = $(this).text();
    console.log('나버튼!', btxt);

    // 1. 버튼별 분기하기 ///
    if (btxt == '팽수1') {
        progFn(0,75);
        progFn(1,15);
        progFn(2,89);
        progFn(3,56);
    } /////// if ////////

    // 두번째 버튼은 내부에서 재귀호출하기!
    else if(btxt == '팽수2'){
        // 0. 바텍스트 요소
        let barTxt = lineper.find('.ltxt b');
        // 1. 퍼센트 수치 증가하기
        let num = barTxt.text();

        // 반복실행부분 함수화하기 ///
        const proBar = () => {
            num++
            // 2. 퍼센트 수치 반영
            barTxt.text(num);    
        }; //////// progBar 함수 ///////

        // 최초호출
        proBar();

        // 재귀호출
        setTimeout(() => {
            if(num<100) proBar();
        },40);
    } // else if /////////////

}); /////// click /////////

/***************************************** 
    함수명 : progFn
    기능 : 퍼센트 증가에 따른 숫자,그래프변경
*****************************************/
function progFn(seq,max){ 
    // seq - 순번, max - 최대%값

    // [1] 숫자 퍼센트 증가
    // 1. 해당순번의 숫자요소
    let ptxt = btns.eq(seq).find('.ptxt');
    // 2. 퍼센트 증가 : 읽어온 숫자를 1씩 증가시킨다!
    let num = ptxt.text(); // 문자형숫자
    num++;
    // 3. 개별숫자 반영하기
    ptxt.text(num);

    // [2] SVG 원 퍼센트 증가
    // 대상 : 선택.btns .c1
    btns.eq(seq).find('.c1').css({
        strokeDashoffset : (300*(100-num)/100)+'%'
    })

    console.log('계산값:',(300*(100-num)/100));

    /* 
        수치계산법:
        전체값 * (100 - 현재퍼센트수치)/100 = 원하는값

        -> 300에서부터 거꾸로 작아져야함!
        -> 퍼센트수치를 큰값에서 작은값으로 가도록함
        [ 100 - 현재퍼센트수치 ]
    */

    // 999. 재귀호출하기 : 기준수보다 작을동안 타임아웃호출
    if(num < max){ // max로 최대한계% 지정
        setTimeout(()=>{
            progFn(seq,max);
        },40);
    } //// if /////

} /////////// progFn 함수 //////////