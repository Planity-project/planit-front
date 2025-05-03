import { useUser } from "@/context/UserContext"; // useUser 훅을

const SuccessPage = () => {
  const user = useUser();

  if (!user) {
    return <div>로그인된 사용자가 없습니다.</div>;
  }

  return (
    <div>
      <h1> {user.nickname}님 안녕하세요</h1>{" "}
    </div>
  );
};

export default SuccessPage;
