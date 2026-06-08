"use client";

import { FileText, Video, Quote } from "lucide-react";
import * as React from "react";

interface ContentItem {
  title: string;
  type: string;
  categoryOrAuthor: string;
  createdAt: string;
}

interface NewContentCardProps {
  content: ContentItem[];
}

export function NewContentCard({ content }: NewContentCardProps) {
  return (
    <div className="bg-card text-card-foreground rounded-xl border p-5 shadow-xs space-y-4">
      <div className="flex items-center justify-between border-b pb-3">
        <div>
          <h3 className="font-semibold text-base">Konten Baru Diunggah</h3>
          <p className="text-xs text-muted-foreground">3 konten terbaru saat ini</p>
        </div>
        <FileText className="size-5 text-muted-foreground opacity-60" />
      </div>
      <div className="divide-y divide-border">
        {content.map((item, idx) => (
          <div key={item.title + idx} className="flex items-center gap-3 py-3 first:pt-0 last:pb-0">
            <div className={`p-2.5 rounded-xl shrink-0 ${
              item.type === "Article"
                ? "bg-blue-500/10 text-blue-600"
                : item.type === "Video"
                ? "bg-red-500/10 text-red-600"
                : "bg-emerald-500/10 text-emerald-600"
            }`}>
              {item.type === "Article" ? (
                <FileText className="size-5" />
              ) : item.type === "Video" ? (
                <Video className="size-5" />
              ) : (
                <Quote className="size-5" />
              )}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-foreground truncate">{item.title}</p>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-[10px] text-muted-foreground font-medium">{item.categoryOrAuthor}</span>
                <span className="size-1 rounded-full bg-muted-foreground/30" />
                <span className="text-[10px] text-muted-foreground">{item.createdAt}</span>
              </div>
            </div>
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-semibold border bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400 border-emerald-500/20 uppercase">
              Aktif
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
