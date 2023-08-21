import { useToast, Toast } from "@/hooks/toast";
import classNames from "classnames";
import { useEffect } from "react";
import { useTimeoutFn } from "react-use";
import { IconType } from "react-icons";
import { FiInfo, FiAlertTriangle, FiXCircle, FiCheckCircle } from "react-icons/fi";
const Icons: { [k in Toast["type"]]: IconType } = {
  error: FiXCircle,
  info: FiInfo,
  success: FiCheckCircle,
  warning: FiAlertTriangle,
};

export function RootToast() {
  const { toast } = useToast();
  const [, , reset] = useTimeoutFn(() => useToast.setState({ toast: undefined }), 3000);
  //   console.info("toast:", toast);
  useEffect(() => {
    toast && reset();
  }, [toast]);
  if (!toast) return;
  const Icon = Icons[toast.type];
  return (
    <div className="toast toast-top toast-center z-[100]">
      <div
        className={classNames("alert", {
          "alert-warning": toast.type === "warning",
          "alert-info": toast.type === "info",
          "alert-success": toast.type === "success",
          "alert-error": toast.type === "error",
        })}
      >
        <Icon />
        <span>{toast.msg}</span>
      </div>
    </div>
  );
}
