import { useEffect } from "react";
import Script from "next/script";
import api from "@/util/api"; // axios 인스턴스

export default function PaymentTestPage() {
  const requestPayment = () => {
    const IMP = (window as any).IMP;
    IMP.init("imp15832056"); // 가맹점 식별 코드

    IMP.request_pay(
      {
        pg: "inicis", // 아임포트 PG사 코드
        pay_method: "card",
        merchant_uid: `mid_${new Date().getTime()}`, // 고유 주문번호
        name: "앨범 결제 테스트",
        amount: 1000,
        buyer_email: "test@example.com",
        buyer_name: "홍길동",
        buyer_tel: "01012345678",
        buyer_addr: "서울특별시 강남구",
        buyer_postcode: "123-456",
      },
      async (rsp: any) => {
        if (rsp.success) {
          try {
            // 결제 성공 후 imp_uid만 서버에 전송
            const res = await api.post("/payments/verify", {
              impuid: rsp.imp_uid, // 서버로 전달할 결제 고유 번호
              albumId: 1, // 결제 할 앨범
              userId: 1, // 결제 한 유저
            });

            alert("결제 성공! 서버 응답: " + JSON.stringify(res.data));
          } catch (err) {
            alert("서버 통신 오류: " + err);
          }
        } else {
          alert("결제 실패: " + rsp.error_msg);
        }
      }
    );
  };

  return (
    <>
      <Script src="https://cdn.iamport.kr/js/iamport.payment-1.2.0.js" />
      <div style={{ padding: "2rem" }}>
        <h1>결제 테스트 페이지</h1>
        <button onClick={requestPayment}>결제하기</button>
      </div>
    </>
  );
}
