import { useLogined } from "@/hooks/useLogined";
import classNames from "classnames";
import Login from "./login";
import Main from "./main";

export default function Root() {
  const logined = useLogined((s) => s.logined);
  return (
    <div className="w-full h-full flex flex-col items-center overflow-y-auto" suppressHydrationWarning>
      <div className="w-full z-10 h-16 bg-primary shrink-0 sticky top-0"></div>
      <div className={classNames("flex-1 w-full items-center flex flex-col", { "bg-zinc-100": logined })}>
        {logined ? <Main /> : <Login />}
      </div>
    </div>
  );
}
