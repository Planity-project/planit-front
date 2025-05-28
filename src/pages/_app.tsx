// pages/_app.tsx
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "antd/dist/antd.css";
import { useRouter } from "next/router";
import { Modal } from "antd";
import Loding from "@/components/Loding";
import { useUser, UserProvider } from "@/context/UserContext";
import { usePathname } from "next/navigation";
import { clientUrl } from "@/util/api";
// ✅ 로그인 검사 포함된 컴포넌트
function AppWithAuthGuard({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, isLoading } = useUser();
  const [loading, setLoading] = useState(false);

  const excludedFooterPages = [
    "/",
    "/login",
    "/signup",
    "/album",
    "/snsmainpage",
    "/invite",
  ];
  const isFooterExcluded = excludedFooterPages.includes(pathname ?? "");

  const isPublicRoute =
    ["/", "/loginpage", "/invite", "/snsmainpage"].some(
      (route) => pathname === route
    ) || pathname?.startsWith("/snsmainpage/");

  useEffect(() => {
    if (isLoading) return;

    if (!user && !isPublicRoute) {
      Modal.warning({
        title: "로그인 후 이용가능합니다.",
        onOk: () => {
          router.replace("/loginpage");
        },
      });
    }
  }, [user, isLoading, pathname]);

  useEffect(() => {
    window.scrollTo(0, 0);

    let startTime = 0;
    let timeout: NodeJS.Timeout | null = null;

    const start = () => {
      startTime = Date.now();
      setLoading(true);
    };

    const end = () => {
      setLoading(false);
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

  if (isLoading) return <Loding />;

  return (
    <div className="app">
      <Header />
      <main className="main-content">
        {loading ? <Loding /> : <Component {...pageProps} />}
      </main>
      {!isFooterExcluded && <Footer />}
    </div>
  );
}

// ✅ 최상위에서 UserProvider로 감쌈
export default function MyApp(appProps: AppProps) {
  return (
    <>
      <Head>
        <title>PLANIT</title>
        <meta property="og:title" content="Planit 여행 플래너!" />
        <meta
          property="og:description"
          content="함께한 추억을 사진으로 공유해보세요."
        />
        <meta property="og:image" content={`${clientUrl}/def.png`} />
        <meta property="og:url" content={clientUrl} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <UserProvider>
        <AppWithAuthGuard {...appProps} />
      </UserProvider>
    </>
  );
}
