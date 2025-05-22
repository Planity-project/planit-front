import styled from "styled-components";
// styled.ts
export const SnsDetailStyled = styled.div`
  position: relative;
  width: 100%;
  height: 90vh; /* 화면 전체 높이 꽉 채움 */
  display: flex;
  overflow: hidden; /* 스크롤 방지 */

  .snspost-mydaysbar {
    width: 350px;
    padding: 8px;
    box-sizing: border-box;
  }
  .snspost-mydaytext {
    padding: 5px;
    font-size: 15px;
    font-weight: 600;
  }

  .snspost-mydayright {
    width: 75%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    box-sizing: border-box;
    position: relative;
  }

  .snspost-whichdiv {
    width: 100%;
    height: 100%;
  }
  .snspost-daysdetail {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 20%;
    position: absolute;
    bottom: 10px;
  }
  .snspost-daydetailbox {
    width: 95%;
    height: 100%;
    border-radius: 10px;
    background-color: white;
    padding: 6px 10px;
    display: flex;
    flex-direction: column;
    gap: 5px;
  }
  .snspost-detailimg {
    border-radius: 5px;
    border: 1px solid rgb(0, 0, 0, 0.2);
  }
  .snspost-daydetailwrap {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .daydetail-name {
    font-size: 13px;
    font-weight: 600;
  }
  .snspost-daydiv {
    font-size: 13px;
    font-weight: 600;
  }
  .daydetail-category {
    font-size: 10px;
    color: gray;
  }
  .daydetail-reviewcomment {
    display: flex;
    align-items: flex-end;
    font-size: 10px;
    gap: 10px;
  }
  .daydetail-review .ant-rate {
    font-size: 14px;
  }
  @media (max-width: 768px) {
    flex-direction: column-reverse;
    align-items: center;
    .snspost-daysdetail {
      display: none;
    }
    .snspost-mydaysbar {
      width: 100%;
      height: 50%;
      padding: 8px;
      box-sizing: border-box;
    }
    .snspost-mydayright {
      width: 100%;
    }
  }
`;
