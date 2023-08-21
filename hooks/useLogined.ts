import { Logined } from "@/types/common";
import { ListFile } from "@/types/file";
import { tryRun } from "@/utils/tools";
import { create } from "zustand";

const getLocalLogined = () => {
  if (typeof window === "undefined") return undefined;
  const user = tryRun(() => JSON.parse(localStorage.getItem("logined") as string) as Logined);
  if (!user) return undefined;
  return user;
};

export const useLogined = create<{
  logined?: Logined;
  setLogined: (logined?: Logined) => void;
}>((set) => ({
  logined: getLocalLogined(),
  setLogined: (logined?: Logined) => {
    localStorage.setItem("logined", JSON.stringify(logined));
    set({ logined });
  },
}));

export function downUrl(f: ListFile) {
  const domain = f.host.replace("https://", "");
  const uuid = useLogined.getState().logined?.uuid;
  return `https://${uuid}.${domain}/ipfs/${f.cid}`;
}
