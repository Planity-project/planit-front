import styled from "styled-components";

export const AlbumTitleStyled = styled.div`
  .AlbumTitle-title {
    width: 100%;
    text-align: center;
    font-size: 18px;
    font-weight: 500;
  }
  .AlbumTitle-titleBox {
    margin-top: 20px;
    display: flex;
    align-items: baseline;
    justify-content: center;

    gap: 10px;
  }
  .AlbumTitle-upload {
    margin-top: 20px;
  }
  .AlbumTitle-inputDiv {
    width: 70%;
    margin-top: 20px;
    display: flex;
    justify-content: center;
  }
  .AlbumTitle-inputDiv .ant-input {
    padding: 10px 10px;
    width: 100%;
    border: none !important;
    box-shadow: none !important;
    outline: none !important;
    background-color: lightgray; /* 필요시 배경 추가 */
  }

  .AlbumTitle-inputDiv .ant-input:hover,
  .AlbumTitle-inputDiv .ant-input:focus {
    border: none !important;
    box-shadow: none !important;
    outline: none !important;
  }
  .AlbumTitle-inputDiv .ant-input::placeholder {
    color: #888;
    opacity: 1;
  }
  .AlbumTitle-btnDiv {
    margin-top: 12px;

    display: flex;
    justify-content: flex-end;
  }
  .AlbumTitle-btnDiv Button {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgb(83, 183, 232, 0.6);
    border-radius: 5px;
    color: white;
    border: none;
    padding: 20px 20px;
  }
  .AlbumTitle-inviteDiv {
    width: 100%;
    height: 50px;
    margin-top: 30px;
    text-align: center;
    display: flex;
    justify-content: center;
    gap: 10px;
  }
  .AlbumTitle-inviteDiv Button,
  .AlbumTitle-createbtn Button {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgb(83, 183, 232, 0.6);
    border-radius: 5px;
    color: white;
    border: none;
    padding: 20px 20px;
  }
  .AlbumTitle-url {
    width: 70%;
    margin-bottom: 8px;
    background-color: #f0f0f0;
    padding: 8px;
    border-radius: 4px;
    word-break: break-all;
  }
  .AlbumTitle-createbtn {
    margin-top: 20px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
