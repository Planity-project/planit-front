import { Modal } from "antd";
import axios from "axios";

const api = axios.create({
  baseURL: "https://planit.ai.kr/api", // ✅ 기본 주소 설정
  withCredentials: true, // 필요한 경우 쿠키 포함 요청
});

export const serverUrl = "https://planit.ai.kr/api";
export const clientUrl = "https://planit.ai.kr";
// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     const status = error.response?.status;
//     if (status === 401) {
//       Modal.warning({
//         centered: true,
//         title: "로그인",
//         content: "로그인 후 다시 시도해주세요.",
//         onOk: () => {
//           window.location.href = "/login";
//         },
//       });
//     }

//     return Promise.reject(error);
//   }
// );

export default api;
