"use client";

import {
  DashboardHeader,
  DashboardPanel,
  DataTable,
  Button,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  type FilterColumn,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@appiks/ui";
import {
  GraduationCap,
  Users,
  Calendar,
  Plus,
  ChevronDown,
  Upload,
  UserCheck,
  Shield,
} from "lucide-react";
import * as React from "react";

// Import modular dialog components
import { ImportSiswaDialog } from "./components/ImportSiswaDialog";
import { TambahSiswaDialog } from "./components/TambahSiswaDialog";
import { TambahWaliDialog } from "./components/TambahWaliDialog";
import { TambahBkDialog } from "./components/TambahBkDialog";
import { TambahKepsekDialog } from "./components/TambahKepsekDialog";

// Reusable status badge renderer
const renderStatusBadge = (status: string) => {
  const isAktif = status === "Aktif" || status === "active";
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
        isAktif
          ? "bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400 border-emerald-500/20"
          : "bg-amber-500/10 text-amber-600 dark:bg-amber-500/20 dark:text-amber-400 border-amber-500/20"
      }`}
    >
      {isAktif ? "Aktif" : "Nonaktif"}
    </span>
  );
};

// Columns for each DataTable
const studentColumns = [
  {
    accessorKey: "nisn",
    header: "NISN",
  },
  {
    accessorKey: "name",
    header: "Nama Siswa",
  },
  {
    accessorKey: "class",
    header: "Kelas",
  },
  {
    accessorKey: "createdAt",
    header: "Tanggal Dibuat",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }: any) => renderStatusBadge(row.getValue("status")),
  },
];

const waliColumns = [
  {
    accessorKey: "nip",
    header: "NIP",
  },
  {
    accessorKey: "name",
    header: "Nama Guru",
  },
  {
    accessorKey: "homeroomClass",
    header: "Wali Kelas",
  },
  {
    accessorKey: "createdAt",
    header: "Tanggal Dibuat",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }: any) => renderStatusBadge(row.getValue("status")),
  },
];

const bkColumns = [
  {
    accessorKey: "nip",
    header: "NIP",
  },
  {
    accessorKey: "name",
    header: "Nama Guru BK",
  },
  {
    accessorKey: "targetGroup",
    header: "Binaan Kelas",
  },
  {
    accessorKey: "createdAt",
    header: "Tanggal Dibuat",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }: any) => renderStatusBadge(row.getValue("status")),
  },
];

const kepsekColumns = [
  {
    accessorKey: "nip",
    header: "NIP",
  },
  {
    accessorKey: "name",
    header: "Nama Kepala Sekolah",
  },
  {
    accessorKey: "title",
    header: "Jabatan",
  },
  {
    accessorKey: "createdAt",
    header: "Tanggal Dibuat",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }: any) => renderStatusBadge(row.getValue("status")),
  },
];

// Initial mock data
const studentNames = [
  "Ahmad Subarjo", "Budi Setiawan", "Clara Angelica", "Dedi Prasetyo", "Eka Rahmawati",
  "Fahri Ramadhan", "Gita Lestari", "Hendra Wijaya", "Indah Sari", "Joko Purwanto",
  "Kartika Putri", "Lukman Hakim", "Mega Utami", "Naufal Hadi", "Olivia Zahrani",
  "Pratama Yudha", "Qori Aina", "Rian Hidayat", "Siti Aminah", "Taufik Rahman",
  "Umar Faruq", "Vina Panduwinata", "Wawan Hermawan", "Xena Clarissa", "Yusuf Mansur",
  "Zahra Nurul", "Aditya Pratama", "Bella Safira", "Candra Wijaya", "Diana Lestari",
  "Erik Setiawan", "Fitri Handayani", "Guntur Bumi", "Hany Puspita", "Ivan Gunawan",
  "Julia Perez", "Kevin Sanjaya", "Lesti Kejora"
];

const classes = ["X-A", "X-B", "XI-IPA-1", "XI-IPS-1", "XII-IPA-3", "XII-IPS-2"];

const initialStudentData = Array.from({ length: 38 }).map((_, i) => {
  const name = studentNames[i] || `Siswa Ke-${i + 1}`;
  const nisn = `00827361${String(51 + i).padStart(2, "0")}`;
  const classItem = classes[i % classes.length];
  const date = `2026-06-${String((i % 7) + 1).padStart(2, "0")}`;
  return {
    nisn,
    name,
    class: classItem,
    createdAt: date,
    status: "Aktif"
  };
});

const initialWaliData = [
  {
    nip: "198503122010121002",
    name: "Bapak Haryono, S.Pd",
    homeroomClass: "XI-IPA-1",
    createdAt: "2026-05-15",
    status: "Aktif",
  },
];

const initialBkData = [
  {
    nip: "198204222008012001",
    name: "Ibu Sri Wahyuni, S.Psi",
    targetGroup: "Kelas X & XII",
    createdAt: "2026-05-15",
    status: "Aktif",
  },
];

const initialKepsekData = [
  {
    nip: "197501011999031005",
    name: "Dr. H. Slamet Riyadi, M.Pd",
    title: "Kepala Sekolah",
    createdAt: "2026-05-01",
    status: "Aktif",
  },
];

const studentFilterColumns: FilterColumn[] = [
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
  const [activeTab, setActiveTab] = React.useState("siswa");

  // Local state for tables
  const [students, setStudents] = React.useState(initialStudentData);
  const [walis, setWalis] = React.useState(initialWaliData);
  const [bks, setBks] = React.useState(initialBkData);
  const [kepseks, setKepseks] = React.useState(initialKepsekData);

  // Dialog visibility controls
  const [isImportSiswaOpen, setIsImportSiswaOpen] = React.useState(false);
  const [isTambahSiswaOpen, setIsTambahSiswaOpen] = React.useState(false);
  const [isTambahWaliOpen, setIsTambahWaliOpen] = React.useState(false);
  const [isTambahBkOpen, setIsTambahBkOpen] = React.useState(false);
  const [isTambahKepsekOpen, setIsTambahKepsekOpen] = React.useState(false);

  const todayDate = "2026-06-08";

  // Calculate dynamic accounts created today
  const getTodayCount = () => {
    const sCount = students.filter((s) => s.createdAt === todayDate).length;
    const wCount = walis.filter((w) => w.createdAt === todayDate).length;
    const bCount = bks.filter((b) => b.createdAt === todayDate).length;
    const kCount = kepseks.filter((k) => k.createdAt === todayDate).length;
    return sCount + wCount + bCount + kCount;
  };

  const getStatItems = (tab: string) => {
    const tabConfig: Record<
      string,
      { label: string; value: number; icon: any }
    > = {
      siswa: { label: "TOTAL SISWA", value: students.length, icon: GraduationCap },
      wali: { label: "TOTAL GURU WALI", value: walis.length, icon: Users },
      bk: { label: "TOTAL GURU BK", value: bks.length, icon: Users },
      kepsek: { label: "TOTAL KEPALA SEKOLAH", value: kepseks.length, icon: Users },
    };

    const activeConfig = tabConfig[tab] || tabConfig.siswa;

    return [
      {
        icon: activeConfig.icon,
        label: activeConfig.label,
        value: activeConfig.value,
        bgColor: "bg-blue-500/10 dark:bg-blue-500/20",
        textColor: "text-blue-600 dark:text-blue-400",
      },
      {
        icon: Calendar,
        label: "AKUN DIBUAT HARI INI",
        value: getTodayCount(),
        bgColor: "bg-blue-500/10 dark:bg-blue-500/20",
        textColor: "text-blue-600 dark:text-blue-400",
      },
    ];
  };

  const statItems = getStatItems(activeTab);

  // Unified Action Dropdown Menu
  const ActionDropdown = (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="sm" className="gap-1.5 shadow-xs">
          <Plus className="size-4" />
          Tambah / Import Akun
          <ChevronDown className="size-3.5 opacity-60" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuItem onClick={() => setIsImportSiswaOpen(true)} className="cursor-pointer gap-2">
          <Upload className="size-4 text-muted-foreground" />
          Import Akun Siswa
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => setIsTambahSiswaOpen(true)} className="cursor-pointer gap-2">
          <GraduationCap className="size-4 text-muted-foreground" />
          Tambah Akun Siswa
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setIsTambahWaliOpen(true)} className="cursor-pointer gap-2">
          <Users className="size-4 text-muted-foreground" />
          Tambah Akun Guru Wali
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setIsTambahBkOpen(true)} className="cursor-pointer gap-2">
          <UserCheck className="size-4 text-muted-foreground" />
          Tambah Akun Guru BK
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setIsTambahKepsekOpen(true)} className="cursor-pointer gap-2">
          <Shield className="size-4 text-muted-foreground" />
          Tambah Kepala Sekolah
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );

  return (
    <div className="flex flex-col">
      <DashboardHeader
        title="Kelola Akun"
        description="Kelola Akun dan Pengguna Appiks"
      />
      <div className="px-6 space-y-6">
        {/* Top metrics grid with 2 cards */}
        <DashboardPanel items={statItems} gridCols="grid-cols-1 md:grid-cols-2" />

        {/* Interactive tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full space-y-4">
          <TabsList className="grid grid-cols-2 sm:grid-cols-4 md:flex w-full bg-muted/50 dark:bg-muted/10 p-1 rounded-lg gap-1 h-auto! md:h-9! border">
            <TabsTrigger value="siswa" className="rounded-lg px-1.5 py-1 text-sm font-medium justify-center h-9 md:h-auto">
              Akun Siswa
              <span className="ml-2 bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary-400 rounded-full px-2 py-0.5 text-xs font-semibold">
                {students.length}
              </span>
            </TabsTrigger>
            <TabsTrigger value="wali" className="rounded-lg px-1.5 py-1 text-sm font-medium justify-center h-9 md:h-auto">
              Akun Guru Wali
              <span className="ml-2 bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary-400 rounded-full px-2 py-0.5 text-xs font-semibold">
                {walis.length}
              </span>
            </TabsTrigger>
            <TabsTrigger value="bk" className="rounded-lg px-1.5 py-1 text-sm font-medium justify-center h-9 md:h-auto">
              Akun Guru BK
              <span className="ml-2 bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary-400 rounded-full px-2 py-0.5 text-xs font-semibold">
                {bks.length}
              </span>
            </TabsTrigger>
            <TabsTrigger value="kepsek" className="rounded-lg px-1.5 py-1 text-sm font-medium justify-center h-9 md:h-auto">
              Kepala Sekolah
              <span className="ml-2 bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary-400 rounded-full px-2 py-0.5 text-xs font-semibold">
                {kepseks.length}
              </span>
            </TabsTrigger>
          </TabsList>

          {/* 1. Panel Siswa */}
          <TabsContent value="siswa" className="outline-none pt-2">
            <DataTable
              columns={studentColumns}
              data={students}
              searchable
              searchPlaceholder="Cari nama atau NISN siswa..."
              filterColumns={studentFilterColumns}
              actionButton={ActionDropdown}
              defaultPageSize={5}
            />
          </TabsContent>

          {/* 2. Panel Guru Wali */}
          <TabsContent value="wali" className="outline-none pt-2">
            <DataTable
              columns={waliColumns}
              data={walis}
              searchable
              searchPlaceholder="Cari nama guru..."
              actionButton={ActionDropdown}
              defaultPageSize={5}
            />
          </TabsContent>

          {/* 3. Panel Guru BK */}
          <TabsContent value="bk" className="outline-none pt-2">
            <DataTable
              columns={bkColumns}
              data={bks}
              searchable
              searchPlaceholder="Cari nama guru BK..."
              actionButton={ActionDropdown}
              defaultPageSize={5}
            />
          </TabsContent>

          {/* 4. Panel Kepala Sekolah */}
          <TabsContent value="kepsek" className="outline-none pt-2">
            <DataTable
              columns={kepsekColumns}
              data={kepseks}
              searchable
              searchPlaceholder="Cari kepala sekolah..."
              actionButton={ActionDropdown}
              defaultPageSize={5}
            />
          </TabsContent>
        </Tabs>
      </div>

      {/* ─── MODULAR DIALOGS ─────────────────────────────────────────────── */}

      <ImportSiswaDialog
        open={isImportSiswaOpen}
        onOpenChange={setIsImportSiswaOpen}
        onImport={(imported) => setStudents((prev) => [...imported, ...prev])}
      />

      <TambahSiswaDialog
        open={isTambahSiswaOpen}
        onOpenChange={setIsTambahSiswaOpen}
        walis={walis}
        bks={bks}
        onAdd={(newSiswa) =>
          setStudents((prev) => [
            { ...newSiswa, createdAt: todayDate, status: "Aktif" },
            ...prev,
          ])
        }
      />

      <TambahWaliDialog
        open={isTambahWaliOpen}
        onOpenChange={setIsTambahWaliOpen}
        onAdd={(newWali) =>
          setWalis((prev) => [
            {
              nip: newWali.nip,
              name: newWali.name,
              homeroomClass: newWali.homeroomClass,
              createdAt: todayDate,
              status: "Aktif",
            },
            ...prev,
          ])
        }
      />

      <TambahBkDialog
        open={isTambahBkOpen}
        onOpenChange={setIsTambahBkOpen}
        onAdd={(newBk) =>
          setBks((prev) => [
            {
              nip: newBk.nip,
              name: newBk.name,
              targetGroup: "Semua Kelas",
              createdAt: todayDate,
              status: "Aktif",
            },
            ...prev,
          ])
        }
      />

      <TambahKepsekDialog
        open={isTambahKepsekOpen}
        onOpenChange={setIsTambahKepsekOpen}
        onAdd={(newKepsek) =>
          setKepseks((prev) => [
            {
              nip: newKepsek.nip,
              name: newKepsek.name,
              title: newKepsek.title,
              createdAt: todayDate,
              status: "Aktif",
            },
            ...prev,
          ])
        }
      />
    </div>
  );
}
