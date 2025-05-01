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

// 최상위 App 컴포넌트
export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const excludedFooterPages = ["/", "/login", "/signup"];
  return (
    <>
      <Head>
        <title>PLANIT</title>
        <Script
          strategy="afterInteractive" //"beforeInteractive"으로 찾았는데 경고메세지 떠가지고 after로 수정해줬습니다.
          src={`https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=ncp_iam_BPAMKR18hv9RBgxjXe5H`}
        ></Script>
      </Head>

      <Header />
      {/* loading ? <LoadingSpinner /> : */}
      {<Component {...pageProps} />}
      {!excludedFooterPages.includes(router.pathname) && <Footer />}
    </>
  );
}
