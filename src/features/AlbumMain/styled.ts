import styled from "styled-components";

export const AlbumMainStyled = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .AlbumMain-wrap {
    margin-top: 50px;
    width: 50%;
  }
  .AlbumMain-title {
    font-size: 24px;
    text-align: center;
    font-weight: 600;
  }

  .AlbumMain-btnDiv {
    width: 100%;
    margin-top: 20px;
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
  }
  .AlbumMain-btnDiv Button {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgb(83, 183, 232, 0.6);
    border-radius: 5px;
    color: white;
    border: none;
    padding: 20px 20px;
  }
  .AlbimMain-container {
    margin-top: 5px;
    width: 100%;
    aspect-ratio: 1/0.8;
  }
  .AlbumMain-text {
    font-size: 17px;
    font-weight: 500;
  }
`;
