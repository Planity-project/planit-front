import SocialLoginButton from "@/features/Login/icon/index";
import naver from "@/assets/images/sns_naver.svg";
import kakao from "@/assets/images/sns_kakao.svg";
import google from "@/assets/images/sns_google.svg";
import { LoginStyled } from "@/features/Login/styled";

const Login = () => {
  const naverLogin = () => {
    console.log("네이버 로그인 클릭됨");
  };
  const kakaoLogin = () => {
    console.log("카카오 로그인 클릭됨");
  };
  const googleLogin = () => {
    console.log("구글 로그인 클릭됨");
  };

  return (
    <LoginStyled>
      <div className="login-box">
        <h3 className="login-title">로그인</h3>
        <form className="login-form">
          <div className="login-buttons">
            <SocialLoginButton
              onClick={naverLogin}
              iconSrc={naver.src}
              text="네이버 로그인"
              backgroundColor="#11D166"
            />
            <SocialLoginButton
              onClick={kakaoLogin}
              iconSrc={kakao.src}
              text="카카오 로그인"
              backgroundColor="#FFE812"
            />
            <SocialLoginButton
              onClick={googleLogin}
              iconSrc={google.src}
              text="구글 로그인"
              backgroundColor="#ffffff"
              textColor="#000"
              className="google-logo"
            />
          </div>
        </form>
      </div>
    </LoginStyled>
  );
};
export default Login;
