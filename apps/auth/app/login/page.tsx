"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginInput, ROLE_REDIRECT_MAP, type UserRole } from "@appiks/types";
import { Button, Card, CardContent, Input, cn } from "@appiks/ui";
import Image from "next/image";
import Link from "next/link";

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: { username: "", password: "" },
  });

  const onSubmit = async (data: LoginInput) => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await signIn("credentials", {
        username: data.username,
        password: data.password,
        redirect: false,
      });

      if (result?.error) {
        setError("Username atau password salah.");
        return;
      }

      // Fetch session to get role, then redirect
      const res = await fetch("/api/auth/session");
      const session = await res.json();
      const role = session?.user?.role as UserRole | undefined;

      if (role && ROLE_REDIRECT_MAP[role]) {
        window.location.assign(ROLE_REDIRECT_MAP[role]);
      } else {
        setError("Role tidak dikenali. Hubungi administrator.");
      }
    } catch {
      setError("Terjadi kesalahan. Coba lagi.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={cn("min-h-screen flex flex-col items-center justify-center p-4 bg-zinc-50 dark:bg-zinc-950")}>
      <Card className="overflow-hidden p-0 w-full max-w-4xl shadow-xl border-zinc-200 dark:border-zinc-800">
        <CardContent className="grid md:grid-cols-2 p-0">
          <div className="bg-muted relative hidden md:block overflow-hidden">
            <Image
              width={600}
              height={800}
              src="/image/imgPic.webp"
              alt="Image"
              priority
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
          <div className="p-6 md:px-10 md:py-14 flex flex-col items-center justify-center w-full bg-white dark:bg-zinc-950">
            <Link
              href={"/"}
              className="text-3xl md:text-5xl text-center mb-8 flex items-center justify-center"
            >
              <Image
                src="/logo.webp"
                width={200}
                height={200}
                className="h-14 w-14 md:h-20 md:w-20 mr-2 dark:invert"
                alt="Appiks Logo"
              />
              <span className="text-indigo-500 font-medium tracking-tight">Appiks</span>
            </Link>
            
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="border border-zinc-200 dark:border-zinc-800 p-6 md:p-8 rounded-xl w-full max-w-sm shadow-sm bg-card"
            >
              <div className="flex flex-col gap-6">
                <div className="flex flex-col text-center md:text-left">
                  <h1 className="font-bold text-xl md:text-2xl text-foreground">
                    Masuk ke Akun
                  </h1>
                  <p className="text-muted-foreground text-sm mt-1">
                    Isi data dibawah ini untuk masuk ke akun Anda
                  </p>
                </div>

                {error && (
                  <div className="p-3 text-sm text-red-600 bg-red-50 dark:bg-red-950/50 dark:text-red-400 border border-red-200 dark:border-red-900 rounded-md">
                    {error}
                  </div>
                )}

                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <label htmlFor="username" className="text-sm font-medium leading-none text-foreground">Username</label>
                    <Input
                      {...form.register("username")}
                      id="username"
                      type="text"
                      placeholder="Masukkan username anda"
                      disabled={isLoading}
                    />
                    {form.formState.errors.username && (
                      <p className="text-xs text-red-500">
                        {form.formState.errors.username.message}
                      </p>
                    )}
                  </div>
                  
                  <div className="grid gap-2">
                    <label htmlFor="password" className="text-sm font-medium leading-none text-foreground">Password</label>
                    <Input
                      {...form.register("password")}
                      id="password"
                      type="password"
                      placeholder="Masukkan password anda"
                      disabled={isLoading}
                    />
                    {form.formState.errors.password && (
                      <p className="text-xs text-red-500">
                        {form.formState.errors.password.message}
                      </p>
                    )}
                  </div>
                  
                  <Button type="submit" className="w-full mt-2" disabled={isLoading}>
                    {isLoading ? "Loading..." : "Login"}
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
