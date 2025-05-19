import styled from "styled-components";

export const MyinfoDaysStyled = styled.div`
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 100%;

  .chat-section {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  .chat-titleDiv {
    width: 100%;
    display: flex;
    justify-content: space-around;
  }
  .chat-title {
    width: 100%;
    font-weight: bold;
    font-size: 1rem;
    margin-bottom: 0.8rem;
  }
  .chat-bubbleDiv {
    width: 100%;
    display: flex;
    justify-content: space-around;
  }
  .chat-bubble {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
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
  .chat-width100 {
    width: 40%;
  }
  .left {
    border-top-left-radius: 0;
    background-color: rgb(83, 183, 232, 0.3);
  }
  .right {
    border-top-right-radius: 0;
    background-color: rgba(170, 170, 170, 0.2);
  }
  @media (max-width: 1010px) {
    .chat-bubbleDiv {
      display: flex;
      flex-direction: column;
      gap: 50px;
    }
  }
  @media (max-width: 700px) {
    .chat-width100 {
      width: 70%;
    }
  }
  @media (max-width: 450px) {
    .chat-width100 {
      width: 90%;
    }
  }
`;
