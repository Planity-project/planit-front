import * as PortOne from "@portone/browser-sdk/v2";
import api from "@/util/api";
import { serverUrl, clientUrl } from "@/util/api";
export default function PaymentTestPage() {
  const shortUuid = crypto.randomUUID().slice(0, 24);
  const handlePayment = async () => {
    try {
      const albumId = 1;
      const userId = 1;

      const paymentResult: any = await PortOne.requestPayment({
        storeId: "store-1bb9d540-a71d-4d62-b468-4457faae2c26", // 실제 상점 아이디로 교체
        channelKey: "channel-key-e0f2e877-f689-4b1f-8d3d-d15c0835da51", // PortOne 콘솔에서 발급받은 채널 키
        paymentId: `payment-${shortUuid}`,
        orderName: "Planit Share Album",
        totalAmount: 1000,
        currency: "CURRENCY_KRW",
        payMethod: "CARD",
        customer: {
          fullName: "안상현",
          phoneNumber: "010-4908-8337",
          email: "test@example.com",
        },
        redirectUrl: "http://localhost:3000/payment/verify",
      });
      console.log(paymentResult, "결제 정보");
      if (paymentResult) {
        const res = await api.post("/payments/verify", {
          paymentId: paymentResult.paymentId,
          albumId: 1,
          userId: 1,
          txId: paymentResult.txId,
          type: "desktop",
        });
        console.log(res.data);
      }

      // 결제 성공 후 서버에 결제정보 전달
      // const res = await api.post("/payments/verify", {
      //   impuid: paymentResult.impUid,
      //   albumId: 1,
      //   userId: 1,
      // });

      // alert("결제 성공! 서버 응답: " + JSON.stringify(res.data));
    } catch (error: any) {
      if (error.code === "USER_CANCEL") {
        alert("사용자가 결제를 취소했습니다.");
      } else {
        alert("결제 실패: " + error.message);
      }
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>결제 테스트 페이지</h1>
      <button onClick={handlePayment}>결제하기</button>
    </div>
  );
}
