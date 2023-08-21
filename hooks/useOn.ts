import { useLayoutEffect } from "react";
import { useCallback } from "react";
import { useRef } from "react";
export function useOn<T extends (...args: any[]) => any>(fn: T) {
  const ref = useRef<T>(fn);
  useLayoutEffect(() => {
    ref.current = fn;
  });
  return useCallback<T>(
    ((...args: any[]) => {
      return ref.current && ref.current(...args);
    }) as T,
    [],
  );
}
