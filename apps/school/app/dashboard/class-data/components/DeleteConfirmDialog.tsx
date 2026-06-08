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
import { AlertTriangle, Loader2 } from "lucide-react";
import * as React from "react";

interface DeleteConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  title?: string;
  description?: string;
  itemName?: string;
}

export function DeleteConfirmDialog({
  open,
  onOpenChange,
  onConfirm,
  title = "Hapus Kelas",
  description = "Apakah Anda yakin ingin menghapus kelas ini? Tindakan ini tidak dapat dibatalkan.",
  itemName,
}: DeleteConfirmDialogProps) {
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleConfirm = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      onConfirm();
      setIsSubmitting(false);
      onOpenChange(false);
    }, 800);
  };

  React.useEffect(() => {
    if (!open) {
      setIsSubmitting(false);
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent size="sm">
        <DialogHeader>
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left pb-2">
            <div className="p-3 bg-destructive/10 text-destructive rounded-xl shrink-0">
              <AlertTriangle className="size-6" />
            </div>
            <div className="space-y-1">
              <DialogTitle>{title}</DialogTitle>
              <DialogDescription>{description}</DialogDescription>
            </div>
          </div>
        </DialogHeader>

        {itemName && (
          <div className="bg-destructive/5 border border-destructive/10 p-3 rounded-lg text-sm text-center font-medium text-destructive">
            Kelas: {itemName}
          </div>
        )}

        <DialogFooter className="flex flex-col-reverse sm:flex-row gap-2 sm:gap-2 mt-4">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isSubmitting}
            className="w-full sm:w-auto"
          >
            Batal
          </Button>
          <Button
            variant="destructive"
            onClick={handleConfirm}
            disabled={isSubmitting}
            className="w-full sm:w-auto"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="size-4 animate-spin mr-2" />
                Menghapus...
              </>
            ) : (
              "Ya, Hapus"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
