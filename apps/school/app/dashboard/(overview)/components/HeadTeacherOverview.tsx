"use client";

import * as React from "react";
import { DashboardHeader, DashboardPanel } from "@appiks/ui";
import { Activity, Sparkles, Calendar, Users, GraduationCap, AlertCircle } from "lucide-react";
import { FaChalkboardTeacher } from "react-icons/fa";

const headTeacherStats = [
  {
    icon: FaChalkboardTeacher,
    label: "TOTAL KELAS",
    value: 6,
    bgColor: "bg-blue-500/10 dark:bg-blue-500/20",
    textColor: "text-blue-600 dark:text-blue-400",
  },
  {
    icon: GraduationCap,
    label: "TOTAL SISWA",
    value: 38,
    bgColor: "bg-emerald-500/10 dark:bg-emerald-500/20",
    textColor: "text-emerald-600 dark:text-emerald-400",
  },
  {
    icon: Users,
    label: "GURU & STAF",
    value: 3,
    bgColor: "bg-amber-500/10 dark:bg-amber-500/20",
    textColor: "text-amber-600 dark:text-amber-400",
  },
  {
    icon: AlertCircle,
    label: "RUJUKAN KASUS",
    value: 8,
    bgColor: "bg-purple-500/10 dark:bg-purple-500/20",
    textColor: "text-purple-600 dark:text-purple-400",
  },
];

const caseStatusItems = [
  { label: "Selesai (5 Kasus)", percentage: 62.5, colorClass: "bg-emerald-500" },
  { label: "Sedang Berlangsung (3 Kasus)", percentage: 37.5, colorClass: "bg-blue-500" },
  { label: "Menunggu Tindak Lanjut (0 Kasus)", percentage: 0, colorClass: "bg-amber-500" },
];

const reportOverviewItems = [
  {
    title: "Kondisi Mental & Mood Siswa Stabil",
    detail: "Sebagian besar siswa melaporkan tingkat kecemasan rendah minggu ini. Mood rata-rata berada pada kategori Tenang/Senang.",
  },
  {
    title: "Respons Rujukan Kasus Cepat",
    detail: "Rata-rata waktu tanggap guru BK terhadap rujukan kasus baru dari wali kelas berkurang menjadi kurang dari 24 jam.",
  },
  {
    title: "Program Preventif Konseling Berjalan",
    detail: "Sesi sosialisasi kesehatan mental kelas X telah rampung dilaksanakan dengan partisipasi aktif 100%.",
  },
];

export function HeadTeacherOverview() {
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
            title="Dashboard Kepala Sekolah"
            description="Ringkasan eksekutif perkembangan sekolah, sebaran kasus siswa, dan statistik keseluruhan."
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
        <DashboardPanel items={headTeacherStats} gridCols="grid-cols-1 sm:grid-cols-2 lg:grid-cols-4" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-2">
          {/* Status Case breakdown */}
          <div className="bg-card text-card-foreground rounded-xl border p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <div>
                <h3 className="font-semibold text-base">Sebaran Status Kasus Rujukan</h3>
                <p className="text-xs text-muted-foreground">Persentase penyelesaian rujukan bimbingan konseling</p>
              </div>
              <Activity className="size-5 text-muted-foreground opacity-60" />
            </div>
            <div className="space-y-4.5 pt-2">
              {caseStatusItems.map((status, idx) => (
                <div key={idx} className="space-y-1.5">
                  <div className="flex justify-between text-xs font-semibold">
                    <span>{status.label}</span>
                    <span>{status.percentage}%</span>
                  </div>
                  <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                    <div
                      className={`h-full ${status.colorClass} rounded-full transition-all duration-500`}
                      style={{ width: `${status.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* School Bimbingan Summary Report */}
          <div className="bg-card text-card-foreground rounded-xl border p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <div>
                <h3 className="font-semibold text-base">Ikhtisar Laporan Sekolah</h3>
                <p className="text-xs text-muted-foreground">Rangkuman kinerja konseling & kenyamanan siswa</p>
              </div>
              <Sparkles className="size-5 text-muted-foreground opacity-60" />
            </div>
            <div className="space-y-3.5">
              {reportOverviewItems.map((rep, idx) => (
                <div key={idx} className="flex gap-3">
                  <div className="mt-1 flex items-center justify-center size-5 rounded-full bg-primary/10 text-primary shrink-0 font-bold text-[10px]">
                    {idx + 1}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-foreground">{rep.title}</p>
                    <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{rep.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
