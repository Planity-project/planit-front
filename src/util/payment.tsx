import * as PortOne from "@portone/browser-sdk/v2";
import api from "@/util/api";
import { Modal } from "antd";

export const handlePayment = async (albumId: number, user: any) => {
  const shortUuid = crypto.randomUUID().slice(0, 24);

  try {
    const paymentResult: any = await PortOne.requestPayment({
      storeId: "store-1bb9d540-a71d-4d62-b468-4457faae2c26",
      channelKey: "channel-key-e0f2e877-f689-4b1f-8d3d-d15c0835da51",
      paymentId: `payment-${shortUuid}`,
      orderName: "Planit Share Album",
      totalAmount: 9900,
      currency: "CURRENCY_KRW",
      payMethod: "CARD",
      customer: {
        fullName: `${user?.nickname}`,
        phoneNumber: "010-4908-8337",
        email: `${user?.email}`,
      },
      redirectUrl: `http://localhost:3000/payment/verify?albumId=${albumId}&userId=${user?.id}`,
    });

    if (paymentResult) {
      await api.post("/payments/verify", {
        paymentId: paymentResult.paymentId,
        albumId: albumId,
        userId: user?.id,
        txId: paymentResult.txId,
        type: "desktop",
      });

      return true;
    }

    return false;
  } catch (error: any) {
    if (error.code === "USER_CANCEL") {
      Modal.info({
        title: "결제 취소",
        content: "사용자가 결제를 취소했습니다.",
      });
    } else {
      Modal.error({
        title: "결제 실패",
        content: `결제 실패: ${error.message}`,
      });
    }

    return false;
  }
};
