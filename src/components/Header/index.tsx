import { HeaderStyled } from "./styled";
import logo from "@/assets/images/Planit logo.png";
import Image from "next/image";
import sidebar from "@/assets/images/sidebar.png";
import SideBar from "../sidebar/index";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useUser } from "@/context/UserContext";
import NotificationPopover from "@/components/NotificationPopover";
import api from "@/util/api";
interface Notification {
  id: number;
  type: "ALBUM" | "TRIP" | "POST" | "REPORT";
  targetId?: number;
  content: string;
  createdAt: string;
  isRead: boolean;
  extra?: {
    reportedUserNickname?: string;
    reportCount?: number;
  };
}

const Header = () => {
  const { user } = useUser();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchNotifications = async () => {
    setLoading(true);
    try {
      const res = await api.get<Notification[]>("/notifications");
      setNotifications(res.data);
    } catch (error) {
      console.error("알림 로딩 실패:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchNotifications();
    }
  }, [user]);

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
              <NotificationPopover
                notifications={notifications}
                setNotifications={setNotifications}
                loading={loading}
                setLoading={setLoading}
                fetchNotifications={fetchNotifications}
              />

              <div
                className="Header-sideText"
                onClick={() => {
                  router.push("/mypage/2");
                }}
              >
                내 일정
              </div>

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
    </HeaderStyled>
  );
};

export default Header;
