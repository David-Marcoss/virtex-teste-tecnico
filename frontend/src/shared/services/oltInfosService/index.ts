import {
  handleApiError,
  handleApiResponse,
} from "../axios-config/api-response";
import { Api } from "../axios-config";

import type { IResponse } from "@/shared/interfaces/response/IResponse";
import type { ICreateOltInfos, IOltInfos } from "@/shared/interfaces/oltInfos";

const route = "/oltsInfo";

export type IOltInfosResponse = IResponse<IOltInfos>;
export type IOltInfosListResponse = IResponse<IOltInfos[]>;

export const OltInfosService = {
  create: async (
    data: ICreateOltInfos,
    authToken: string
  ): Promise<IOltInfosResponse> => {
    try {
      const result = await Api.post(`${route}`, data, {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      return handleApiResponse(result);
    } catch (error) {
      return handleApiError(error);
    }
  },

  findOne: async (
    id: string,
    authToken: string
  ): Promise<IOltInfosResponse> => {
    try {
      const result = await Api.get(`${route}/${id}`, {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      return handleApiResponse(result);
    } catch (error) {
      return handleApiError(error);
    }
  },

  findAll: async (authToken: string): Promise<IOltInfosListResponse> => {
    try {
      const result = await Api.get(`${route}`, {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      return handleApiResponse(result);
    } catch (error) {
      return handleApiError(error);
    }
  },
};
