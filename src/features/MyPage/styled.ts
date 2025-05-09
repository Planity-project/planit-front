import styled from "styled-components";

export const MypageStyled = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  .mypage-wrap {
    margin: 50px auto;
    width: 90%;
    max-width: 1280px;
    display: flex;
  }
  .mypage-sideBar {
    display: flex;
    flex-direction: column;
    gap: 10px;
    font-size: 18px;
    font-weight: 600;
    width: 20%;
    padding-left: 70px;
    border-right: 1px solid black;
  }
  .mypage-component {
    width: 80%;
    margin-top: 20px;
    padding-left: 150px;
    display: flex;
    justify-content: flex-start;
  }
`;
