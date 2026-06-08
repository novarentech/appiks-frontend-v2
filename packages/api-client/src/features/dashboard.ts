"use client";

import { useQuery } from "@tanstack/react-query";
import { useApiClient } from "../client";

// ─── Query Keys ────────────────────────────────────────────────────────────
export const dashboardKeys = {
  all: ["dashboard"] as const,
  headteacher: () => [...dashboardKeys.all, "headteacher"] as const,
  teacher: () => [...dashboardKeys.all, "teacher"] as const,
  counselor: () => [...dashboardKeys.all, "counselor"] as const,
  admin: () => [...dashboardKeys.all, "admin"] as const,
  super: () => [...dashboardKeys.all, "super"] as const,
};

// ─── Types ─────────────────────────────────────────────────────────────────
export interface HeadteacherDashboardData {
  student_count: string;
  teacher_count: string;
  counselor_count: string;
  room_count: string;
}

export interface SuperDashboardData {
  school_count: number;
  admin_count: number;
}

export interface TeacherDashboardData {
  student_count: 0;
  mood_today_count: 0;
  mood_secure_count: 0;
  mood_insecure_count: 0;
}

export interface CounselorDashboardData {
  student_count: 0;
  report_today_count: 0;
  meet_today_count: 0;
  sharing_today_count: 0;
}

export interface AdminDashboardData {
  users_count: string;
  content_count: string;
  content_today_count: string;
}

// ─── Custom Hooks ──────────────────────────────────────────────────────────

/**
 * Hook untuk mendapatkan data statistik dashboard bagi Kepala Sekolah (Headteacher).
 */
export function useGetHeadteacherDashboard() {
  const { apiGet } = useApiClient();

  return useQuery({
    queryKey: dashboardKeys.headteacher(),
    queryFn: async () => {
      // Path diasumsikan sudah ada API_BASE_URL (misal: https://api.appiks.id)
      // Jadi kita panggil path relatifnya
      const res = await apiGet<HeadteacherDashboardData>(
        "/api/dashboard/headteacher",
      );
      if (!res.success)
        throw new Error(
          res.message ?? "Gagal memuat data dashboard kepala sekolah",
        );
      return res.data;
    },
  });
}

/**
 * Hook untuk mendapatkan data statistik dashboard bagi Superadmin.
 */
export function useGetSuperDashboard() {
  const { apiGet } = useApiClient();

  return useQuery({
    queryKey: dashboardKeys.super(),
    queryFn: async () => {
      const res = await apiGet<SuperDashboardData>("/api/dashboard/super");
      if (!res.success)
        throw new Error(res.message ?? "Gagal memuat data dashboard super");
      return res.data;
    },
  });
}

/**
 * Hook untuk mendapatkan data statistik dashboard bagi Admin.
 */
export function useGetAdminDashboard() {
  const { apiGet } = useApiClient();

  return useQuery({
    queryKey: dashboardKeys.admin(),
    queryFn: async () => {
      const res = await apiGet<AdminDashboardData>("/api/dashboard/admin");
      if (!res.success)
        throw new Error(res.message ?? "Gagal memuat data dashboard admin");
      return res.data;
    },
  });
}

/**
 * Hook untuk mendapatkan data statistik dashboard bagi Guru (Teacher).
 */
export function useGetTeacherDashboard() {
  const { apiGet } = useApiClient();

  return useQuery({
    queryKey: dashboardKeys.teacher(),
    queryFn: async () => {
      const res = await apiGet<TeacherDashboardData>("/api/dashboard/teacher");
      if (!res.success)
        throw new Error(res.message ?? "Gagal memuat data dashboard teacher");
      return res.data;
    },
  });
}

/**
 * Hook untuk mendapatkan data statistik dashboard bagi Konselor.
 */
export function useGetCounselorDashboard() {
  const { apiGet } = useApiClient();

  return useQuery({
    queryKey: dashboardKeys.counselor(),
    queryFn: async () => {
      const res = await apiGet<CounselorDashboardData>(
        "/api/dashboard/counselor",
      );
      if (!res.success)
        throw new Error(res.message ?? "Gagal memuat data dashboard konselor");
      return res.data;
    },
  });
}
