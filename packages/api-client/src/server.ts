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
  const apiGet = <T>(path: string, options?: Omit<FetchOptions, "method" | "body">) =>
    baseApiFetch<T>(path, { ...options, method: "GET", token });

  const apiPost = <T>(path: string, body: unknown, options?: Omit<FetchOptions, "method">) =>
    baseApiFetch<T>(path, {
      ...options,
      method: "POST",
      body: JSON.stringify(body),
      token,
    });

  const apiPut = <T>(path: string, body: unknown, options?: Omit<FetchOptions, "method">) =>
    baseApiFetch<T>(path, {
      ...options,
      method: "PUT",
      body: JSON.stringify(body),
      token,
    });

  const apiPatch = <T>(path: string, body: unknown, options?: Omit<FetchOptions, "method">) =>
    baseApiFetch<T>(path, {
      ...options,
      method: "PATCH",
      body: JSON.stringify(body),
      token,
    });

  const apiDelete = <T>(path: string, options?: Omit<FetchOptions, "method" | "body">) =>
    baseApiFetch<T>(path, { ...options, method: "DELETE", token });

  return {
    apiGet,
    apiPost,
    apiPut,
    apiPatch,
    apiDelete,
  };
}
