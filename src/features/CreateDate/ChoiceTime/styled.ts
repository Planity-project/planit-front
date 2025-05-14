import styled from "styled-components";

export const ChioceTimeStyled = styled.div`
  max-width: 800px;
  margin: 0 auto;
  font-family: sans-serif;
  padding: 1rem;
  margin-top: 50px;

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

  /* 일별 행 */
  .day-row {
    display: flex;
    align-items: center;
    padding: 0.75rem 0;

    .date {
      width: 120px;
      font-weight: 500;
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
        margin: 0 0.5rem;
        font-size: 1.2rem;
      }
    }
  }
`;
