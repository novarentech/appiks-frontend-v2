import { Button } from "@appiks/ui";
import Link from "next/link";
import Image from "next/image";

export default function UnauthorizedPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 bg-background">
      <div className="flex flex-col items-center text-center max-w-2xl w-full">
        <div className="relative w-full max-w-[280px] sm:max-w-[350px] md:max-w-[450px] aspect-square mb-4 md:mb-8">
          <Image
            src="/image/403ErrorForbidden.gif"
            alt="403 Forbidden"
            fill
            className="object-contain"
            unoptimized
          />
        </div>
        <h1 className="font-bold text-2xl md:text-3xl text-foreground mb-2">
          Sepertinya jalan ini ditutup...
        </h1>
        <p className="text-muted-foreground mb-8">
          Anda tidak memiliki izin untuk melewati rute ini. Mari putar balik dan
          kembali ke beranda.
        </p>
        <Button asChild size="lg" className="w-full rounded-full sm:w-auto min-w-[200px]">
          <Link href="/login">KEMBALI KE BERANDA</Link>
        </Button>
      </div>
    </main>
  );
}
