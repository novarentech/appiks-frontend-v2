"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import * as React from "react";
import { GraduationCap, Pencil } from "lucide-react";

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

const gradeToClassMap: Record<string, string[]> = {
  X: ["X-A", "X-B"],
  XI: ["XI-IPA-1", "XI-IPS-1"],
  XII: ["XII-IPA-3", "XII-IPS-2"],
};

const siswaSchema = z.object({
  nisn: z
    .string()
    .min(1, "NISN tidak boleh kosong")
    .length(10, "NISN harus tepat 10 digit")
    .regex(/^\d+$/, "NISN hanya boleh berisi angka"),
  name: z
    .string()
    .min(1, "Nama lengkap tidak boleh kosong")
    .min(2, "Nama minimal terdiri dari 2 karakter"),
  homeroomTeacher: z.string().min(1, "Guru Wali harus dipilih"),
  bkTeacher: z.string().min(1, "Guru BK harus dipilih"),
  grade: z.string().min(1, "Tingkat harus dipilih"),
  class: z.string().min(1, "Kelas harus dipilih"),
});

type SiswaFormValues = z.infer<typeof siswaSchema>;

interface SiswaFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode: "add" | "edit";
  studentData?: any;
  walis: Array<{ nip: string; name: string }>;
  bks: Array<{ nip: string; name: string }>;
  onSave: (data: {
    nisn: string;
    name: string;
    class: string;
    homeroomTeacher: string;
    bkTeacher: string;
    grade: string;
  }) => void;
}

export function SiswaFormDialog({
  open,
  onOpenChange,
  mode,
  studentData,
  walis,
  bks,
  onSave,
}: SiswaFormDialogProps) {
  const form = useForm<SiswaFormValues>({
    resolver: zodResolver(siswaSchema) as any,
    defaultValues: {
      nisn: "",
      name: "",
      homeroomTeacher: "",
      bkTeacher: "",
      grade: "",
      class: "",
    },
  });

  const selectedGrade = form.watch("grade");

  // Get available classes for the selected grade level
  const availableClasses = React.useMemo(() => {
    return selectedGrade ? gradeToClassMap[selectedGrade] || [] : [];
  }, [selectedGrade]);

  // Pre-fill or clean form when open state changes
  React.useEffect(() => {
    if (open) {
      if (mode === "edit" && studentData) {
        // Extract grade level from class if not present in studentData
        let resolvedGrade = studentData.grade || "";
        if (!resolvedGrade && studentData.class) {
          if (studentData.class.startsWith("X-")) resolvedGrade = "X";
          else if (studentData.class.startsWith("XI-")) resolvedGrade = "XI";
          else if (studentData.class.startsWith("XII-")) resolvedGrade = "XII";
        }

        form.reset({
          nisn: studentData.nisn || "",
          name: studentData.name || "",
          homeroomTeacher: studentData.homeroomTeacher || "",
          bkTeacher: studentData.bkTeacher || "",
          grade: resolvedGrade,
          class: studentData.class || "",
        });
      } else {
        form.reset({
          nisn: "",
          name: "",
          homeroomTeacher: "",
          bkTeacher: "",
          grade: "",
          class: "",
        });
      }
    }
  }, [open, mode, studentData, form]);

  const onSubmit = (values: SiswaFormValues) => {
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
              {isEdit ? <Pencil className="size-6" /> : <GraduationCap className="size-6" />}
            </div>
            <div className="space-y-1">
              <DialogTitle>{isEdit ? "Edit Akun Siswa" : "Tambah Akun Siswa"}</DialogTitle>
              <DialogDescription>
                {isEdit
                  ? "Perbarui formulir di bawah ini untuk mengubah data akun siswa."
                  : "Lengkapi formulir di bawah ini untuk membuat akun siswa baru."}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit as any)}
            className="space-y-4 pt-2"
          >
            {/* Full Name */}
            <FormField
              control={form.control as any}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nama Lengkap</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Masukkan nama lengkap siswa..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* NISN */}
            <FormField
              control={form.control as any}
              name="nisn"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>NISN</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Masukkan 10 digit NISN..."
                      maxLength={10}
                      disabled={isEdit}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Homeroom Teacher */}
            <FormField
              control={form.control as any}
              name="homeroomTeacher"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Guru Wali</FormLabel>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Pilih Guru Wali" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {walis.length === 0 ? (
                        <SelectItem value="none" disabled>
                          Tidak ada data guru wali
                        </SelectItem>
                      ) : (
                        walis.map((w) => (
                          <SelectItem key={w.nip} value={w.name}>
                            {w.name}
                          </SelectItem>
                        ))
                      )}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Counselors / Guru BK */}
            <FormField
              control={form.control as any}
              name="bkTeacher"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Guru BK</FormLabel>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Pilih Guru BK" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {bks.length === 0 ? (
                        <SelectItem value="none" disabled>
                          Tidak ada data guru BK
                        </SelectItem>
                      ) : (
                        bks.map((b) => (
                          <SelectItem key={b.nip} value={b.name}>
                            {b.name}
                          </SelectItem>
                        ))
                      )}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Tingkat & Kelas layout */}
            <div className="grid grid-cols-2 gap-4">
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
                        <SelectItem value="X">Kelas X</SelectItem>
                        <SelectItem value="XI">Kelas XI</SelectItem>
                        <SelectItem value="XII">Kelas XII</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Kelas */}
              <FormField
                control={form.control as any}
                name="class"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Kelas</FormLabel>
                    <Select
                      value={field.value}
                      onValueChange={field.onChange}
                      disabled={!selectedGrade}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue
                            placeholder={
                              selectedGrade
                                ? "Pilih Kelas"
                                : "Pilih tingkat dulu"
                            }
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent position="popper">
                        {availableClasses.map((cls) => (
                          <SelectItem key={cls} value={cls}>
                            {cls}
                          </SelectItem>
                        ))}
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
              <Button type="submit" className="w-full sm:w-auto">
                {isEdit ? "Simpan Perubahan" : "Simpan"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
