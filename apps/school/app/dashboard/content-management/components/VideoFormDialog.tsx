"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import * as React from "react";
import { Video, Plus, Pencil } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  Button,
  Input,
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@appiks/ui";

const videoSchema = z.object({
  title: z
    .string()
    .min(1, "Judul video tidak boleh kosong")
    .min(5, "Judul video minimal terdiri dari 5 karakter"),
  url: z
    .string()
    .min(1, "Link video tidak boleh kosong")
    .url("Link video harus berupa URL valid (contoh: https://...)"),
  status: z.string().min(1, "Status harus dipilih"),
  description: z
    .string()
    .min(1, "Deskripsi video tidak boleh kosong")
    .min(5, "Deskripsi video minimal 5 karakter"),
});

type VideoFormValues = z.infer<typeof videoSchema>;

interface VideoFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode: "add" | "edit";
  videoData?: any;
  onSave: (data: {
    title: string;
    url: string;
    status: string;
    description: string;
  }) => void;
}

export function VideoFormDialog({
  open,
  onOpenChange,
  mode,
  videoData,
  onSave,
}: VideoFormDialogProps) {
  const form = useForm<VideoFormValues>({
    resolver: zodResolver(videoSchema) as any,
    defaultValues: {
      title: "",
      url: "",
      status: "Aktif",
      description: "",
    },
  });

  React.useEffect(() => {
    if (open) {
      if (mode === "edit" && videoData) {
        form.reset({
          title: videoData.title || "",
          url: videoData.url || "",
          status: videoData.status || "Aktif",
          description: videoData.description || "",
        });
      } else {
        form.reset({
          title: "",
          url: "",
          status: "Aktif",
          description: "",
        });
      }
    }
  }, [open, mode, videoData, form]);

  const onSubmit = (values: VideoFormValues) => {
    onSave(values);
    onOpenChange(false);
  };

  const isEdit = mode === "edit";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent size="lg">
        <DialogHeader>
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left pb-2">
            <div className="p-3 bg-primary/10 text-primary rounded-xl shrink-0">
              {isEdit ? <Pencil className="size-6" /> : <Video className="size-6" />}
            </div>
            <div className="space-y-1">
              <DialogTitle>{isEdit ? "Edit Konten Video" : "Tambah Konten Video"}</DialogTitle>
              <DialogDescription>
                {isEdit
                  ? "Perbarui rincian link dan informasi video di bawah ini."
                  : "Tambahkan video edukasi baru untuk memfasilitasi bimbingan siswa."}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit as any)}
            className="space-y-4 pt-2"
          >
            {/* Judul */}
            <FormField
              control={form.control as any}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Judul Video</FormLabel>
                  <FormControl>
                    <Input placeholder="Masukkan judul video..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Link/URL Video & Status Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* URL */}
              <FormField
                control={form.control as any}
                name="url"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Link Video (YouTube/Drive)</FormLabel>
                    <FormControl>
                      <Input placeholder="https://youtube.com/..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Status */}
              <FormField
                control={form.control as any}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Pilih Status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent position="popper">
                        <SelectItem value="Aktif">Aktif</SelectItem>
                        <SelectItem value="Draft">Draft</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Deskripsi Video */}
            <FormField
              control={form.control as any}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Deskripsi / Ringkasan Video</FormLabel>
                  <FormControl>
                    <textarea
                      className="flex min-h-[100px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="Masukkan ringkasan singkat dari isi video..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="flex flex-col-reverse sm:flex-row gap-2 sm:gap-2 mt-2 sm:mt-0">
              <Button
                variant="outline"
                type="button"
                onClick={() => onOpenChange(false)}
                className="w-full sm:w-auto"
              >
                Batal
              </Button>
              <Button type="submit" className="w-full sm:w-auto">Simpan</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
