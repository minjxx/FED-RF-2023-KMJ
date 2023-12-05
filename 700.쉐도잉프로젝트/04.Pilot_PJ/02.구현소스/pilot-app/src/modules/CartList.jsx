// Pilot PJ 장바구니 리스트 컴포넌트

// 장바구니 리스트 CSS 불러오기
import "../css/cartlist.css";

export function CartList() {
  return (
    <>
      <section id="cartlist">
        <a href="#" className="cbtn cbtn2">
          <span>닫기버튼</span>
        </a>
        <table>
          <caption>
            <h1> 카트 리스트</h1>
          </caption>
          <tbody>
            <tr>
              <th>상품</th>
              <th>번호</th>
              <th>상품명</th>
              <th>상품코드</th>
              <th>단가</th>
              <th>수량</th>
              <th>합계</th>
              <th>삭제</th>
            </tr>

            <tr>
              <td>
                <img src="images/goods/style/m8.png" alt="item" />
              </td>
              <td>1</td>
              <td>[스타일]베이직 솔리드 래쉬가드</td>
              <td>DMSW15731-BK </td>
              <td>49,000원</td>
              <td>1</td>
              <td>49,000원</td>
              <td>
                <button className="cfn" data-idx="4">
                  ×
                </button>
              </td>
            </tr>

            <tr>
              <td colspan="6">총합계 :</td>
              <td>49,000원</td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </section>
    </>
  );
} ///////// CartList 컴포넌트 //////////
