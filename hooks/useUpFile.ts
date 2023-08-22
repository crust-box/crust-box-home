import { authConfig, psaPin } from "@/http/api";
import { FileMeta } from "@/types/file";
import axios, { AxiosProgressEvent } from "axios";
import { useRef, useState } from "react";
import { useToast } from "./toast";
import { getErrorMsg } from "@/utils/tools";

export type GatewayType = { up: string; down?: string | string[] };

const gateways: GatewayType[] = [
  {
    up: "https://gw.crustfiles.net",
  },
  {
    up: "https://gw.smallwolf.me",
  },
  {
    up: "https://crust.fans",
  },
  {
    up: "https://crustgateway.com",
  },
  {
    up: "https://crustgateway.online",
  },
];

async function tryToUpload(file: File, abort: AbortController, onProgress: (p: number) => void) {
  let progress = 0;
  const upload = async (gateway: GatewayType, timeout: number = 4000) => {
    let event: AxiosProgressEvent;
    setTimeout(() => {
      if (!event || event.bytes === 0) {
        abort.abort();
      }
    }, timeout);
    const form = new FormData();

    form.append("file", file);
    const res = await axios.post<{ Hash: string; Name: string }>(`${gateway.up}/api/v0/add?pin=true`, form, {
      ...authConfig(),
      onUploadProgress(e) {
        event = e;
        const _progress = e.total ? e.loaded / e.total : 0;
        progress = Math.max(_progress, progress);
        console.info("progress:", progress);
        onProgress(progress);
      },
      signal: abort.signal,
    });
    return { ...res.data, gateway: gateway.up };
  };
  let error;
  for (const gateway of gateways) {
    try {
      const res = await upload(gateway);
      return res;
    } catch (_error) {
      error = _error;
    }
  }
  throw error;
}

export function useUpFile() {
  const toast = useToast();
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);
  const abort = useRef(new AbortController());
  const upFile = async (file: File, meta: FileMeta) => {
    if (loading) return false;
    setLoading(true);
    setProgress(0);
    try {
      // upload
      const info = await tryToUpload(file, abort.current, setProgress);
      // pin
      meta.gateway = info.gateway;
      await psaPin(info.Hash, info.Name, file.size, meta);
      return true;
    } catch (error) {
      toast.show({ type: "error", msg: getErrorMsg(error) });
      return false;
    } finally {
      setLoading(false);
      setProgress(0);
    }
  };
  return { progress, loading, abort, upFile };
}
