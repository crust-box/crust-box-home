import { create } from "zustand";

export function Loading() {
  return (
    <div className="w-full h-full mx-auto flex items-center justify-center">
      <span className="loading loading-ring w-16 text-3xl text-primary"></span>
    </div>
  );
}

export const useRootLoading = create<{
  show: boolean;
  visible: (show: boolean) => void;
}>((set) => ({ show: false, visible: (show) => set({ show }) }));


export function withRootLoading<T>(fn: () => Promise<T>){
    useRootLoading.getState().visible(true)
    return fn().finally(() => useRootLoading.getState().visible(false))
}

export function RootLoading() {
  const { show } = useRootLoading();
  if (!show) return null;
  return (
    <div className="fixed top-0 left-0 z-[60] w-screen h-screen bg-black/25 flex items-center justify-center">
      <span className="loading loading-ring w-16 text-3xl text-primary"></span>
    </div>
  );
}
