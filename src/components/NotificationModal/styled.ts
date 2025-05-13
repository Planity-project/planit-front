import styled from "styled-components";

export const NotificationStyled = styled.div`
  position: fixed;
  top: 60px; /* 헤더 바로 아래로 위치 (헤더 높이만큼 조절) */
  left: 0;
  width: 177%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  z-index: 1000;
  background: transparent;

  .notification-modal {
    position: relative;
    background: white;
    width: 300px;
    max-height: 500px;
    border-radius: 10px;
    padding: 15px;
    overflow-y: auto;
    border: 1px solid rgba(0, 0, 0, 0.2);
    margin-top: 10px; /* 꼬리와 간격 확보 */

    /* 꼬리 (말풍선 삼각형) */
    &::before {
      content: "";
      position: absolute;
      top: -10px;
      left: 50%;
      transform: translateX(-50%);
      width: 0;
      height: 0;
      border-left: 10px solid transparent;
      border-right: 10px solid transparent;
      border-bottom: 10px solid white;
    }

    &::after {
      content: "";
      position: absolute;
      top: -11px;
      left: 50%;
      transform: translateX(-50%);
      width: 0;
      height: 0;
      border-left: 10px solid transparent;
      border-right: 10px solid transparent;
      border-bottom: 10px solid rgba(0, 0, 0, 0.2);
      z-index: -1;
    }
  }

  .notification-header {
    margin-bottom: 5px;
    font-weight: bold;
  }

  .notification-item {
    margin-bottom: 10px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    padding-bottom: 5px;
  }
`;
