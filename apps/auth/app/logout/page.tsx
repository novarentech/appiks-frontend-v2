"use client";

import { signOut } from "next-auth/react";
import { useEffect } from "react";

import AuthLayout from "../../components/AuthLayout";
import { LogOut } from "lucide-react";

export default function LogoutPage() {
  useEffect(() => {
    signOut({ callbackUrl: "https://appiks.id" });
  }, []);

  return (
    <AuthLayout>
      <div className="border p-8 rounded-xl w-full max-w-sm shadow-sm bg-card text-center flex flex-col items-center justify-center min-h-[300px]">
        <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-6 animate-pulse">
          <LogOut className="w-8 h-8 text-muted-foreground" />
        </div>
        <h1 className="font-bold text-xl md:text-2xl text-foreground mb-2">
          Sedang keluar...
        </h1>
        <p className="text-muted-foreground text-sm">
          Mohon tunggu sebentar, kami sedang membersihkan sesi Anda.
        </p>
      </div>
    </AuthLayout>
  );
}
