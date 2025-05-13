import styled from "styled-components";
export const MainStyled = styled.div`
  font-family: "Noto Sans", sans-serif;

  .main-container {
    display: flex;
    justify-content: space-around;
  }
  .main-titleBox {
    margin-top: 155px;
  }
  .main-title {
    font-size: 65px;
    font-weight: 700;
  }
  .main-title2 {
    font-size: 65px;
    font-weight: 700;
  }
  .main-btnBox {
    margin-top: 50px;
    display: flex;
    gap: 10px;
  }
  .main-gifBox {
    margin-top: 250px;
    font-size: 50px;
  }
  .main-btnBox .ant-btn {
    background-color: black;
    color: white;
    padding: 25px 25px;
    font-size: 20px;
    border-radius: 8px;
    font-weight: 500;
    transition: background-color 0.3s ease, transform 0.2s ease;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  .main-btnBox .ant-btn:hover,
  .main-btnBox .ant-btn:active {
    background-color: rgb(83, 183, 232, 0.6);
    border-color: rgb(83, 183, 232, 0.6);
  }
  @media (max-width: 768px) {
    .main-container {
      display: flex;
      flex-direction: column-reverse;
    }
    .main-gifBox {
      margin-top: 10px;
      font-size: 50px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .main-title {
      text-align: center;
      font-size: 35px;
      font-weight: 700;
    }
    .main-titleBox {
      margin-top: 140px;
    }
    .main-btnBox {
      display: flex;
      justify-content: center;
    }
    .main-btnBox .ant-btn {
      background-color: black;
      color: white;
      padding: 20px 20px;
      font-size: 16px;
    }
  }
`;
