import dynamic from "next/dynamic";
const Root = dynamic(() => import("@/components/root"), { ssr: false });

export default function Home() {
  return <Root />;
}
