"use client";

import { signOut } from "next-auth/react";
import { useEffect } from "react";

export default function LogoutPage() {
  useEffect(() => {
    signOut({ callbackUrl: "https://appiks.id" });
  }, []);

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-950 to-slate-900">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-700 shadow-lg mb-4">
          <span className="text-2xl font-black text-white">A</span>
        </div>
        <p className="text-white/60 text-sm mt-2">Sedang keluar...</p>
      </div>
    </main>
  );
}
