"use client";

import * as React from "react";
import { DashboardHeader, DashboardPanel } from "@appiks/ui";
import { GraduationCap, Home, Activity, Calendar, AlertCircle, ClipboardList } from "lucide-react";

const teacherStats = [
  {
    icon: Home,
    label: "KELAS BINAAN",
    value: "XI-IPA-1",
    bgColor: "bg-blue-500/10 dark:bg-blue-500/20",
    textColor: "text-blue-600 dark:text-blue-400",
  },
  {
    icon: GraduationCap,
    label: "TOTAL SISWA BINAAN",
    value: 38,
    bgColor: "bg-emerald-500/10 dark:bg-emerald-500/20",
    textColor: "text-emerald-600 dark:text-emerald-400",
  },
  {
    icon: Activity,
    label: "RATA-RATA KEHADIRAN",
    value: "97.4%",
    bgColor: "bg-amber-500/10 dark:bg-amber-500/20",
    textColor: "text-amber-600 dark:text-amber-400",
  },
];

const studentsList = [
  { name: "Ahmad Subarjo", nisn: "0082736151", mood: "Senang", presence: "Hadir" },
  { name: "Budi Setiawan", nisn: "0082736152", mood: "Tenang", presence: "Hadir" },
  { name: "Clara Angelica", nisn: "0082736153", mood: "Cemas", presence: "Izin" },
  { name: "Dedi Prasetyo", nisn: "0082736154", mood: "Sedih", presence: "Hadir" },
  { name: "Eka Rahmawati", nisn: "0082736155", mood: "Semangat", presence: "Hadir" },
];

const journalItems = [
  {
    type: "alert",
    title: "Rujukan Konseling Diperlukan",
    detail: "Siswa Clara Angelica terpantau cemas berturut-turut. Disarankan rujukan bimbingan konseling.",
    time: "Hari ini",
  },
  {
    type: "info",
    title: "Jadwal Evaluasi Bulanan",
    detail: "Rapat wali kelas bersama Guru BK dan Kepala Sekolah dijadwalkan Jumat ini pukul 14:00.",
    time: "Kemarin",
  },
  {
    type: "success",
    title: "Laporan Bulanan Disetujui",
    detail: "Laporan presensi dan keaktifan kelas XI-IPA-1 untuk bulan Mei telah disetujui Kepala Sekolah.",
    time: "3 hari lalu",
  },
];

export function TeacherOverview() {
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
            title="Dashboard Wali Kelas"
            description="Overview kelas binaan, presensi harian, dan statistik kondisi siswa Anda."
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
        <DashboardPanel items={teacherStats} gridCols="grid-cols-1 md:grid-cols-3" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-2">
          {/* Class Students Table */}
          <div className="bg-card text-card-foreground rounded-xl border p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <div>
                <h3 className="font-semibold text-base">Daftar Siswa Kelas XI-IPA-1</h3>
                <p className="text-xs text-muted-foreground">Monitoring ringkas kondisi harian siswa</p>
              </div>
              <GraduationCap className="size-5 text-muted-foreground opacity-60" />
            </div>
            <div className="divide-y divide-border">
              {studentsList.map((std) => (
                <div key={std.nisn} className="flex items-center justify-between py-3 first:pt-0 last:pb-0">
                  <div className="flex items-center gap-3">
                    <div className="size-8 rounded-full bg-blue-500/10 text-blue-600 flex items-center justify-center font-bold text-xs shrink-0">
                      {std.name.split(" ").map(n => n[0]).slice(0, 2).join("").toUpperCase()}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">{std.name}</p>
                      <p className="text-[10px] text-muted-foreground">NISN: {std.nisn}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold border ${
                      std.mood === "Senang" || std.mood === "Semangat"
                        ? "bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400 border-emerald-500/20"
                        : std.mood === "Tenang"
                        ? "bg-blue-500/10 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400 border-blue-500/20"
                        : std.mood === "Cemas"
                        ? "bg-amber-500/10 text-amber-600 dark:bg-amber-500/20 dark:text-amber-400 border-amber-500/20"
                        : "bg-red-500/10 text-red-600 dark:bg-red-500/20 dark:text-red-400 border-red-500/20"
                    }`}>
                      {std.mood}
                    </span>
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                      std.presence === "Hadir"
                        ? "bg-muted text-muted-foreground"
                        : "bg-amber-500/10 text-amber-600"
                    }`}>
                      {std.presence}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Teacher Journal / Mental Health Alerts */}
          <div className="bg-card text-card-foreground rounded-xl border p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <div>
                <h3 className="font-semibold text-base">Jurnal Wali Kelas & Aktivitas</h3>
                <p className="text-xs text-muted-foreground">Pemberitahuan bimbingan kelas terbaru</p>
              </div>
              <ClipboardList className="size-5 text-muted-foreground opacity-60" />
            </div>
            <div className="space-y-3.5">
              {journalItems.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3 rounded-lg border bg-muted/30">
                  <div className={`p-1.5 rounded-md shrink-0 mt-0.5 ${
                    item.type === "alert"
                      ? "bg-red-500/10 text-red-600"
                      : item.type === "success"
                      ? "bg-emerald-500/10 text-emerald-600"
                      : "bg-blue-500/10 text-blue-600"
                  }`}>
                    <AlertCircle className="size-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex justify-between items-center">
                      <p className="text-xs font-bold text-foreground">{item.title}</p>
                      <span className="text-[9px] text-muted-foreground">{item.time}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{item.detail}</p>
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
