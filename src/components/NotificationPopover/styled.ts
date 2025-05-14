import styled from "styled-components";

export const NotificationStyled = styled.div`
  min-width: 250px;
  max-height: 400px;
  overflow-y: auto;
  padding: 10px;

  .notification-header {
    margin-bottom: 5px;
    font-weight: bold;
  }

  .notification-item {
    margin-bottom: 10px;
    padding-bottom: 8px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);

    p {
      margin: 0;
    }

    small {
      display: block;
      font-size: 0.75rem;
      margin-top: 4px;
    }
  }
`;
