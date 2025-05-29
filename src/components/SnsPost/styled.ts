import styled from "styled-components";

export const SnsPostStyled = styled.div<{ $variant?: "default" | "album" }>`
  margin-top: 20px;
  margin-bottom: 70px;
  width: 100%;

  .sns-wrap {
    display: grid;
    gap: 10px;
    grid-template-columns: repeat(3, 1fr);

    width: 100%;

    @media (max-width: 1000px) {
      grid-template-columns: repeat(2, 1fr);
    }

    @media (max-width: 768px) {
      grid-template-columns: repeat(1, 1fr);
    }
  }

  .sns-postBox {
    cursor: pointer;
    width: 100%;
    aspect-ratio: ${(props) =>
      props.$variant === "album" ? "1/0.8" : "1/0.75"};
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    border-radius: 4px;

    background-color: #fff;
    box-shadow: 0 0 12px rgba(0, 0, 0, 0.15);
  }

  .sns-postBox:nth-child(even) {
    transform: ${(props) =>
      props.$variant === "album" ? "translateY(0px)" : "translateY(1px)"};
  }

  .sns-imgBox {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr;
    height: ${(props) => (props.$variant === "album" ? "85%" : "75%")};
    overflow: hidden;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    background-color: white;

    /* ✅ album일 때만 강제로 1줄 1칸으로 채우기 */
    ${(props) =>
      props.$variant === "album" &&
      `
    grid-template-columns: 1fr;
    grid-template-rows: 1fr;
  `}
  }
  .sns-imgWrapper {
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;
    display: flex;
    border-bottom: 1px solid rgb(0, 0, 0, 0.2);
  }
  .sns-imgWrapper img,
  .sns-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .sns-imgWrapper.first {
    grid-column: 1 / 2;
    grid-row: 1 / -1;
    display: ${(props) => (props.$variant === "album" ? "flex" : "block")};
    justify-content: ${(props) =>
      props.$variant === "album" ? "center" : "block"};
  }

  /* 1개 이미지 */
  .sns-imgBox[data-img-count="1"] {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr;
  }

  /* 2개: 가로 2분할 */
  .sns-imgBox[data-img-count="2"] {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr;
  }

  /* 3개 */
  .sns-imgBox[data-img-count="3"] {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: repeat(2, 1fr);
  }
  .sns-imgBox[data-img-count="3"] .sns-imgWrapper:not(.first) {
    grid-column: 2 / 3;
  }

  /* 5개 */
  .sns-imgBox[data-img-count="5"] {
    grid-template-columns: 2fr 1fr 1fr; /* 3열: 왼쪽 크게, 오른쪽 2개 */
    grid-template-rows: repeat(2, 1fr); /* 위아래 2줄 */
  }

  .sns-imgBox[data-img-count="5"] .sns-imgWrapper:nth-child(1) {
    grid-column: 1 / 2;
    grid-row: 1 / 3; /* 왼쪽 전체 */
  }
  .sns-imgBox[data-img-count="5"] .sns-imgWrapper:nth-child(2) {
    grid-column: 2 / 3;
    grid-row: 1 / 2;
  }
  .sns-imgBox[data-img-count="5"] .sns-imgWrapper:nth-child(3) {
    grid-column: 3 / 4;
    grid-row: 1 / 2;
  }
  .sns-imgBox[data-img-count="5"] .sns-imgWrapper:nth-child(4) {
    grid-column: 2 / 3;
    grid-row: 2 / 3;
  }
  .sns-imgBox[data-img-count="5"] .sns-imgWrapper:nth-child(5) {
    grid-column: 3 / 4;
    grid-row: 2 / 3;
  }

  .sns-textBox {
    display: flex;
    flex-direction: column;
    justify-content: ${(props) =>
      props.$variant === "album" ? "flex-end" : "center"};
    gap: 6px;

    padding: ${(props) => (props.$variant === "album" ? "10px" : "12px 5px")};
  }

  .sns-title {
    text-align: ${(props) => (props.$variant === "album" ? "center" : "")};
    font-size: 16px;
    font-weight: 500;
  }

  .sns-hashtag {
    font-size: 12px;
    color: gray;
  }

  .sns-content {
    font-size: 14px;
  }

  /* 반응형 */
  @media (max-width: 1000px) {
    .sns-postBox:nth-child(even) {
      transform: translateY(0);
    }
    .sns-title {
      font-size: 18px;
    }
    .sns-content {
      font-size: 14px;
    }
  }

  @media (max-width: 768px) {
    .sns-title {
      font-size: 20px;
    }
    .sns-hashtag {
      font-size: 14px;
      color: gray;
    }
    .sns-content {
      font-size: 16px;
    }
  }
`;
