import styled from "styled-components";

export const AlbumMainStyled = styled.div`
  width: 100%;
  .AlbumMain-wrap {
    max-width: 1280px;
    margin: 50px auto;

    @media (max-width: 768px) {
      padding: 0px 10px;
    }
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
  }
  .AlbumMain-btnDiv Button {
    background-color: rgb(83, 183, 232, 0.6);
    border-radius: 5px;
    color: white;
    border: none;
    height: 40px;
    @media (max-width: 768px) {
      width: 100%;
      height: 50px;
      font-size: 20px;
    }
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
  .AlbumMain-noData {
    margin-top: 20px;
    text-align: center;
    font-size: 15px;
    font-weight: 500;
  }
`;
