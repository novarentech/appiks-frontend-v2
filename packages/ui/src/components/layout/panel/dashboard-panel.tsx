import * as React from "react";
import { Card } from "../../ui/card";

export interface StatItem {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string | number;
  bgColor: string;
  textColor: string;
}

export interface DashboardPanelProps {
  items: StatItem[];
  gridCols?: string;
}

function getGridColsClass(count: number) {
  if (count <= 1) return "grid-cols-1";
  if (count === 2) return "grid-cols-1 md:grid-cols-2";
  if (count === 3) return "grid-cols-1 md:grid-cols-3";
  if (count === 4) return "grid-cols-1 md:grid-cols-2 lg:grid-cols-4";
  if (count === 5) return "grid-cols-1 md:grid-cols-3 lg:grid-cols-5";
  if (count === 6) return "grid-cols-1 md:grid-cols-3 lg:grid-cols-6";
  return "grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6";
}

export function DashboardPanel({ items, gridCols }: DashboardPanelProps) {
  const dynamicGridCols = gridCols || getGridColsClass(items.length);

  return (
    <Card className="w-full shadow-none border bg-card text-card-foreground">
      <div
        className={`grid ${dynamicGridCols} divide-y md:divide-y-0 md:divide-x divide-border`}
      >
        {items.map((item, index) => {
          const Icon = item.icon;
          return (
            <div key={index} className="p-6 flex items-center space-x-4">
              <div
                className={`p-3 ${item.bgColor} rounded-full flex items-center justify-center shrink-0`}
              >
                <Icon className={`w-6 h-6 ${item.textColor}`} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider truncate">
                  {item.label}
                </p>
                <p
                  className={`text-2xl font-bold tracking-tight mt-0.5 ${item.textColor}`}
                >
                  {item.value}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
