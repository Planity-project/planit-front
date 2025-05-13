import styled from "styled-components";

export const CommentStyled = styled.div`
  .comment-minicommentDiv {
    margin-left: 9px;
    font-size: 10px;
    margin-bottom: 5px;
    cursor: pointer;
  }
  .comment-chatMapDiv {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 5px;
  }
  .comment-miniPost {
    margin-left: 40px;
    display: flex;
    align-items: baseline;
    font-size: 11px;
    gap: 10px;
  }
  .comment-heartIcon {
    position: absolute;
    right: 0;
    top: 10px;
    color: red;
  }
  .comment-nameDiv {
    display: flex;
    align-items: center;
    gap: 6px;
    margin-left: 5px;
  }
  .comment-chatDiv {
    font-size: 14px;
    font-weight: 500;
  }
  .comment-commentimg {
    width: 30px;
    height: 30px;
    border: 1px solid rgba(0, 0, 0, 0.4);
    border-radius: 50%;
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
`;
