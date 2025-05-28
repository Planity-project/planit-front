// pages/404.tsx
import Link from "next/link";
import styled from "styled-components";
import { useRouter } from "next/router";
const NotFoundPage = () => {
  const router = useRouter();
  return (
    <NotFoundStyled>
      <h1>404 - 페이지를 찾을 수 없습니다</h1>
      <p>요청하신 페이지가 존재하지 않거나, 삭제되었습니다.</p>
      <div
        onClick={() => {
          router.push("/");
        }}
      >
        🏠 메인 페이지로 이동
      </div>
    </NotFoundStyled>
  );
};

export default NotFoundPage;

const NotFoundStyled = styled.div`
  text-align: center;
  padding: 100px 20px;
  font-family: sans-serif;

  h1 {
    font-size: 3rem;
    margin-bottom: 20px;
  }

  p {
    font-size: 1.25rem;
    margin-bottom: 30px;
  }
`;
