// MainArea 컴포넌트

import { Banner } from "../contents/Banner";
import { Character } from "../contents/Character";
import { Main } from "../contents/Main";

export function MainArea(props){
    // cat 속성으로 메뉴분류 전달
    return(
        <main className="cont">
            <Main cat={props.cat} />
        </main>
    )
} /////////// MainArea 컴포넌트 /////////////