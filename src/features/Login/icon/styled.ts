import styled from "styled-components";

export const StyledButton = styled.button<{
  backgroundColor: string;
  textColor?: string;
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 16px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 500;
  width: 200px;
  margin: 8px 0;
  cursor: pointer;
  border: none;
  background-color: ${(props) => props.backgroundColor};
  color: ${(props) => props.textColor || "#000"};
`;

export const LogoImage = styled.img`
  width: 30px;
  height: 30px;
  margin-right: 8px;
`;
