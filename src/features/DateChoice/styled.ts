import styled from "styled-components";

export const DateChoiceStyled = styled.div`
  .choice-wrap {
    width: 100%;
    max-width: 1280px;
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
    width: 70%;
    aspect-ratio: 1/0.5;
    display: flex;
    justify-content: center;
    flex-direction: column; /* DayPicker 밑에 텍스트가 있다면 필요 */
    align-items: center;
    border: 1px solid rgb(0, 0, 0, 0.2);
    border-radius: 12px;
  }

  .choice-text {
    font-size: 24px;
    font-weight: 700;
    text-align: center;
    margin-bottom: 50px;
  }
  .rdp-range_start .rdp-day_button,
  .rdp-range_end .rdp-day_button {
    background-color: rgb(83, 183, 232, 0.6) !important;
    border: none;
  }
  .rdp-months {
    display: flex;
    gap: 3rem;
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
  @media (max-width: 1480px) {
    .choice-container {
      width: 90%;
      .rdp-root {
        font-size: 20px;
        --rdp-day-height: 60px;
        --rdp-day-width: 60px;
        --rdp-day_button-height: 60px;
        --rdp-day_button-width: 60px;
      }
    }
  }
  @media (max-width: 1280px) {
    .choice-container {
      width: 90%;
      .rdp-root {
        font-size: 22px;
        --rdp-day-height: 45px;
        --rdp-day-width: 45px;
        --rdp-day_button-height: 60px;
        --rdp-day_button-width: 60px;
      }
    }
  }
  @media (max-width: 1000px) {
    .rdp-months {
      display: flex;
      gap: 2rem;
    }
    .choice-container {
      width: 95%;
      aspect-ratio: 1/0.6 !important;
      .rdp-root {
        font-size: 18px;
        --rdp-day-height: 30px;
        --rdp-day-width: 30px;
        --rdp-day_button-height: 48px;
        --rdp-day_button-width: 48px;
      }
    }
  }
  @media (max-width: 768px) {
    .choice-container {
      width: 70%;
      aspect-ratio: 1/0.8 !important;
      .rdp-root {
        font-size: 20px;
        --rdp-day-height: 40px;
        --rdp-day-width: 40px;
        --rdp-day_button-height: 45px;
        --rdp-day_button-width: 45px;
      }
    }
  }
  @media (max-width: 500px) {
    .choice-container {
      width: 85%;
      aspect-ratio: 1/1 !important;
      .rdp-root {
        font-size: 18px;
        --rdp-day-height: 40px;
        --rdp-day-width: 40px;
        --rdp-day_button-height: 40px;
        --rdp-day_button-width: 40px;
      }
    }
  }
`;
