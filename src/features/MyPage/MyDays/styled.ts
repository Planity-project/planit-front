import styled from "styled-components";

export const MyinfoDaysStyled = styled.div`
  padding: 2rem;
  display: flex;
  justify-content: center;
  width: 100%;

  .chat-box {
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 600px;
    background-color: rgba(83, 183, 232, 0.3);
    padding: 12px;
    border-radius: 8px;
  }

  .chat-titleBox {
    display: flex;
    align-items: center;
    justify-content: space-around;
    margin-bottom: 20px;
    gap: 30px;
  }

  .chat-row {
    display: flex;
    width: 100%;
    padding: 10px;
  }

  .chat-row.left {
    justify-content: flex-start;
  }

  .chat-row.right {
    justify-content: flex-end;
  }

  .chat-bubble {
    position: relative;
    width: 40%;
    padding: 8px 12px;
    background-color: white;
    border-radius: 6px;
    font-size: 0.95rem;
  }

  .chat-row.right .chat-bubble {
    background-color: yellow;
  }

  .chat-date {
    font-size: 0.7rem;
    color: #666;
    text-align: right;
    margin-top: 2px;
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

  .chat-row.right .chat-bubble::before {
    content: "";
    position: absolute;
    top: 0;
    right: -7px;
    width: 0;
    height: 0;
    border-top: 12px solid transparent;
    border-bottom: 12px solid transparent;
    border-left: 14px solid yellow;
  }

  @media (max-width: 600px) {
    .chat-bubble {
      max-width: 85%;
    }
  }
`;
