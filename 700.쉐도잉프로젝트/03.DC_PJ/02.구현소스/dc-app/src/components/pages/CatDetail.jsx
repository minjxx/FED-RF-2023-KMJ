// DC PJ 캐릭터 상세페이지
// -> 캐릭터 리스트로 부터 라우팅 이동하여 보이는 페이지

import { Banner } from "../modules/Banner";
import { useLocation } from "react-router-dom";

export function CatDetail(){
  // 라우터 호출시 전달한 값을 받는다!
  // 라우터 전달값을 받기위해 useLocation 생성하기!
  const loc = useLocation();

  // 1. 캐릭터 이름
  const cname="";

  return(
    <>
      {/* 배너 컴포넌트 */}
      <Banner category={cname} />
    </>
  )

} ////////// CatDetail 컴포넌트 ///////////