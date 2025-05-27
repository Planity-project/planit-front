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
  .createpage-minitext {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 15px;
    font-size: 15px;
    font-weight: 400;
    text-align: center;
  }

  .ant-steps-item-process .ant-steps-item-icon {
    background-color: rgba(83, 183, 232, 0.6);
    border-color: rgba(147, 205, 234, 0.6);
  }

  .ant-steps-item-process .ant-steps-item-title {
    color: rgba(83, 183, 232, 0.6);
  }

  .ant-steps-item-finish .ant-steps-item-icon {
    border-color: rgba(83, 183, 232, 0.6);
    background-color: rgba(83, 183, 232, 0.6);
  }

  .ant-steps-item-finish .ant-steps-item-title {
    color: rgba(83, 183, 232, 0.6);
  }

  .ant-steps-item-finish
    > .ant-steps-item-container
    > .ant-steps-item-content
    > .ant-steps-item-title::after {
    background-color: rgba(83, 183, 232, 0.6) !important;
  }

  .ant-steps-item-icon > .ant-steps-icon {
    color: white;
  }

  @media (max-width: 768px) {
    .ant-steps {
      display: none;
    }
  }
`;
