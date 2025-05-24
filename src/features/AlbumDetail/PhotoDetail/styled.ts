import styled from "styled-components";

export const PhotoStyled = styled.div<{ $modal?: true | false }>`
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

  .photo-wrap {
    background-color: white;
    border-radius: 10px;
    width: 65%;
    height: 85%;
    overflow-y: auto;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    display: flex;
  }
  .arrow-icon {
    font-size: 26px;
    z-index: 10001;
    position: absolute;
    top: 50%;
    left: 2px;
    opacity: 0;
    visibility: hidden;
  }
  .arrow-icon-right {
    font-size: 26px;
    z-index: 10001;
    position: absolute;
    top: 50%;
    right: 2px;
    opacity: 0;
    visibility: hidden;
  }
  .photo-photozone:hover .arrow-icon,
  .photo-photozone:hover .arrow-icon-right {
    opacity: 1;
    visibility: visible;
  }
  .photo-photozone {
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.01);
    width: 60%;
    height: 100%;
    border-right: 1px solid rgba(0, 0, 0, 0.1);
    position: relative;
  }
  .slider-container {
    display: flex;
    transition: transform 0.5s ease;
    height: 100%;
    width: 100%;
  }

  .slider-item {
    flex: 0 0 100%;
    height: 100%;
    width: 100%; /* ✅ 명시적 추가 */
    position: relative;
  }
  .photo-commentzone {
    width: 40%;
    padding: 15px;
    position: relative;
    display: flex;
    flex-direction: column;
  }
  .photo-image {
    width: 100%;
    height: 100%;
    object-fit: cover; // 또는 contain
    display: block;
  }
  .photo-user {
    display: flex;
    align-items: center;
    gap: 12px;
    font-size: 13px;
    font-weight: 600;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    margin-bottom: 10px;
    padding-bottom: 10px;
  }
  .photo-userimg {
    width: 40px;
    height: 40px;
    border: 1px solid rgba(0, 0, 0, 0.4);
    border-radius: 50%;
  }

  .comment-bottomDiv {
    display: flex;
    flex-direction: column;
    margin-top: auto;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
    padding-top: 8px;
  }
  .comment-likeDiv {
    margin-left: 10px;
    margin-bottom: 10px;
    display: flex;
    align-items: flex-end;
    gap: 8px;
  }
  .comment-likeCnt {
    margin-bottom: 2.5px;
  }
  .comment-likeIcon {
    font-size: 20px;
    color: red;
  }
  .comment-inputDiv {
    display: flex;
    align-items: center;
    justify-content: space-around;
  }
  .comment-inputDiv Input {
    width: 80%;
    border: none;
    border-bottom: 1px solid black;
  }
  .photo-delphoto {
    font-size: 11px;
    font-weight: 500;
    cursor: pointer;
  }
  @media (max-width: 1250px) {
    .photo-wrap {
      width: 75%;
      height: 85%;
    }
    .photo-photozone {
      width: 60%;
      height: 100%;
      border-right: 1px solid rgba(0, 0, 0, 0.2);
    }
    .photo-commentzone {
      width: 40%;
      padding: 15px;
      position: relative;
      display: flex;
      flex-direction: column;
    }
    .photo-image {
      width: 90%;
      height: 90%;
      object-fit: contain;
    }
  }
  @media (max-width: 768px) {
    .photo-wrap {
      background-color: white;
      border-radius: 10px;
      width: 75%;
      height: 90%;
      overflow-y: auto;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
      display: flex;
      flex-direction: column;
    }
    .photo-photozone {
      width: 100%;
      height: 60%;
      border-right: 1px solid rgba(0, 0, 0, 0.2);
    }
    .photo-commentzone {
      width: 100%;
      height: 40%;
      padding: 15px;
    }
    .photo-image {
      width: 90%;
      height: 90%;
    }
  }
  @media (max-width: 500px) {
    .photo-wrap {
      background-color: white;
      border-radius: 10px;
      width: 85%;
      height: 85%;
      overflow-y: auto;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
      display: flex;
      flex-direction: column;
    }
    .photo-photozone {
      width: 100%;
      height: 55%;
      border-right: 1px solid rgba(0, 0, 0, 0.2);
    }
    .photo-commentzone {
      width: 100%;
      height: 45%;
      padding: 15px;
    }
    .photo-image {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }
`;
