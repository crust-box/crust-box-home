import { useSetState } from "react-use";
import { LableInput } from "./input";
import { Modal } from "./modal";
import { useUpFile } from "@/hooks/useUpFile";
import { FileMeta } from "@/types/file";

export function UpFileModal(p: { file: File; gateway: string; onSuccess: () => void; onClose?: () => void }) {
  const { file, gateway, onClose, onSuccess } = p;
  const [meta, setInput] = useSetState<FileMeta>({
    reportCode: "",
    sampleType: "",
    customerCode: "",
    clinicCode: "",
  });
  const { reportCode, sampleType, customerCode, clinicCode } = meta;
  const disableOk = !reportCode || !sampleType || !customerCode || !clinicCode;
  const { upFile, abort, loading, progress } = useUpFile(gateway);
  return (
    <Modal
      title="文件上传"
      modalClassName="w-[30rem]"
      onClose={() => {
        onClose && onClose();
        abort.current?.abort();
      }}
    >
      <div className="w-full flex flex-col px-5 gap-5 max-h-mc overflow-y-auto">
        <LableInput
          lable="报告号码"
          maxLength={64}
          value={reportCode}
          onChange={(e) => setInput({ reportCode: e.target.value })}
        />
        <LableInput
          lable="样本种类"
          maxLength={32}
          value={sampleType}
          onChange={(e) => setInput({ sampleType: e.target.value })}
        />
        <LableInput
          lable="客户编码"
          maxLength={64}
          value={customerCode}
          onChange={(e) => setInput({ customerCode: e.target.value })}
        />
        <LableInput
          lable="诊所编码"
          maxLength={32}
          value={clinicCode}
          onChange={(e) => setInput({ clinicCode: e.target.value })}
        />
      </div>
      <div className="w-full px-5 mt-5">
        {loading ? (
          <div className="w-full py-5">
            <progress className="progress progress-success w-full" max={100} value={progress}></progress>
          </div>
        ) : (
          <button
            className="btn btn-primary w-full"
            disabled={disableOk}
            onClick={() => {
              upFile(file, meta).then((success) => {
                success && onSuccess();
              });
            }}
          >
            确认上传
          </button>
        )}
      </div>
    </Modal>
  );
}
