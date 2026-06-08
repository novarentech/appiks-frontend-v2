"use client";

import * as React from "react";
import { DashboardHeader, DashboardPanel } from "@appiks/ui";
import { Users, FileText, Calendar } from "lucide-react";
import { NewUsersCard } from "./NewUsersCard";
import { NewContentCard } from "./NewContentCard";

const newUsers = [
  { name: "Ahmad Subarjo", idNumber: "0082736151", role: "Siswa", joinedAt: "Hari ini" },
  { name: "Ibu Sri Wahyuni, S.Psi", idNumber: "198204222008012001", role: "Guru BK", joinedAt: "Kemarin" },
  { name: "Bapak Haryono, S.Pd", idNumber: "198503122010121002", role: "Guru Wali", joinedAt: "2 hari lalu" },
];

const newContent = [
  { title: "Mengatasi Kecemasan Menjelang Ujian Akhir", type: "Article", categoryOrAuthor: "Kesehatan Mental", createdAt: "Hari ini" },
  { title: "Panduan Meditasi 5 Menit untuk Pemula", type: "Video", categoryOrAuthor: "https://youtube.com/...", createdAt: "Kemarin" },
  { title: "Kesehatan mental Anda adalah prioritas utama, bukan pilihan.", type: "Quotes", categoryOrAuthor: "Anonim", createdAt: "3 hari lalu" },
];

const adminStats = [
  {
    icon: Users,
    label: "TOTAL PENGGUNA",
    value: 42,
    bgColor: "bg-blue-500/10 dark:bg-blue-500/20",
    textColor: "text-blue-600 dark:text-blue-400",
  },
  {
    icon: FileText,
    label: "TOTAL KONTEN",
    value: 40,
    bgColor: "bg-amber-500/10 dark:bg-amber-500/20",
    textColor: "text-amber-600 dark:text-amber-400",
  },
  {
    icon: Calendar,
    label: "KONTEN HARI INI",
    value: 0,
    bgColor: "bg-emerald-500/10 dark:bg-emerald-500/20",
    textColor: "text-emerald-600 dark:text-emerald-400",
  },
];

export function AdminOverview() {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    setMounted(true);
  }, []);

  const formattedDate = React.useMemo(() => {
    if (!mounted) return "";
    return new Intl.DateTimeFormat("id-ID", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(new Date());
  }, [mounted]);

  return (
    <div className="flex flex-col">
      {/* Premium Header with Dev Switcher */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center pr-6 border-b pb-1">
        <div className="flex-1">
          <DashboardHeader
            title="Dashboard Admin"
            description="Ringkasan data pengguna, konten portal, dan aktivitas sistem sekolah."
            showDate={false}
          />
        </div>
        <div className="flex flex-wrap items-center gap-3 px-6 pb-4 md:pb-0 shrink-0">
          {mounted && (
            <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground bg-muted/40 dark:bg-muted/10 px-3 py-1.5 rounded-full border">
              <Calendar size={14} className="text-primary/70" />
              {formattedDate}
            </div>
          )}
        </div>
      </div>

      <div className="px-6 space-y-6 pt-6">
        <DashboardPanel items={adminStats} gridCols="grid-cols-1 md:grid-cols-3" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-2">
          <NewUsersCard users={newUsers} />
          <NewContentCard content={newContent} />
        </div>
      </div>
    </div>
  );
}
