import styled from "styled-components";
export const SnsDetailStyled = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 100px;

  .snspost-wrap {
    margin-top: 30px;
    width: 100%;
    height: 85vh; /* 화면 전체 높이 차지 */
    display: flex;
    align-items: flex-end;
    flex-direction: column;
    border-radius: 15px;
  }

  .snspost-topcontainer {
    display: flex;
    width: 70%;
    height: 100%;
  }

  .snspost-topwrap {
    border-right: 1px solid rgba(0, 0, 0, 0.1);
    width: 60%;
    height: 100%;
    position: relative;
    overflow: hidden;
  }

  .snspost-slider {
    display: flex;
    width: 100%;
    height: 100%;
    transition: transform 0.5s ease-in-out;
  }

  .snspost-imageDiv {
    position: relative;
    flex-shrink: 0;
    width: 100%;
    height: 100%;
  }

  .slide-button {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    color: black;
    border: none;
    font-size: 20px;
    cursor: pointer;
    z-index: 1;
  }

  .slide-button.left {
    left: 10px;
  }

  .slide-button.right {
    right: 10px;
  }

  .snspost-comment {
    width: 40%;
    height: 100%;
    display: flex;
    flex-direction: column;
    padding: 20px;
    overflow-y: auto;
  }
  .snspost-titleDiv {
    display: flex;
    flex-direction: column;
    gap: 3px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    margin-bottom: 14px;
  }
  .snspost-location {
    font-size: 12px;
    color: gray;
  }

  .snspost-title {
    font-size: 18px;
    font-weight: 600;
  }
  .snspost-review {
    font-size: 15px;
    margin-bottom: 7px;
  }
  .snspost-footer {
    margin-top: auto;
    border-top: 1px solid #eee;
    padding-top: 10px;
  }

  .snspost-bottomcontainer {
    width: 100%;
    display: flex;
    padding: 10px 30px;
    background-color: #fff;
    box-sizing: border-box;
    position: relative;
    z-index: 10;
    margin-top: 20px;
    border-radius: 10px;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
  }
  .snspost-mydaysbar {
    width: 25%;
    position: fixed;
    top: 100px;
  }
  .snspost-mydayright {
    width: 75%;
  }
  .comment-bottomDiv {
    display: flex;
    flex-direction: column;
    margin-top: auto;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
    padding-top: 10px;
  }
  .comment-likeDiv {
    margin-left: 10px;
    margin-bottom: 10px;
    display: flex;
    align-items: flex-end;
    gap: 8px;
  }
  .comment-likeCnt {
    margin-bottom: 2.5px;
  }
  .comment-likeIcon {
    font-size: 20px;
    color: red;
  }
  .comment-inputDiv {
    display: flex;
    align-items: center;

    justify-content: space-around;
  }
  .comment-inputDiv Input {
    width: 80%;
    border: none;
    border-bottom: 1px solid black;
  }
  .snspost-mydaytext {
    font-size: 18px;
    font-weight: 700;
  }
`;
