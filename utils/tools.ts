import { AxiosError } from "axios";
import numbro from "numbro";

export type Fun<T> = (...args: any[]) => T;

export function tryRun<T>(fn: Fun<T>, ...args: any[]): T | undefined {
  try {
    return fn(...args);
  } catch (error) {
    return undefined;
  }
}

export function ftmCount(s: number | undefined | null, def: string = "-", config: numbro.Format = {}) {
  if (typeof s === "undefined" || s === null) return def;
  return numbro(s).format({ thousandSeparated: true, ...config });
}

export function ftmSize(s: number | undefined | null, def: string = "-", config: numbro.Format = {}) {
  if (typeof s === "undefined" || s === null) return def;
  return numbro(s)
    .format({ output: "byte", base: "binary", mantissa: 2, spaceSeparated: false, ...config })
    .replace("i", "");
}

export function ftmLongStr(str: string | undefined | null, def: string = "-", start: number = 10, end: number = 10) {
  if (!str) return def;
  if (str.length <= start + end) return str;
  return str.substring(0, start) + "..." + str.substring(str.length - end);
}

export function ftmTime(time: string) {}

export function getErrorMsg(error: AxiosError | any): string {
  if (!error) return "Unkown Error";
  if (typeof error === "string") return error as string;
  if (error instanceof AxiosError) {
    return error.response?.data?.msg || error.response?.data?.message || error.message || "Unkown Error";
  }
  return error.message || "Unkown Error";
}
