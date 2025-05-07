import { HeaderStyled } from "./styled";
import logo from "@/assets/images/Planit logo.png";
import Image from "next/image";
import clsx from "clsx";
import sidebar from "@/assets/images/sidebar.png";
import SideBar from "../sidebar/index";
import { useState } from "react";
const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <HeaderStyled>
      <div className="Header-container">
        <div className="Header-logo">
          <Image className="Header-logoImg" src={logo} alt="logo" />
        </div>
        <div className="Header-sideBox">
          <div className="Header-sideText">내 일정</div>
          <div className="Header-sideBar">
            <Image
              onClick={() => {
                setIsOpen(true);
              }}
              className="Header-sideImg"
              src={sidebar}
              alt="menu"
            />
          </div>
        </div>
      </div>
      <SideBar isOpen={isOpen} setIsOpen={setIsOpen} />
    </HeaderStyled>
  );
};

export default Header;
