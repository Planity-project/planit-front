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
import React from "react";
import styled from "styled-components";

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
    background-color: rgba(94, 234, 96, 0.3) !important;
    color: black !important;
    border: none !important;
  }

  .ant-menu-item:focus {
    background-color: rgba(94, 234, 96, 0.3) !important;
    color: black !important;
    border: none !important;
  }
`;

const items: MenuProps["items"] = [
  {
    key: "sub1",
    label: "예약",
    icon: React.createElement(MailOutlined),
  },
  {
    key: "sub2",
    label: "정보 관리",
    icon: React.createElement(SettingOutlined),
  },
  {
    key: "sub3",
    label: "추억 앨범",
    icon: React.createElement(AppstoreOutlined),
    children: [
      { key: "1", label: "시작하기" },
      { key: "2", label: "내 앨범" },
    ],
  },
];

interface SideBarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const SideBar = ({ isOpen, setIsOpen }: SideBarProps) => {
  return (
    <SidebarStyled $isOpen={isOpen}>
      <div className="sideBar-closeBtn">
        <Image
          onClick={() => setIsOpen(false)}
          className="sideBar-btn"
          src={CloseButton}
          alt="closeButton"
        />
      </div>
      <div className="sideBar-container">
        <div className="sideBar-profileBox">
          <div>
            <div>NickName</div>
            <div>연동 계정</div>
          </div>
          <div>프로필</div>
        </div>
        <StyledMenu mode="inline" items={items} />
      </div>
    </SidebarStyled>
  );
};

export default SideBar;
