import styled from "styled-components";

export const MyfavStyled = styled.div`
  width: 100%;

  .myfav-wrap {
    width: 100%;
    height: 100%;
    position: relative;

    .myfav-title {
      width: 100%;
      font-weight: bold;
      font-size: 1rem;
      margin-bottom: 0.5rem;
    }

    .myfav-bubbleDiv {
      display: flex;
      flex-direction: column;
      gap: 10px;
      margin-top: 20px;
    }
    .chat-bubble {
      background-color: rgb(83, 183, 232, 0.3);
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      width: 30%;
      padding: 10px;
      border-radius: 1rem;
      position: relative;
      font-size: 0.95rem;

      .chat-date {
        font-size: 0.8rem;
        color: #777;
        text-align: right;
      }
    }
    .left {
      border-top-left-radius: 0;
      background-color: rgb(83, 183, 232, 0.3);
    }
    .AddBanner {
      width: 13%;
      height: 500px;
      position: fixed; /* fixed로 변경 */
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
        width: 50%;
      }
    }
    @media (max-width: 900px) {
      .chat-bubble {
        width: 70%;
      }
    }
  }
`;
