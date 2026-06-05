#!/bin/bash
# Script untuk generate semua route placeholder dan DashboardLayout

APPS_DIR="/Users/upikaachu/Developer/Works/Novaren/appiks-mono/apps"

# ── Helper: buat placeholder page ────────────────────────────────────────────
make_page() {
  local path=$1
  local title=$2
  mkdir -p "$(dirname "$path")"
  cat > "$path" << EOF
export default function Page() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-foreground">${title}</h1>
      <p className="text-muted-foreground mt-2">Halaman ini sedang dalam pengembangan.</p>
    </div>
  );
}
EOF
}

# ── Helper: buat DashboardLayout ─────────────────────────────────────────────
make_layout() {
  local path=$1
  local app_label=$2
  mkdir -p "$(dirname "$path")"
  cat > "$path" << 'EOF'
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
EOF
  echo "✅ DashboardLayout created: $path"
}

# ════════════════════════════════════════════════════════════════════════════════
# STUDENT APP
# ════════════════════════════════════════════════════════════════════════════════
echo "── Setting up student app routes ──"
make_layout "$APPS_DIR/student/app/dashboard/layout.tsx" "Student"
make_page   "$APPS_DIR/student/app/dashboard/page.tsx"                "Dashboard Student"
make_page   "$APPS_DIR/student/app/fill-data/page.tsx"                "Lengkapi Data"
make_page   "$APPS_DIR/student/app/checkin/page.tsx"                  "Check-in Mood"
make_page   "$APPS_DIR/student/app/videos/page.tsx"                   "Video Edukasi"
make_page   "$APPS_DIR/student/app/education-content/page.tsx"        "Konten Edukasi"
make_page   "$APPS_DIR/student/app/survey/page.tsx"                   "Survey"
make_page   "$APPS_DIR/student/app/survey-result/page.tsx"            "Hasil Survey"
make_page   "$APPS_DIR/student/app/survey-walkthrough/page.tsx"       "Panduan Survey"
make_page   "$APPS_DIR/student/app/self-help/page.tsx"                "Self Help"
make_page   "$APPS_DIR/student/app/share-thing/page.tsx"              "Cerita Anda"
make_page   "$APPS_DIR/student/app/anger-management/page.tsx"         "Anger Management"
make_page   "$APPS_DIR/student/app/games/page.tsx"                    "Games"
make_page   "$APPS_DIR/student/app/notifications/page.tsx"            "Notifikasi"
make_page   "$APPS_DIR/student/app/quote/page.tsx"                    "Quote Harian"
make_page   "$APPS_DIR/student/app/article/page.tsx"                  "Artikel"
make_page   "$APPS_DIR/student/app/counselor-schedule/page.tsx"       "Jadwal Konselor"
make_page   "$APPS_DIR/student/app/video-player/page.tsx"             "Video Player"

# ════════════════════════════════════════════════════════════════════════════════
# SCHOOL APP
# ════════════════════════════════════════════════════════════════════════════════
echo "── Setting up school app routes ──"
make_layout "$APPS_DIR/school/app/dashboard/layout.tsx" "School"
make_page   "$APPS_DIR/school/app/dashboard/page.tsx"                         "Dashboard"
make_page   "$APPS_DIR/school/app/dashboard/account-management/page.tsx"      "Manajemen Akun"
make_page   "$APPS_DIR/school/app/dashboard/class-data/page.tsx"              "Data Kelas"
make_page   "$APPS_DIR/school/app/dashboard/student-data/page.tsx"            "Data Siswa"
make_page   "$APPS_DIR/school/app/dashboard/content-management/page.tsx"      "Kelola Konten"
make_page   "$APPS_DIR/school/app/dashboard/counseling-schedule/page.tsx"     "Jadwal Konseling"
make_page   "$APPS_DIR/school/app/dashboard/mood-detail/page.tsx"             "Detail Mood"
make_page   "$APPS_DIR/school/app/dashboard/school-data/page.tsx"             "Data Sekolah"
make_page   "$APPS_DIR/school/app/dashboard/profile/page.tsx"                 "Profil"
make_page   "$APPS_DIR/school/app/videos/page.tsx"                            "Video Edukasi"
make_page   "$APPS_DIR/school/app/education-content/page.tsx"                 "Konten Edukasi"

# ════════════════════════════════════════════════════════════════════════════════
# PSYCHOLOGIST APP
# ════════════════════════════════════════════════════════════════════════════════
echo "── Setting up psychologist app routes ──"
make_layout "$APPS_DIR/psychologist/app/dashboard/layout.tsx" "Psychologist"
make_page   "$APPS_DIR/psychologist/app/dashboard/page.tsx"                   "Dashboard Psikolog"
make_page   "$APPS_DIR/psychologist/app/dashboard/student-cases/page.tsx"     "Kasus Siswa"
make_page   "$APPS_DIR/psychologist/app/dashboard/session-notes/page.tsx"     "Catatan Sesi"
make_page   "$APPS_DIR/psychologist/app/dashboard/schedule/page.tsx"          "Jadwal Konsultasi"
make_page   "$APPS_DIR/psychologist/app/dashboard/reports/page.tsx"           "Laporan"
make_page   "$APPS_DIR/psychologist/app/dashboard/mood-overview/page.tsx"     "Overview Mood"
make_page   "$APPS_DIR/psychologist/app/dashboard/profile/page.tsx"           "Profil"
make_page   "$APPS_DIR/psychologist/app/article/page.tsx"                     "Artikel"
make_page   "$APPS_DIR/psychologist/app/videos/page.tsx"                      "Video Edukasi"

# ════════════════════════════════════════════════════════════════════════════════
# SUPERADMIN APP
# ════════════════════════════════════════════════════════════════════════════════
echo "── Setting up superadmin app routes ──"
make_layout "$APPS_DIR/superadmin/app/dashboard/layout.tsx" "Superadmin"
make_page   "$APPS_DIR/superadmin/app/dashboard/page.tsx"                             "Dashboard Super Admin"
make_page   "$APPS_DIR/superadmin/app/dashboard/school-management/page.tsx"           "Manajemen Sekolah"
make_page   "$APPS_DIR/superadmin/app/dashboard/school-monitor/page.tsx"              "Monitor Sekolah"
make_page   "$APPS_DIR/superadmin/app/dashboard/admin-management/page.tsx"            "Manajemen Admin"
make_page   "$APPS_DIR/superadmin/app/dashboard/psychologist-management/page.tsx"     "Manajemen Psikolog"
make_page   "$APPS_DIR/superadmin/app/dashboard/content/page.tsx"                     "Konten"
make_page   "$APPS_DIR/superadmin/app/dashboard/profile/page.tsx"                     "Profil"

echo ""
echo "✅ All routes and layouts created!"
