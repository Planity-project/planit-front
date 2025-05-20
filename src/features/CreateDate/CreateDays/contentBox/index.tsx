import React, { useState } from "react";
import {
  EditOutlined,
  CheckOutlined,
  CloseOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { Modal } from "antd";
import { CategoryBadge } from "./styled";
import { PlaceCardWrapper } from "./styled";
import PlaceDetail from "@/components/PlaceDetail";

// 전화번호 추가 (모달에서만 전화번호 보이게)

interface PlaceCardProps {
  place: {
    title: string;
    category: string;
    tel: string;
    lat: string;
    lon: string;
    address: string;
    imageSrc?: string;
  };
  onClick?: () => void;
}

export const UnassignedPlaceCard = ({ place, onClick }: PlaceCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <PlaceCardWrapper>
        <div
          className="create-placecard unassigned-card"
          onClick={onClick}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          style={{ position: "relative" }}
        >
          <div className="create-img">
            <img
              src={place.imageSrc || "/defaultImage.png"}
              alt={place.title || "default"}
              className="create-image"
            />

            {isHovered && (
              <div
                className="image-overlay"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  className="more-button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsModalOpen(true);
                  }}
                >
                  더보기
                </button>
              </div>
            )}
          </div>
          <div className="create-placetitle">
            <div className="create-title">{place.title}</div>
            <div className="create-info top-info">
              <CategoryBadge category={place.category}>
                {place.category}
              </CategoryBadge>
            </div>
            <div className="create-info create-address">{place.address}</div>
            {place.tel && <div className="create-info">{place.tel}</div>}
          </div>
        </div>
      </PlaceCardWrapper>

      <Modal
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        title="장소 상세 정보"
      >
        <PlaceDetail place={place} />
      </Modal>
    </>
  );
};

interface AssignedPlaceCardProps {
  place: any;
  index: number;
  editingIndex: number | null;
  editedMinutes: number;
  setEditedMinutes: (val: number) => void;
  handleTimeChange: (index: number, currentMinutes: number) => void;
  handleTimeUpdate: (index: number) => void;
  handleDeleteBox: (index: number) => void;
}

export const AssignedPlaceCard = ({
  place,
  index,
  editingIndex,
  editedMinutes,
  setEditedMinutes,
  handleTimeChange,
  handleTimeUpdate,
  handleDeleteBox,
}: AssignedPlaceCardProps) => {
  return (
    <PlaceCardWrapper>
      <div className="create-placecard" key={index}>
        <div className="create-img">
          <img
            src={place.imageSrc || "/defaultImage.png"}
            alt={place.title || "default"}
            className="create-image"
          />
        </div>

        <div className="create-placetitle">
          <div className="create-titleBox">
            <div className="create-title">{place.title}</div>
            <button
              className="create-delBtn"
              onClick={() => handleDeleteBox(index)}
              onPointerDown={(e) => e.stopPropagation()}
            >
              <DeleteOutlined />
            </button>
          </div>

          <div className="create-info top-info">
            <CategoryBadge category={place.category}>
              {place.category}
            </CategoryBadge>
          </div>

          <div className="create-info create-address">{place.address}</div>

          <div className="create-info create-time">
            {editingIndex === index ? (
              <>
                <input
                  type="number"
                  value={editedMinutes}
                  onChange={(e) => setEditedMinutes(Number(e.target.value))}
                  min={10}
                  step={10}
                  className="time-input"
                />
                분
                <button
                  className="confirm-btn"
                  onClick={() => handleTimeUpdate(index)}
                >
                  <CheckOutlined />
                </button>
                <button
                  className="cancel-btn"
                  onClick={() => handleTimeChange(-1, 0)}
                >
                  <CloseOutlined />
                </button>
              </>
            ) : (
              <div className="edit-div">
                {Math.floor(place.minutes / 60)}시간{" "}
                {String(place.minutes % 60).padStart(2, "0")}분
                <button
                  className="edit-btn"
                  onClick={() => handleTimeChange(index, place.minutes)}
                >
                  <EditOutlined />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </PlaceCardWrapper>
  );
};
