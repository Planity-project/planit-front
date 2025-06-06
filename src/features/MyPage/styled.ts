import styled from "styled-components";

export const MypageStyled = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;

  .mypage-wrap {
    margin: 50px auto;
    padding: 24px;
    width: 100%;
    max-width: 1280px;
    display: flex;
  }
  .mypage-sideBar {
    display: flex;
    flex-direction: column;
    gap: 10px;
    font-size: 18px;
    font-weight: 600;
    width: 15%;
    height: 80vh;
    border-right: 1px solid black;
  }
  .mypage-component {
    width: 85%;
    padding-left: 100px;
    display: flex;
    justify-content: flex-start;
  }
  .mypage-sideBar div {
    font-weight: normal;
    color: #888;
    cursor: pointer;
    transition: all 0.2s;
  }

  .mypage-sideBar div.active {
    font-weight: bold;
    color: #000; /* 원하는 진한 색상 */
  }
  @media (max-width: 1024px) {
    .mypage-sideBar {
      display: flex;
      flex-direction: column;
      gap: 10px;
      font-size: 16px;
      font-weight: 600;
      border-right: 1px solid black;
    }
  }
  @media (max-width: 650px) {
    .mypage-sideBar {
      display: flex;
      flex-direction: column;
      gap: 10px;
      font-size: 13px;
      font-weight: 600;
      width: 20%;
      border-right: 1px solid black;
    }
    .mypage-component {
      width: 80%;
      padding-left: 20px;
      display: flex;
      justify-content: flex-start;
    }
  }
`;
