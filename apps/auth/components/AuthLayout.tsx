import { Card, CardContent, cn } from "@appiks/ui";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={cn("min-h-screen flex flex-col items-center justify-center p-4 bg-muted/40")}>
      <Card className="overflow-hidden p-0 w-full max-w-4xl shadow-xl">
        <CardContent className="grid md:grid-cols-2 p-0">
          <div className="bg-muted relative hidden md:block overflow-hidden">
            <Image
              width={600}
              height={800}
              src="/image/authImage.webp"
              alt="Image"
              priority
              unoptimized
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
          <div className="p-6 md:px-10 md:py-14 flex flex-col items-center justify-center w-full bg-card">
            <Link
              href={"/"}
              className="text-3xl md:text-5xl text-center mb-8 flex items-center justify-center hover:opacity-90 transition-opacity"
            >
              <Image
                src="/logo.webp"
                width={200}
                height={200}
                loading="eager"
                unoptimized
                className="h-14 w-14 md:h-20 md:w-20 mr-2 dark:invert"
                alt="Appiks Logo"
              />
              <span className="text-primary font-medium tracking-tight">Appiks</span>
            </Link>
            
            {children}
            
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
