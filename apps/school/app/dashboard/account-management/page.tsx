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
  Eye,
  Pencil,
  Trash2,
} from "lucide-react";
import * as React from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { type ColumnFiltersState } from "@tanstack/react-table";

// Import modular dialog components
import { ImportSiswaDialog } from "./components/ImportSiswaDialog";
import { TambahSiswaDialog } from "./components/TambahSiswaDialog";
import { TambahWaliDialog } from "./components/TambahWaliDialog";
import { TambahBkDialog } from "./components/TambahBkDialog";
import { TambahKepsekDialog } from "./components/TambahKepsekDialog";
import { EditSiswaDialog } from "./components/EditSiswaDialog";
import { EditWaliDialog } from "./components/EditWaliDialog";
import { EditBkDialog } from "./components/EditBkDialog";
import { EditKepsekDialog } from "./components/EditKepsekDialog";
import { ViewAccountDialog } from "./components/ViewAccountDialog";
import { DeleteConfirmDialog } from "./components/DeleteConfirmDialog";

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

// Columns are now defined inside the Page component to allow state-based row actions

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
  return (
    <React.Suspense fallback={<div className="p-8 text-center text-sm text-muted-foreground animate-pulse">Memuat kelola akun...</div>}>
      <AccountManagement />
    </React.Suspense>
  );
}

function AccountManagement() {
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

  // Action states
  const [selectedItem, setSelectedItem] = React.useState<any>(null);
  const [activeRole, setActiveRole] = React.useState<"siswa" | "wali" | "bk" | "kepsek" | null>(null);
  const [isViewOpen, setIsViewOpen] = React.useState(false);
  const [isEditOpen, setIsEditOpen] = React.useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = React.useState(false);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const activeTab = searchParams.get("tab") || "siswa";
  const searchQuery = searchParams.get("search") || "";
  const classQuery = searchParams.get("class") || "";

  const todayDate = "2026-06-08";

  const updateQueryParams = (updates: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(updates).forEach(([key, value]) => {
      if (value === null || value === "") {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    });
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const handleTabChange = (tab: string) => {
    updateQueryParams({ tab, search: null, class: null });
  };

  const handleGlobalFilterChange = (value: string) => {
    updateQueryParams({ search: value });
  };

  const handleSiswaColumnFiltersChange = (updaterOrValue: any) => {
    const currentFilters: ColumnFiltersState = classQuery ? [{ id: "class", value: classQuery }] : [];
    const nextFilters = typeof updaterOrValue === "function" 
      ? updaterOrValue(currentFilters) 
      : updaterOrValue;

    const classVal = nextFilters.find((f: any) => f.id === "class")?.value || "";
    updateQueryParams({ class: classVal || null });
  };

  const handleSiswaReset = () => {
    updateQueryParams({ search: null, class: null });
  };

  const handleGenericReset = () => {
    updateQueryParams({ search: null });
  };

  const siswaColumnFilters = React.useMemo<ColumnFiltersState>(() => {
    return classQuery ? [{ id: "class", value: classQuery }] : [];
  }, [classQuery]);

  const handleAction = (action: "view" | "edit" | "delete", role: "siswa" | "wali" | "bk" | "kepsek", item: any) => {
    setSelectedItem(item);
    setActiveRole(role);
    if (action === "view") setIsViewOpen(true);
    if (action === "edit") setIsEditOpen(true);
    if (action === "delete") setIsDeleteOpen(true);
  };

  const handleSaveEdit = (updatedData: any) => {
    if (activeRole === "siswa") {
      setStudents((prev) =>
        prev.map((s) => (s.nisn === selectedItem.nisn ? { ...s, ...updatedData } : s))
      );
    } else if (activeRole === "wali") {
      setWalis((prev) =>
        prev.map((w) => (w.nip === selectedItem.nip ? { ...w, ...updatedData } : w))
      );
    } else if (activeRole === "bk") {
      setBks((prev) =>
        prev.map((b) => (b.nip === selectedItem.nip ? { ...b, ...updatedData } : b))
      );
    } else if (activeRole === "kepsek") {
      setKepseks((prev) =>
        prev.map((k) => (k.nip === selectedItem.nip ? { ...k, ...updatedData } : k))
      );
    }
  };

  const handleConfirmDelete = () => {
    if (activeRole === "siswa") {
      setStudents((prev) => prev.filter((s) => s.nisn !== selectedItem.nisn));
    } else if (activeRole === "wali") {
      setWalis((prev) => prev.filter((w) => w.nip !== selectedItem.nip));
    } else if (activeRole === "bk") {
      setBks((prev) => prev.filter((b) => b.nip !== selectedItem.nip));
    } else if (activeRole === "kepsek") {
      setKepseks((prev) => prev.filter((k) => k.nip !== selectedItem.nip));
    }
  };

  // Memoized columns containing actions
  const studentColumns = React.useMemo(() => [
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
    {
      id: "actions",
      header: "Aksi",
      cell: ({ row }: any) => (
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="size-8 cursor-pointer"
            onClick={() => handleAction("view", "siswa", row.original)}
          >
            <Eye className="size-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="size-8 cursor-pointer text-primary"
            onClick={() => handleAction("edit", "siswa", row.original)}
          >
            <Pencil className="size-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="size-8 cursor-pointer text-destructive"
            onClick={() => handleAction("delete", "siswa", row.original)}
          >
            <Trash2 className="size-4" />
          </Button>
        </div>
      ),
    },
  ], []);

  const waliColumns = React.useMemo(() => [
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
    {
      id: "actions",
      header: "Aksi",
      cell: ({ row }: any) => (
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="size-8 cursor-pointer"
            onClick={() => handleAction("view", "wali", row.original)}
          >
            <Eye className="size-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="size-8 cursor-pointer text-primary"
            onClick={() => handleAction("edit", "wali", row.original)}
          >
            <Pencil className="size-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="size-8 cursor-pointer text-destructive"
            onClick={() => handleAction("delete", "wali", row.original)}
          >
            <Trash2 className="size-4" />
          </Button>
        </div>
      ),
    },
  ], []);

  const bkColumns = React.useMemo(() => [
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
    {
      id: "actions",
      header: "Aksi",
      cell: ({ row }: any) => (
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="size-8 cursor-pointer"
            onClick={() => handleAction("view", "bk", row.original)}
          >
            <Eye className="size-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="size-8 cursor-pointer text-primary"
            onClick={() => handleAction("edit", "bk", row.original)}
          >
            <Pencil className="size-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="size-8 cursor-pointer text-destructive"
            onClick={() => handleAction("delete", "bk", row.original)}
          >
            <Trash2 className="size-4" />
          </Button>
        </div>
      ),
    },
  ], []);

  const kepsekColumns = React.useMemo(() => [
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
    {
      id: "actions",
      header: "Aksi",
      cell: ({ row }: any) => (
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="size-8 cursor-pointer"
            onClick={() => handleAction("view", "kepsek", row.original)}
          >
            <Eye className="size-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="size-8 cursor-pointer text-primary"
            onClick={() => handleAction("edit", "kepsek", row.original)}
          >
            <Pencil className="size-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="size-8 cursor-pointer text-destructive"
            onClick={() => handleAction("delete", "kepsek", row.original)}
          >
            <Trash2 className="size-4" />
          </Button>
        </div>
      ),
    },
  ], []);

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
        <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full space-y-4">
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
              globalFilter={searchQuery}
              onGlobalFilterChange={handleGlobalFilterChange}
              columnFilters={siswaColumnFilters}
              onColumnFiltersChange={handleSiswaColumnFiltersChange}
              onReset={handleSiswaReset}
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
              globalFilter={searchQuery}
              onGlobalFilterChange={handleGlobalFilterChange}
              onReset={handleGenericReset}
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
              globalFilter={searchQuery}
              onGlobalFilterChange={handleGlobalFilterChange}
              onReset={handleGenericReset}
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
              globalFilter={searchQuery}
              onGlobalFilterChange={handleGlobalFilterChange}
              onReset={handleGenericReset}
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

      {/* ─── ACTION DIALOGS ─────────────────────────────────────────────── */}

      <ViewAccountDialog
        open={isViewOpen}
        onOpenChange={setIsViewOpen}
        type={activeRole}
        data={selectedItem}
      />

      <DeleteConfirmDialog
        open={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
        onConfirm={handleConfirmDelete}
        itemName={selectedItem?.name}
        title={`Hapus Akun ${activeRole === "siswa" ? "Siswa" : activeRole === "wali" ? "Guru Wali" : activeRole === "bk" ? "Guru BK" : "Kepala Sekolah"}`}
        description={`Apakah Anda yakin ingin menghapus akun ${selectedItem?.name}? Tindakan ini tidak dapat dibatalkan.`}
      />

      {activeRole === "siswa" && (
        <EditSiswaDialog
          open={isEditOpen}
          onOpenChange={setIsEditOpen}
          student={selectedItem}
          walis={walis}
          bks={bks}
          onSave={handleSaveEdit}
        />
      )}

      {activeRole === "wali" && (
        <EditWaliDialog
          open={isEditOpen}
          onOpenChange={setIsEditOpen}
          wali={selectedItem}
          onSave={handleSaveEdit}
        />
      )}

      {activeRole === "bk" && (
        <EditBkDialog
          open={isEditOpen}
          onOpenChange={setIsEditOpen}
          bk={selectedItem}
          onSave={handleSaveEdit}
        />
      )}

      {activeRole === "kepsek" && (
        <EditKepsekDialog
          open={isEditOpen}
          onOpenChange={setIsEditOpen}
          kepsek={selectedItem}
          onSave={handleSaveEdit}
        />
      )}
    </div>
  );
}
