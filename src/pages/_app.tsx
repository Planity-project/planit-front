import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import axios from "axios";
import "antd/dist/antd.css";
import { useRouter } from "next/router";
import Script from "next/script";
import { UserProvider } from "@/context/UserContext";
import Loding from "@/components/Loding"; // 스피너 컴포넌트
import { usePathname } from "next/navigation";
export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();
  const excludedFooterPages = ["/", "/login", "/signup"];
  const isFooterExcluded =
    excludedFooterPages.includes(pathname) ||
    pathname.startsWith("/snsmainpage/snsdetail");

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
      const remaining = 1000 - elapsed; // 최소 2초 유지

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
