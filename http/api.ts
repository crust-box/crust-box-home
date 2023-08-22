import env from "@/env";
import { useLogined } from "@/hooks/useLogined";
import { Logined } from "@/types/common";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import useSwr from "swr";
export const useSWR = useSwr;

const maxio = axios.create({ withCredentials: true, baseURL: env.baseUrl });

function creatUrl(path: `/${string}`) {
  return `${env.baseUrl}${path}`;
}

export interface Res<T> {
  code: number;
  message: string;
  data: T;
}

export function authConfig(): AxiosRequestConfig {
  const ld = useLogined.getState().logined;
  if (!ld) return {};
  return { headers: { Authorization: `Bearer ${ld.signature}` } };
}

function getData<T>(res: AxiosResponse<T>) {
  return res.data;
}

function getResData<T>(res: AxiosResponse<Res<T>>) {
  const mRes = res.data;
  if (!mRes || mRes.code !== 200) throw mRes.message;
  return mRes.data;
}

export async function authGetResData<T>(path: `/${string}}`, params: any = {}) {
  const res = await maxio.get<Res<T>>(path, { ...authConfig(), params });
  return getResData(res);
}

export async function login(name: string, password: string) {
  const res = await maxio.post<Res<Logined>>("/common/login", { username: name, password });
  return getResData(res);
}

export async function psaPin(cid: string, name: string, size: number) {
  await maxio.post("/psa/pin", { cid, name, size: size.toFixed(0) }, authConfig());
}

export async function deleteFile(id: number) {
  await maxio.post("/auth/file/delete", { id }, authConfig());
}
