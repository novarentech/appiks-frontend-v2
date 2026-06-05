export default function UnauthorizedPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-950 to-slate-900">
      <div className="text-center px-8">
        <div className="text-6xl mb-4">🚫</div>
        <h1 className="text-2xl font-bold text-white mb-2">Akses Ditolak</h1>
        <p className="text-white/50 text-sm mb-8">
          Anda tidak memiliki izin untuk mengakses halaman ini.
        </p>
        <a
          href="/login"
          className="inline-flex items-center px-6 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-purple-700 text-white font-semibold text-sm hover:from-violet-500 hover:to-purple-600 transition-all"
        >
          Kembali ke Login
        </a>
      </div>
    </main>
  );
}
