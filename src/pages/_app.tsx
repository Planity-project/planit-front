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
  ];
  const isFooterExcluded =
    excludedFooterPages.includes(pathname ?? "") ||
    (pathname?.startsWith("/snsmainpage/snsdetail") ?? false);

  const publicRoutes = ["/", "/loginpage", "/snsmainpage"];
  const isPublicRoute = publicRoutes.includes(pathname ?? "");

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
      </Head>
      <UserProvider>
        <AppWithAuthGuard {...appProps} />
      </UserProvider>
    </>
  );
}
