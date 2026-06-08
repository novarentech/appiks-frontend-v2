"use client";

import { useQuery } from "@tanstack/react-query";
import { useApiClient } from "../client";

// ─── Query Keys ────────────────────────────────────────────────────────────
// Best practice: sentralisasi semua key untuk fitur ini
export const notificationKeys = {
  all: ["notification"] as const,
  sharing: () => [...notificationKeys.all, "sharing"] as const,
  report: () => [...notificationKeys.all, "report"] as const,
};

// ─── Types ─────────────────────────────────────────────────────────────────
export interface SharingNotificationUser {
  id: number;
  name: string;
  phone: string | null;
  username: string;
  identifier: string | null;
  verified: boolean;
  role: string;
  created_at: string;
  deleted_at: string | null;
}

export interface SharingNotification {
  id: number;
  user_id: number;
  title: string;
  description: string;
  reply: string | null;
  replied_at: string | null;
  replied_by: string | null;
  priority: string;
  created_at: string;
  deleted_at: string | null;
  user: SharingNotificationUser;
}

export interface ReportNotification {
  id: number;
  user_id: number;
  counselor_id: number;
  topic: string;
  room: string | null;
  date: string;
  time: string;
  status: string;
  priority: string;
  notes: string | null;
  result: string | null;
  created_at: string;
  deleted_at: string | null;
  user: SharingNotificationUser;
  counselor: SharingNotificationUser;
}

// ─── Custom Hooks ──────────────────────────────────────────────────────────

/**
 * Hook untuk mendapatkan notifikasi report terbaru.
 */
export function useGetLatestReport() {
  const { apiGet } = useApiClient();

  return useQuery({
    queryKey: notificationKeys.report(),
    queryFn: async () => {
      const res = await apiGet<ReportNotification>(
        "/notification/latest-report",
      );
      if (!res.success)
        throw new Error(res.message ?? "Gagal mendapatkan notifikasi report");
      return res.data;
    },
  });
}

/**
 * Hook untuk mendapatkan notifikasi sharing terbaru.
 */
export function useGetLatestSharing() {
  const { apiGet } = useApiClient();

  return useQuery({
    queryKey: notificationKeys.sharing(),
    queryFn: async () => {
      const res = await apiGet<SharingNotification>(
        "/notification/latest-sharing",
      );
      if (!res.success)
        throw new Error(res.message ?? "Gagal mendapatkan notifikasi sharing");
      return res.data;
    },
  });
}
