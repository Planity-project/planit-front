import styled from "styled-components";

export const MyinfoStyled = styled.div`
  width: 100%;

  .myinfo-wrap {
    position: relative;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    padding: 1.5rem;
    border-radius: 12px;
    background-color: #fff;
    margin: 0 auto;
  }
  .myinfo-title {
    font-size: 18px;
    font-weight: 700;
  }
  .myinfo-userprofile {
    width: 100%;
    display: flex;
    align-items: center;
    gap: 2rem;
  }
  .myinfo-imgDiv {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    gap: 10px;
  }
  .profile-image-container {
    position: relative;
    width: 100px;
    height: 100px;
    cursor: pointer;
    border-radius: 50%;
    overflow: hidden;
  }
  .profile-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.4);
    color: #fff;
    font-size: 14px;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: opacity 0.3s;
    border-radius: 50%;
  }

  .profile-image-container:hover .profile-overlay {
    opacity: 1;
  }
  .sideBar-userProfile {
    border: 1px solid black;
    border-radius: 50%;
    object-fit: cover;
  }
  .myinfo-btnDiv {
    display: flex;
    justify-content: flex-start;
  }
  .myinfo-useremail,
  .myinfo-logtype,
  .myinfo-nickname,
  .myinfo-usercredit {
    text-align: start;
    gap: 5px;
    display: flex;
    align-items: center;
    font-weight: 500;
    font-size: 14px;
    color: #444;
  }
  .myinfo-detailDiv {
    width: 11%;
  }
  .myinfo-creditlist {
    width: 18%;
    text-align: center;
    font-weight: 600;
    cursor: pointer;
  }

  .myinfo-nickname Input {
    width: 80%;
    text-align: center;
    border-radius: 8px;
    font-weight: 400;
  }
  .myinfo-useremail Input {
    width: 33%;
    text-align: center;
    border-radius: 8px;
    font-weight: 400;
  }

  .myinfo-exit {
    font-size: 12px;
    color: #444;
    font-weight: 300;
  }
  .myinfo-nicknameChange {
    display: flex;
    gap: 10px;
  }
  .custom-input {
    border: none !important;
    border-bottom: 1px solid #ccc !important;
    border-radius: 0 !important;
    box-shadow: none !important;
    outline: none !important;
  }

  .custom-input:focus {
    border-bottom: 1px solid rgb(83, 183, 232, 0.6) !important; /* 포커스 시 파란 밑줄 */
  }
  .ant-btn {
    background-color: rgb(83, 183, 232, 0.6);
    color: white;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
    padding: 16px 16px;
    font-weight: 500;
  }

  .ant-btn:hover {
    background-color: rgb(83, 183, 232, 0.9);
  }

  .AddBanner {
    width: 20%;
    height: 500px;
    position: absolute;
    right: 20px;
  }
  @media (max-width: 1310px) {
    .myinfo-wrap {
      width: 90%;
    }
    .myinfo-detailDiv {
      width: 10%;
    }
    .myinfo-nickname Input {
      width: 60%;
      text-align: center;
      border-radius: 8px;
      font-weight: 400;
    }
    .myinfo-useremail Input {
      width: 36%;
      text-align: center;
      border-radius: 8px;
      font-weight: 400;
    }
  }
  @media (max-width: 1050px) {
    .myinfo-wrap {
      width: 100%;
    }
    .myinfo-detailDiv {
      width: 15%;
    }
    .myinfo-nickname Input {
      width: 70%;
      text-align: center;
      border-radius: 8px;
      font-weight: 400;
    }
    .myinfo-useremail Input {
      width: 45%;
      text-align: center;
      border-radius: 8px;
      font-weight: 400;
    }
    .AddBanner {
      display: none;
    }
  }
  @media (max-width: 800px) {
    .myinfo-wrap {
      width: 100%;
    }
    .myinfo-detailDiv {
      width: 25%;
    }
    .myinfo-nickname Input {
      width: 35%;
      text-align: center;
      border-radius: 8px;
      font-weight: 400;
    }
    .myinfo-useremail Input {
      width: 65%;
      text-align: center;
      border-radius: 8px;
      font-weight: 400;
    }
  }
  @media (max-width: 500px) {
    .myinfo-wrap {
      width: 100%;
      gap: 1rem;
    }

    .myinfo-detailDiv {
      width: 28%;
    }
    .myinfo-nickname Input {
      width: 40%;
      text-align: center;
      border-radius: 8px;
      font-weight: 400;
    }
    .myinfo-useremail Input {
      width: 80%;
      text-align: center;
      border-radius: 8px;
      font-weight: 400;
    }
    .myinfo-useremail,
    .myinfo-nickname {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
    }
  }
  @media (max-width: 400px) {
    .myinfo-detailDiv {
      width: 30%;
    }
    .myinfo-nickname Input {
      width: 40%;
      text-align: center;
      border-radius: 8px;
      font-weight: 400;
    }
    .myinfo-useremail Input {
      width: 95%;
      text-align: center;
      border-radius: 8px;
      font-weight: 400;
    }
    .myinfo-useremail,
    .myinfo-nickname {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
    }
  }
`;
