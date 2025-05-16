import styled from "styled-components";

export const AlbumDetailStyled = styled.div`
  margin-top: 100px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  .view-toggle {
    margin-bottom: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
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
    border-radius: 8px;
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
    flex-direction: column;
    justify-content: center;
    width: 25%;
    padding: 16px;
  }

  .group-member-item {
    display: flex;
    justify-content: space-between;
    padding: 12px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
    border-radius: 8px;
    background-color: #fafafa;
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
    width: 30%;
  }
  .AlbumTitle-url {
    display: flex;
    justify-content: center;
    width: 60%;
    margin-bottom: 8px;
    background-color: #f0f0f0;
    padding: 6px;
    border-radius: 4px;
    word-break: break-all;
  }
  .group-member-text {
    margin-top: 6px;
    font-weight: 500;
  }
  .group-member-url {
    display: flex;
    justify-content: center;
    gap: 5px;
  }
  .group-member-copybtn {
    display: flex;
    margin-top: 2px;
  }
  .member-popup-menu {
    position: absolute;
    background: white;
    border: 1px solid #ccc;
    border-radius: 8px;
    padding: 8px;
    z-index: 999;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    right: 0;
    top: 30px;
    min-width: 120px;
  }

  .menu-item {
    padding: 6px 10px;
    cursor: pointer;
  }

  .menu-item:hover {
    background-color: #f0f0f0;
  }

  .group-member-item {
    position: relative; /* 중요: 메뉴 위치 기준을 이 박스로 잡음 */
  }
`;
