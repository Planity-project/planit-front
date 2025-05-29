import styled from "styled-components";

export const SnsMainStyled = styled.div`
  margin-top: 50px;
  width: 100%;

  .snsmain-wrap {
    margin-top: 50px;
    max-width: 1280px;
    margin: 0px auto;

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
    font-size: 22px;
    text-align: center;
    font-weight: 500;
  }
`;
