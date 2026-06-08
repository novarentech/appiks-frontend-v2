"use client";

import { Users } from "lucide-react";
import * as React from "react";

interface UserItem {
  name: string;
  idNumber: string;
  role: string;
  joinedAt: string;
}

interface NewUsersCardProps {
  users: UserItem[];
}

export function NewUsersCard({ users }: NewUsersCardProps) {
  return (
    <div className="bg-card text-card-foreground rounded-xl border p-5 shadow-xs space-y-4">
      <div className="flex items-center justify-between border-b pb-3">
        <div>
          <h3 className="font-semibold text-base">Pengguna Baru Terdaftar</h3>
          <p className="text-xs text-muted-foreground">3 akun terbaru yang ditambahkan minggu ini</p>
        </div>
        <Users className="size-5 text-muted-foreground opacity-60" />
      </div>
      <div className="divide-y divide-border">
        {users.map((user, idx) => (
          <div key={user.name + idx} className="flex items-center justify-between py-3 first:pt-0 last:pb-0">
            <div className="flex items-center gap-3">
              <div className="size-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm shrink-0">
                {user.name.split(" ").map(n => n[0]).slice(0, 2).join("").toUpperCase()}
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">{user.name}</p>
                <p className="text-xs text-muted-foreground">NIP/NISN: {user.idNumber}</p>
              </div>
            </div>
            <div className="flex flex-col items-end gap-1.5">
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase ${
                user.role === "Siswa"
                  ? "bg-blue-500/10 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400"
                  : user.role === "Guru BK"
                  ? "bg-purple-500/10 text-purple-600 dark:bg-purple-500/20 dark:text-purple-400"
                  : "bg-amber-500/10 text-amber-600 dark:bg-amber-500/20 dark:text-amber-400"
              }`}>
                {user.role}
              </span>
              <span className="text-[10px] text-muted-foreground">{user.joinedAt}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
