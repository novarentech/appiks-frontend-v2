import { baseApiFetch, type FetchOptions } from "./fetcher";

/**
 * Utilitas API Client khusus untuk digunakan di Server Components / Server Actions.
 * Mengingat setiap aplikasi (school, student, dll) memiliki auth() setup yang berbeda,
 * Server Component di aplikasi yang bersangkutan HARUS memberikan token-nya secara eksplisit.
 * 
 * Contoh Penggunaan:
 *   const session = await auth();
 *   const api = getServerApiClient(session?.user?.token);
 *   const data = await api.get('/users');
 */
export function getServerApiClient(token?: string) {
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
  };
}
