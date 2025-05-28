// pages/404.tsx
import Link from "next/link";
import styled from "styled-components";
import { useRouter } from "next/router";
import Image from "next/image";
const NotFoundPage = () => {
  const router = useRouter();
  return (
    <NotFoundStyled>
      <div className="error-img">
        <Image src={"/defaultImage.png"} alt="" width={200} height={200} />
      </div>
      <div className="error-title">404</div>
      <div className="error-detail">
        요청하신 페이지가 존재하지 않거나, 삭제되었습니다.
      </div>
    </NotFoundStyled>
  );
};

export default NotFoundPage;

const NotFoundStyled = styled.div`
  text-align: center;
  padding: 100px 20px;
  font-family: sans-serif;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .error-img {
    width: 50%;
    height: 50%;
  }
  .error-title {
    font-size: 18px;
    font-weight: 900;
  }
  .error-detail {
    font-size: 14px;
    font-weight: 500;
  }
`;
