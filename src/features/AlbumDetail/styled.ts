import styled from "styled-components";

export const AlbumDetailStyled = styled.div`
  margin-top: 100px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  .view-toggle {
    margin-bottom: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
  }

  .AlbumDetail-photoWrap {
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
    justify-content: center;
    width: 80%;
    max-width: 1280px;
  }

  .AlbumDetail-photoBox {
    position: relative;
    width: 200px;
    height: 200px;
    overflow: hidden;
    cursor: pointer;
    border-radius: 8px;
    border: 1px solid lightgray;
    background-color: #fff;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
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
