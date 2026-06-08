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
import { Eye } from "lucide-react";
import * as React from "react";

interface ViewAccountDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  type: "siswa" | "wali" | "bk" | "kepsek" | null;
  data: any;
}

export function ViewAccountDialog({
  open,
  onOpenChange,
  type,
  data,
}: ViewAccountDialogProps) {
  if (!type || !data) return null;

  const getInitials = (name: string) => {
    return name
      ?.split(" ")
      .map((n) => n[0])
      .slice(0, 2)
      .join("")
      .toUpperCase() || "U";
  };

  const getRoleLabel = () => {
    switch (type) {
      case "siswa":
        return "Siswa";
      case "wali":
        return "Guru Wali";
      case "bk":
        return "Guru BK";
      case "kepsek":
        return "Kepala Sekolah";
      default:
        return "Pengguna";
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent size="lg">
        <DialogHeader>
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left pb-2">
            <div className="p-3 bg-primary/10 text-primary rounded-xl shrink-0">
              <Eye className="size-6" />
            </div>
            <div className="space-y-1">
              <DialogTitle>Detail Akun {getRoleLabel()}</DialogTitle>
              <DialogDescription>
                Informasi lengkap mengenai akun pengguna yang bersangkutan.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        {/* User Card */}
        <div className="flex items-center gap-4 bg-muted/20 dark:bg-muted/5 p-4 rounded-xl border mb-2">
          <div className="size-12 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-lg shrink-0">
            {getInitials(data.name)}
          </div>
          <div className="min-w-0">
            <h3 className="font-semibold text-sm sm:text-base truncate">{data.name}</h3>
            <div className="flex items-center gap-2 mt-1">
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-primary/10 text-primary uppercase">
                {getRoleLabel()}
              </span>
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-semibold border ${
                  data.status === "Aktif" || data.status === "active"
                    ? "bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400 border-emerald-500/20"
                    : "bg-amber-500/10 text-amber-600 dark:bg-amber-500/20 dark:text-amber-400 border-amber-500/20"
                }`}
              >
                {data.status || "Aktif"}
              </span>
            </div>
          </div>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-2">
          {type === "siswa" && (
            <>
              <DetailItem label="NISN" value={data.nisn} />
              <DetailItem label="Nama Lengkap" value={data.name} />
              <DetailItem label="Kelas / Tingkat" value={data.class || "Tidak terdefinisi"} />
              <DetailItem label="Guru Wali" value={data.homeroomTeacher || "Belum ditentukan"} />
              <DetailItem label="Guru BK" value={data.bkTeacher || "Belum ditentukan"} />
              <DetailItem label="Tanggal Terdaftar" value={data.createdAt} />
            </>
          )}

          {type === "wali" && (
            <>
              <DetailItem label="NIP" value={data.nip} />
              <DetailItem label="Nama Lengkap" value={data.name} />
              <DetailItem label="Username" value={data.username || "-"} />
              <DetailItem label="Wali Kelas" value={data.homeroomClass} />
              <DetailItem label="Nomor Telepon" value={data.phone || "-"} />
              <DetailItem label="Tanggal Terdaftar" value={data.createdAt} />
            </>
          )}

          {type === "bk" && (
            <>
              <DetailItem label="NIP" value={data.nip} />
              <DetailItem label="Nama Lengkap" value={data.name} />
              <DetailItem label="Username" value={data.username || "-"} />
              <DetailItem label="Binaan Kelas" value={data.targetGroup || "Semua Kelas"} />
              <DetailItem label="Nomor Telepon" value={data.phone || "-"} />
              <DetailItem label="Tanggal Terdaftar" value={data.createdAt} />
            </>
          )}

          {type === "kepsek" && (
            <>
              <DetailItem label="NIP" value={data.nip} />
              <DetailItem label="Nama Lengkap" value={data.name} />
              <DetailItem label="Username" value={data.username || "-"} />
              <DetailItem label="Jabatan" value={data.title} />
              <DetailItem label="Nomor Telepon" value={data.phone || "-"} />
              <DetailItem label="Tanggal Terdaftar" value={data.createdAt} />
            </>
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
    <p className="text-xs sm:text-sm font-semibold text-foreground break-all">{value || "-"}</p>
  </div>
);
