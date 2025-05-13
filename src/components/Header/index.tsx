import { HeaderStyled } from "./styled";
import logo from "@/assets/images/Planit logo.png";
import Image from "next/image";
import clsx from "clsx";
import sidebar from "@/assets/images/sidebar.png";
import SideBar from "../sidebar/index";
import { useState } from "react";
import { useRouter } from "next/router";
import { useUser } from "@/context/UserContext";
import { BellOutlined } from "@ant-design/icons";
import NotificationModal from "@/components/NotificationModal";

const Header = () => {
  const user = useUser();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [alarmModal, setAlarmModal] = useState(false);
  return (
    <HeaderStyled>
      <div className="Header-container">
        <div className="Header-logo">
          <Image
            onClick={() => {
              router.push("/");
            }}
            className="Header-logoImg"
            src={logo}
            alt="logo"
          />
        </div>
        <div className="Header-sideBox">
          {!user ? (
            <div
              onClick={() => {
                router.push("/loginpage");
              }}
              className="Header-loginText"
            >
              로그인
            </div>
          ) : (
            <>
              <div style={{ position: "relative" }}>
                <div onClick={() => setAlarmModal(true)}>
                  <BellOutlined className="Header-alarmIcon" />
                </div>
                {alarmModal && (
                  <NotificationModal
                    modal={alarmModal}
                    setModal={setAlarmModal}
                  />
                )}
              </div>

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
            </>
          )}
        </div>
      </div>
      <SideBar isOpen={isOpen} setIsOpen={setIsOpen} />
      <NotificationModal modal={alarmModal} setModal={setAlarmModal} />
    </HeaderStyled>
  );
};

export default Header;
