"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import * as React from "react";
import { Quote, Plus, Pencil } from "lucide-react";

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

const quoteSchema = z.object({
  quote: z
    .string()
    .min(1, "Isi kutipan tidak boleh kosong")
    .min(5, "Isi kutipan minimal terdiri dari 5 karakter")
    .max(500, "Isi kutipan maksimal 500 karakter"),
  author: z
    .string()
    .min(1, "Nama pembuat kutipan tidak boleh kosong")
    .min(2, "Nama pembuat minimal 2 karakter"),
  status: z.string().min(1, "Status harus dipilih"),
});

type QuoteFormValues = z.infer<typeof quoteSchema>;

interface QuoteFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode: "add" | "edit";
  quoteData?: any;
  onSave: (data: {
    quote: string;
    author: string;
    status: string;
  }) => void;
}

export function QuotesFormDialog({
  open,
  onOpenChange,
  mode,
  quoteData,
  onSave,
}: QuoteFormDialogProps) {
  const form = useForm<QuoteFormValues>({
    resolver: zodResolver(quoteSchema) as any,
    defaultValues: {
      quote: "",
      author: "Anonim",
      status: "Aktif",
    },
  });

  React.useEffect(() => {
    if (open) {
      if (mode === "edit" && quoteData) {
        form.reset({
          quote: quoteData.quote || "",
          author: quoteData.author || "Anonim",
          status: quoteData.status || "Aktif",
        });
      } else {
        form.reset({
          quote: "",
          author: "Anonim",
          status: "Aktif",
        });
      }
    }
  }, [open, mode, quoteData, form]);

  const onSubmit = (values: QuoteFormValues) => {
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
              {isEdit ? <Pencil className="size-6" /> : <Quote className="size-6" />}
            </div>
            <div className="space-y-1">
              <DialogTitle>{isEdit ? "Edit Kutipan Motivasi" : "Tambah Kutipan Motivasi"}</DialogTitle>
              <DialogDescription>
                {isEdit
                  ? "Modifikasi kalimat kutipan inspiratif atau pembuatnya di bawah ini."
                  : "Buat kutipan motivasi harian baru untuk disajikan di beranda siswa."}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit as any)}
            className="space-y-4 pt-2"
          >
            {/* Kutipan */}
            <FormField
              control={form.control as any}
              name="quote"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Kutipan (Quotes)</FormLabel>
                  <FormControl>
                    <textarea
                      className="flex min-h-[100px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 font-serif italic"
                      placeholder="&ldquo;Tuliskan kalimat inspiratif di sini...&rdquo;"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Pembuat (Author) & Status Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Pembuat */}
              <FormField
                control={form.control as any}
                name="author"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Pembuat / Tokoh</FormLabel>
                    <FormControl>
                      <Input placeholder="Contoh: Anonim, Albert Einstein, dll." {...field} />
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
