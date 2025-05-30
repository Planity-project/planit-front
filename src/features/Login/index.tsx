import SocialLoginButton from "@/features/Login/icon/index";
import naver from "@/assets/images/sns_naver.svg";
import kakao from "@/assets/images/sns_kakao.svg";
import google from "@/assets/images/sns_google.svg";
import { LoginStyled } from "@/features/Login/styled";
import { useRouter } from "next/router";
import api, { serverUrl } from "@/util/api";
import { Modal } from "antd";
const Login = () => {
  const router = useRouter();
  const { redirect } = router.query;
  const makeLoginUrl = (provider: string) => {
    const base = `${serverUrl}/auth/${provider}`;
    return redirect
      ? `${base}?redirect=${encodeURIComponent(redirect as string)}`
      : base;
  };
  const naverLogin = () => {
    Modal.error({
      title: "네이버 로그인은 테스트 api 이용으로 문의 후 이용이 가능합니다.",
      centered: true,
    });
  };
  const kakaoLogin = () => {
    window.location.href = makeLoginUrl("kakao");
  };
  const googleLogin = () => {
    window.location.href = makeLoginUrl("google");
  };

  const testLogin = () => {
    api.get("/auth/testLogin").then((res: any) => {
      if (res.data.result) {
        window.location.reload();
        router.push("/");
      } else {
        Modal.error({
          title: `${res.data.message}`,
          centered: true,
        });
      }
    });
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
            <SocialLoginButton
              onClick={testLogin}
              text="테스트 로그인"
              backgroundColor="#000000"
              textColor="#ffffff"
            />
          </div>
        </form>
      </div>
    </LoginStyled>
  );
};
export default Login;
