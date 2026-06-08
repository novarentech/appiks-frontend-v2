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
} from "@appiks/ui";
import { useQueryParams } from "@appiks/ui/hooks/useQueryParams";
import {
  FileText,
  Video,
  Quote,
  Plus,
  Eye,
  Pencil,
  Trash2,
} from "lucide-react";
import * as React from "react";

// Import components
import { ArticleFormDialog } from "./components/ArticleFormDialog";
import { VideoFormDialog } from "./components/VideoFormDialog";
import { QuotesFormDialog } from "./components/QuotesFormDialog";
import { ViewContentDialog } from "./components/ViewContentDialog";
import { DeleteConfirmDialog } from "./components/DeleteConfirmDialog";

// 30 Mock Articles
const mockArticles = Array.from({ length: 30 }).map((_, i) => {
  const titles = [
    "Mengatasi Kecemasan Menjelang Ujian Akhir",
    "Cara Efektif Mengatur Waktu Belajar & Istirahat",
    "Membangun Mindset Berkembang (Growth Mindset)",
    "Pentingnya Menjaga Kesehatan Mental di Sekolah",
    "Tips Menghadapi Tekanan Teman Sebaya (Peer Pressure)",
    "Bagaimana Membangun Percaya Diri Sejak Dini",
  ];
  const cats = ["Kesehatan Mental", "Tips Belajar", "Pengembangan Diri", "Sosial"];
  const date = `2026-06-${String((i % 8) + 1).padStart(2, "0")}`;
  return {
    id: `art-${i + 1}`,
    title: `${titles[i % titles.length]} (Seri ${Math.floor(i / titles.length) + 1})`,
    category: cats[i % cats.length],
    status: i % 7 === 0 ? "Draft" : "Aktif",
    createdAt: date,
    content: "Materi edukasi lengkap ini dibuat untuk memandu siswa memahami diri, mengelola emosi, serta mengatasi stres akademik dan sosial dengan baik. Direkomendasikan dibaca sebelum sesi bimbingan konseling tatap muka.",
  };
});

// 10 Mock Videos
const mockVideos = Array.from({ length: 10 }).map((_, i) => {
  const titles = [
    "Panduan Meditasi 5 Menit untuk Pemula",
    "Mengatasi Stres Ujian dengan Napas Box Breathing",
    "Strategi Belajar Anti-Prokrastinasi (Menunda-nunda)",
    "Mengenal Peran Guru BK di Sekolah Anda",
    "Mengatur Goals Belajar Secara S.M.A.R.T",
  ];
  const date = `2026-06-${String((i % 5) + 1).padStart(2, "0")}`;
  return {
    id: `vid-${i + 1}`,
    title: `${titles[i % titles.length]} - Bagian ${Math.floor(i / titles.length) + 1}`,
    url: `https://www.youtube.com/watch?v=mock-video-${i + 1}`,
    status: i % 4 === 0 ? "Draft" : "Aktif",
    createdAt: date,
    description: "Video tutorial praktis bimbingan konseling yang interaktif untuk dipelajari siswa di luar jam kelas.",
  };
});

// 10 Mock Quotes
const mockQuotes = Array.from({ length: 10 }).map((_, i) => {
  const quotes = [
    "Kesehatan mental Anda adalah prioritas utama, bukan pilihan kedua.",
    "Kegagalan hari ini bukanlah akhir, melainkan pembelajaran berharga untuk esok.",
    "Jangan biarkan apa yang tidak bisa Anda lakukan mengganggu apa yang bisa Anda lakukan.",
    "Bertumbuhlah dengan kecepatan Anda sendiri, tidak ada perlombaan di sini.",
    "Setiap langkah kecil ke depan adalah kemajuan yang patut dirayakan.",
  ];
  const authors = ["Anonim", "BK Team Appiks", "Albert Einstein", "Hellen Keller", "Dr. H. Slamet Riyadi"];
  const date = `2026-06-${String((i % 5) + 1).padStart(2, "0")}`;
  return {
    id: `quote-${i + 1}`,
    quote: quotes[i % quotes.length],
    author: authors[i % authors.length],
    status: i % 3 === 0 ? "Draft" : "Aktif",
    createdAt: date,
  };
});

export default function Page() {
  return (
    <React.Suspense
      fallback={
        <div className="p-8 text-center text-sm text-muted-foreground animate-pulse">
          Memuat manajemen konten...
        </div>
      }
    >
      <ContentManagement />
    </React.Suspense>
  );
}

function ContentManagement() {
  const [articles, setArticles] = React.useState(mockArticles);
  const [videos, setVideos] = React.useState(mockVideos);
  const [quotes, setQuotes] = React.useState(mockQuotes);

  // Dialog visibility controls
  const [isFormOpen, setIsFormOpen] = React.useState(false);
  const [isViewOpen, setIsViewOpen] = React.useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = React.useState(false);

  // Form Mode & Tracker
  const [formMode, setFormMode] = React.useState<"add" | "edit">("add");
  const [activeType, setActiveType] = React.useState<"article" | "video" | "quotes" | null>(null);
  const [selectedItem, setSelectedItem] = React.useState<any>(null);

  const { updateQueryParams, searchParams } = useQueryParams();

  const activeTab = searchParams.get("tab") || "article";
  const searchQuery = searchParams.get("search") || "";

  const handleTabChange = (tab: string) => {
    updateQueryParams({ tab, search: null });
  };

  const handleGlobalFilterChange = (value: string) => {
    updateQueryParams({ search: value });
  };

  const handleReset = () => {
    updateQueryParams({ search: null });
  };

  const handleAction = (
    action: "view" | "edit" | "delete",
    type: "article" | "video" | "quotes",
    item: any
  ) => {
    setSelectedItem(item);
    setActiveType(type);
    if (action === "view") {
      setIsViewOpen(true);
    } else if (action === "edit") {
      setFormMode("edit");
      setIsFormOpen(true);
    } else if (action === "delete") {
      setIsDeleteOpen(true);
    }
  };

  const handleSaveForm = (formData: any) => {
    const today = new Date().toISOString().split("T")[0];
    if (activeType === "article") {
      if (formMode === "add") {
        setArticles((prev) => [
          {
            id: `art-${prev.length + 1}`,
            createdAt: today,
            ...formData,
          },
          ...prev,
        ]);
      } else {
        setArticles((prev) =>
          prev.map((a) => (a.id === selectedItem.id ? { ...a, ...formData } : a))
        );
      }
    } else if (activeType === "video") {
      if (formMode === "add") {
        setVideos((prev) => [
          {
            id: `vid-${prev.length + 1}`,
            createdAt: today,
            ...formData,
          },
          ...prev,
        ]);
      } else {
        setVideos((prev) =>
          prev.map((v) => (v.id === selectedItem.id ? { ...v, ...formData } : v))
        );
      }
    } else if (activeType === "quotes") {
      if (formMode === "add") {
        setQuotes((prev) => [
          {
            id: `quote-${prev.length + 1}`,
            createdAt: today,
            ...formData,
          },
          ...prev,
        ]);
      } else {
        setQuotes((prev) =>
          prev.map((q) => (q.id === selectedItem.id ? { ...q, ...formData } : q))
        );
      }
    }
  };

  const handleConfirmDelete = () => {
    if (activeType === "article") {
      setArticles((prev) => prev.filter((a) => a.id !== selectedItem.id));
    } else if (activeType === "video") {
      setVideos((prev) => prev.filter((v) => v.id !== selectedItem.id));
    } else if (activeType === "quotes") {
      setQuotes((prev) => prev.filter((q) => q.id !== selectedItem.id));
    }
  };

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
        {isAktif ? "Aktif" : "Draft"}
      </span>
    );
  };

  // 1. Columns for Article
  const articleColumns = React.useMemo(
    () => [
      {
        accessorKey: "title",
        header: "Judul Artikel",
      },
      {
        accessorKey: "category",
        header: "Kategori",
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }: any) => renderStatusBadge(row.getValue("status")),
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
              onClick={() => handleAction("view", "article", row.original)}
            >
              <Eye className="size-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="size-8 cursor-pointer text-primary"
              onClick={() => handleAction("edit", "article", row.original)}
            >
              <Pencil className="size-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="size-8 cursor-pointer text-destructive"
              onClick={() => handleAction("delete", "article", row.original)}
            >
              <Trash2 className="size-4" />
            </Button>
          </div>
        ),
      },
    ],
    []
  );

  // 2. Columns for Video
  const videoColumns = React.useMemo(
    () => [
      {
        accessorKey: "title",
        header: "Judul Video",
      },
      {
        accessorKey: "url",
        header: "Link Video",
        cell: ({ row }: any) => {
          const url = row.getValue("url") as string;
          return (
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline font-medium text-xs break-all line-clamp-1"
            >
              {url}
            </a>
          );
        },
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }: any) => renderStatusBadge(row.getValue("status")),
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
              onClick={() => handleAction("view", "video", row.original)}
            >
              <Eye className="size-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="size-8 cursor-pointer text-primary"
              onClick={() => handleAction("edit", "video", row.original)}
            >
              <Pencil className="size-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="size-8 cursor-pointer text-destructive"
              onClick={() => handleAction("delete", "video", row.original)}
            >
              <Trash2 className="size-4" />
            </Button>
          </div>
        ),
      },
    ],
    []
  );

  // 3. Columns for Quotes
  const quoteColumns = React.useMemo(
    () => [
      {
        accessorKey: "quote",
        header: "Kutipan (Quotes)",
        cell: ({ row }: any) => {
          const text = row.getValue("quote") as string;
          return (
            <span className="italic font-serif line-clamp-1 text-xs">
              &ldquo;{text}&rdquo;
            </span>
          );
        },
      },
      {
        accessorKey: "author",
        header: "Pembuat / Tokoh",
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }: any) => renderStatusBadge(row.getValue("status")),
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
              onClick={() => handleAction("view", "quotes", row.original)}
            >
              <Eye className="size-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="size-8 cursor-pointer text-primary"
              onClick={() => handleAction("edit", "quotes", row.original)}
            >
              <Pencil className="size-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="size-8 cursor-pointer text-destructive"
              onClick={() => handleAction("delete", "quotes", row.original)}
            >
              <Trash2 className="size-4" />
            </Button>
          </div>
        ),
      },
    ],
    []
  );

  // Panels Stats Data
  const statItems = React.useMemo(
    () => [
      {
        icon: FileText,
        label: "TOTAL KONTEN ARTIKEL",
        value: articles.length,
        bgColor: "bg-blue-500/10 dark:bg-blue-500/20",
        textColor: "text-blue-600 dark:text-blue-400",
      },
      {
        icon: Video,
        label: "TOTAL KONTEN VIDEO",
        value: videos.length,
        bgColor: "bg-blue-500/10 dark:bg-blue-500/20",
        textColor: "text-blue-600 dark:text-blue-400",
      },
      {
        icon: Quote,
        label: "TOTAL KONTEN QUOTES",
        value: quotes.length,
        bgColor: "bg-blue-500/10 dark:bg-blue-500/20",
        textColor: "text-blue-600 dark:text-blue-400",
      },
    ],
    [articles, videos, quotes]
  );

  const openAddDialog = (type: "article" | "video" | "quotes") => {
    setActiveType(type);
    setFormMode("add");
    setSelectedItem(null);
    setIsFormOpen(true);
  };

  return (
    <div className="flex flex-col">
      <DashboardHeader
        title="Kelola Konten"
        description="Kelola materi edukasi bimbingan konseling berupa artikel, video tutorial, dan kutipan motivasi harian."
      />
      <div className="px-6 space-y-6">
        <DashboardPanel items={statItems} gridCols="grid-cols-1 md:grid-cols-3" />

        <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full space-y-4">
          <TabsList className="grid grid-cols-3 md:flex w-full bg-muted/50 dark:bg-muted/10 p-1 rounded-lg gap-1 h-auto! md:h-9! border">
            <TabsTrigger value="article" className="rounded-lg px-1.5 py-1 text-sm font-medium justify-center h-9 md:h-auto">
              Artikel
              <span className="ml-2 bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary-400 rounded-full px-2 py-0.5 text-xs font-semibold">
                {articles.length}
              </span>
            </TabsTrigger>
            <TabsTrigger value="video" className="rounded-lg px-1.5 py-1 text-sm font-medium justify-center h-9 md:h-auto">
              Video
              <span className="ml-2 bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary-400 rounded-full px-2 py-0.5 text-xs font-semibold">
                {videos.length}
              </span>
            </TabsTrigger>
            <TabsTrigger value="quotes" className="rounded-lg px-1.5 py-1 text-sm font-medium justify-center h-9 md:h-auto">
              Quotes
              <span className="ml-2 bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary-400 rounded-full px-2 py-0.5 text-xs font-semibold">
                {quotes.length}
              </span>
            </TabsTrigger>
          </TabsList>

          {/* 1. Panel Artikel */}
          <TabsContent value="article" className="outline-none pt-2">
            <DataTable
              columns={articleColumns}
              data={articles}
              searchable
              searchPlaceholder="Cari judul atau kategori artikel..."
              defaultPageSize={5}
              globalFilter={searchQuery}
              onGlobalFilterChange={handleGlobalFilterChange}
              onReset={handleReset}
              actionButton={
                <Button
                  size="sm"
                  onClick={() => openAddDialog("article")}
                  className="gap-1.5 shadow-xs"
                >
                  <Plus className="size-4" />
                  Tambah Artikel
                </Button>
              }
            />
          </TabsContent>

          {/* 2. Panel Video */}
          <TabsContent value="video" className="outline-none pt-2">
            <DataTable
              columns={videoColumns}
              data={videos}
              searchable
              searchPlaceholder="Cari judul video..."
              defaultPageSize={5}
              globalFilter={searchQuery}
              onGlobalFilterChange={handleGlobalFilterChange}
              onReset={handleReset}
              actionButton={
                <Button
                  size="sm"
                  onClick={() => openAddDialog("video")}
                  className="gap-1.5 shadow-xs"
                >
                  <Plus className="size-4" />
                  Tambah Video
                </Button>
              }
            />
          </TabsContent>

          {/* 3. Panel Quotes */}
          <TabsContent value="quotes" className="outline-none pt-2">
            <DataTable
              columns={quoteColumns}
              data={quotes}
              searchable
              searchPlaceholder="Cari kutipan atau pembuat..."
              defaultPageSize={5}
              globalFilter={searchQuery}
              onGlobalFilterChange={handleGlobalFilterChange}
              onReset={handleReset}
              actionButton={
                <Button
                  size="sm"
                  onClick={() => openAddDialog("quotes")}
                  className="gap-1.5 shadow-xs"
                >
                  <Plus className="size-4" />
                  Tambah Quote
                </Button>
              }
            />
          </TabsContent>
        </Tabs>
      </div>

      {/* ─── DYNAMIC FORM DIALOGS ───────────────────────────────────────── */}
      {activeType === "article" && (
        <ArticleFormDialog
          open={isFormOpen}
          onOpenChange={setIsFormOpen}
          mode={formMode}
          articleData={selectedItem}
          onSave={handleSaveForm}
        />
      )}

      {activeType === "video" && (
        <VideoFormDialog
          open={isFormOpen}
          onOpenChange={setIsFormOpen}
          mode={formMode}
          videoData={selectedItem}
          onSave={handleSaveForm}
        />
      )}

      {activeType === "quotes" && (
        <QuotesFormDialog
          open={isFormOpen}
          onOpenChange={setIsFormOpen}
          mode={formMode}
          quoteData={selectedItem}
          onSave={handleSaveForm}
        />
      )}

      {/* ─── VIEW DETAIL DIALOG ─────────────────────────────────────────── */}
      <ViewContentDialog
        open={isViewOpen}
        onOpenChange={setIsViewOpen}
        type={activeType}
        data={selectedItem}
      />

      {/* ─── DELETE CONFIRM DIALOG ──────────────────────────────────────── */}
      <DeleteConfirmDialog
        open={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
        onConfirm={handleConfirmDelete}
        itemName={
          activeType === "quotes"
            ? selectedItem?.quote
            : selectedItem?.title
        }
      />
    </div>
  );
}
