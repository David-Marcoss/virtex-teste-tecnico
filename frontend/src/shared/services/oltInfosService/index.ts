import {
  handleApiError,
  handleApiResponse,
} from "../axios-config/api-response";
import { Api } from "../axios-config";

import type {
  IListResponse,
  IResponse,
} from "@/shared/interfaces/response/IResponse";
import type { ICreateOltInfos, IOltInfos } from "@/shared/interfaces/oltInfos";

const route = "/oltsInfo";

export type IOltInfosResponse = IResponse<IOltInfos>;
export type IOltInfosListResponse = IListResponse<IOltInfos>;

export const OltInfosService = {
  create: async (data: ICreateOltInfos): Promise<IOltInfosResponse> => {
    try {
      const result = await Api.post(`${route}`, data);
      return handleApiResponse(result);
    } catch (error) {
      return handleApiError(error);
    }
  },

  findOne: async (id: string): Promise<IOltInfosResponse> => {
    try {
      const result = await Api.get(`${route}/${id}`);
      return handleApiResponse(result);
    } catch (error) {
      return handleApiError(error);
    }
  },

  findAll: async (): Promise<IOltInfosListResponse> => {
    try {
      const result = await Api.get(`${route}`);
      return handleApiResponse(result);
    } catch (error) {
      return handleApiError(error);
    }
  },
};
