import styled from "styled-components";

export const CommentStyled = styled.div`
  .comment-chatMapDiv {
    position: relative;
    display: flex;
    flex-direction: column;
  }

  .comment-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .comment-left {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .comment-namechat {
    display: flex;
    gap: 4px;
  }

  .comment-chatDiv {
    font-size: 14px;
    font-weight: 500;
  }

  .comment-right {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .comment-commentimg {
    width: 30px;
    height: 30px;
    border: 1px solid rgba(0, 0, 0, 0.4);
    border-radius: 50%;
  }

  .comment-menu {
    position: absolute;
    top: 2.5rem;
    right: 0;
    background-color: white;
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 0.5rem;
    z-index: 10;
  }

  .comment-miniPost {
    margin-left: 40px;
    display: flex;
    align-items: baseline;
    font-size: 11px;
    gap: 10px;
  }

  .comment-minicommentDiv {
    margin-left: 9px;
    font-size: 10px;
    margin-bottom: 5px;
    cursor: pointer;
  }

  .comment-miniMapDiv {
    margin-left: 5px;
    display: flex;
    align-items: center;
    font-size: 12px;
    gap: 5px;
  }

  .comment-miniimg {
    width: 25px;
    height: 25px;
    border: 1px solid rgba(0, 0, 0, 0.4);
    border-radius: 50%;
  }

  .comment-heartIcon {
    color: red;
    font-size: 16px;
    cursor: pointer;
  }

  .ellipsis-menu-trigger {
    width: 100%;
    cursor: pointer;
    position: relative;
  }

  .comment-textdiv {
    padding: 0px 1px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 12px;
  }

  .comment-menu {
    width: 44px;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 30px;
    position: absolute;
    top: 23px;
    border-radius: 3px;
    z-index: 1000;
  }
`;
