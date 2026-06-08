import axios, { type AxiosRequestConfig } from "axios";
import type { ApiResponse } from "@appiks/types";

const API_BASE_URL =
  process.env.API_BASE_URL ?? process.env.NEXT_PUBLIC_API_BASE_URL ?? "";

export interface FetchOptions extends AxiosRequestConfig {
  token?: string;
}

/**
 * Fungsi utilitas internal untuk melakukan pemanggilan API dengan Axios.
 * Akan menangani penyisipan header Authorization jika token tersedia.
 */
export async function baseApiFetch<T>(
  path: string,
  options: FetchOptions = {}
): Promise<ApiResponse<T>> {
  const { token, headers, ...rest } = options;

  const requestHeaders = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(headers ?? {}),
  };

  try {
    const response = await axios<ApiResponse<T>>({
      url: path,
      baseURL: API_BASE_URL,
      headers: requestHeaders,
      ...rest,
    });

    return response.data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status;
      const data = error.response?.data;
      const message = (data as any)?.message || error.message;
      throw new Error(`API error ${status ?? "unknown"}: ${message}`);
    }
    throw error;
  }
}
