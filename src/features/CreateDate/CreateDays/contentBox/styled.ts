import styled from "styled-components";

export const PlaceCardWrapper = styled.div`
  .create-placecard {
    width: 100%;
    display: flex;
    align-items: flex-start;
    gap: 10px;
    background-color: white;
    padding: 10px;
    margin-bottom: 10px;
    border-radius: 8px;
  }

  .create-placecard:hover {
    cursor: default;
  }

  .unassigned-card:hover {
    cursor: pointer;
  }

  .create-img {
    position: relative;
    width: 30%;
  }

  .create-image {
    display: block;
    width: 100%;
    aspect-ratio: 1 / 1;
    object-fit: cover;
    border-radius: 4px;
  }

  .image-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(128, 128, 128, 0.4);
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 8px;
    cursor: pointer;
  }

  .create-placetitle {
    width: 70%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .more-button {
    background-color: white;
    border: none;
    padding: 6px 12px;
    border-radius: 6px;
    font-weight: bold;
    cursor: pointer;
  }

  .create-title {
    font-weight: 700;
    font-size: 16px;
    margin-bottom: 4px;
    margin-left: 8px;
  }

  .top-info {
    display: flex;
    align-items: center;
    gap: 6px;
    margin-bottom: 4px;
    margin-left: 8px;
  }

  .create-address {
    font-size: 13px;
    color: #888;
    margin-left: 8px;
    margin-top: auto;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    word-break: break-word;
    white-space: normal;
  }

  .create-titleBox {
    display: flex;
    width: 100%;
    justify-content: space-between;
  }

  .create-delBtn {
    background: none;
    border: none;
    color: #ff4d4f;
    font-size: 16px;
    cursor: pointer;
  }

  .create-info {
    font-size: 14px;
    color: #555;
    display: flex;
    align-items: center;
    gap: 6px;
    flex-wrap: wrap;
  }

  .create-time {
    justify-content: flex-end;
    gap: 8px;
    margin-top: 4px;
  }

  .time-input {
    appearance: none; /* 최신 브라우저에서 기본 스타일 제거 */
    -webkit-appearance: none; /* 크롬, 사파리 */
    -moz-appearance: textfield; /* 파이어폭스 */
    border: none;
    border-bottom: 1px solid;
    border-radius: 0;
    font-size: 14px;
    width: 60px;
    outline: none;
  }

  .time-input::-webkit-outer-spin-button,
  .time-input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  .time-input[type="number"] {
    -moz-appearance: textfield;
  }

  .edit-btn,
  .confirm-btn,
  .cancel-btn {
    background: none;
    border: none;
    color: #666;
    font-size: 16px;
    cursor: pointer;

    &:hover {
      color: #000;
    }
  }

  .more-button {
    border: none;
    padding: 2px 11px;
    font-weight: bold;
    border-radius: 20px;
    cursor: pointer;
  }

  .create-info {
    font-size: 13px;
    color: #555;
  }

  .create-address {
    display: -webkit-box;
    margin-left: 10px;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    word-break: break-word;
    white-space: normal;
  }
`;

const categoryColors: { [key: string]: string } = {
  관광지: "#3ba1d3", // '12'
  문화: "#34a853", // '14'
  레포츠: "#a142f4", // '28'
  쇼핑: "#fbbc04", // '38'
  음식점: "#f28b82", // '39'
  숙소: "rgb(83, 183, 232, 0.6)", // '32'
  행사: "#ff6d00", // '15'
  기타: "#bdbdbd", // 매핑 안된 경우
};

export const CategoryBadge = styled.span<{ category: string }>`
  color: ${({ category }) => categoryColors[category] || "#888"};
  font-size: 13px;
  font-weight: bold;
`;
