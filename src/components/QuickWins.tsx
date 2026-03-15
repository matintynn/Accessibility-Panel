"use client";

import { useState } from "react";
import { QuickWinItem } from "@/lib/types";
import { useAnimatedNumber } from "@/hooks/useAnimatedNumber";
import QuickWinIcon from "./QuickWinIcon";
import { Check, X, Info, ChevronDown, Sparkles, ChevronLeft, ChevronRight } from "lucide-react";

const PAGE_SIZE = 5;

interface QuickWinsProps {
  items: QuickWinItem[];
  onAutoPilot: () => void;
  isRunning: boolean;
  progress: number;
  progressLabel: string;
}

export default function QuickWins({ items, onAutoPilot, isRunning, progress, progressLabel }: QuickWinsProps) {
  const [expanded, setExpanded] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [page, setPage] = useState(0);
  const activeItems = items.filter((i) => !i.resolved);
  const activeCount = activeItems.length;
  const displayCount = useAnimatedNumber(activeCount, 500);
  const allResolved = activeCount === 0 && !isRunning;

  const totalPages = Math.ceil(activeItems.length / PAGE_SIZE);
  const visibleItems = activeItems.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

  if (allResolved && dismissed) {
    return null;
  }

  if (allResolved) {
    return (
      <div className="animate-[fade-in_0.4s_ease] overflow-hidden rounded-[10px] border border-success-accent/30 bg-success-bg transition-all duration-500">
        <div className="flex items-center justify-between px-5 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-success-bg">
              <Check className="h-4 w-4 text-success-accent" strokeWidth={2.5} />
            </div>
            <div>
              <div className="text-sm font-semibold text-success-accent">All Quick Wins resolved</div>
              <div className="text-xs text-gray-500">AutoPilot issues have been fixed</div>
            </div>
          </div>
          <button
            className="flex h-6 w-6 items-center justify-center rounded-full text-gray-400 transition-all hover:bg-gray-200 hover:text-gray-600"
            onClick={() => setDismissed(true)}
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-[10px] border border-primary-200 bg-white transition-colors hover:border-primary-300">
      <div className="bg-primary-50 px-5 py-5">
        {/* Header row */}
        <div
          className="mb-4 flex cursor-pointer items-center justify-between"
          onClick={() => setExpanded(!expanded)}
        >
          <div className="flex items-center gap-3.5">
            <span className="text-[28px] font-bold leading-none text-primary-500">
              {displayCount}
            </span>
            <div>
              <div className="text-base font-semibold text-gray-900">Quick Wins</div>
              <div className="mt-0.5 flex items-center gap-1 text-[13px] text-gray-500">
                Fix issues instantly with AutoPilot
                <Info className="h-3.5 w-3.5 text-gray-400" />
              </div>
            </div>
          </div>
          <ChevronDown
            className={`h-5 w-5 flex-shrink-0 text-gray-400 transition-transform duration-250 ease-out ${expanded ? "" : "-rotate-90"}`}
          />
        </div>

        {/* AutoPilot Button */}
        <button
          className={`relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-[6px] px-5 py-3 text-[15px] font-semibold text-white transition-all duration-200 ${isRunning
            ? "pointer-events-none bg-primary-700"
            : "bg-primary-500 hover:bg-primary-600 active:scale-[0.99]"
            }`}
          onClick={onAutoPilot}
        >
          {isRunning ? (
            <div className="h-[18px] w-[18px] animate-spin rounded-full border-2 border-white/30 border-t-white" />
          ) : (
            <Sparkles className="h-[18px] w-[18px]" />
          )}
          <span>{isRunning ? "Fixing..." : "AutoPilot Fix"}</span>
        </button>

        {/* Progress bar */}
        {isRunning && (
          <div className="mt-3 animate-[fade-in_0.3s_ease]">
            <div className="h-1 w-full overflow-hidden rounded-full bg-primary-200">
              <div
                className="h-full rounded-full bg-primary-500 transition-[width] duration-300 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="mt-1.5 text-center text-xs text-gray-500">{progressLabel}</div>
          </div>
        )}
      </div>

      {/* Items list — always visible when expanded */}
      <div
        className="overflow-hidden transition-[max-height] duration-300 ease-out"
        style={{ maxHeight: expanded ? "600px" : "0px" }}
      >
        <div className="flex flex-col gap-2 bg-primary-50 px-4 pt-3 pb-4">
          {visibleItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-2.5 rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-[13px] text-gray-600 transition-colors hover:border-gray-300"
            >
              <QuickWinIcon icon={item.icon} />
              {item.text}
            </div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-1.5 bg-primary-50 pb-4">
            <button
              className="flex h-7 w-7 items-center justify-center rounded-md border border-gray-200 text-gray-400 transition-colors hover:border-gray-300 hover:text-gray-600 disabled:opacity-30"
              onClick={() => setPage((p) => Math.max(0, p - 1))}
              disabled={page === 0}
            >
              <ChevronLeft className="h-3.5 w-3.5" strokeWidth={2.5} />
            </button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => setPage(i)}
                className={`flex h-7 w-7 items-center justify-center rounded-md text-[12px] font-semibold transition-colors ${i === page
                  ? "bg-primary-500 text-white"
                  : "border border-gray-200 text-gray-500 hover:border-gray-300"
                  }`}
              >
                {i + 1}
              </button>
            ))}
            <button
              className="flex h-7 w-7 items-center justify-center rounded-md border border-gray-200 text-gray-400 transition-colors hover:border-gray-300 hover:text-gray-600 disabled:opacity-30"
              onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
              disabled={page === totalPages - 1}
            >
              <ChevronRight className="h-3.5 w-3.5" strokeWidth={2.5} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
