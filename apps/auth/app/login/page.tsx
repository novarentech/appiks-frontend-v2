"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginInput, ROLE_REDIRECT_MAP, type UserRole } from "@appiks/types";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
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
        router.replace(ROLE_REDIRECT_MAP[role]);
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
    <main className="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-900 via-purple-950 to-slate-900">
      <div className="w-full max-w-md px-8 py-10 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 shadow-2xl">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-linear-to-br from-violet-500 to-purple-700 shadow-lg shadow-purple-500/30 mb-4">
            <span className="text-2xl font-black text-white">A</span>
          </div>
          <h1 className="text-2xl font-bold text-white">Selamat Datang</h1>
          <p className="text-sm text-white/50 mt-1">Masuk ke akun Appiks Anda</p>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-6 px-4 py-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-white/70 mb-1.5">
              Username
            </label>
            <input
              {...form.register("username")}
              id="username"
              type="text"
              autoComplete="username"
              placeholder="Masukkan username"
              className="w-full h-11 px-4 rounded-xl bg-white/10 border border-white/10 text-white placeholder:text-white/30 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
            />
            {form.formState.errors.username && (
              <p className="mt-1.5 text-xs text-red-400">
                {form.formState.errors.username.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-white/70 mb-1.5">
              Password
            </label>
            <input
              {...form.register("password")}
              id="password"
              type="password"
              autoComplete="current-password"
              placeholder="Masukkan password"
              className="w-full h-11 px-4 rounded-xl bg-white/10 border border-white/10 text-white placeholder:text-white/30 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
            />
            {form.formState.errors.password && (
              <p className="mt-1.5 text-xs text-red-400">
                {form.formState.errors.password.message}
              </p>
            )}
          </div>

          <button
            id="btn-login"
            type="submit"
            disabled={isLoading}
            className="w-full h-11 rounded-xl bg-linear-to-r from-violet-600 to-purple-700 text-white font-semibold text-sm hover:from-violet-500 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 focus:ring-offset-transparent disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-purple-500/25"
          >
            {isLoading ? "Memproses..." : "Masuk"}
          </button>
        </form>

        <p className="text-center text-xs text-white/30 mt-8">
          &copy; {new Date().getFullYear()} Appiks. All rights reserved.
        </p>
      </div>
    </main>
  );
}
