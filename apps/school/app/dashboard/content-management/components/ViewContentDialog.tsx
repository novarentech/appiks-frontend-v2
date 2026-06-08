"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  Button,
} from "@appiks/ui";
import { Eye, FileText, Video, Quote } from "lucide-react";
import * as React from "react";

interface ViewContentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  type: "article" | "video" | "quotes" | null;
  data: any;
}

export function ViewContentDialog({
  open,
  onOpenChange,
  type,
  data,
}: ViewContentDialogProps) {
  if (!type || !data) return null;

  const getIcon = () => {
    switch (type) {
      case "article":
        return <FileText className="size-6" />;
      case "video":
        return <Video className="size-6" />;
      case "quotes":
        return <Quote className="size-6" />;
    }
  };

  const getTitle = () => {
    switch (type) {
      case "article":
        return "Detail Artikel";
      case "video":
        return "Detail Video";
      case "quotes":
        return "Detail Kutipan (Quote)";
    }
  };

  const getStatusBadge = (status: string) => {
    const isAktif = status === "Aktif" || status === "active";
    return (
      <span
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-semibold border ${
          isAktif
            ? "bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400 border-emerald-500/20"
            : "bg-amber-500/10 text-amber-600 dark:bg-amber-500/20 dark:text-amber-400 border-amber-500/20"
        }`}
      >
        {isAktif ? "Aktif" : "Draft"}
      </span>
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent size="lg">
        <DialogHeader>
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left pb-2">
            <div className="p-3 bg-primary/10 text-primary rounded-xl shrink-0">
              {getIcon()}
            </div>
            <div className="space-y-1">
              <DialogTitle>{getTitle()}</DialogTitle>
              <DialogDescription>
                Informasi detail mengenai konten edukasi konseling terpilih.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        {/* Content Header Summary */}
        <div className="flex items-center gap-4 bg-muted/20 dark:bg-muted/5 p-4 rounded-xl border mb-2">
          <div className="min-w-0 flex-1">
            <h3 className="font-semibold text-sm sm:text-base line-clamp-2">
              {type === "quotes" ? `"${data.quote}"` : data.title}
            </h3>
            <div className="flex items-center gap-2 mt-2">
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-primary/10 text-primary uppercase">
                {type === "quotes" ? "Quotes" : type === "video" ? "Video" : data.category}
              </span>
              {getStatusBadge(data.status)}
            </div>
          </div>
        </div>

        {/* Dynamic content rendering based on type */}
        <div className="space-y-4 py-2">
          {type === "article" && (
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-4">
                <DetailItem label="Kategori" value={data.category} />
                <DetailItem label="Waktu Dibuat" value={data.createdAt} />
              </div>
              <div className="bg-muted/10 dark:bg-muted/5 p-4 rounded-lg border">
                <span className="text-[10px] sm:text-xs text-muted-foreground font-semibold uppercase tracking-wider block mb-2">
                  Isi Artikel
                </span>
                <p className="text-xs sm:text-sm text-foreground leading-relaxed whitespace-pre-wrap">
                  {data.content}
                </p>
              </div>
            </div>
          )}

          {type === "video" && (
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-4">
                <DetailItem label="Link Video" value={
                  <a
                    href={data.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline break-all"
                  >
                    {data.url}
                  </a>
                } />
                <DetailItem label="Waktu Dibuat" value={data.createdAt} />
              </div>
              <div className="bg-muted/10 dark:bg-muted/5 p-4 rounded-lg border">
                <span className="text-[10px] sm:text-xs text-muted-foreground font-semibold uppercase tracking-wider block mb-2">
                  Deskripsi Video
                </span>
                <p className="text-xs sm:text-sm text-foreground leading-relaxed">
                  {data.description}
                </p>
              </div>
            </div>
          )}

          {type === "quotes" && (
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-4">
                <DetailItem label="Pembuat (Author)" value={data.author} />
                <DetailItem label="Waktu Dibuat" value={data.createdAt} />
              </div>
              <div className="bg-muted/10 dark:bg-muted/5 p-6 rounded-lg border text-center">
                <span className="text-[10px] sm:text-xs text-muted-foreground font-semibold uppercase tracking-wider block text-left mb-4">
                  Kutipan Motivasi
                </span>
                <p className="text-sm sm:text-lg font-serif italic text-foreground leading-relaxed px-4">
                  &ldquo;{data.quote}&rdquo;
                </p>
                <p className="text-xs sm:text-sm text-muted-foreground mt-2 font-medium">
                  — {data.author}
                </p>
              </div>
            </div>
          )}
        </div>

        <DialogFooter className="mt-4">
          <Button onClick={() => onOpenChange(false)} className="w-full sm:w-auto">
            Tutup
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

const DetailItem = ({ label, value }: { label: string; value: React.ReactNode }) => (
  <div className="bg-muted/10 dark:bg-muted/5 p-3 rounded-lg border space-y-1">
    <span className="text-[10px] sm:text-xs text-muted-foreground font-semibold uppercase tracking-wider block">
      {label}
    </span>
    <div className="text-xs sm:text-sm font-semibold text-foreground break-all">{value || "-"}</div>
  </div>
);
