import React from "react";
import { StyledButton, LogoImage } from "./styled";

interface Props {
  onClick: () => void;
  iconSrc: string;
  text: string;
  backgroundColor: string;
  textColor?: string;
  className?: string;
}

const SocialLoginButton = ({
  onClick,
  iconSrc,
  text,
  backgroundColor,
  textColor,
  className,
}: Props) => {
  return (
    <StyledButton
      onClick={onClick}
      backgroundColor={backgroundColor}
      textColor={textColor}
      className={className}
      type="button"
    >
      <LogoImage src={iconSrc} alt="logo" />
      {text}
    </StyledButton>
  );
};

export default SocialLoginButton;
