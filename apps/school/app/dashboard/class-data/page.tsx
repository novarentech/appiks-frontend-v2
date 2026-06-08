"use client";

import {
  DashboardHeader,
  DashboardPanel,
  DataTable,
  Button,
  type FilterColumn,
} from "@appiks/ui";
import {
  BookOpen,
  Users,
  Plus,
  Eye,
  Pencil,
  Trash2,
} from "lucide-react";
import * as React from "react";
import { type ColumnFiltersState } from "@tanstack/react-table";

// Import dialogs
import { TambahKelasDialog } from "./components/TambahKelasDialog";
import { EditKelasDialog } from "./components/EditKelasDialog";
import { ViewKelasDialog } from "./components/ViewKelasDialog";
import { DeleteConfirmDialog } from "./components/DeleteConfirmDialog";
import { useQueryParams } from "@appiks/ui/hooks/useQueryParams";

const initialClassData = [
  {
    id: "1",
    name: "X-A",
    grade: "X",
    code: "KLS-X-A",
    studentCount: 32,
    createdAt: "2026-06-08",
  },
  {
    id: "2",
    name: "X-B",
    grade: "X",
    code: "KLS-X-B",
    studentCount: 30,
    createdAt: "2026-06-08",
  },
  {
    id: "3",
    name: "XI-IPA-1",
    grade: "XI",
    code: "KLS-XI-IPA-1",
    studentCount: 28,
    createdAt: "2026-06-05",
  },
  {
    id: "4",
    name: "XI-IPS-1",
    grade: "XI",
    code: "KLS-XI-IPS-1",
    studentCount: 29,
    createdAt: "2026-06-04",
  },
  {
    id: "5",
    name: "XII-IPA-3",
    grade: "XII",
    code: "KLS-XII-IPA-3",
    studentCount: 31,
    createdAt: "2026-06-02",
  },
  {
    id: "6",
    name: "XII-IPS-2",
    grade: "XII",
    code: "KLS-XII-IPS-2",
    studentCount: 27,
    createdAt: "2026-06-01",
  },
];

const gradeFilterColumns: FilterColumn[] = [
  {
    id: "grade",
    title: "Tingkat",
    options: [
      { label: "Tingkat X", value: "X" },
      { label: "Tingkat XI", value: "XI" },
      { label: "Tingkat XII", value: "XII" },
    ],
  },
];

export default function Page() {
  return (
    <React.Suspense
      fallback={
        <div className="p-8 text-center text-sm text-muted-foreground animate-pulse">
          Memuat data kelas...
        </div>
      }
    >
      <ClassDataContent />
    </React.Suspense>
  );
}

function ClassDataContent() {
  const [classes, setClasses] = React.useState(initialClassData);

  // Dialog visibility controls
  const [isTambahOpen, setIsTambahOpen] = React.useState(false);
  const [isEditOpen, setIsEditOpen] = React.useState(false);
  const [isViewOpen, setIsViewOpen] = React.useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = React.useState(false);

  // Selected item tracker
  const [selectedClass, setSelectedClass] = React.useState<any>(null);

  const { updateQueryParams, searchParams } = useQueryParams();

  const searchQuery = searchParams.get("search") || "";
  const gradeQuery = searchParams.get("grade") || "";

  const handleGlobalFilterChange = (value: string) => {
    updateQueryParams({ search: value });
  };

  const handleColumnFiltersChange = (updaterOrValue: any) => {
    const currentFilters: ColumnFiltersState = gradeQuery
      ? [{ id: "grade", value: gradeQuery }]
      : [];
    const nextFilters =
      typeof updaterOrValue === "function"
        ? updaterOrValue(currentFilters)
        : updaterOrValue;

    const gradeVal = nextFilters.find((f: any) => f.id === "grade")?.value || "";
    updateQueryParams({ grade: gradeVal || null });
  };

  const columnFilters = React.useMemo<ColumnFiltersState>(() => {
    return gradeQuery ? [{ id: "grade", value: gradeQuery }] : [];
  }, [gradeQuery]);

  const handleReset = () => {
    updateQueryParams({ search: null, grade: null });
  };

  const handleAction = (
    action: "view" | "edit" | "delete",
    classItem: any
  ) => {
    setSelectedClass(classItem);
    if (action === "view") setIsViewOpen(true);
    if (action === "edit") setIsEditOpen(true);
    if (action === "delete") setIsDeleteOpen(true);
  };

  const handleAddClass = (newClass: {
    name: string;
    grade: string;
    code: string;
    studentCount: number;
  }) => {
    const today = new Date().toISOString().split("T")[0];
    setClasses((prev) => [
      {
        id: String(prev.length + 1),
        ...newClass,
        createdAt: today,
      },
      ...prev,
    ]);
  };

  const handleSaveEdit = (updatedClass: {
    name: string;
    grade: string;
    code: string;
    studentCount: number;
  }) => {
    setClasses((prev) =>
      prev.map((c) =>
        c.id === selectedClass.id ? { ...c, ...updatedClass } : c
      )
    );
  };

  const handleConfirmDelete = () => {
    setClasses((prev) => prev.filter((c) => c.id !== selectedClass.id));
  };

  const columns = React.useMemo(
    () => [
      {
        accessorKey: "name",
        header: "Kelas",
      },
      {
        accessorKey: "grade",
        header: "Tingkat",
      },
      {
        accessorKey: "code",
        header: "Kode Kelas",
      },
      {
        accessorKey: "studentCount",
        header: "Total Siswa",
        cell: ({ row }: any) => {
          const count = row.getValue("studentCount") as number;
          return (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
              {count} Siswa
            </span>
          );
        },
      },
      {
        accessorKey: "createdAt",
        header: "Waktu Dibuat",
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
              onClick={() => handleAction("view", row.original)}
            >
              <Eye className="size-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="size-8 cursor-pointer text-primary"
              onClick={() => handleAction("edit", row.original)}
            >
              <Pencil className="size-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="size-8 cursor-pointer text-destructive"
              onClick={() => handleAction("delete", row.original)}
            >
              <Trash2 className="size-4" />
            </Button>
          </div>
        ),
      },
    ],
    []
  );

  const totalStudents = React.useMemo(() => {
    return classes.reduce((sum, item) => sum + item.studentCount, 0);
  }, [classes]);

  const statItems = React.useMemo(
    () => [
      {
        icon: BookOpen,
        label: "TOTAL KELAS",
        value: classes.length,
        bgColor: "bg-blue-500/10 dark:bg-blue-500/20",
        textColor: "text-blue-600 dark:text-blue-400",
      },
      {
        icon: Users,
        label: "TOTAL SISWA",
        value: totalStudents,
        bgColor: "bg-blue-500/10 dark:bg-blue-500/20",
        textColor: "text-blue-600 dark:text-blue-400",
      },
    ],
    [classes, totalStudents]
  );

  return (
    <div className="flex flex-col">
      <DashboardHeader
        title="Data Kelas"
        description="Kelola dan pantau informasi kelas, tingkat kelas, serta statistik siswa per kelas."
      />
      <div className="px-6 space-y-4">
        <DashboardPanel items={statItems} gridCols="grid-cols-1 md:grid-cols-2" />

        <div className="space-y-4 pt-4 border-border">
          <DataTable
            columns={columns}
            data={classes}
            searchable
            searchPlaceholder="Cari kelas atau kode kelas..."
            filterColumns={gradeFilterColumns}
            actionButton={
              <Button
                size="sm"
                onClick={() => setIsTambahOpen(true)}
                className="gap-1.5 shadow-xs"
              >
                <Plus className="size-4" />
                Tambah Kelas
              </Button>
            }
            defaultPageSize={5}
            globalFilter={searchQuery}
            onGlobalFilterChange={handleGlobalFilterChange}
            columnFilters={columnFilters}
            onColumnFiltersChange={handleColumnFiltersChange}
            onReset={handleReset}
          />
        </div>
      </div>

      {/* dialog forms */}
      <TambahKelasDialog
        open={isTambahOpen}
        onOpenChange={setIsTambahOpen}
        onAdd={handleAddClass}
      />

      <EditKelasDialog
        open={isEditOpen}
        onOpenChange={setIsEditOpen}
        classData={selectedClass}
        onSave={handleSaveEdit}
      />

      <ViewKelasDialog
        open={isViewOpen}
        onOpenChange={setIsViewOpen}
        data={selectedClass}
      />

      <DeleteConfirmDialog
        open={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
        onConfirm={handleConfirmDelete}
        itemName={selectedClass?.name}
      />
    </div>
  );
}
