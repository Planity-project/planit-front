import styled from "styled-components";

export const SnsStyled = styled.div`
  margin-top: 70px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  .sns-wrap {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 20px;
    width: 50%;
    max-width: 1280px;
  }

  .sns-postBox {
    width: calc(50% - 10px);
    aspect-ratio: 1/0.8;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    border-radius: 8px;
    border: 1px solid lightgray;
    background-color: #fff;
    box-shadow: 0 4px 12px rgba(250, 250, 250, 0.1);
  }

  .sns-postBox:nth-child(even) {
    transform: translateY(5px);
  }

  .sns-imgBox {
    display: grid;
    gap: 2px;
    background-color: #eaeaea;
    width: 100%;
    height: 60%;
    overflow: hidden;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
  }

  .sns-imgWrapper {
    position: relative;
    width: 100%;
    height: 100%;
    border-radius: 10px;
    object-fit: cover;
  }

  .sns-imgWrapper.first {
    grid-column: 1 / 2;
    grid-row: 1 / -1;
  }

  .sns-imgBox img {
    object-fit: cover;
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
    justify-content: center;
    gap: 5px;
    padding: 10px 5px;
    background-color: white;
  }

  .sns-title {
    font-size: 16px;
    font-weight: 500;
  }

  .sns-hashtag {
    font-size: 12px;
    color: gray;
  }

  .sns-comment {
    font-size: 14px;
  }

  /* 반응형 */
  @media (max-width: 1000px) {
    .sns-postBox {
      width: calc(100% - 10px);
    }
    .sns-postBox:nth-child(even) {
      transform: translateY(0);
    }
    .sns-title {
      font-size: 18px;
    }
    .sns-comment {
      font-size: 14px;
    }
  }

  @media (max-width: 768px) {
    .sns-title {
      font-size: 15px;
    }
    .sns-comment {
      font-size: 12px;
    }
    .sns-wrap {
      width: 50%;
    }
  }

  @media (max-width: 450px) {
    .sns-title {
      font-size: 12px;
    }
    .sns-hashtag {
      font-size: 8px;
    }
    .sns-comment {
      font-size: 10px;
    }
    .sns-wrap {
      width: 60%;
    }
  }
`;
