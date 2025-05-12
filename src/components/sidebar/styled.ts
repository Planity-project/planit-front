import styled from "styled-components";

export const SidebarStyled = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  right: 0;
  height: 100vh;
  width: 250px;
  background-color: white;
  box-shadow: -2px 0 5px rgba(0, 0, 0, 0.1);
  transform: translateX(${(props) => (props.$isOpen ? "0" : "100%")});
  transition: transform 0.3s ease-in-out;
  z-index: 1000;
  padding: 20px;

  .sideBar-closeBtn {
    position: relative;
    top: 0;
    left: 180px;
  }
  .sideBar-container {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }
  .sideBar-profileBox {
    margin-left: 20px;
    display: flex;
    gap: 40px;
    align-items: center;
  }
  .sideBar-logoutText {
    font-size: 12px;
    margin-top: 40px;
    text-align: center;
    cursor: pointer;
  }
  .sideBar-loginType {
    font-weight: 500;
    font-size: 10px;
    text-align: center;
  }
  .sideBar-userProfile {
    border: 1px solid black;
    border-radius: 50%;
  }
`;
