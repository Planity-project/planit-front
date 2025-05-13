import styled from "styled-components";

export const CommentStyled = styled.div`
  .comment-minicommentDiv {
    font-size: 12px;
    margin-bottom: 5px;
  }
  .comment-chatMapDiv {
    position: relative;
    display: flex;
    align-items: center;
    gap: 5px;
  }
  .comment-miniPost {
    display: flex;
    align-items: baseline;
    font-size: 11px;
    position: absolute;
    right: 0;
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
