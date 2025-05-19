import styled from "styled-components";

export const CreateStayStyled = styled.div`
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

  .custom-input {
    border: none;
    box-shadow: none;
  }

  .custom-input:focus {
    border: none;
    box-shadow: none;
  }

  .search-icon {
    font-size: 18px;
    color: #888;
    margin-right: 8px;
  }

  .create-left {
    width: 100%;
    display: flex;
    gap: 10px;
  }

  .create-topleft {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
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
    overflow-y: scroll;
  }
  .create-choiceBox::-webkit-scrollbar,
  .create-daylistBox::-webkit-scrollbar {
    width: 8px;
  }
  .create-choiceBox::-webkit-scrollbar-thumb,
  .create-daylistBox::-webkit-scrollbar-thumb {
    background-color: rgba(136, 136, 136, 0.3);
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

  .create-daylistBox {
    width: 50%;
    max-height: 500px;
    overflow-y: scroll;
  }

  .create-right {
    width: 48%;
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
    background-color: black;
    color: white;
    border: none;
    border-radius: 8px;
    font-weight: bold;
    cursor: pointer;
  }

  .create-dayBox {
    display: flex;
    align-items: flex-start;
    margin-bottom: 1rem;
    background: #fff;
    border-radius: 12px;
    padding: 8px 16px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  }

  .day-delBtn {
    border: none;
    background-color: white;
  }
  .day-delBtn:hover {
    cursor: pointer;
  }
  .day-label {
    font-size: 20px;
    font-weight: bold;
    margin-right: 12px;
  }

  .day-content {
    flex: 1;
  }

  .day-title {
    font-size: 16px;
    font-weight: 500;
    margin-bottom: 8px;
    display: flex;
    justify-content: space-between;
  }

  .day-empty {
    color: #999;
  }

  /* 버튼 */
  .choice-btnDiv {
    margin-top: 20px;
    width: 52%;
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
`;
