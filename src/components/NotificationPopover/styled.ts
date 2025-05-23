import styled from "styled-components";

export const NotificationStyled = styled.div`
  .notification-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid;
    padding: 8px 12px;

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
      margin-left: auto;
      background: none;
      border: none;
      color: rgb(83, 183, 232, 1);
      font-size: 12px;
      cursor: pointer;
    }
  }

  .notification-list {
    max-height: 300px;
    overflow-y: auto;
    cursor: pointer;

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
        flex: 1;

        .message {
          font-size: 14px;
          color: #333;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .timestamp {
          font-size: 12px;
          color: #999;
          margin-top: 4px;
        }
      }
    }

    .empty {
      text-align: center;
      color: #999;
      padding: 20px 0;
    }
  }
`;
