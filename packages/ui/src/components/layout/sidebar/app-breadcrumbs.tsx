"use client";

import { usePathname } from "next/navigation";
import * as React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../../ui/breadcrumb";

const breadcrumbLabels: Record<string, string> = {
  dashboard: "Dashboard",
  "account-management": "Kelola Akun",
  "content-management": "Kelola Konten",
  "class-data": "Data Kelas",
  "student-data": "Data Siswa",
  "student-share": "Curhatan Siswa",
  "counseling-schedule": "Jadwal Konseling",
  "school-data": "Data Sekolah",
  "school-management": "Kelola Sekolah",
  "admin-management": "Kelola Admin",
  "psychologist-management": "Kelola Psikolog",
  "school-monitor": "Monitoring Sekolah",
  content: "Kelola Konten",
  "mood-overview": "Overview Mood",
  "session-notes": "Catatan Sesi",
  "student-cases": "Kasus Siswa",
  reports: "Laporan",
  schedule: "Jadwal",
  profile: "Profil",
};

export function AppBreadcrumbs() {
  const pathname = usePathname();
  if (!pathname) return null;

  const segments = pathname.split("/").filter(Boolean);

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {segments.map((segment, index) => {
          const href = "/" + segments.slice(0, index + 1).join("/");
          const isLast = index === segments.length - 1;
          const label =
            breadcrumbLabels[segment] ||
            segment
              .split("-")
              .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
              .join(" ");

          return (
            <React.Fragment key={href}>
              {index > 0 && <BreadcrumbSeparator className="hidden md:block" />}
              <BreadcrumbItem className={isLast ? "" : "hidden md:block"}>
                {isLast ? (
                  <BreadcrumbPage>{label}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink href={href}>{label}</BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
