import styled from "styled-components";

export const ChioceTimeStyled = styled.div`
  width: 100%;
  margin: 50px auto 0 auto;
  padding: 10px;
  font-family: sans-serif;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;

  /* display: flex;
  flex-direction: column;
  align-items: center; */

  /* 헤더 */
  h1 {
    font-size: 2rem;
    margin-bottom: 0.5rem;
  }
  h4 {
    font-size: 1rem;
    color: #555;
    display: flex;
    align-items: center;
    svg {
      margin-left: 0.5rem;
    }
  }

  /* 탭바 */
  .tab-bar {
    display: flex;
    gap: 1rem;
    margin: 1rem 0;

    button {
      flex: 1;
    }
  }

  /* 여행시간 요약 */
  .summary {
    border-radius: 4px;
    margin-bottom: 1rem;

    span {
      color: rgb(83, 183, 232, 1);
      margin-left: 0.5rem;
    }
  }

  /* 시작시간, 종료시간 */
  .start-endpoint {
    display: flex;
    gap: 140px;
    margin-top: 30px;
    margin-left: 120px;
  }

  .time-block {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    font-weight: bold;
    font-size: 15px;
  }

  /* 버튼 */
  .choice-btnDiv {
    margin-top: 20px;
    width: 100%;
    display: flex;
    justify-content: end;
  }

  .choice-btnDiv Button {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgb(83, 183, 232, 0.6);
    border-radius: 5px;
    color: white;
    border: none;
    padding: 20px 20px;
  }

  /* 일별 행 */
  .day-row {
    display: flex;
    align-items: center;
    padding: 0.55rem 0;
    margin-top: 10px;
    gap: 20px;

    .date {
      font-weight: bold;
    }

    .times {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      flex: 1;

      .ant-picker {
        width: 110px;
      }

      span {
        font-size: 1.2rem;
      }
    }
  }

  @media (max-width: 500px) {
    .time-block {
      font-size: 12px !important;
    }
    .day-row {
      display: flex;
      flex-direction: column;
    }
    .start-endpoint {
      display: flex;
      gap: 160px;
      margin-top: 30px;
      margin-left: 50px;
    }
    .date {
      width: 90%;
    }
  }
`;
