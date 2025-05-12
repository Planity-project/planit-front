import styled from "styled-components";

export const AlbumDetailStyled = styled.div`
  margin-top: 70px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .AlbumDetail-photoWrap {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 20px;
    width: 50%;
    max-width: 1280px;
  }
  .AlbumDetail-photoBox {
    cursor: pointer;
    width: calc(30% - 10px);
    aspect-ratio: 1/0.8;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    box-sizing: border-box;
    border-radius: 8px;
    border: 1px solid lightgray;
    background-color: #fff;
    box-shadow: 0 4px 12px rgba(250, 250, 250, 0.1);
  }
  .AlbumDetail-img {
    width: 100%;
    height: 100%;
  }
  .AlbumDetail-photoWrap {
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
  }

  .AlbumDetail-photoBox {
    position: relative;
    width: 200px;
    height: 200px;
    overflow: hidden;
    cursor: pointer;
  }

  .AlbumDetail-img {
    object-fit: cover;
    width: 100%;
    height: 100%;
    transition: transform 0.3s ease;
  }

  .AlbumDetail-photoBox:hover .AlbumDetail-overlay {
    opacity: 1;
  }

  .AlbumDetail-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.6);
    color: white;
    opacity: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    transition: opacity 0.3s ease;

    .count-box {
      display: flex;
      gap: 20px;
      align-items: center;

      .icon-text {
        display: flex;
        align-items: center;
        gap: 5px;
        font-size: 18px;
      }
    }
  }
`;
