import type { AppProps } from "next/app";
import "../public/globals.css";
import "react-tooltip/dist/react-tooltip.css";
import { useEffect } from "react";
import { modalRootRef } from "@/components/modal";
import { Tooltip } from "react-tooltip";
import { RootToast } from "@/components/toast";
import { RootLoading } from "@/components/loading";
export default function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    modalRootRef.current = document.body as any;
  });
  return (
    <>
      <Component {...pageProps} />
      <Tooltip id="tooltip" />
      <RootLoading />
      <RootToast />
    </>
  );
}
