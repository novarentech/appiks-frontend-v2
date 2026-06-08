"use client";

import * as React from "react";
import { DashboardHeader, DashboardPanel, DataTable, Button, type FilterColumn } from "@appiks/ui";
import { AlertCircle, Clock, CheckCircle2, Calendar, MessageSquare, ChevronRight } from "lucide-react";
import { useQueryParams } from "@appiks/ui/hooks/useQueryParams";
import { type ColumnFiltersState } from "@tanstack/react-table";

const referralColumns = [
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

const mockReferrals = [
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

const referralFilterColumns: FilterColumn[] = [
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

const counselorStats = [
  {
    icon: AlertCircle,
    label: "TOTAL RUJUKAN KASUS",
    value: mockReferrals.length,
    bgColor: "bg-red-500/10 dark:bg-red-500/20",
    textColor: "text-red-600 dark:text-red-400",
  },
  {
    icon: Clock,
    label: "SEDANG DIPROSES",
    value: mockReferrals.filter(r => r.status === "Sedang Berlangsung").length,
    bgColor: "bg-amber-500/10 dark:bg-amber-500/20",
    textColor: "text-amber-600 dark:text-amber-400",
  },
  {
    icon: CheckCircle2,
    label: "KONSELING SELESAI",
    value: mockReferrals.filter(r => r.status === "Selesai").length,
    bgColor: "bg-emerald-500/10 dark:bg-emerald-500/20",
    textColor: "text-emerald-600 dark:text-emerald-400",
  },
];

export function CounselorOverview() {
  const { updateQueryParams, searchParams } = useQueryParams();

  const searchQuery = searchParams.get("search") || "";
  const statusQuery = searchParams.get("status") || "";
  const classQuery = searchParams.get("class") || "";

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
            title="Dashboard Bimbingan Konseling"
            description="Pemantauan rujukan kasus siswa, jadwal bimbingan, dan perkembangan konseling."
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
        <DashboardPanel items={counselorStats} gridCols="grid-cols-1 md:grid-cols-3" />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-2">
          {/* Counselor Referrals Table */}
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-card text-card-foreground rounded-xl border p-5 shadow-xs">
              <div className="flex items-center justify-between border-b pb-3 mb-4">
                <div>
                  <h3 className="font-semibold text-base">Rujukan Kasus Bimbingan Konseling</h3>
                  <p className="text-xs text-muted-foreground">Kelola rujukan aktif yang membutuhkan intervensi</p>
                </div>
                <MessageSquare className="size-5 text-muted-foreground opacity-60" />
              </div>
              <DataTable
                columns={referralColumns}
                data={mockReferrals}
                searchable
                searchPlaceholder="Cari siswa atau guru..."
                filterColumns={referralFilterColumns}
                defaultPageSize={5}
                globalFilter={searchQuery}
                onGlobalFilterChange={handleGlobalFilterChange}
                columnFilters={columnFilters}
                onColumnFiltersChange={handleColumnFiltersChange}
                onReset={handleReset}
              />
            </div>
          </div>

          {/* Counseling Schedule Card */}
          <div className="bg-card text-card-foreground rounded-xl border p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <div>
                <h3 className="font-semibold text-base">Jadwal Konseling Terdekat</h3>
                <p className="text-xs text-muted-foreground">Sesi bimbingan yang dikonfirmasi</p>
              </div>
              <Calendar className="size-5 text-muted-foreground opacity-60" />
            </div>
            <div className="space-y-3">
              {[
                { name: "Budi Setiawan", class: "XI-IPA-1", time: "Hari ini, 10:00 - 11:00", type: "Konseling Individu", status: "Dikonfirmasi" },
                { name: "Clara Angelica", class: "XII-IPS-2", time: "Besok, 09:00 - 10:00", type: "Konseling Masalah Akademis", status: "Menunggu" },
                { name: "Fahri Ramadhan", class: "XII-IPA-3", time: "10 Jun, 13:30 - 14:30", type: "Konseling Minat Bakat", status: "Dikonfirmasi" },
              ].map((session, idx) => (
                <div key={idx} className="p-3 border rounded-lg hover:bg-muted/20 transition-colors space-y-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm font-semibold text-foreground">{session.name}</p>
                      <p className="text-[10px] text-muted-foreground">{session.class} • {session.type}</p>
                    </div>
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-semibold border ${
                      session.status === "Dikonfirmasi"
                        ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20"
                        : "bg-amber-500/10 text-amber-600 border-amber-500/20"
                    }`}>
                      {session.status}
                    </span>
                  </div>
                  <div className="flex items-center justify-between pt-1 border-t text-[10px] text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="size-3" />
                      {session.time}
                    </span>
                    <Button variant="ghost" size="sm" className="h-6 px-1.5 gap-0.5 text-[10px]">
                      Detail
                      <ChevronRight className="size-3" />
                    </Button>
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
