import { DashboardHeader, DashboardPanel } from "@appiks/ui";
import { Users, FileText, Calendar, CheckCircle } from "lucide-react";

export default function Page() {
  const statItems = [
    {
      icon: Users,
      label: "Total Konsultasi",
      value: 42,
      bgColor: "bg-blue-500/10 dark:bg-blue-500/20",
      textColor: "text-blue-600 dark:text-blue-400",
    },
    {
      icon: FileText,
      label: "Kasus Aktif",
      value: 12,
      bgColor: "bg-amber-500/10 dark:bg-amber-500/20",
      textColor: "text-amber-600 dark:text-amber-400",
    },
    {
      icon: Calendar,
      label: "Jadwal Hari Ini",
      value: 5,
      bgColor: "bg-indigo-500/10 dark:bg-indigo-500/20",
      textColor: "text-indigo-600 dark:text-indigo-400",
    },
    {
      icon: CheckCircle,
      label: "Sesi Selesai",
      value: 28,
      bgColor: "bg-emerald-500/10 dark:bg-emerald-500/20",
      textColor: "text-emerald-600 dark:text-emerald-400",
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      <DashboardHeader
        title="Dashboard Psikolog"
        description="Ringkasan data konsultasi, jadwal, dan kasus siswa."
      />
      <div className="px-6">
        <DashboardPanel items={statItems} />
      </div>
    </div>
  );
}
