import { authConfig, psaPin } from "@/http/api";
import { FileMeta } from "@/types/file";
import axios from "axios";
import { useRef, useState } from "react";
import { useToast } from "./toast";
import { getErrorMsg } from "@/utils/tools";

const gateways: { up: string; down: string|string[] }[] = [
  {
    up: "",
    down: "",
  },
  {
    up: "",
    down: "",
  },
  {
    up: "",
    down: "",
  },
  {
    up: "",
    down: "",
  },
];

export function useUpFile(gateway?: string) {
  const toast = useToast();
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);
  const abort = useRef(new AbortController());
  const upFile = async (file: File, meta: FileMeta) => {
    if (!gateway || loading) return false;
    const form = new FormData();
    form.append("file", file);
    form.append("meta", JSON.stringify(meta));
    setLoading(true);
    setProgress(0);
    try {
      // upload
      const res = await axios.post<{ Hash: string; Name: string }>(`${gateway}/api/v0/add?pin=true`, form, {
        ...authConfig(),
        onUploadProgress(e) {
          setProgress(e.progress as number);
        },
        signal: abort.current.signal,
      });
      const info = res.data;
      // pin
      await psaPin(info.Hash, info.Name);
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
