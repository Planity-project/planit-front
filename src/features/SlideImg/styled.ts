import styled from "styled-components";

export const SlideStyled = styled.div<{ $imgModal?: true | false }>`
  display: ${(props) => (props.$imgModal ? "flex" : "none")};
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
  background-color: rgba(0, 0, 0, 0.7);

  .photo-wrap {
    position: relative;
    background-color: black;
    border-radius: 10px;
    width: 30%;
    height: 60%;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .arrow {
    width: 40px;
    font-size: 2rem;
    color: white;
    text-align: center;
    cursor: pointer;
    user-select: none;
    z-index: 10;
  }

  .left {
    position: absolute;
    left: 10px;
  }

  .right {
    position: absolute;
    right: 10px;
  }

  .image-viewport {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  .slider {
    display: flex;
    height: 100%;
    transition: transform 0.5s ease;
  }

  .slide {
    position: relative;
    min-width: 100%;
    height: 100%;
  }
`;
