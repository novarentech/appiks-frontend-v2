"use client";

import { DashboardHeader, DashboardPanel, DataTable, Button, type FilterColumn } from "@appiks/ui";
import { GraduationCap, BookOpen, Users, FileText, Plus } from "lucide-react";

const columns = [
  {
    accessorKey: "studentName",
    header: "Nama Siswa",
  },
  {
    accessorKey: "class",
    header: "Kelas",
  },
  {
    accessorKey: "counselor",
    header: "Guru BK",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }: any) => {
      const status = row.getValue("status") as string;
      const statusStyles: Record<string, string> = {
        "Selesai":
          "bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400 border-emerald-500/20",
        "Sedang Berlangsung":
          "bg-blue-500/10 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400 border-blue-500/20",
        "Menunggu":
          "bg-amber-500/10 text-amber-600 dark:bg-amber-500/20 dark:text-amber-400 border-amber-500/20",
      };
      return (
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
            statusStyles[status] || "bg-muted text-muted-foreground border-transparent"
          }`}
        >
          {status}
        </span>
      );
    },
  },
  {
    accessorKey: "date",
    header: "Tanggal Rujukan",
  },
];

const mockData = [
  {
    studentName: "Ahmad Subarjo",
    class: "X-A",
    counselor: "Ibu Sri Wahyuni",
    status: "Selesai",
    date: "2026-06-08",
  },
  {
    studentName: "Budi Setiawan",
    class: "XI-IPA-1",
    counselor: "Bapak Haryono",
    status: "Sedang Berlangsung",
    date: "2026-06-08",
  },
  {
    studentName: "Clara Angelica",
    class: "XII-IPS-2",
    counselor: "Ibu Sri Wahyuni",
    status: "Menunggu",
    date: "2026-06-07",
  },
  {
    studentName: "Dedi Prasetyo",
    class: "X-B",
    counselor: "Bapak Haryono",
    status: "Selesai",
    date: "2026-06-06",
  },
  {
    studentName: "Eka Rahmawati",
    class: "XI-IPS-1",
    counselor: "Ibu Sri Wahyuni",
    status: "Sedang Berlangsung",
    date: "2026-06-05",
  },
  {
    studentName: "Fahri Ramadhan",
    class: "XII-IPA-3",
    counselor: "Bapak Haryono",
    status: "Menunggu",
    date: "2026-06-05",
  },
  {
    studentName: "Gita Lestari",
    class: "X-A",
    counselor: "Ibu Sri Wahyuni",
    status: "Selesai",
    date: "2026-06-04",
  },
  {
    studentName: "Hendra Wijaya",
    class: "XI-IPA-2",
    counselor: "Bapak Haryono",
    status: "Selesai",
    date: "2026-06-03",
  },
];

const filterColumns: FilterColumn[] = [
  {
    id: "status",
    title: "Status",
    options: [
      { label: "Selesai", value: "Selesai" },
      { label: "Sedang Berlangsung", value: "Sedang Berlangsung" },
      { label: "Menunggu", value: "Menunggu" },
    ],
  },
  {
    id: "class",
    title: "Kelas",
    options: [
      { label: "Kelas X", value: "X-" },
      { label: "Kelas XI", value: "XI-" },
      { label: "Kelas XII", value: "XII-" },
    ],
  },
];

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
      <div className="px-6 space-y-6">
        <DashboardPanel items={statItems} />

        <div className="space-y-4 pt-4 border-border">
          <div className="flex flex-col gap-1">
            <h2 className="text-lg font-semibold text-foreground tracking-tight">
              Aktivitas Konseling Terbaru
            </h2>
            <p className="text-sm text-muted-foreground">
              Daftar rujukan dan kasus bimbingan konseling siswa yang aktif atau baru diselesaikan.
            </p>
          </div>
          <DataTable
            columns={columns}
            data={mockData}
            searchable
            searchPlaceholder="Cari siswa atau guru..."
            filterColumns={filterColumns}
            actionButton={
              <Button size="sm" className="gap-1.5">
                <Plus className="size-4" />
                Tambah Rujukan
              </Button>
            }
            defaultPageSize={5}
          />
        </div>
      </div>
    </div>
  );
}
