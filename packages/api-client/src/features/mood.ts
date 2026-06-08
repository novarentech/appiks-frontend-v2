"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useApiClient } from "../client";

// ─── Query Keys ────────────────────────────────────────────────────────────
// Best practice: sentralisasi semua key untuk fitur ini
export const moodKeys = {
  all: ["mood"] as const,
  check: () => [...moodKeys.all, "check"] as const,
  records: () => [...moodKeys.all, "records"] as const,
  detail: (id: string) => [...moodKeys.all, "detail", id] as const,
};

// ─── Types ─────────────────────────────────────────────────────────────────
export interface MoodCheckResponse {
  can: boolean;
}

export interface MoodRecordInput {
  mood: string;
  note?: string;
}

// ─── Custom Hooks ──────────────────────────────────────────────────────────

/**
 * Hook untuk mengecek apakah user bisa merekam mood hari ini.
 * Menggunakan useApiClient() sehingga token terinjeksi otomatis.
 */
export function useCheckMood() {
  const { apiGet } = useApiClient();

  return useQuery({
    queryKey: moodKeys.check(),
    queryFn: async () => {
      const res = await apiGet<MoodCheckResponse>("/mood_record/check");
      if (!res.success) throw new Error(res.message ?? "Gagal mengecek mood");
      return res.data;
    },
  });
}

/**
 * Hook untuk merekam mood baru.
 */
export function useCreateMoodRecord() {
  const queryClient = useQueryClient();
  const { apiPost } = useApiClient();

  return useMutation({
    mutationFn: async (payload: MoodRecordInput) => {
      const res = await apiPost<unknown>("/mood_record", payload);
      if (!res.success) throw new Error(res.message ?? "Gagal menyimpan mood");
      return res.data;
    },
    onSuccess: () => {
      // Invalidate query agar data terbaru di-fetch ulang
      queryClient.invalidateQueries({ queryKey: moodKeys.all });
    },
  });
}
