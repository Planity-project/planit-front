import React from "react";
import { CategoryBadge } from "../styled";
import { DeleteOutlined } from "@ant-design/icons";

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

//주변 장소
export const UnassignedPlaceCard = ({ place, onClick }: PlaceCardProps) => {
  return (
    <div className="create-placecard" onClick={onClick}>
      <img
        src={place.imageSrc || "/defaultImage.png"}
        alt={place.title || "default"}
        className="create-image"
      />
      <div>
        <div className="create-title">{place.title}</div>
        <div className="create-info">
          <CategoryBadge category={place.category}>
            {place.category}
          </CategoryBadge>{" "}
          {place.address}
        </div>
        {place.tel ? <div className="create-info">{place.tel}</div> : ""}
      </div>
    </div>
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

//선택된 장소
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
    <div className="create-placecard" key={index}>
      <img
        src={place.imageSrc || "/defaultImage.png"}
        alt={place.title || "default"}
        className="create-image"
      />
      <div>
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
        <div className="create-info">
          {" "}
          <CategoryBadge category={place.category}>
            {place.category}
          </CategoryBadge>{" "}
          {place.address}
        </div>
        <div className="create-info">{place.tel}</div>
        <div className="create-info">
          {editingIndex === index ? (
            <>
              <input
                type="number"
                value={editedMinutes}
                onChange={(e) => setEditedMinutes(Number(e.target.value))}
                min={10}
                step={10}
              />
              분<button onClick={() => handleTimeUpdate(index)}>완료</button>
            </>
          ) : (
            <>
              머무는 시간: {Math.floor(place.minutes / 60)}시간{" "}
              {String(place.minutes % 60).padStart(2, "0")}분
              <button onClick={() => handleTimeChange(index, place.minutes)}>
                변경
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
