import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useContext, useEffect, useState } from "react";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "antd/dist/antd.css";
import { useRouter } from "next/router";
import Script from "next/script";
import { UserProvider } from "@/context/UserContext";
import Loding from "@/components/Loding"; // 스피너 컴포넌트
import { usePathname } from "next/navigation";
import { useUser } from "@/context/UserContext";
import { Modal } from "antd";
export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();
  const { user } = useUser();
  const excludedFooterPages = [
    "/",
    "/login",
    "/signup",
    "/album",
    "/snsmainpage",
  ];
  const isFooterExcluded =
    excludedFooterPages.includes(pathname ?? "") ||
    (pathname?.startsWith("/snsmainpage/snsdetail") ?? false);
  console.log(user);
  const publicRoutes = ["/", "/loginpage", "/snsmainpage"]; // 로그인 없이 접근 허용
  const isPublicRoute = publicRoutes.includes(pathname ?? "");

  useEffect(() => {
    // ✅ 로그인 안 했고 비공개 경로일 경우 로그인으로 리다이렉트
    if (!user && !isPublicRoute) {
      Modal.warning({
        title: "로그인 후 이용가능합니다.",
        onOk: () => {
          router.replace("/loginpage");
        },
      });
    }
  }, [user, pathname]);

  useEffect(() => {
    window.scrollTo(0, 0);

    let startTime = 0;
    let timeout: NodeJS.Timeout | null = null;

    const start = () => {
      startTime = Date.now();
      setLoading(true);
    };

    const end = () => {
      const elapsed = Date.now() - startTime;
      const remaining = 800 - elapsed;

      if (remaining > 0) {
        timeout = setTimeout(() => setLoading(false), remaining);
      } else {
        setLoading(false);
      }
    };

    router.events.on("routeChangeStart", start);
    router.events.on("routeChangeComplete", end);
    router.events.on("routeChangeError", end);

    return () => {
      if (timeout) clearTimeout(timeout);
      router.events.off("routeChangeStart", start);
      router.events.off("routeChangeComplete", end);
      router.events.off("routeChangeError", end);
    };
  }, []);

  return (
    <>
      <Head>
        <title>PLANIT</title>
      </Head>
      <UserProvider>
        <div className="app">
          <Header />
          <main className="main-content">
            {loading ? <Loding /> : <Component {...pageProps} />}
          </main>
          {!isFooterExcluded && <Footer />}
        </div>
      </UserProvider>
    </>
  );
}
