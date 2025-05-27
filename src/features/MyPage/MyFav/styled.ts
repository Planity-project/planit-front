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

    .chat-row {
      display: flex;
      width: 100%;
      padding: 10px;
    }

    .chat-row.left {
      justify-content: flex-start;
    }

    .chat-bubble {
      position: relative;
      width: 40%;
      padding: 8px 12px;
      background-color: white;
      border-radius: 6px;
      font-size: 0.95rem;
      cursor: pointer;
    }
    .chat-bubble2 {
      position: relative;
      width: 40%;
      padding: 8px 12px;
      background-color: white;
      border-radius: 6px;
      font-size: 0.95rem;
      cursor: pointer;
    }
    .chat-row.left .chat-bubble::before {
      content: "";
      position: absolute;
      top: 0px;
      left: -7px;
      width: 0;
      height: 0;
      border-top: 12px solid transparent;
      border-bottom: 12px solid transparent;
      border-right: 14px solid white;
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
        width: 85%;
      }
      .chat-bubble2 {
        display: none;
      }
    }
  }
`;
