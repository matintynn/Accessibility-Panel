"use client";

import { useState } from "react";
import { ResolvedEntry, Severity } from "@/lib/types";
import { Check, ChevronLeft, ChevronRight, RotateCcw } from "lucide-react";

const sevColors: Record<Severity, { dot: string; text: string }> = {
  severe: { dot: "bg-severe-accent", text: "text-severe-accent" },
  major: { dot: "bg-major-accent", text: "text-major-accent" },
  minor: { dot: "bg-minor-accent", text: "text-minor-accent" },
};

const PAGE_SIZE = 3;

interface ResolutionSummaryProps {
  entries: ResolvedEntry[];
  allResolved: boolean;
  onConfirm?: () => void;
  onRevert?: () => void;
}

export default function ResolutionSummary({ entries, allResolved, onConfirm, onRevert }: ResolutionSummaryProps) {
  const [page, setPage] = useState(0);

  if (entries.length === 0) return null;

  const totalPages = Math.ceil(entries.length / PAGE_SIZE);
  const start = page * PAGE_SIZE;
  const visible = entries.slice(start, start + PAGE_SIZE);

  return (
    <div className="animate-[fade-in_0.3s_ease] overflow-hidden rounded-[10px] border border-gray-200 hover:border-gray-300 bg-white">
      <div className="p-4">
        {/* Title */}
        <div className="mb-2 text-[13px] font-bold text-gray-800">Resolution Summary</div>

        {/* Header */}
        <div className="mb-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-success-bg">
              <Check className="h-3.5 w-3.5 text-success-accent" strokeWidth={2} />
            </div>
            <span className="text-sm font-semibold text-gray-800">
              {entries.length} issue{entries.length !== 1 ? "s" : ""} fixed
            </span>
          </div>
          <button className="text-[11px] font-semibold text-primary-600 hover:underline">
            Version History
          </button>
        </div>

        {/* Items */}
        <div className="flex flex-col gap-1.5">
          {visible.map((entry) => {
            const colors = sevColors[entry.severity];
            return (
              <div key={entry.id} className="flex items-center gap-2.5 rounded-[6px] bg-gray-50 px-3 py-2">
                <div className={`h-1.5 w-1.5 flex-shrink-0 rounded-full ${colors.dot}`} />
                <span className="flex-1 truncate text-[12px] text-gray-600">{entry.text}</span>
                <Check className="h-3.5 w-3.5 flex-shrink-0 text-minor-accent" strokeWidth={2.5} />
              </div>
            );
          })}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-3 flex items-center justify-center gap-3">
            <button
              className="flex h-6 w-6 items-center justify-center rounded-full border border-gray-200 text-gray-400 transition-all hover:bg-gray-100 hover:text-gray-600 disabled:cursor-not-allowed disabled:opacity-30"
              onClick={() => setPage((p) => Math.max(0, p - 1))}
              disabled={page === 0}
            >
              <ChevronLeft className="h-3 w-3" strokeWidth={2.5} />
            </button>
            <span className="text-[11px] font-medium text-gray-500">
              {page + 1} / {totalPages}
            </span>
            <button
              className="flex h-6 w-6 items-center justify-center rounded-full border border-gray-200 text-gray-400 transition-all hover:bg-gray-100 hover:text-gray-600 disabled:cursor-not-allowed disabled:opacity-30"
              onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
              disabled={page === totalPages - 1}
            >
              <ChevronRight className="h-3 w-3" strokeWidth={2.5} />
            </button>
          </div>
        )}

        {/* Confirm button */}
        <button
          onClick={allResolved ? onConfirm : undefined}
          disabled={!allResolved}
          className={`mt-3 flex w-full items-center justify-center gap-2 rounded-[6px] px-4 py-2 text-[12px] font-semibold transition-all ${allResolved
            ? "bg-primary-600 text-white hover:brightness-95 active:scale-[0.98]"
            : "cursor-not-allowed border border-gray-200 bg-gray-50 text-gray-400"
            }`}
        >
          <Check className="h-3.5 w-3.5" strokeWidth={2} />
          Confirm Changes
        </button>

        {!allResolved && (
          <p className="mt-1.5 text-center text-[11px] text-gray-400">
            Confirm will appear once all issues are resolved.
          </p>
        )}

        {/* Revert button — only when all resolved */}
        {allResolved && (
          <button
            onClick={onRevert}
            className="mt-2 flex w-full items-center justify-center gap-2 rounded-[6px] border border-gray-200 bg-white px-4 py-2 text-[12px] font-semibold text-gray-500 transition-all hover:bg-gray-50 hover:text-gray-700"
          >
            <RotateCcw className="h-3.5 w-3.5" strokeWidth={2} />
            Revert Changes
          </button>
        )}
      </div>
    </div>
  );
}
