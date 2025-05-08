import { SidebarStyled } from "./styled";
import CloseButton from "@/assets/images/close.png";
import Image from "next/image";
import { Menu } from "antd";
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import React, { useEffect } from "react";
import styled from "styled-components";
import { useUser } from "@/context/UserContext";
import { useRouter } from "next/router";
import api from "@/util/api";

// Menu 항목을 스타일링하기 위한 스타일 컴포넌트 정의
const StyledMenu = styled(Menu)`
  .ant-menu-item-selected::after {
    display: none !important; /* ::after 요소 완전 제거 */
    opacity: 0 !important; /* 혹시 모르니 투명도도 제거 */
    transform: none !important;
  }

  .ant-menu-inline .ant-menu-selected::after {
    display: none !important;
    opacity: 0 !important;
    transform: none !important;
  }
  .ant-menu-submenu-title {
    color: black !important;
  }
  .ant-menu-submenu-arrow::after {
    color: black;
  }
  .ant-menu-item {
    transition: background-color 0.3s ease, color 0.3s ease;
    background-color: transparent !important;
    color: black !important;
  }

  .ant-menu-item-selected {
    background-color: transparent !important;
    color: black !important;
  }

  .ant-menu-item:hover {
    background-color: rgb(83, 183, 232, 0.6) !important;
    color: black !important;
    border: none !important;
  }

  .ant-menu-item:focus {
    background-color: rgb(83, 183, 232, 0.6) !important;
    color: black !important;
    border: none !important;
  }
`;

const items: MenuProps["items"] = [
  {
    key: "sub1",
    label: "내 일정",
    icon: React.createElement(MailOutlined),
  },
  {
    key: "sub2",
    label: "내 정보",
    icon: React.createElement(SettingOutlined),
  },
  {
    key: "sub3",
    label: "추억 앨범",
    icon: React.createElement(AppstoreOutlined),
  },
];

interface SideBarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const SideBar = ({ isOpen, setIsOpen }: SideBarProps) => {
  const router = useRouter();
  const user = useUser();
  const logout = () => {
    api.get("auth/logout").then((res) => {
      window.location.reload();
    });
  };
  return (
    <SidebarStyled $isOpen={isOpen}>
      <div className="sideBar-closeBtn">
        <Image
          onClick={() => setIsOpen(false)}
          className="sideBar-btn"
          src={CloseButton}
          alt="closeButton"
          priority
        />
      </div>
      <div className="sideBar-container">
        <div className="sideBar-profileBox">
          <div>
            <div className="sideBar-nickName">{user?.nickname}님</div>
            <div>연동 계정</div>
          </div>
          <div>프로필</div>
        </div>
        <StyledMenu
          mode="inline"
          items={items}
          onClick={({ key }) => {
            if (key === "sub3") router.push("/album"); // 시작하기
            // if (key === "2") router.push("/my-album");
            // if (key === "sub1") router.push("/schedule");
            // if (key === "sub2") router.push("/profile");
          }}
        />
        <div className="sideBar-logoutText" onClick={logout}>
          로그아웃
        </div>
      </div>
    </SidebarStyled>
  );
};

export default SideBar;
