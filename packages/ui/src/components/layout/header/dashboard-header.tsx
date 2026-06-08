"use client";

import { Calendar } from "lucide-react";
import * as React from "react";

interface DashboardHeaderProps {
  title: string;
  description?: string;
  showDate?: boolean;
}

export function DashboardHeader({
  title,
  description,
  showDate = true,
}: DashboardHeaderProps) {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const formattedDate = React.useMemo(() => {
    if (!mounted) return "";
    return new Intl.DateTimeFormat("id-ID", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(new Date());
  }, [mounted]);

  return (
    <div className="flex flex-col gap-1 p-6 backdrop-blur-xs">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">{title}</h1>
          {description && (
            <p className="text-muted-foreground mt-1">{description}</p>
          )}
        </div>
        {showDate && mounted && (
          <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground bg-muted/60 px-3 py-1.5 rounded-full border shadow-xs w-fit">
            <Calendar size={16} />
            {formattedDate}
          </div>
        )}
      </div>
    </div>
  );
}
