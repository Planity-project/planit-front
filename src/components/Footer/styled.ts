import styled from "styled-components";

export const FooterStyled = styled.div`
  display: flex;
  align-items: baseline;
  width: 100%;
  margin-top: 100px;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  background-color: rgb(250, 250, 250);

  .footer-wrap {
    padding: 24px 40px;
    display: flex;
    gap: 7px;
    flex-direction: column;
    justify-content: center;
    margin-left: 24px;

    .footer-textBox {
      display: flex;
      flex-direction: column;
      gap: 3px;
    }
    .fontcolor {
      color: rgb(170, 177, 184);
    }
  }
`;
