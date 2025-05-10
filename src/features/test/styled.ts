import styled from "styled-components";

export const CustomModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;

  .modal-content {
    background-color: white;
    padding: 20px;
    border-radius: 12px;
    width: auto;
    max-height: 100%;
    overflow: auto;
  }

  .modal-background {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
`;

export const DateChoiceStyled = styled.div`
  .choice-wrap {
    display: flex;
  }

  .choice-bigcontainer {
    margin-top: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }

  .choice-container {
    width: 100%;
    aspect-ratio: 2 / 1;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 12px;
  }

  .rdp-range_start .rdp-day_button,
  .rdp-range_end .rdp-day_button {
    background-color: rgba(83, 183, 232, 0.6) !important;
    border: none;
  }

  .rdp-months {
    display: flex;
    gap: 3rem;
    flex-wrap: nowrap;
  }

  .rdp-caption_label {
    margin-left: 20px;
  }

  .rdp-root {
    font-size: 22px;
    --rdp-accent-color: rgb(83, 183, 232, 0.6) !important;
    --rdp-range_start-date-background-color: rgb(83, 183, 232, 0.6) !important;
    --rdp-range_end-date-background-color: rgb(83, 183, 232, 0.6) !important;
    --rdp-day-height: 60px;
    --rdp-day-width: 60px;
    --rdp-day_button-border-radius: 50%;
    --rdp-day_button-border: none;
    --rdp-day_button-height: 55px;
    --rdp-day_button-width: 55px;
    --rdp-range_middle-background-color: var(--rdp-accent-background-color);
    --rdp-range_start-background: linear-gradient(
      var(--rdp-gradient-direction),
      transparent,
      var(--rdp-range_middle-background-color)
    ) !important;
    --rdp-range_end-background: linear-gradient(
      var(--rdp-gradient-direction),
      var(--rdp-range_middle-background-color),
      transparent
    );
  }

  .choice-btnDiv {
    margin-top: 20px;
    width: 70%;
    display: flex;
    justify-content: end;
  }

  .choice-btnDiv Button {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(83, 183, 232, 0.6);
    border-radius: 5px;
    color: white;
    border: none;
    padding: 20px 20px;
  }

  .choice-btnDiv .ant-btn[disabled] {
    background-color: #ccc;
    border-color: #ccc;
    color: #666;
  }
`;
