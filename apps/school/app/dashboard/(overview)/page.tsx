"use client";

import {
  DashboardHeader,
  DashboardPanel,
  DataTable,
  Button,
  type FilterColumn,
} from "@appiks/ui";
import { GraduationCap, BookOpen, Users, FileText, Plus, Calendar } from "lucide-react";
import { useQueryParams } from "@appiks/ui/hooks/useQueryParams";
import { type ColumnFiltersState } from "@tanstack/react-table";
import * as React from "react";

// Import custom cards
import { NewUsersCard } from "./components/NewUsersCard";
import { NewContentCard } from "./components/NewContentCard";

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
        Selesai:
          "bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400 border-emerald-500/20",
        "Sedang Berlangsung":
          "bg-blue-500/10 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400 border-blue-500/20",
        Menunggu:
          "bg-amber-500/10 text-amber-600 dark:bg-amber-500/20 dark:text-amber-400 border-amber-500/20",
      };
      return (
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
            statusStyles[status] ||
            "bg-muted text-muted-foreground border-transparent"
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

export default function Page() {
  return (
    <React.Suspense
      fallback={
        <div className="p-8 text-center text-sm text-muted-foreground animate-pulse">
          Memuat dashboard...
        </div>
      }
    >
      <DashboardOverview />
    </React.Suspense>
  );
}

function DashboardOverview() {
  const { updateQueryParams, searchParams } = useQueryParams();

  // Read URL search params
  const searchQuery = searchParams.get("search") || "";
  const statusQuery = searchParams.get("status") || "";
  const classQuery = searchParams.get("class") || "";

  // Map to TanStack Table columnFilters
  const columnFilters = React.useMemo<ColumnFiltersState>(() => {
    const filters: ColumnFiltersState = [];
    if (statusQuery) {
      filters.push({ id: "status", value: statusQuery });
    }
    if (classQuery) {
      filters.push({ id: "class", value: classQuery });
    }
    return filters;
  }, [statusQuery, classQuery]);

  const handleGlobalFilterChange = (value: string) => {
    updateQueryParams({ search: value });
  };

  const handleColumnFiltersChange = (updaterOrValue: any) => {
    const nextFilters =
      typeof updaterOrValue === "function"
        ? updaterOrValue(columnFilters)
        : updaterOrValue;

    const statusVal =
      nextFilters.find((f: any) => f.id === "status")?.value || "";
    const classVal =
      nextFilters.find((f: any) => f.id === "class")?.value || "";

    updateQueryParams({
      status: statusVal || null,
      class: classVal || null,
    });
  };

  const handleReset = () => {
    updateQueryParams({
      search: null,
      status: null,
      class: null,
    });
  };

  const statItems = [
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

  return (
    <div className="flex flex-col">
      <DashboardHeader
        title="Dashboard"
        description="Ringkasan data siswa, staf pengajar, dan konseling bimbingan."
      />
      <div className="px-6 space-y-6">
        <DashboardPanel items={statItems} gridCols="grid-cols-1 md:grid-cols-3" />

        {/* New Users and New Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-2">
          <NewUsersCard users={newUsers} />
          <NewContentCard content={newContent} />
        </div>
      </div>
    </div>
  );
}
