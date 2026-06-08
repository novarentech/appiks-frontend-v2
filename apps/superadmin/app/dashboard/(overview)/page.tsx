import { DashboardHeader, DashboardPanel } from "@appiks/ui";
import { School, Users, GraduationCap, Activity } from "lucide-react";

export default function Page() {
  const statItems = [
    {
      icon: School,
      label: "Sekolah Terdaftar",
      value: 8,
      bgColor: "bg-blue-500/10 dark:bg-blue-500/20",
      textColor: "text-blue-600 dark:text-blue-400",
    },
    {
      icon: Users,
      label: "Psikolog Aktif",
      value: 14,
      bgColor: "bg-amber-500/10 dark:bg-amber-500/20",
      textColor: "text-amber-600 dark:text-amber-400",
    },
    {
      icon: GraduationCap,
      label: "Total Siswa",
      value: "1.240",
      bgColor: "bg-indigo-500/10 dark:bg-indigo-500/20",
      textColor: "text-indigo-600 dark:text-indigo-400",
    },
    {
      icon: Activity,
      label: "Aktivitas Hari Ini",
      value: 98,
      bgColor: "bg-emerald-500/10 dark:bg-emerald-500/20",
      textColor: "text-emerald-600 dark:text-emerald-400",
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      <DashboardHeader
        title="Dashboard Super Admin"
        description="Ringkasan pemantauan sistem, sekolah, dan psikolog."
      />
      <div className="px-6">
        <DashboardPanel items={statItems} />
      </div>
    </div>
  );
}
