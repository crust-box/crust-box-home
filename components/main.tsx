import { useCopy } from "@/hooks/copy";
import { useToast } from "@/hooks/toast";
import { downUrl } from "@/hooks/useLogined";
import { useUser } from "@/hooks/useUser";
import { authGetResData, deleteFile, useSWR } from "@/http/api";
import { Gateway, ListFile } from "@/types/file";
import { ftmCount, ftmSize, getErrorMsg } from "@/utils/tools";
import classNames from "classnames";
import { ChangeEvent, useRef, useState } from "react";
import { FiCopy, FiExternalLink, FiSearch, FiTrash2 } from "react-icons/fi";
import { useDropArea } from "react-use";
import { AutoTip } from "./autotip";
import { FileDetailModal } from "./infomodal";
import { Pagination } from "./pagination";
import { UpFileModal } from "./upfilemodal";
import { Loading, withRootLoading } from "./loading";

const heads = ["文件名", "CID", "文件大小", "上传时间", "报告号码", "样本种类", "客户编号", "诊所编码", "操作"];
const pageSize = 9;

function getPdfFile(files: File[] | FileList | null) {
  if (files && files.length === 1 && files[0].name.endsWith(".pdf")) return files[0];
  return undefined;
}

export default function Main() {
  const { data: user } = useUser();
  const [pageNum, setPageNum] = useState(1);
  const {
    data: size,
    mutate: refreshSize,
    isLoading: isLoadingSize,
  } = useSWR<number>("/auth/file/list/size", authGetResData);
  const {
    data: files,
    mutate: refreshFiles,
    isLoading: isLoadingFiles,
  } = useSWR<ListFile[]>(`/auth/file/list?pageSize=${pageSize}&pageNum=${pageNum}`, authGetResData);
  const refreshAll = () => {
    refreshSize();
    refreshFiles();
    setPageNum(1);
  };
  const isLoading = isLoadingSize || isLoadingFiles;

  const copy = useCopy();
  const inputFile = useRef<HTMLInputElement>(null);
  const [showUpModal, setShowUpModal] = useState<File>();
  const toast = useToast();
  const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const pdf = getPdfFile(e.target.files);
    if (pdf) setShowUpModal(pdf);
    else toast.show({ type: "warning", msg: "请选择单个PDF文件。" });
  };

  const [detailFile, setDetailFile] = useState<ListFile>();
  const [droparea, { over }] = useDropArea({
    onFiles(_files) {
      const pdf = getPdfFile(_files);
      if (pdf) setShowUpModal(pdf);
      else toast.show({ type: "warning", msg: "请选择单个PDF文件。" });
    },
  });
  const deleteRef = useRef(false);
  const deleteItem = (id: number) => {
    if (deleteRef.current) return;
    deleteRef.current = true;
    withRootLoading(() => deleteFile(id))
      .then(refreshAll)
      .catch((error) => toast.show({ type: "error", msg: getErrorMsg(error) }))
      .finally(() => {
        deleteRef.current = false;
      });
  };

  return (
    <div
      {...droparea}
      className={classNames("flex-1 w-full border-dashed border-[4px] border-spacing-3", {
        "border-primary": over,
        "border-transparent": !over,
      })}
    >
      {isLoading ? (
        <Loading />
      ) : (
        <div className="h-full flex flex-col w-full mx-auto gap-5 max-w-[1440px] items-center py-8 px-[3.75rem]">
          <div className="flex w-full items-center gap-8 ">
            <input ref={inputFile} className="hidden" type="file" accept=".pdf" onChange={onFileChange} />
            <button className="btn btn-primary" onClick={() => inputFile.current?.click()}>
              + 拖拽文件或点击上传
            </button>
            <span className="text-lg">文件: {ftmCount(size)}</span>
            <span className="text-lg">已使用: {ftmSize(user?.plan.usedStorageSize)}</span>
          </div>
          <div className="w-full bg-white rounded-2xl p-5  overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-indigo-50 rounded overflow-hidden text-black text-lg">
                  {heads.map((item, i) => (
                    <th
                      key={item}
                      className={classNames("p-3 font-bold whitespace-nowrap text-left", {
                        "rounded-l": i === 0,
                        "rounded-r": i === heads.length - 1,
                      })}
                    >
                      {item}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="text-black text-lg">
                {files?.map((f, index) => {
                  const link = downUrl(f);
                  return (
                    <tr key={"file_" + index} className=" cursor-pointer hover:bg-zinc-100 whitespace-nowrap">
                      <td className="p-3 rounded-l overflow-hidden">
                        <AutoTip text={f.name} />
                      </td>
                      <td className="p-3">
                        <AutoTip text={f.cid} />
                      </td>
                      <td className="p-3">{ftmSize(f.fileSize)}</td>
                      <td className="p-3">{f.createTime}</td>
                      <td className="p-3">
                        <AutoTip text={f.meta?.reportCode} />
                      </td>
                      <td className="p-3">
                        <AutoTip text={f.meta?.sampleType} />
                      </td>
                      <td className="p-3">
                        <AutoTip text={f.meta?.customerCode} />
                      </td>
                      <td className="p-3">
                        <AutoTip text={f.meta?.clinicCode} />
                      </td>
                      <td className="p-3 flex items-center gap-2 rounded-r overflow-hidden">
                        <FiCopy
                          data-tooltip-id="tooltip"
                          data-tooltip-content="复制链接"
                          className="cursor-pointer"
                          onClick={(e: Event) => {
                            // e.stopPropagation();
                            copy(link);
                          }}
                        />
                        <FiExternalLink
                          data-tooltip-id="tooltip"
                          data-tooltip-content="打开文件"
                          className="cursor-pointer"
                          onClick={(e: Event) => {
                            // e.stopPropagation();
                            window.open(link, "_blank");
                          }}
                        />
                        <FiTrash2
                          data-tooltip-id="tooltip"
                          data-tooltip-content="删除文件"
                          className="cursor-pointer"
                          onClick={(e: Event) => {
                            // e.stopPropagation();
                            deleteItem(f.id);
                          }}
                        />

                        {f.meta?.password && (
                          <FiSearch
                            data-tooltip-id="tooltip"
                            data-tooltip-content="查看密码"
                            className="cursor-pointer"
                            onClick={(e: Event) => {
                              e.stopPropagation();
                            }}
                          />
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <Pagination
            className="my-8"
            onPageChange={(v: number, count?: number) => {
              setPageNum(v);
            }}
            total={size || 0}
            pgSize={pageSize}
            pgNum={pageNum}
          />
        </div>
      )}

      {showUpModal && (
        <UpFileModal
          file={showUpModal}
          onClose={() => setShowUpModal(undefined)}
          onSuccess={() => {
            refreshAll();
            setShowUpModal(undefined);
          }}
        />
      )}
      {detailFile && <FileDetailModal file={detailFile} onClose={() => setDetailFile(undefined)} />}
    </div>
  );
}
