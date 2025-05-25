import { useRouter } from "next/router";
import { useEffect } from "react";
import api from "@/util/api";

export default function VerifyPaymentPage() {
  const router = useRouter();

  useEffect(() => {
    if (!router.isReady) return;

    const { albumId, userId, paymentId, txId } = router.query;

    if (paymentId && albumId && userId && txId) {
      api
        .post("/payments/verify", {
          albumId: Number(albumId),
          userId: Number(userId),
          paymentId,
          txId,
          type: "mobile",
        })
        .then(() => {
          alert("결제 정보 전송 완료");
          // 원하면 라우팅 처리도 가능
          router.push(`/albums/detail/${albumId}`);
        })
        .catch((err) => {
          console.error("결제 서버 전송 실패", err);
        });
    }
  }, [router.isReady, router.query]);

  return <div>결제 확인 중...</div>;
}
