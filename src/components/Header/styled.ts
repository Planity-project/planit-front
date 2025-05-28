import styled from "styled-components";

export const HeaderStyled = styled.div`
  display: flex;
  width: 100%;
  height: 70px;
  align-items: center;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  .header-iconwrap {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
    margin-right: 10px;
  }
  .Header-container {
    height: 20%;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0px 50px;
  }
  .Header-alarmIcon {
    margin-top: 3px;
    font-size: 21px;
  }
  .Header-sideIcon {
    font-size: 22px;
  }
  .Header-loginText {
    font-size: 13px;
    font-weight: 400;
    cursor: pointer;
  }
  .Header-logoImg {
    width: 55%;
    height: 50%;
  }
  .Header-sideBox {
    display: flex;
    gap: 20px;
    align-items: center;
    justify-content: center;
  }
  .Header-sideText,
  .Header-logo,
  .Header-alarmIcon,
  .Header-sideImg {
    cursor: pointer;
  }
  .header-sideBarClick {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 25px;
    margin-right: 15px;
  }

  @media (max-width: 1280px) {
    .Header-container {
      margin: 0 30px;
    }
  }
  @media (max-width: 768px) {
    .Header-container {
      margin: 0 20px;
    }
  }
`;
