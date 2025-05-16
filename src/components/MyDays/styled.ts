import styled from "styled-components";

export const MyDaysStyled = styled.div`
  overflow-y: scroll;
  position: relative;
  height: 100%;
  .days-bigBox {
    padding-bottom: calc(var(--vh, 1vh) * 90);
  }
  .plan-item {
    display: flex;
    gap: 21px;
    padding: 6px 20px 6px 24px;
    width: 100%;
    margin-bottom: 10px;
    margin-top: 20px;
  }
  .plan-dayDiv {
    font-size: 15px;
    font-weight: 600;
    margin-bottom: 5px;
    margin-left: 17px;
  }

  .plan-numberDiv {
    display: flex;
    gap: 10px;
    font-size: 13px;
    align-items: center;
  }
  .plan-text {
    border-radius: 6px;
    padding: 10px 15px;
    width: 80%;
    box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.1);
  }
  .plan-timeDiv {
    display: flex;
    flex-direction: column;
  }
  .plan-time {
    font-size: 12px;
    color: rgba(2, 2, 2, 0.66);
  }
  .plan-number {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 20px;
    height: 20px;
    background-color: rgb(151, 95, 255);
    border-radius: 50%;
    text-align: center;
    color: white;
    font-size: 11px;
    font-weight: 600;
    line-height: 20px;
    user-select: none;
  }
  .plan-category {
    font-size: 12px;
    font-weight: 600;
  }
  .paln-name {
    font-size: 14px;
    font-weight: 600;
    margin-bottom: 2px;
  }
  .plan-line {
    content: "";
    width: 2px;
    height: calc(100% + 14px);
    background-color: rgb(245, 245, 245);
    position: absolute;
    top: -6px;
    left: 33px;
    z-index: -1;
  }
  .sticky-day-title {
    margin-bottom: 10px;
    position: sticky;
    top: 0;
    background-color: white;
    z-index: 999;
    font-weight: bold;
    font-size: 20px;
    padding: 10px;
    border-bottom: 1px solid #ccc;
  }
  .plan-item.active {
    background-color: rgb(54, 143, 255, 0.06); /* 원하는 색상 */

    transition: background-color 0.3s ease;
  }
  /* Webkit 스크롤바 전체 영역 */
  &::-webkit-scrollbar {
    width: 3px; /* 세로 스크롤 너비 */
  }

  /* 스크롤바 손잡이 */
  &::-webkit-scrollbar-thumb {
    background-color: rgba(188, 188, 188, 0.72);
    border-radius: 10px;
  }

  /* 스크롤바 트랙(배경) */
  &::-webkit-scrollbar-track {
    background-color: white;
  }
`;
