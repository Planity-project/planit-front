import styled from "styled-components";

export const GenerateStyled = styled.div`
  .container {
    padding: 24px;
    max-width: 800px;
    margin: 0 auto;
    background: #fdfdfd;
    border: 1px solid #ddd;
    border-radius: 8px;
  }

  .header {
    font-size: 24px;
    margin-bottom: 8px;
  }

  .date-range {
    font-size: 16px;
    color: #666;
    margin-bottom: 24px;
  }

  .day-block {
    margin-bottom: 32px;
  }

  .day-title {
    font-size: 20px;
    margin-bottom: 12px;
    color: #333;
  }

  .schedule-list {
    list-style: none;
    padding: 0;
  }

  .schedule-item-box {
    padding: 12px;
    border: 1px solid #ccc;
    border-radius: 6px;
    margin-bottom: 8px;
    background: #fafafa;
  }

  .time {
    font-weight: bold;
    margin-bottom: 4px;
  }

  .title {
    font-size: 16px;
    color: #444;
  }
  .image {
    width: 100px;
    height: 100px;
  }
`;
