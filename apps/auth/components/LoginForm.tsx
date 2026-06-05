"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginInput, ROLE_REDIRECT_MAP, type UserRole } from "@appiks/types";
import { Button, Input, Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@appiks/ui";

export default function LoginForm() {
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
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="border p-6 md:p-8 rounded-xl w-full max-w-sm shadow-sm bg-card"
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
            <div className="p-3 text-sm text-destructive bg-destructive/15 border border-destructive/20 rounded-md">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Masukkan username anda"
                      disabled={isLoading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Masukkan password anda"
                      disabled={isLoading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <Button type="submit" className="w-full mt-2" disabled={isLoading}>
              {isLoading ? "Loading..." : "Login"}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
