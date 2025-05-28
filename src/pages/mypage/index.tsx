// pages/mypage/index.tsx
import { useEffect } from "react";
import { useRouter } from "next/router";

const MypageIndex = () => {
  const router = useRouter();

  useEffect(() => {
    router.replace("/mypage/info"); // 기본 탭은 "내 정보"
  }, [router]);

  return null;
};

export default MypageIndex;
