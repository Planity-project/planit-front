import { useState } from "react";
import { Popover, Spin } from "antd";
import { BellOutlined } from "@ant-design/icons";
import api from "@/util/api";
import { NotificationStyled } from "./styled";
import { useRouter } from "next/router";

interface Notification {
  id: number;
  type: "album" | "schedule" | "post" | "report";
  targetId?: number;
  message: string;
  createdAt: string;
  isRead: boolean;
}

const categories = ["전체", "게시글", "일정", "앨범", "신고"] as const;
type Category = (typeof categories)[number];

const NotificationPopover = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category>("전체");

  const fetchNotifications = async () => {
    setLoading(true);
    try {
      const res = await api.get("/notifications");
      setNotifications(res.data);
    } catch (error) {
      console.error("알림 로딩 실패:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleNotificationClick = async (noti: Notification) => {
    try {
      if (!noti.isRead) {
        await api.patch(`/notifications/${noti.id}/read`);
        setNotifications((prev) =>
          prev.map((n) => (n.id === noti.id ? { ...n, isRead: true } : n))
        );
      }

      switch (noti.type) {
        case "post":
          if (noti.targetId) router.push(`/posts/${noti.targetId}`);
          break;
        case "schedule":
          if (noti.targetId) router.push(`/schedules/${noti.targetId}`);
          break;
        case "album":
          if (noti.targetId) router.push(`/albums/${noti.targetId}`);
          break;
        case "report":
          if (noti.targetId) router.push(`/reports/${noti.targetId}`);
          break;
      }
    } catch (error) {
      console.error("알림 처리 실패:", error);
    }
  };

  const handleVisibleChange = (visible: boolean) => {
    setOpen(visible);
    if (visible) {
      fetchNotifications();
    }
  };

  const filteredNotifications = notifications.filter((noti) => {
    if (selectedCategory === "전체") return true;
    if (selectedCategory === "게시글") return noti.type === "post";
    if (selectedCategory === "일정") return noti.type === "schedule";
    if (selectedCategory === "앨범") return noti.type === "album";
    if (selectedCategory === "신고") return noti.type === "report";
    return false;
  });

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((noti) => ({ ...noti, isRead: true })));
  };

  const content = (
    <NotificationStyled>
      <div className="notification-header">
        {categories.map((category) => (
          <button
            key={category}
            className={`tab ${selectedCategory === category ? "active" : ""}`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
        <button className="mark-all-read" onClick={markAllAsRead}>
          모두 읽음 표시
        </button>
      </div>

      <div className="notification-list">
        {loading ? (
          <Spin />
        ) : filteredNotifications.length === 0 ? (
          <div className="empty">알림이 없습니다.</div>
        ) : (
          filteredNotifications.map((noti) => (
            <div
              key={noti.id}
              className={`notification-item ${noti.isRead ? "read" : "unread"}`}
              onClick={() => handleNotificationClick(noti)}
              style={{ cursor: "pointer" }}
            >
              <div className="profile-icon">
                {noti.type === "album"
                  ? "📷"
                  : noti.type === "schedule"
                  ? "📅"
                  : noti.type === "post"
                  ? "📝"
                  : "⚠️"}
              </div>

              <div className="content">
                <div className="message">{noti.message}</div>
                <div className="timestamp">
                  {new Date(noti.createdAt).toLocaleTimeString()}
                </div>
              </div>
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
      overlayInnerStyle={{ marginLeft: "-100px", padding: 0 }}
    >
      <BellOutlined className="Header-alarmIcon" />
    </Popover>
  );
};

export default NotificationPopover;
