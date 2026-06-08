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
import { Eye, BookOpen } from "lucide-react";
import * as React from "react";

interface ViewKelasDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  data: any;
}

export function ViewKelasDialog({
  open,
  onOpenChange,
  data,
}: ViewKelasDialogProps) {
  if (!data) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent size="lg">
        <DialogHeader>
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left pb-2">
            <div className="p-3 bg-primary/10 text-primary rounded-xl shrink-0">
              <Eye className="size-6" />
            </div>
            <div className="space-y-1">
              <DialogTitle>Detail Kelas</DialogTitle>
              <DialogDescription>
                Informasi lengkap mengenai rincian data kelas terpilih.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        {/* Class Banner Card */}
        <div className="flex items-center gap-4 bg-muted/20 dark:bg-muted/5 p-4 rounded-xl border mb-2">
          <div className="size-12 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
            <BookOpen className="size-6" />
          </div>
          <div className="min-w-0">
            <h3 className="font-semibold text-sm sm:text-base truncate">Kelas {data.name}</h3>
            <div className="flex items-center gap-2 mt-1">
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-primary/10 text-primary uppercase">
                Tingkat {data.grade}
              </span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400 border border-emerald-500/20">
                {data.studentCount} Siswa
              </span>
            </div>
          </div>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-2">
          <DetailItem label="Nama Kelas" value={data.name} />
          <DetailItem label="Tingkat" value={`Tingkat ${data.grade}`} />
          <DetailItem label="Kode Kelas" value={data.code} />
          <DetailItem label="Total Siswa Terdaftar" value={`${data.studentCount} Siswa`} />
          <DetailItem label="Waktu Dibuat" value={data.createdAt} />
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
    <p className="text-xs sm:text-sm font-semibold text-foreground break-all">{value || "-"}</p>
  </div>
);
