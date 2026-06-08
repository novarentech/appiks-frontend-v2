import * as React from "react";
import { Skeleton } from "../../ui/skeleton";

export function DashboardLoadingSkeleton() {
  return (
    <div className="flex flex-col gap-6 w-full">
      {/* Header Skeleton */}
      <div className="flex flex-col gap-1 p-6 backdrop-blur-xs">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="space-y-2">
            {/* Title Skeleton */}
            <Skeleton className="h-9 w-64 rounded-md animate-pulse" />
            {/* Description Skeleton */}
            <Skeleton className="h-5 w-96 rounded-md animate-pulse" />
          </div>
          {/* Date Badge Skeleton */}
          <Skeleton className="h-8 w-44 rounded-full animate-pulse shrink-0" />
        </div>
      </div>

      {/* Stats Panel Skeleton */}
      <div className="px-6">
        <div className="w-full rounded-xl border bg-card text-card-foreground grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-border">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="p-6 flex items-center space-x-4">
              {/* Icon Circle Skeleton */}
              <Skeleton className="h-12 w-12 rounded-full animate-pulse shrink-0" />
              <div className="space-y-2 min-w-0 flex-1">
                {/* Label Skeleton */}
                <Skeleton className="h-4 w-24 rounded-md animate-pulse" />
                {/* Value Skeleton */}
                <Skeleton className="h-8 w-16 rounded-md animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
