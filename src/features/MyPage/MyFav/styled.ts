import styled from "styled-components";

export const MyfavStyled = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  .myfav-wrap {
    width: 70%;
    height: 100%;
    position: relative;

    .myfav-title {
      text-align: center;
      font-weight: bold;
      font-size: 1.1rem;
      margin-bottom: 1rem;
    }

    .chat-box {
      display: flex;
      flex-direction: column;
      gap: 15px;
      height: 100%;
      overflow-y: auto;
      padding: 12px;
      background-color: rgba(83, 183, 232, 0.3);
      border-radius: 8px;
      margin-bottom: 20px;
    }

    .chat-bubble {
      max-width: 60%;
      width: 40%;
      padding: 8px 15px;
      border-radius: 10px;
      font-size: 1rem;
      line-height: 1.4;
      position: relative;
      word-wrap: break-word;
      cursor: pointer;
    }

    .left {
      align-self: flex-start;
      background-color: white;
      border-bottom-left-radius: 0;
    }

    .chat-date {
      font-size: 0.75rem;
      color: #666;
      margin-top: 5px;
      text-align: right;
    }

    .AddBanner {
      width: 13%;
      height: 500px;
      position: fixed;
      right: 100px;
      top: 100px;
    }

    @media (max-width: 1400px) {
      .AddBanner {
        width: 16%;
      }
    }

    @media (max-width: 1000px) {
      .AddBanner {
        display: none;
      }
    }

    @media (max-width: 900px) {
      .chat-bubble {
        max-width: 80%;
      }
    }
  }
`;
