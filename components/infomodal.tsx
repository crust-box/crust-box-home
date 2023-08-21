import { downUrl } from "@/hooks/useLogined";
import { ListFile } from "@/types/file";
import { useCopyToClipboard } from "react-use";
import { LableInfo } from "./input";
import { Modal } from "./modal";

export function FileDetailModal(p: { file: ListFile; onClose?: () => void }) {
  const { file, onClose } = p;
  const [, copy] = useCopyToClipboard();
  return (
    <Modal title="文件上传" modalClassName="w-[30rem]" outClose={true} onClose={onClose}>
      <div className="w-full flex flex-col px-5 gap-5 max-h-mc overflow-y-auto">
        <LableInfo lable="报告号码" value={file.meta?.reportCode || ""} />
        <LableInfo lable="下载链接" value={downUrl(file)} />
      </div>
      <div className="w-full px-5 mt-5">
        <button
          className="btn btn-primary w-full"
          onClick={() => {
            const copytext = `
            报告号码:
            ${file.meta?.reportCode}

            下载链接:
            ${downUrl(file)}
            `;
            copy(copytext);
          }}
        >
          复制信息
        </button>
      </div>
    </Modal>
  );
}
