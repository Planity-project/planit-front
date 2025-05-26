import { useState } from "react";
import { Popover, Spin, Badge } from "antd";
import { BellOutlined } from "@ant-design/icons";
import api from "@/util/api";
import { NotificationStyled } from "./styled";
import { useRouter } from "next/router";
import ShareSubmitModal from "../SubmitModal";
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
interface Props {
  notifications: Notification[];
  setNotifications: React.Dispatch<React.SetStateAction<Notification[]>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  fetchNotifications: () => Promise<void>;
}
const categories = ["전체", "게시글", "일정", "앨범", "신고"] as const;
type Category = (typeof categories)[number];

const NotificationPopover = ({
  notifications,
  setNotifications,
  loading,
  setLoading,
  fetchNotifications,
}: Props) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState<Category>("전체");

  const [shareModalVisible, setShareModalVisible] = useState(false);
  const [selectedTripId, setSelectedTripId] = useState<number | null>(null);

  const unreadCount = notifications.filter((n) => !n.isRead).length;
  // const fetchNotifications = async () => {
  //   setLoading(true);
  //   try {
  //     const res = await api.get("/notifications");
  //     setNotifications(res.data);
  //   } catch (error) {
  //     console.error("알림 로딩 실패:", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const typeToPathMap: Record<Notification["type"], string> = {
    POST: "posts",
    TRIP: "trip",
    ALBUM: "albums",
    REPORT: "reports",
  };

  const handleNotificationClick = async (noti: Notification) => {
    try {
      if (!noti.isRead) {
        await api.patch(`/notifications/${noti.id}/read`);
        setNotifications((prev) =>
          prev.map((n) => (n.id === noti.id ? { ...n, isRead: true } : n))
        );
      }

      // TRIP은 모달 띄우고 종료
      if (noti.type === "TRIP" && noti.targetId) {
        setSelectedTripId(noti.targetId);
        setShareModalVisible(true);
        return;
      }

      // 경로 처리
      if (noti.targetId) {
        let targetPath = "";

        switch (noti.type) {
          case "ALBUM":
            targetPath = `/album/detail/${noti.targetId}`;
            break;
          case "POST":
            targetPath = `/snsmainpage/snsdetail/${noti.targetId}`;
            break;
          case "REPORT":
            targetPath = `/reports/${noti.targetId}`;
            break;
          default:
            console.warn("처리되지 않은 알림 타입:", noti.type);
            return;
        }

        router.push(targetPath);
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
    if (selectedCategory === "게시글") return noti.type === "POST";
    if (selectedCategory === "일정") return noti.type === "TRIP";
    if (selectedCategory === "앨범") return noti.type === "ALBUM";
    if (selectedCategory === "신고") return noti.type === "REPORT";
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
          filteredNotifications.map((noti) => {
            const type = noti.type.toLowerCase();

            return (
              <div
                key={noti.id}
                className={`notification-item ${
                  noti.isRead ? "read" : "unread"
                }`}
                onClick={() => handleNotificationClick(noti)}
                style={{ cursor: "pointer" }}
              >
                <div className="profile-icon">
                  {type === "album"
                    ? "📷"
                    : type === "trip"
                    ? "📅"
                    : type === "post"
                    ? "📝"
                    : type === "report"
                    ? "⚠️"
                    : "❓"}
                </div>
                <div className="content">
                  <div className="message">{noti.content}</div>

                  {noti.type === "REPORT" && noti.extra && (
                    <div className="report-info">
                      👤 대상: {noti.extra.reportedUserNickname} <br />
                      ⚠️ 신고 횟수: {noti.extra.reportCount}
                    </div>
                  )}

                  <div className="timestamp">
                    {new Date(noti.createdAt).toLocaleTimeString()}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </NotificationStyled>
  );

  return (
    <>
      <Popover
        content={content}
        trigger="click"
        open={open}
        onOpenChange={handleVisibleChange}
        placement="bottom"
        overlayInnerStyle={{ marginLeft: "-100px", padding: 0 }}
      >
        <Badge dot={unreadCount > 0}>
          <BellOutlined className="Header-alarmIcon" />
        </Badge>
      </Popover>

      {selectedTripId && (
        <ShareSubmitModal
          tripId={selectedTripId}
          visible={shareModalVisible}
          onClose={() => setShareModalVisible(false)}
          onUpdatedTrip={() => {
            // 알림 목록에서 해당 Trip 알림 제거
            setNotifications((prev) =>
              prev.filter(
                (n) => !(n.type === "TRIP" && n.targetId === selectedTripId)
              )
            );
            setShareModalVisible(false);
          }}
        />
      )}
    </>
  );
};

export default NotificationPopover;
