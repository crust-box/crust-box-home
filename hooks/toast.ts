import { create } from "zustand";

export type Toast = {
  msg: string;
  type: "info" | "error" | "success" | "warning";
};

export const useToast = create<{
  show: (t: Toast) => void;
  toast?: Toast;
}>((set) => ({
  show: (t: Toast) => set({ toast: t }),
}));
