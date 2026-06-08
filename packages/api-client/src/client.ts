"use client";

import { useSession } from "next-auth/react";
import { baseApiFetch, type FetchOptions } from "./fetcher";

/**
 * Hook `useApiClient`
 * Hook ini dapat digunakan di Client Components mana pun.
 * Secara otomatis mengambil session dari next-auth dan menyematkan token.
 */
export function useApiClient() {
  const { data: session } = useSession();

  // @ts-expect-error CustomSession type extends session
  const token = session?.user?.token as string | undefined;

  const apiGet = <T>(path: string, options?: Omit<FetchOptions, "method" | "data">) =>
    baseApiFetch<T>(path, { ...options, method: "GET", token });

  const apiPost = <T>(path: string, data: unknown, options?: Omit<FetchOptions, "method" | "data">) =>
    baseApiFetch<T>(path, {
      ...options,
      method: "POST",
      data,
      token,
    });

  const apiPut = <T>(path: string, data: unknown, options?: Omit<FetchOptions, "method" | "data">) =>
    baseApiFetch<T>(path, {
      ...options,
      method: "PUT",
      data,
      token,
    });

  const apiPatch = <T>(path: string, data: unknown, options?: Omit<FetchOptions, "method" | "data">) =>
    baseApiFetch<T>(path, {
      ...options,
      method: "PATCH",
      data,
      token,
    });

  const apiDelete = <T>(path: string, options?: Omit<FetchOptions, "method" | "data">) =>
    baseApiFetch<T>(path, { ...options, method: "DELETE", token });

  return {
    apiGet,
    apiPost,
    apiPut,
    apiPatch,
    apiDelete,
    token,
  };
}
