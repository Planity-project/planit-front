import styled from "styled-components";

export const InviteStyled = styled.div`
  width: 100%;
  height: 69vh;

  display: flex;
  justify-content: center;
  align-items: center;

  .invite-container {
    background-color: white;
    border-radius: 16px;
    padding: 40px 30px;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
    text-align: center;
    max-width: 400px;
    width: 90%;
  }

  .invite-title {
    font-size: 22px;
    font-weight: bold;
    margin-bottom: 24px;
  }

  .invite-album-img {
    width: 100px;
    height: 100px;
    margin: 0 auto 16px auto;
    border-radius: 12px;
    overflow: hidden;
  }

  .invite-album-title {
    font-size: 18px;
    font-weight: 500;
    margin-bottom: 8px;
  }

  .invite-owner {
    font-size: 14px;
    color: #666;
    margin-bottom: 24px;
  }

  .ant-btn {
    width: 100%;
    height: 45px;
    font-size: 16px;
    border-radius: 8px;
    background-color: rgb(83, 183, 232, 0.6);
    color: #191600;
    font-weight: bold;
    border: none;
  }
`;
