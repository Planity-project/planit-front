import styled from "styled-components";

export const Createpage = styled.div`
  .ant-steps {
    width: 50%;
    display: flex;
    justify-content: center;
  }

  .createpage-step {
    margin-top: 20px;
    height: 40px !important;
    display: flex;
    justify-content: center;
    align-items: flex-end;
  }
  .createpage-text {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
    font-size: 24px;
    font-weight: 700;
    text-align: center;
  }
  @media (max-width: 768px) {
    .ant-steps {
      display: none;
    }
  }
`;
