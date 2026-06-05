import type { ApiResponse } from "@appiks/types";

const API_BASE_URL =
  process.env.API_BASE_URL ?? process.env.NEXT_PUBLIC_API_BASE_URL ?? "";

// ─── Base Fetch Wrapper ─────────────────────────────────────────────────────────

interface FetchOptions extends RequestInit {
  token?: string;
}

export async function apiFetch<T>(
  path: string,
  options: FetchOptions = {}
): Promise<ApiResponse<T>> {
  const { token, ...rest } = options;

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(rest.headers ?? {}),
  };

  const res = await fetch(`${API_BASE_URL}${path}`, {
    ...rest,
    headers,
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`API error ${res.status}: ${errorText}`);
  }

  return res.json();
}

// ─── GET / POST / PATCH / DELETE helpers ────────────────────────────────────────

export const apiGet = <T>(path: string, token?: string) =>
  apiFetch<T>(path, { method: "GET", token });

export const apiPost = <T>(path: string, body: unknown, token?: string) =>
  apiFetch<T>(path, {
    method: "POST",
    body: JSON.stringify(body),
    token,
  });

export const apiPatch = <T>(path: string, body: unknown, token?: string) =>
  apiFetch<T>(path, {
    method: "PATCH",
    body: JSON.stringify(body),
    token,
  });

export const apiDelete = <T>(path: string, token?: string) =>
  apiFetch<T>(path, { method: "DELETE", token });
