import styled from "styled-components";

export const AlbumDetailStyled = styled.div`
  margin-top: 100px;
  width: 100%;
  min-height: 35vw;
  display: flex;
  flex-direction: column;
  align-items: center;

  .view-toggle {
    margin-bottom: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    .ant-btn-primary {
      background-color: rgb(83, 183, 232, 0.6);
      border-color: rgb(83, 183, 232, 0.6);
    }
    .ant-btn:hover {
      color: black !important;
      border-color: rgb(0, 0, 0, 0.4) !important;
    }
  }

  .AlbumDetail-photoWrap {
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
    justify-content: center;
    width: 80%;
    max-width: 1280px;
  }

  .AlbumDetail-photoBox {
    position: relative;
    width: 200px;
    height: 200px;
    overflow: hidden;
    cursor: pointer;
    border-radius: 3px;
    border: 1px solid lightgray;
    background-color: #fff;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  }
  .albumdetail-imgslide {
    width: 100%;
    height: 100%;
    display: flex;
    overflow: hidden;
  }
  .AlbumDetail-img {
    object-fit: cover;
    width: 100%;
    height: 100%;
    transition: transform 0.3s ease;
  }

  .AlbumDetail-photoBox:hover .AlbumDetail-overlay {
    opacity: 1;
  }

  .AlbumDetail-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.6);
    color: white;
    opacity: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    transition: opacity 0.3s ease;

    .count-box {
      display: flex;
      gap: 20px;
      align-items: center;

      .icon-text {
        display: flex;
        align-items: center;
        gap: 5px;
        font-size: 18px;
      }
    }
  }
  // 멤버 보기
  .group-member-wrap {
    display: flex;
    gap: 50px;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    padding: 16px;
  }
  .group-changecontainer {
    width: 40%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    border: 1px solid rgb(0, 0, 0, 0.2);
    border-radius: 3px;
  }
  .group-imgdiv {
    width: 100%;
    height: 100%;
    border-bottom: 1px solid rgb(0, 0, 0, 0.4);
    position: relative;
  }
  .group-img {
    width: 100%;
    aspect-ratio: 1/1;
    height: 100%;
  }
  .group-inputdiv {
    width: 100%;
    position: relative;
  }
  .group-membercontainer {
    width: 40%;
  }
  .group-inputdiv Input:hover,
  .group-inputdiv Input:focus {
    border-color: rgb(0, 0, 0, 0.2);
    box-shadow: none;
  }
  .group-inputbtn {
    position: absolute;
    right: 0;
    top: 0;
  }
  .group-inputbtn Button {
    border-color: rgb(83, 183, 232, 0.6);
    background-color: rgb(83, 183, 232, 0.6);
    color: white;
  }
  .group-inputbtn Button:hover,
  .group-inputbtn Button:focus {
    background-color: rgb(83, 183, 232, 0.6);
    border-color: rgb(83, 183, 232, 0.6);
  }
  .group-member-item {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  }
  /* .group-member-nickname {
    width: 40%;
  } */
  .group-member-img {
    border-radius: 50%;
    border: 1px solid rgba(0, 0, 0, 0.4);
  }
  .group-member-proflie {
    display: flex;
    gap: 10px;
    width: 70%;
  }
  .profile-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.4);
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 0;
    cursor: pointer;
    transition: opacity 0.3s ease;
  }

  .group-imgdiv:hover .profile-overlay {
    opacity: 1;
  }
  .AlbumTitle-url {
    width: 70%;
    display: flex;
    justify-content: center;
    text-align: center;
    margin-bottom: 8px;
    background-color: #f0f0f0;
    padding: 5px;
    border-radius: 4px;
    word-break: break-all;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    display: inline-block;
    max-width: 100%;
  }
  .group-member-copybtn {
    display: flex;
    margin-top: 2px;
  }
  .group-member-linkDiv {
    width: 100%;
    display: flex;
    justify-content: center;
    gap: 10px;
  }
  .group-member-text {
    margin-top: 6px;
    font-weight: 500;
  }
  .group-member-url {
    display: flex;
    justify-content: center;
    width: 100%;
    gap: 5px;
  }

  .member-popup-menu {
    cursor: pointer;
    position: absolute;
    background: white;
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 6px;
    z-index: 999;
    right: 0;
    top: 30px;
    min-width: 120px;
  }
  .group-member-nickname {
    width: 100%;
  }
  .ellipsis-menu-trigger {
    width: 5%;
    cursor: pointer;
  }
  .menu-item {
    margin-left: 3px;
    padding: 1px;
    cursor: pointer;
  }
  .group-memberOWNER {
    color: rgb(246, 217, 31);
    font-size: 20px;
  }
  .group-membermember {
    color: black;
  }
  .menu-item:hover {
    border-right: 1px solid rgba(0, 0, 0, 0.4);
  }

  .group-member-item {
    position: relative; /* 중요: 메뉴 위치 기준을 이 박스로 잡음 */
  }
  .group-creditstate {
    font-size: 13px;
    font-weight: 500;
    display: flex;
    justify-content: center;
    margin-top: -20px;
    margin-bottom: 30px;
  }
  .menu-delalbum {
    font-size: 10px;
    width: 100%;
    display: flex;
    justify-content: flex-end;
    margin-top: 50px;
    color: #ccc;
    cursor: pointer;
  }
  @media (max-width: 1000px) {
    .group-member-wrap {
      display: flex;
      flex-direction: column;
      justify-content: center;
      width: 80%;
      padding: 16px;
      gap: 100px;
    }
    .group-changecontainer {
      width: 70%;
      display: flex;
      justify-content: center;
      flex-direction: column;
      align-items: center;
      border: 1px solid rgb(0, 0, 0, 0.2);
      border-radius: 3px;
    }
    .group-membercontainer {
      width: 70%;
    }
    .group-member-text {
      font-size: 12px;
    }
  }
  @media (max-width: 768px) {
    .group-member-wrap {
      display: flex;
      flex-direction: column;
      justify-content: center;
      width: 100%;
      padding: 0px 10px;
    }
    .group-changecontainer {
      width: 100%;
    }
    .group-membercontainer {
      width: 100%;
    }
  }
`;
