import { useState } from "react";
import { Popover, Spin } from "antd";
import { BellOutlined } from "@ant-design/icons";
import api from "@/util/api";
import { NotificationStyled } from "./styled";

interface Notification {
  id: number;
  type: "normal" | "album";
  message: string;
  createdAt: string;
}

const NotificationPopover = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const fetchNotifications = async () => {
    setLoading(true);
    try {
      const res = await api.get("/notification");
      setNotifications(res.data);
    } catch (err) {
      console.error("알림 조회 실패:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleVisibleChange = (visible: boolean) => {
    setOpen(visible);
    if (visible) {
      fetchNotifications();
    }
  };

  const content = (
    <NotificationStyled>
      <div className="notification-list">
        {loading ? (
          <Spin />
        ) : notifications.length === 0 ? (
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
    </NotificationStyled>
  );

  return (
    <Popover
      content={content}
      trigger="click"
      open={open}
      onOpenChange={handleVisibleChange}
      placement="bottom"
    >
      <BellOutlined className="Header-alarmIcon" />
    </Popover>
  );
};

export default NotificationPopover;
