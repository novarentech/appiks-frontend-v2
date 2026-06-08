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
import { Upload, FileSpreadsheet, Loader2, Download } from "lucide-react";
import * as React from "react";

interface ImportSiswaDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onImport: (importedStudents: Array<{ nisn: string; name: string; class: string; createdAt: string; status: string }>) => void;
}

export function ImportSiswaDialog({ open, onOpenChange, onImport }: ImportSiswaDialogProps) {
  const [importFileName, setImportFileName] = React.useState<string | null>(null);
  const [isImporting, setIsImporting] = React.useState(false);
  const todayDate = "2026-06-08";

  const handleImportSiswa = () => {
    if (!importFileName) return;
    setIsImporting(true);
    setTimeout(() => {
      const mockImported = [
        { nisn: "0082736199", name: "Amelia Putri", class: "X-A", createdAt: todayDate, status: "Aktif" },
        { nisn: "0082736200", name: "Bagus Pamungkas", class: "XI-IPA-1", createdAt: todayDate, status: "Aktif" },
        { nisn: "0082736201", name: "Citra Dewi", class: "XII-IPS-2", createdAt: todayDate, status: "Aktif" },
        { nisn: "0082736202", name: "Dimas Anggara", class: "X-B", createdAt: todayDate, status: "Aktif" },
        { nisn: "0082736203", name: "Elisa Fitri", class: "XI-IPS-1", createdAt: todayDate, status: "Aktif" },
      ];
      onImport(mockImported);
      setIsImporting(false);
      setImportFileName(null);
      onOpenChange(false);
    }, 1200);
  };

  React.useEffect(() => {
    if (!open) {
      setImportFileName(null);
      setIsImporting(false);
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {/* 1. Tambahan overflow-y-auto & max-h-[90vh] untuk scrolling vertikal */}
      <DialogContent size="lg" className="w-[95vw] sm:max-w-lg md:max-w-xl max-h-[90vh] overflow-y-auto p-4 sm:p-6">
        <DialogHeader>
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left pb-2">
            <div className="p-3 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-xl shrink-0">
              <Upload className="size-6" />
            </div>
            <div className="space-y-1">
              <DialogTitle>Import Akun Siswa</DialogTitle>
              <DialogDescription>
                Unggah berkas spreadsheet (.xlsx) untuk mengimpor akun siswa secara massal.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="flex flex-col gap-4 py-2 sm:py-4">
          {/* 2. Download Template - Stacking vertikal di HP, horizontal di Desktop */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-muted/30 dark:bg-muted/5 p-3 sm:p-4 rounded-lg border text-left gap-3 sm:gap-4">
            <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
              <div className="p-2 bg-emerald-500/10 rounded-md shrink-0">
                <FileSpreadsheet className="size-5 sm:size-6 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div className="min-w-0">
                <p className="text-xs sm:text-sm font-semibold text-foreground truncate">Template Excel Siswa</p>
                <p className="text-[10px] sm:text-[11px] text-muted-foreground truncate">Gunakan format ini agar import berhasil</p>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="w-full sm:w-auto gap-1.5 h-8 text-xs shrink-0 cursor-pointer"
              onClick={() => alert("Mengunduh template_import_siswa.xlsx...")}
            >
              <Download className="size-3.5" />
              Unduh Template
            </Button>
          </div>

          {/* 3. Upload Area - Penyesuaian padding dan ukuran font responsif */}
          <div className="flex flex-col items-center justify-center border-2 border-dashed border-muted-foreground/25 rounded-lg p-4 sm:p-6 bg-muted/20 dark:bg-muted/5 transition-all text-center min-h-[160px] sm:min-h-[180px]">
            {importFileName ? (
              <div className="space-y-2 sm:space-y-3 w-full px-2">
                <FileSpreadsheet className="size-8 sm:size-10 text-emerald-500 mx-auto" />
                <div>
                  <p className="text-xs sm:text-sm font-medium truncate">{importFileName}</p>
                  <p className="text-[10px] sm:text-xs text-muted-foreground">3.2 KB • Berkas siap diimpor</p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setImportFileName(null)}
                  className="text-destructive hover:bg-destructive/10 h-8 text-xs"
                  disabled={isImporting}
                >
                  Hapus berkas
                </Button>
              </div>
            ) : (
              <div
                onClick={() => setImportFileName("template_import_siswa.xlsx")}
                className="cursor-pointer space-y-2 w-full h-full py-2 flex flex-col items-center justify-center group"
              >
                <Upload className="size-8 sm:size-10 text-muted-foreground mx-auto group-hover:scale-110 transition-transform duration-200" />
                <div className="px-2">
                  <p className="text-xs sm:text-sm font-semibold text-primary">Klik di sini untuk simulasi unggah</p>
                  <p className="text-[10px] sm:text-xs text-muted-foreground mt-1">Mendukung .xlsx atau .csv</p>
                </div>
              </div>
            )}
          </div>
        </div>

        <DialogFooter className="flex flex-col-reverse sm:flex-row gap-2 sm:gap-2 mt-2 sm:mt-0">
          <Button 
            variant="outline" 
            onClick={() => onOpenChange(false)} 
            disabled={isImporting}
            className="w-full sm:w-auto"
          >
            Batal
          </Button>
          <Button 
            onClick={handleImportSiswa} 
            disabled={!importFileName || isImporting}
            className="w-full sm:w-auto"
          >
            {isImporting ? (
              <>
                <Loader2 className="size-4 animate-spin mr-2" />
                Mengimpor...
              </>
            ) : (
              "Mulai Import"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}