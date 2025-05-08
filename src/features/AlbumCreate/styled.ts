import styled from "styled-components";

export const AlbumCreateStyled = styled.div<{ $modal: boolean }>`
  display: ${({ $modal }) => ($modal ? "flex" : "none")};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* 뒷배경 어둡게 */
  justify-content: center;
  align-items: center;
  z-index: 999; /* 다른 요소 위에 */
  .AlbumCreate-modal {
    position: relative;
    width: 30%;
    background-color: white;
    aspect-ratio: 1/0.7;
    border-radius: 10px;
    padding: 24px 24px;
  }
  .AlbumTitle-closeBtn {
    position: absolute;
    top: 12px;
    right: 18px;
    font-size: 24px;
    cursor: pointer;
    color: #aaa;
    transition: color 0.2s ease-in-out;
  }
  .AlbumTitle-closeBtn:hover {
    color: #333;
  }
  @media (max-width: 1300px) {
    .AlbumCreate-modal {
      width: 40%;
    }
  }
  @media (max-width: 900px) {
    .AlbumCreate-modal {
      width: 50%;
    }
  }
  @media (max-width: 700px) {
    .AlbumCreate-modal {
      width: 75%;
    }
  }
  @media (max-width: 500px) {
    .AlbumCreate-modal {
      width: 97%;
    }
  }
`;
