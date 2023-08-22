export type FileMeta = {
  password?: string;
  reportCode: string;
  sampleType: string;
  customerCode: string;
  clinicCode: string;
  gateway?: string;
};

export type ListFile = {
  id: number;
  cid: string;
  createTime: string;
  fileSize: number;
  fileType: string;
  name: string;
  meta?: FileMeta;
};

export type Gateway = {
  host: string;
  name: string;
  nodeType: number;
};
