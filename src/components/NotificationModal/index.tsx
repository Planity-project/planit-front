import { useEffect, useState } from "react";
import api from "@/util/api";
import { NotificationStyled } from "./styled";
import React from "react";

interface Props {
  modal: boolean;
  setModal: (value: boolean) => void;
}

interface Notification {
  id: number;
  type: "normal" | "album";
  message: string;
  createdAt: string;
}

const NotificationModal = ({ modal, setModal }: Props) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    if (modal) {
      api.get("/notification").then((res) => {
        setNotifications(res.data);
      });
    }
  }, [modal]);

  if (!modal) return null;

  const handleBackgroundClick = () => {
    setModal(false);
  };

  const handleContentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <NotificationStyled onClick={handleBackgroundClick}>
      <div className="notification-modal" onClick={handleContentClick}>
        <div className="notification-header"></div>
        <div className="notification-list">
          {notifications.length === 0 ? (
            <div>알림이 없습니다.</div>
          ) : (
            notifications.map((noti) => (
              <div key={noti.id} className="notification-item">
                {noti.type === "normal" ? (
                  <p>일반: {noti.message}</p>
                ) : (
                  <p>📷 앨범: {noti.message}</p>
                )}
                <small>{new Date(noti.createdAt).toLocaleString()}</small>
              </div>
            ))
          )}
        </div>
      </div>
    </NotificationStyled>
  );
};

export default NotificationModal;
