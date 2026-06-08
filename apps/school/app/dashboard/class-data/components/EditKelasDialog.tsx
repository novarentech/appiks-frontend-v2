"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import * as React from "react";
import { Pencil, BookOpen } from "lucide-react";

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

const classSchema = z.object({
  name: z
    .string()
    .min(1, "Nama kelas tidak boleh kosong")
    .min(2, "Nama kelas minimal 2 karakter"),
  grade: z.string().min(1, "Tingkat harus dipilih"),
  code: z
    .string()
    .min(1, "Kode kelas tidak boleh kosong")
    .min(3, "Kode kelas minimal 3 karakter"),
  studentCount: z.coerce
    .number()
    .min(0, "Jumlah siswa tidak boleh negatif")
    .max(100, "Jumlah siswa maksimal 100"),
});

type ClassFormValues = z.infer<typeof classSchema>;

interface EditKelasDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  classData: any;
  onSave: (data: {
    name: string;
    grade: string;
    code: string;
    studentCount: number;
  }) => void;
}

export function EditKelasDialog({
  open,
  onOpenChange,
  classData,
  onSave,
}: EditKelasDialogProps) {
  const form = useForm<ClassFormValues>({
    resolver: zodResolver(classSchema) as any,
    defaultValues: {
      name: "",
      grade: "X",
      code: "",
      studentCount: 0,
    },
  });

  React.useEffect(() => {
    if (open && classData) {
      form.reset({
        name: classData.name || "",
        grade: classData.grade || "X",
        code: classData.code || "",
        studentCount: classData.studentCount || 0,
      });
    }
  }, [open, classData, form]);

  const onSubmit = (values: ClassFormValues) => {
    onSave(values);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent size="lg">
        <DialogHeader>
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left pb-2">
            <div className="p-3 bg-primary/10 text-primary rounded-xl shrink-0">
              <Pencil className="size-6" />
            </div>
            <div className="space-y-1">
              <DialogTitle>Edit Data Kelas</DialogTitle>
              <DialogDescription>
                Perbarui formulir di bawah ini untuk mengubah data kelas.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit as any)}
            className="space-y-4 pt-2"
          >
            {/* Nama Kelas */}
            <FormField
              control={form.control as any}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nama Kelas</FormLabel>
                  <FormControl>
                    <Input placeholder="Contoh: X-A, XI-IPA-1, dll." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Tingkat */}
            <FormField
              control={form.control as any}
              name="grade"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tingkat</FormLabel>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Pilih Tingkat" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent position="popper">
                      <SelectItem value="X">Tingkat X</SelectItem>
                      <SelectItem value="XI">Tingkat XI</SelectItem>
                      <SelectItem value="XII">Tingkat XII</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Kode Kelas */}
            <FormField
              control={form.control as any}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Kode Kelas</FormLabel>
                  <FormControl>
                    <Input placeholder="Contoh: KLS-X-A, KLS-11IPA1" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Jumlah Siswa */}
            <FormField
              control={form.control as any}
              name="studentCount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Jumlah Siswa</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="0" {...field} />
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
