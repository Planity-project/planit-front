import styled from "styled-components";

export const NotificationStyled = styled.div`
  width: 100%;
  .notification-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid;
    padding: 8px 6px;

    .tab {
      background: none;
      border: none;
      padding: 6px 12px;
      cursor: pointer;
      font-weight: 500;
    }

    .tab.active {
      color: rgb(83, 183, 232, 1);
    }

    .mark-all-read {
      background: none;
      border: none;
      color: rgb(83, 183, 232, 1);
      font-size: 12px;
      cursor: pointer;
    }
  }

  .notification-list {
    width: 100%;
    max-height: 300px;
    overflow-y: auto;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;
    &::-webkit-scrollbar {
      width: 8px;
    }

    &::-webkit-scrollbar-thumb {
      background-color: transparent;
      border-radius: 10px;
      transition: background-color 0.3s ease;
    }

    &::-webkit-scrollbar-track {
      background-color: whitesmoke;
    }

    &:hover::-webkit-scrollbar-thumb,
    .scrolling &::-webkit-scrollbar-thumb {
      background-color: rgba(185, 177, 177, 0.3);
    }

    .notification-item {
      width: 100%;
      display: flex;
      padding: 10px;
      border-bottom: 1px solid rgba(0, 0, 0, 0.2);

      &.unread {
        background-color: rgb(83, 183, 232, 0.1);
      }

      &.read {
        background-color: #ffffff;
      }

      .profile-icon {
        font-size: 24px;
        margin-right: 10px;
      }

      .content {
        width: 250px;

        .message {
          font-size: 13px;
          color: #333;
          overflow: hidden;
        }

        .timestamp {
          font-size: 12px;
          color: #999;
          margin-top: 4px;
        }
      }
    }

    .empty {
      width: 250px;
      text-align: center;
      color: #999;
      padding: 20px 10px;
    }
  }
`;
