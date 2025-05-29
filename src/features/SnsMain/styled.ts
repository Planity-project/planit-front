import styled from "styled-components";

export const SnsMainStyled = styled.div`
  width: 100%;

  .snsmain-wrap {
    max-width: 1280px;
    margin: 50px auto;

    @media (max-width: 768px) {
      padding: 0px 10px;
    }
  }
  .snsmain-noData {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 15px;
    font-weight: 500;
    margin: 200px auto;
  }
  .AlbumMain-title {
    width: 100%;
    font-size: 22px;
    text-align: center;
    font-weight: 500;
  }
  .snsmain-container {
    margin-top: 5px;
    width: 100%;
    aspect-ratio: 1 / 0.8;
  }
`;
