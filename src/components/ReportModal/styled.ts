import styled from "styled-components";

export const ReportModalStyled = styled.div<{ $modal?: true | false }>`
  display: ${(props) => (props.$modal ? "flex" : "none")};
  gap: 10px;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
  background-color: rgba(0, 0, 0, 0.1);

  .report-wrap {
    background-color: white;
    border-radius: 8px;
    width: 370px;
    aspect-ratio: 1/0.8;
    overflow-y: auto;
    box-shadow: 0 4px 5px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .report-btnDiv {
    width: 85%;
    display: flex;
    gap: 5px;
    justify-content: flex-end;
  }

  .report-canclebtn Button:hover {
    color: black;
    border-color: rgba(0, 0, 0, 0.2);
  }
  .report-reportbtn Button {
    border: none;
    background-color: rgb(83, 183, 232, 0.4);
  }
  .report-reportbtn Button:hover {
    border: none;
    color: black;
  }
  .report-titleDiv {
    display: flex;
    width: 100%;
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    padding: 10px;
    margin-bottom: 20px;
  }
  .report-inputdiv {
    margin-bottom: 2px;
  }
  .ant-input-textarea {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }
  .report-textdiv {
    font-size: 10px;
    color: gray;
    margin-bottom: 10px;
  }
  .ant-input:hover,
  .ant-input:focus {
    border-color: rgb(83, 183, 232, 0.4);
  }
  .ant-input {
    width: 300px !important;
  }
`;
