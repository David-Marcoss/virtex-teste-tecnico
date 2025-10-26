import type { IFile } from "../file";

export type oltType = "HUAWEI" | "ZTE" | "ZTE_STATE";

export interface IOltInfos {
  id: string;
  slot: string;
  port: string;
  ont_id: string;
  sn?: string;
  state?: "ONLINE" | "OFFLINE";
  oltType: oltType;
  createdAt: string;
  updatedAt: string;
}

export interface ICreateOltInfos {
  oltFile: IFile;
  oltType: oltType;
}
