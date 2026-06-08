"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import * as React from "react";
import { Pencil } from "lucide-react";

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

interface EditSiswaDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  student: any;
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

export function EditSiswaDialog({
  open,
  onOpenChange,
  student,
  walis,
  bks,
  onSave,
}: EditSiswaDialogProps) {
  const form = useForm<SiswaFormValues>({
    resolver: zodResolver(siswaSchema),
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

  // Determine grade level from class if grade is empty
  const getGradeFromClass = (className: string) => {
    if (className?.startsWith("X-")) return "X";
    if (className?.startsWith("XI-")) return "XI";
    if (className?.startsWith("XII-")) return "XII";
    return "";
  };

  // Pre-fill form when student changes
  React.useEffect(() => {
    if (open && student) {
      const calculatedGrade = getGradeFromClass(student.class);
      form.reset({
        nisn: student.nisn || "",
        name: student.name || "",
        homeroomTeacher: student.homeroomTeacher || "",
        bkTeacher: student.bkTeacher || "",
        grade: student.grade || calculatedGrade || "",
        class: student.class || "",
      });
    }
  }, [open, student, form]);

  // Reset the class field ONLY when the grade level is manually changed by the user,
  // not on initial load. We can detect manual changes by comparing with student's class
  React.useEffect(() => {
    if (open && student && selectedGrade) {
      const calculatedGrade = getGradeFromClass(student.class);
      if (selectedGrade !== calculatedGrade) {
        // Only clear class if the user changes the grade to something else
        const currentClass = form.getValues("class");
        if (currentClass && !gradeToClassMap[selectedGrade]?.includes(currentClass)) {
          form.setValue("class", "");
        }
      }
    }
  }, [selectedGrade, open, student, form]);

  const availableClasses = React.useMemo(() => {
    return selectedGrade ? gradeToClassMap[selectedGrade] || [] : [];
  }, [selectedGrade]);

  const onSubmit = (values: SiswaFormValues) => {
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
              <DialogTitle>Edit Akun Siswa</DialogTitle>
              <DialogDescription>
                Perbarui formulir di bawah ini untuk mengubah data akun siswa.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 pt-2"
          >
            {/* Full Name */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nama Lengkap</FormLabel>
                  <FormControl>
                    <Input placeholder="Masukkan nama lengkap siswa..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* NISN */}
            <FormField
              control={form.control}
              name="nisn"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>NISN</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Masukkan 10 digit NISN..."
                      maxLength={10}
                      disabled // Biasanya NISN itu unik/primary key dan tidak dapat diubah
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Guru Wali */}
            <FormField
              control={form.control}
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

            {/* Guru BK */}
            <FormField
              control={form.control}
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
                control={form.control}
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
                      <SelectContent>
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
                control={form.control}
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
                            placeholder={selectedGrade ? "Pilih Kelas" : "Pilih tingkat dulu"}
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
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
              <Button type="submit" className="w-full sm:w-auto">Simpan Perubahan</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
