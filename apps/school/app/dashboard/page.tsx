import { DashboardHeader, DashboardPanel } from "@appiks/ui";
import { GraduationCap, BookOpen, Users, FileText } from "lucide-react";

export default function Page() {
  const statItems = [
    {
      icon: GraduationCap,
      label: "Total Siswa",
      value: 320,
      bgColor: "bg-blue-500/10 dark:bg-blue-500/20",
      textColor: "text-blue-600 dark:text-blue-400",
    },
    {
      icon: BookOpen,
      label: "Jumlah Kelas",
      value: 12,
      bgColor: "bg-amber-500/10 dark:bg-amber-500/20",
      textColor: "text-amber-600 dark:text-amber-400",
    },
    {
      icon: Users,
      label: "Guru & Staf",
      value: 45,
      bgColor: "bg-indigo-500/10 dark:bg-indigo-500/20",
      textColor: "text-indigo-600 dark:text-indigo-400",
    },
    {
      icon: FileText,
      label: "Kasus BK Aktif",
      value: 3,
      bgColor: "bg-emerald-500/10 dark:bg-emerald-500/20",
      textColor: "text-emerald-600 dark:text-emerald-400",
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      <DashboardHeader
        title="Dashboard"
        description="Ringkasan data siswa, staf pengajar, dan konseling bimbingan."
      />
      <div className="px-6">
        <DashboardPanel items={statItems} />
      </div>
    </div>
  );
}
