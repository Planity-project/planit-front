import styled from "styled-components";

export const LoginStyled = styled.div`
  width: 100%;
  height: 56vh;
  .login-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 100px;
    padding: 20px;
  }

  .login-title {
    font-size: 30px;
    font-weight: 700;
    margin-bottom: 40px;
    text-align: center;
  }

  .login-form {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .login-buttons {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .login-logo {
    width: 250px;
    margin: 10px 0;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
    background-color: #fff;
    font-size: 18px;
    font-weight: 500;
    padding: 10px 16px;
  }

  .kakao-logo {
    height: 60px;
  }

  .google-logo {
    border: 1px solid #dadce0;
  }

  .google-logo img {
    width: 30px !important;
    height: 30px !important;
    margin-right: 20px;
  }

  @media (max-width: 768px) {
    .login-title {
      font-size: 30px;
    }

    .login-logo {
      width: 180px;
    }
  }
`;
