import env from "@/env";
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
  const gate = env.gateways.find((item) => item.up === f.meta?.gateway);
  const gateBase =
    typeof gate?.down !== "undefined" ? (typeof gate.down === "string" ? gate.down : gate.down[0]) : undefined;
  const base = gateBase || "https://ipfs.io";
  return `${base}/ipfs/${f.cid}`;
}
