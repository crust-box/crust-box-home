export type UserInfo = {
  username: string;
  mobile: string;
  email: string;
};

export type UserPlan = {
  downloadExpireTime: string;
  maxDownloadSize: number;
  maxStorageSize: number;
  orderType: number;
  storageExpireTime: string;
  usedDownloadSize: number;
  usedStorageSize: number;
};

export type User = {
  info: UserInfo;
  plan: UserPlan;
};
