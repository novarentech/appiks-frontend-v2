import * as React from "react";
import { Skeleton } from "../../ui/skeleton";

export function DashboardSubpageLoadingSkeleton() {
  return (
    <div className="flex flex-col gap-6 w-full">
      {/* Header Skeleton */}
      <div className="flex flex-col gap-1 p-6 backdrop-blur-xs">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="space-y-2">
            {/* Title Skeleton */}
            <Skeleton className="h-9 w-48 rounded-md animate-pulse" />
            {/* Description Skeleton */}
            <Skeleton className="h-5 w-80 rounded-md animate-pulse" />
          </div>
          {/* Action Button / Breadcrumb Skeleton */}
          <Skeleton className="h-9 w-32 rounded-md animate-pulse shrink-0" />
        </div>
      </div>

      {/* Table/List Grid Layout Skeleton */}
      <div className="px-6">
        <div className="w-full rounded-xl border bg-card text-card-foreground overflow-hidden">
          {/* Table Toolbar Header Mock */}
          <div className="border-b bg-muted/20 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            {/* Search Input Skeleton */}
            <div className="relative w-full max-w-sm">
              <Skeleton className="h-9 w-full rounded-md animate-pulse" />
            </div>
            {/* Filters & Actions Skeleton */}
            <div className="flex items-center gap-2">
              <Skeleton className="h-9 w-28 rounded-md animate-pulse" />
              <Skeleton className="h-9 w-24 rounded-md animate-pulse" />
            </div>
          </div>

          {/* Table Header Mock */}
          <div className="border-b bg-muted/40 p-4 hidden sm:flex items-center gap-4">
            <Skeleton className="h-4 w-6 rounded animate-pulse" />
            <Skeleton className="h-4 w-40 rounded animate-pulse" />
            <Skeleton className="h-4 w-24 rounded animate-pulse" />
            <Skeleton className="h-4 w-24 rounded animate-pulse" />
            <Skeleton className="h-4 w-20 rounded animate-pulse ml-auto" />
          </div>

          {/* Table Rows Skeleton */}
          <div className="divide-y divide-border">
            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="p-4 flex items-center gap-4">
                {/* Index Column */}
                <Skeleton className="h-4 w-6 rounded animate-pulse hidden sm:block" />
                {/* Main Content Column */}
                <div className="space-y-2 flex-1 min-w-0">
                  <Skeleton className="h-4 w-48 rounded animate-pulse" />
                  <Skeleton className="h-3.5 w-32 rounded animate-pulse" />
                </div>
                {/* Extra Columns */}
                <Skeleton className="h-4 w-24 rounded animate-pulse hidden sm:block" />
                <Skeleton className="h-4 w-20 rounded animate-pulse hidden md:block" />
                {/* Action button skeleton */}
                <Skeleton className="h-8 w-16 rounded animate-pulse ml-auto" />
              </div>
            ))}
          </div>

          {/* Table Pagination Footer Mock */}
          <div className="p-4 bg-muted/10 border-t flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <Skeleton className="h-4 w-48 rounded animate-pulse" />
            <div className="flex items-center gap-2">
              <Skeleton className="h-8 w-8 rounded animate-pulse" />
              <Skeleton className="h-8 w-8 rounded animate-pulse" />
              <Skeleton className="h-8 w-16 rounded animate-pulse" />
              <Skeleton className="h-8 w-8 rounded animate-pulse" />
              <Skeleton className="h-8 w-8 rounded animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
