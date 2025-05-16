import styled from "styled-components";
// styled.ts
export const SnsDetailStyled = styled.div`
  position: relative;
  width: 100%;
  height: 90vh; /* 화면 전체 높이 꽉 채움 */
  display: flex;
  overflow: hidden; /* 스크롤 방지 */

  .snspost-mydaysbar {
    width: 25%;
    padding: 8px;
    box-sizing: border-box;
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
    width: 90%;
    height: 100%;
    border-radius: 10px;
    background-color: white;
  }
`;
