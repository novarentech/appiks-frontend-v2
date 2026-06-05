import type { ReactNode } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar placeholder */}
      <aside className="w-64 border-r bg-card flex flex-col">
        <div className="h-16 flex items-center px-6 border-b">
          <span className="font-bold text-lg text-foreground">Appiks</span>
        </div>
        <nav className="flex-1 p-4">
          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">Menu</p>
          {/* Sidebar links akan diisi saat migrasi fitur */}
        </nav>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        <header className="h-16 border-b bg-card flex items-center px-6 justify-between">
          <span className="text-sm text-muted-foreground">Dashboard</span>
        </header>
        <main className="flex-1 p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
