import styled from "styled-components";

export const CreateDaysStyled = styled.div`
  width: 100%;

  .create-wrap {
    display: flex;
    justify-content: center;
    gap: 30px;
    margin-top: 10px;
  }

  .create-container {
    width: 45%;
    display: flex;
    align-items: flex-start;
    gap: 20px;
    margin-top: 40px;
    flex-wrap: wrap;
  }

  .create-input {
    display: flex;
    align-items: center;
    border: 1px solid #ccc;
    border-radius: 24px;
    padding: 8px 16px;
    width: 47%;
    max-width: 400px;
    margin-left: 10px;
    background-color: white;
  }

  .search-icon {
    font-size: 18px;
    color: #888;
    margin-right: 8px;
  }

  .custom-input {
    border: none;
    box-shadow: none;
  }

  .custom-input:focus {
    border: none;
    box-shadow: none;
  }

  .create-button-item {
    background-color: black;
    border: 1px solid;
    padding: 6px 12px;
    border-radius: 6px;
    color: white;
    left: 10px;
    cursor: pointer;
    position: relative;
  }

  .create-delBtn,
  .create-info button {
    background: transparent;
    border: none;
    cursor: pointer;
    border-radius: 4px;
  }

  .create-button-item.active {
    background-color: white;
    color: black;
  }

  .create-topleft {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
    margin-right: 20px;
  }

  .check-icon {
    margin-left: 4px;
    font-size: 12px;
  }

  .create-time {
    font-weight: bold;
    white-space: nowrap;
    color: black;
    margin-right: 20px;
  }

  .create-time .over-time {
    color: red;
  }

  .time-input {
    width: 60px;
    padding: 4px;
    border-radius: 4px;
  }

  .create-choiceBox {
    width: 50%;
    height: 500px;
    overflow-y: scroll;
  }

  .create-daylistBox {
    width: 50%;
    max-height: 500px;
    overflow-y: scroll;
  }

  .create-choiceBox::-webkit-scrollbar,
  .create-daylistBox::-webkit-scrollbar {
    width: 8px;
  }
  .create-choiceBox::-webkit-scrollbar-thumb,
  .create-daylistBox::-webkit-scrollbar-thumb {
    background-color: rgba(185, 177, 177, 0.3);
    border-radius: 10px;
  }
  .create-choiceBox.selected,
  .create-daylistBox.selected {
    background-color: rgb(83, 183, 232, 0.4);
  }
  .create-choiceBox::-webkit-scrollbar-track,
  .create-daylistBox::-webkit-scrollbar-track {
    background-color: whitesmoke;
  }

  .create-all {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    margin: 0;
  }

  .create-left {
    width: 100%;
    min-height: 500px;
    display: flex;
    gap: 10px;
  }

  .create-right {
    width: 48%;
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
    background-color: black;
    color: white;
    border: none;
    border-radius: 8px;
    font-weight: bold;
    cursor: pointer;
  }

  /* 버튼 */
  .choice-btnDiv {
    margin-top: 20px;
    width: 95%;
    display: flex;
    justify-content: end;
  }

  .choice-btnDiv Button {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgb(83, 183, 232, 0.6);
    border-radius: 5px;
    color: white;
    border: none;
    padding: 20px 20px;
  }

  @media (max-width: 1000px) {
    .create-time {
      font-weight: bold;
      white-space: nowrap;
      color: black;
    }
    .create-topleft {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
    }
    .create-wrap {
      display: flex;
      flex-direction: column-reverse;
      justify-content: center;
      align-items: center;
      gap: 30px;
      margin-top: 30px;
    }

    .create-container {
      width: 90%;
      display: flex;
      align-items: flex-start;
      gap: 20px;
      margin-top: 40px;
      flex-wrap: wrap;
    }
  }
  @media (max-width: 750px) {
    .create-time {
      font-weight: bold;
      white-space: nowrap;
      color: black;
      font-size: 12px;
    }
    .create-input {
      width: 80%;
    }
  }
  @media (max-width: 520px) {
    .create-all {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: 10px;
    }
  }
`;
