import type { ApiResponse } from "@appiks/types";

const API_BASE_URL =
  process.env.API_BASE_URL ?? process.env.NEXT_PUBLIC_API_BASE_URL ?? "";

export interface FetchOptions extends RequestInit {
  token?: string;
  params?: Record<string, string>;
}

/**
 * Fungsi utilitas internal untuk melakukan pemanggilan API dengan Native Fetch.
 * Akan menangani penyisipan header Authorization jika token tersedia,
 * dan juga mendukung query params.
 */
export async function baseApiFetch<T>(
  path: string,
  options: FetchOptions = {}
): Promise<ApiResponse<T>> {
  const { token, params, ...rest } = options;

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(rest.headers ?? {}),
  };

  // Bangun URL dengan path
  let urlStr = `${API_BASE_URL}${path}`;

  // Tambahkan query parameter jika ada
  if (params && Object.keys(params).length > 0) {
    const searchParams = new URLSearchParams(params);
    urlStr += `?${searchParams.toString()}`;
  }

  const res = await fetch(urlStr, {
    ...rest,
    headers,
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`API error ${res.status}: ${errorText}`);
  }

  return res.json();
}
