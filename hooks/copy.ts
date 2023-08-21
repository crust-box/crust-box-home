import { useCopyToClipboard } from "react-use";
import { useToast } from "./toast";

export function useCopy() {
  const [, copy] = useCopyToClipboard();
  const t = useToast();
  return (text: any) => {
    copy(text);
    t.show({ type: "success", msg: "已复制" });
  };
}
