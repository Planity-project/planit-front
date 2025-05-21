import { useState } from "react";
import { Popover, Spin } from "antd";
import { BellOutlined } from "@ant-design/icons";
// import api from "@/util/api"; // 실제 API 사용 시 주석 해제
import { NotificationStyled } from "./styled";

interface Notification {
  id: number;
  type: "normal" | "album" | "schedule" | "post";
  message: string;
  createdAt: string;
  isRead: boolean; // 읽음 여부
}

const categories = ["전체", "게시글", "일정", "앨범"] as const;
type Category = (typeof categories)[number];

// 더미 알림 데이터
const dummyNotifications: Notification[] = [
  {
    id: 1,
    type: "post",
    message: "새 게시글이 등록되었습니다.",
    createdAt: new Date().toISOString(),
    isRead: false,
  },
  {
    id: 2,
    type: "schedule",
    message: "여행 일정이 곧 시작됩니다.",
    createdAt: new Date().toISOString(),
    isRead: true,
  },
  {
    id: 3,
    type: "album",
    message: "새 앨범 사진이 업로드되었습니다.",
    createdAt: new Date().toISOString(),
    isRead: false,
  },
  {
    id: 4,
    type: "normal",
    message: "서비스 점검 예정 안내",
    createdAt: new Date().toISOString(),
    isRead: true,
  },
  {
    id: 5,
    type: "post",
    message: "좋아요를 받은 게시글이 있어요!",
    createdAt: new Date().toISOString(),
    isRead: false,
  },
  {
    id: 6,
    type: "schedule",
    message: "일정 변경 사항이 있어요.",
    createdAt: new Date().toISOString(),
    isRead: true,
  },
];

const NotificationPopover = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category>("전체");

  const fetchNotifications = async () => {
    setLoading(true);
    try {
      // const res = await api.get("/notification");
      // setNotifications(res.data);

      // 더미 데이터
      await new Promise((res) => setTimeout(res, 500));
      setNotifications(dummyNotifications);
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

  const filteredNotifications = notifications.filter((noti) => {
    if (selectedCategory === "전체") return true;
    if (selectedCategory === "게시글") return noti.type === "post";
    if (selectedCategory === "일정") return noti.type === "schedule";
    if (selectedCategory === "앨범") return noti.type === "album";
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
            >
              <div className="profile-icon">
                {noti.type === "album"
                  ? "📷"
                  : noti.type === "schedule"
                  ? "📅"
                  : noti.type === "post"
                  ? "📝"
                  : "📢"}
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
