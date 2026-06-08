"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import * as React from "react";
import { FileText, Plus, Pencil } from "lucide-react";

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

const articleSchema = z.object({
  title: z
    .string()
    .min(1, "Judul artikel tidak boleh kosong")
    .min(5, "Judul artikel minimal terdiri dari 5 karakter"),
  category: z.string().min(1, "Kategori harus dipilih"),
  status: z.string().min(1, "Status harus dipilih"),
  content: z
    .string()
    .min(1, "Konten artikel tidak boleh kosong")
    .min(10, "Konten artikel minimal 10 karakter"),
});

type ArticleFormValues = z.infer<typeof articleSchema>;

interface ArticleFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode: "add" | "edit";
  articleData?: any;
  onSave: (data: {
    title: string;
    category: string;
    status: string;
    content: string;
  }) => void;
}

const categories = [
  "Kesehatan Mental",
  "Tips Belajar",
  "Pengembangan Diri",
  "Sosial",
];

export function ArticleFormDialog({
  open,
  onOpenChange,
  mode,
  articleData,
  onSave,
}: ArticleFormDialogProps) {
  const form = useForm<ArticleFormValues>({
    resolver: zodResolver(articleSchema) as any,
    defaultValues: {
      title: "",
      category: "Kesehatan Mental",
      status: "Aktif",
      content: "",
    },
  });

  React.useEffect(() => {
    if (open) {
      if (mode === "edit" && articleData) {
        form.reset({
          title: articleData.title || "",
          category: articleData.category || "Kesehatan Mental",
          status: articleData.status || "Aktif",
          content: articleData.content || "",
        });
      } else {
        form.reset({
          title: "",
          category: "Kesehatan Mental",
          status: "Aktif",
          content: "",
        });
      }
    }
  }, [open, mode, articleData, form]);

  const onSubmit = (values: ArticleFormValues) => {
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
              {isEdit ? <Pencil className="size-6" /> : <FileText className="size-6" />}
            </div>
            <div className="space-y-1">
              <DialogTitle>{isEdit ? "Edit Konten Artikel" : "Tambah Konten Artikel"}</DialogTitle>
              <DialogDescription>
                {isEdit
                  ? "Perbarui formulir di bawah ini untuk mengubah konten artikel."
                  : "Lengkapi formulir di bawah ini untuk membuat artikel edukasi baru."}
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
                  <FormLabel>Judul Artikel</FormLabel>
                  <FormControl>
                    <Input placeholder="Masukkan judul artikel..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Kategori & Status Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Kategori */}
              <FormField
                control={form.control as any}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Kategori</FormLabel>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Pilih Kategori" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent position="popper">
                        {categories.map((cat) => (
                          <SelectItem key={cat} value={cat}>
                            {cat}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
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

            {/* Konten/Isi Artikel */}
            <FormField
              control={form.control as any}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Konten Artikel</FormLabel>
                  <FormControl>
                    <textarea
                      className="flex min-h-[140px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="Tuliskan materi atau isi artikel di sini..."
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
