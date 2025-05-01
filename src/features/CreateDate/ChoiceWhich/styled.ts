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
    width: 50%;
    text-align: center;
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
`;
