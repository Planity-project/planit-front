import { useRouter } from "next/router";
import { useEffect } from "react";
import api from "@/util/api";

export default function VerifyPaymentPage() {
  const router = useRouter();

  useEffect(() => {
    const { albumId, userId, paymentId, txId } = router.query;

    if (paymentId) {
      api
        .post("/payments/verify", {
          albumId,
          userId,
          paymentId,
          txId,
          type: "mobile",
        })
        .then(() => {
          alert("결제 정보 전송 완료");
        })
        .catch((err) => {
          console.error("결제 서버 전송 실패", err);
        });
    }
  }, [router.query]);

  return <div>결제 확인 중...</div>;
}
