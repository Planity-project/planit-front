import styled from "styled-components";

export const PlaceDetailStyled = styled.div`
  .placedetail-wrap {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 15px;

    .placedetail-imgDiv {
      width: 80%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .placedetail-img {
      width: 100%;
      height: 100%;
    }
    .placedetail-textDiv {
      width: 80%;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      text-align: start;
      gap: 5px;
    }
    .placedetail-title {
      display: flex;
      gap: 10px;
    }
    .placedetail-category {
      font-weight: 600;
    }
  }
`;
