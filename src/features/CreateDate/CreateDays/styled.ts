import styled from "styled-components";

export const CreateDaysStyled = styled.div`
  width: 100%;
  .create-wrap {
    display: flex;
    justify-content: center;
    gap: 10px;
  }
  .create-container {
    width: 50%;
    display: flex;
    align-items: flex-start;
    gap: 20px;
    margin-top: 40px;
    flex-wrap: wrap;
  }

  .create-choiceBox {
    width: 50%;
    max-height: 500px;
    overflow-y: auto;
  }
  .create-daylistBox {
    width: 50%;
    max-height: 500px;
    overflow-y: auto;
    background-color: #f6f6f6;
  }
  .create-left {
    width: 100%;
    display: flex;
    gap: 10px;
  }
  .create-right {
    width: 48%;
  }

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
    cursor: pointer;
  }

  .create-image {
    width: 25%;
    aspect-ratio: 1/1;
    border-radius: 4px;
    margin-bottom: 10px;
  }

  .create-title {
    font-weight: 700;
    font-size: 16px;
    margin-bottom: 5px;
  }

  .create-info {
    font-size: 13px;
    color: #555;
  }

  .create-loading,
  .create-end {
    text-align: center;
    margin: 20px 0;
    color: #888;
  }

  .create-loadmore {
    width: 100%;
    margin-top: 20px;
    padding: 12px;
    background-color: #53b7e8;
    color: white;
    border: none;
    border-radius: 8px;
    font-weight: bold;
    cursor: pointer;
  }

  .create-delBtn {
    border: none;
    background-color: white;
  }
  .create-delBtn:hover {
    cursor: pointer;
  }

  .create-loadmore:hover {
    background-color: #3ba1d3;
  }
  .create-titleBox {
    display: flex;
    justify-content: space-between;
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
  background-color: ${({ category }) => categoryColors[category] || "#888"};
  color: white;
  font-size: 12px;
  padding: 4px 8px;
  border-radius: 4px;
`;
