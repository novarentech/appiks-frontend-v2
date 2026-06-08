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
export interface SharingNotification {
  id: 0;
  user_id: 0;
  title: "string";
  description: "string";
  reply: "string";
  replied_at: "string";
  replied_by: "string";
  priority: "string";
  created_at: "2019-08-24T14:15:22Z";
  deleted_at: "2019-08-24T14:15:22Z";
  user: {
    id: 0;
    name: "string";
    phone: "string";
    username: "string";
    identifier: "string";
    verified: true;
    role: "string";
    created_at: "2019-08-24T14:15:22Z";
    deleted_at: "2019-08-24T14:15:22Z";
  };
}

export interface ReportNotification {
  id: 0;
  user_id: 0;
  counselor_id: 0;
  topic: "string";
  room: "string";
  date: "string";
  time: "string";
  status: "string";
  priority: "string";
  notes: "string";
  result: "string";
  created_at: "2019-08-24T14:15:22Z";
  deleted_at: "2019-08-24T14:15:22Z";
  user: {
    id: 0;
    name: "string";
    phone: "string";
    username: "string";
    identifier: "string";
    verified: true;
    role: "string";
    created_at: "2019-08-24T14:15:22Z";
    deleted_at: "2019-08-24T14:15:22Z";
  };
  counselor: {
    id: 0;
    name: "string";
    phone: "string";
    username: "string";
    identifier: "string";
    verified: true;
    role: "string";
    created_at: "2019-08-24T14:15:22Z";
    deleted_at: "2019-08-24T14:15:22Z";
  };
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
