import { QueryClient } from "@tanstack/react-query";

/**
 * QueryClient singleton dengan konfigurasi default yang optimal.
 * Digunakan oleh semua app melalui Provider masing-masing.
 */
export function createQueryClient(): QueryClient {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000, // 1 menit
        gcTime: 5 * 60 * 1000, // 5 menit (garbage collection)
        retry: 1,
        refetchOnWindowFocus: false,
      },
      mutations: {
        retry: 0,
      },
    },
  });
}
