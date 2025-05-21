import { useState } from "react";
import { Popover, Spin, Button } from "antd";
import { BellOutlined } from "@ant-design/icons";
import api from "@/util/api";
import { NotificationStyled } from "./styled";

interface Notification {
  id: number;
  type: "normal" | "album" | "schedule" | "post";
  message: string;
  createdAt: string;
}

const categories = ["전체", "게시글", "일정", "앨범"] as const;
type Category = (typeof categories)[number];

const NotificationPopover = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category>("전체");

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

  const filteredNotifications = notifications.filter((noti) => {
    if (selectedCategory === "전체") return true;
    if (selectedCategory === "게시글") return noti.type === "post";
    if (selectedCategory === "일정") return noti.type === "schedule";
    if (selectedCategory === "앨범") return noti.type === "album";
    return false;
  });

  const title = (
    <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
      {categories.map((category) => (
        <Button
          key={category}
          size="small"
          type={selectedCategory === category ? "primary" : "default"}
          onClick={() => setSelectedCategory(category)}
        >
          {category}
        </Button>
      ))}
    </div>
  );

  const content = (
    <NotificationStyled>
      <div className="notification-list">
        {loading ? (
          <Spin />
        ) : filteredNotifications.length === 0 ? (
          <div>알림이 없습니다.</div>
        ) : (
          filteredNotifications.map((noti) => (
            <div key={noti.id} className="notification-item">
              <p>
                {noti.type === "normal" && "📢 전체"}
                {noti.type === "album" && "📷 앨범"}
                {noti.type === "schedule" && "📅 일정"}
                {noti.type === "post" && "📝 게시글"}: {noti.message}
              </p>
              <small>{new Date(noti.createdAt).toLocaleString()}</small>
            </div>
          ))
        )}
      </div>
    </NotificationStyled>
  );

  return (
    <Popover
      title={title}
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
