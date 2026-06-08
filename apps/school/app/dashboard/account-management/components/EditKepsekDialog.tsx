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

const kepsekSchema = z.object({
  name: z
    .string()
    .min(1, "Nama lengkap tidak boleh kosong")
    .min(2, "Nama minimal terdiri dari 2 karakter"),
  username: z
    .string()
    .min(1, "Username tidak boleh kosong")
    .min(3, "Username minimal terdiri dari 3 karakter")
    .regex(
      /^[a-zA-Z0-9_]+$/,
      "Username hanya boleh berisi huruf, angka, dan garis bawah",
    ),
  role: z.string(),
  phone: z
    .string()
    .min(1, "Nomor telepon tidak boleh kosong")
    .regex(/^\d{9,13}$/, "Nomor telepon harus berisi 9-13 digit angka")
    .refine((val) => !val.startsWith("0"), {
      message: "Masukkan nomor tanpa angka 0 di depan (contoh: 812xxxxxxxx)",
    })
    .refine((val) => !val.startsWith("+62") && !val.startsWith("62"), {
      message: "Masukkan nomor tanpa kode negara (contoh: 812xxxxxxxx)",
    }),
  nip: z
    .string()
    .min(1, "NIP tidak boleh kosong")
    .length(18, "NIP harus tepat 18 digit")
    .regex(/^\d+$/, "NIP hanya boleh berisi angka"),
  password: z
    .string()
    .min(6, "Password minimal terdiri dari 6 karakter")
    .optional()
    .or(z.literal("")),
  title: z.string().min(1, "Jabatan harus dipilih"),
});

type KepsekFormValues = z.infer<typeof kepsekSchema>;

interface EditKepsekDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  kepsek: any;
  onSave: (data: {
    name: string;
    username: string;
    role: string;
    phone: string;
    nip: string;
    password?: string;
    title: string;
  }) => void;
}

export function EditKepsekDialog({
  open,
  onOpenChange,
  kepsek,
  onSave,
}: EditKepsekDialogProps) {
  const form = useForm<KepsekFormValues>({
    resolver: zodResolver(kepsekSchema),
    defaultValues: {
      name: "",
      username: "",
      role: "Kepala Sekolah",
      phone: "",
      nip: "",
      password: "",
      title: "Kepala Sekolah",
    },
  });

  const stripCountryCode = (phone: string) => {
    if (phone?.startsWith("+62")) return phone.substring(3);
    if (phone?.startsWith("62")) return phone.substring(2);
    return phone || "";
  };

  // Pre-fill form when kepsek changes
  React.useEffect(() => {
    if (open && kepsek) {
      form.reset({
        name: kepsek.name || "",
        username: kepsek.username || kepsek.name?.toLowerCase().replace(/\s+/g, "_") || "",
        role: kepsek.role || "Kepala Sekolah",
        phone: stripCountryCode(kepsek.phone),
        nip: kepsek.nip || "",
        password: "", // Keep password empty initially
        title: kepsek.title || "Kepala Sekolah",
      });
    }
  }, [open, kepsek, form]);

  const onSubmit = (values: KepsekFormValues) => {
    const submitValues = {
      ...values,
      phone: `+62${values.phone}`,
    };
    if (!values.password) {
      delete submitValues.password;
    }
    onSave(submitValues);
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
              <DialogTitle>Edit Akun Kepala Sekolah</DialogTitle>
              <DialogDescription>
                Perbarui formulir di bawah ini untuk mengubah data akun kepala sekolah.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 pt-2"
          >
            {/* Nama Lengkap */}
            <FormField
              control={form.control as any}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nama Lengkap</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Nama lengkap beserta gelar..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Username */}
            <FormField
              control={form.control as any}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="Masukkan username..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Peran (Disabled Dropdown) */}
            <FormField
              control={form.control as any}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Peran</FormLabel>
                  <Select
                    value={field.value}
                    onValueChange={field.onChange}
                    disabled
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Pilih Peran" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Kepala Sekolah">
                        Kepala Sekolah
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Nomor Telepon */}
            <FormField
              control={form.control as any}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nomor Telepon</FormLabel>
                  <FormControl>
                    <div className="flex">
                      <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-input bg-muted text-muted-foreground text-sm select-none">
                        +62
                      </span>
                      <Input
                        type="tel"
                        className="rounded-l-none"
                        placeholder="8123456789"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* NIP */}
            <FormField
              control={form.control as any}
              name="nip"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>NIP</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Masukkan 18 digit NIP..."
                      maxLength={18}
                      disabled // NIP is primary key and unique
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Password */}
            <FormField
              control={form.control as any}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password Baru (Opsional)</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Kosongkan jika tidak ingin mengubah..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Jabatan */}
            <FormField
              control={form.control as any}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Jabatan</FormLabel>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Pilih Jabatan" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Kepala Sekolah">
                        Kepala Sekolah
                      </SelectItem>
                      <SelectItem value="Plt. Kepala Sekolah">
                        Plt. Kepala Sekolah
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="flex flex-col-reverse sm:flex-row gap-2 sm:gap-2 mt-2 sm:mt-0">
              <Button
                variant="outline"
                onClick={() => onOpenChange(false)}
                className="w-full sm:w-auto"
              >
                Batal
              </Button>
              <Button className="w-full sm:w-auto">Simpan Perubahan</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
