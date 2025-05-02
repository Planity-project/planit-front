// styled.ts
import styled from "styled-components";

export const ShowWhichStyled = styled.div`
  .show-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
  }

  .show-div {
    width: 100%;
    aspect-ratio: 1/0.8;
    min-height: 400px;
    border-radius: 8px;
  }
  @media (max-width: 550px) {
    .show-div {
      width: 80%;
      aspect-ratio: 1/0.8;
      min-height: 300px;
      border-radius: 8px;
    }
  }
`;
