import { ftmLongStr } from "@/utils/tools";
import React from "react";

export function AutoTip(p: { className?: string; text?: string; as?: string; start?: number; end?: number }) {
  const { className, as = "div", text, start = 10, end = 10 } = p;
  return React.createElement(
    as,
    {
      className,
      ...(text && text.length > start + end
        ? { "data-tooltip-id": "tooltip", "data-tooltip-content": text }
        : {}),
    },
    ftmLongStr(text, "-", start, end)
  );
}
