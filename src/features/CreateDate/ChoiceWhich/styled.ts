import styled from "styled-components";

export const ChioceWhiceStyled = styled.div`
  .which-container {
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-top: 50px;
  }
  .which-leftcontainer {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 50%;
  }
  .which-inputBox {
    width: 100%;
    position: relative;
    display: flex;
    align-items: center;
  }
  .which-inputicon {
    position: absolute;
    left: 10px;
    z-index: 1000;
  }
  .which-inputBox Input {
    width: 100%;
    padding: 12px 30px;
    border-radius: 24px;
  }
  .which-rightcontainer {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50%;
    height: 100%;
  }
  .which-btnDiv {
    margin-top: 10px;
    display: flex;
    justify-content: end;
  }
  .which-btnDiv Button {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgb(83, 183, 232, 0.6);
    border-radius: 5px;
    color: white;
    border: none;
    padding: 20px 20px;
  }
  .which-mapBox {
    overflow-y: scroll;
    aspect-ratio: 1/0.5;
    margin-top: 10px;
    background-color: whitesmoke;
    border-radius: 8px;
  }
  .which-mapBox::-webkit-scrollbar {
    width: 8px;
  }
  .which-mapBox::-webkit-scrollbar-thumb {
    background-color: rgba(136, 136, 136, 0.3);
    border-radius: 10px;
  }
  .which-mapDiv.selected {
    background-color: rgb(83, 183, 232, 0.4);
  }
  .which-mapBox::-webkit-scrollbar-track {
    background-color: whitesmoke;
  }
  .which-mapcontainer {
    width: 80%;
  }
  .which-mapDiv {
    width: 100%;
    padding: 10px 10px;
    background-color: whitesmoke;
  }
  .which-mapDiv:hover {
    background-color: rgb(83, 183, 232, 0.2);
  }
  .which-gpsDiv {
    display: flex;
    gap: 30px;
  }
  .which-gpsimg {
    margin-left: 10px;
  }
  .which-name {
    font-weight: 700;
    font-size: 15px;
  }
  .which-country {
    font-weight: 300;
    font-size: 12px;
  }
  @media (max-width: 900px) {
    .which-container {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin-top: 50px;
      gap: 50px;
    }
    .which-leftcontainer {
      width: 90%;
    }
  }
`;
