import styled from "styled-components";

export const CreateDaysStyled = styled.div`
  width: 100%;
  .create-wrap {
    display: flex;
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

  .create-left {
    width: 100%;
    max-height: 500px;
    overflow-y: auto;
    padding-right: 10px;
  }

  .create-right {
    width: 48%;
  }

  .create-placecard {
    background-color: #f6f6f6;
    padding: 15px;
    margin-bottom: 10px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .create-image {
    width: 250px;
    height: auto;
    border-radius: 6px;
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

  .create-loadmore:hover {
    background-color: #3ba1d3;
  }
`;
