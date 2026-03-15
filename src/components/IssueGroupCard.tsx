"use client";

import { useCallback, useState } from "react";
import { IssueGroup, Severity } from "@/lib/types";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";

const dotColors: Record<Severity, string> = {
  severe: "bg-severe-accent",
  major: "bg-major-accent",
  minor: "bg-minor-accent",
};

const badgeColors: Record<Severity, string> = {
  severe: "bg-severe-bg text-severe-accent",
  major: "bg-major-bg text-major-accent",
  minor: "bg-minor-bg text-minor-accent",
};

const generatedAltTexts: Record<string, string> = {
  "fix-img-1": "A steaming bowl of phở bò served at a street-side stall in Hanoi, garnished with fresh herbs and lime",
  "fix-img-2": "A crispy bánh mì sandwich filled with pâté, pickled vegetables, and cilantro from a Saigon street vendor",
  "fix-img-3": "Bún chả pork patties grilling over charcoal on a traditional Vietnamese street food grill",
};

interface IssueGroupCardProps {
  group: IssueGroup;
  severity: Severity;
  onFixItem: (itemId: string) => void;
}

export default function IssueGroupCard({ group, severity, onFixItem }: IssueGroupCardProps) {
  const [expanded, setExpanded] = useState(false);
  const [page, setPage] = useState(0);
  const [generating, setGenerating] = useState<Record<string, boolean>>({});
  const [altTexts, setAltTexts] = useState<Record<string, string>>({});
  const [decorative, setDecorative] = useState<Record<string, boolean>>({});
  const activeItems = group.items.filter((i) => !i.resolved);

  const handleGenerate = useCallback((itemId: string) => {
    setGenerating((prev) => ({ ...prev, [itemId]: true }));
    setTimeout(() => {
      const text = generatedAltTexts[itemId] || "Descriptive alt text for the image content";
      setAltTexts((prev) => ({ ...prev, [itemId]: text }));
      setGenerating((prev) => ({ ...prev, [itemId]: false }));
    }, 1800);
  }, []);

  const hasAltItems = activeItems.some((i) => i.canGenerate);
  const pageSize = hasAltItems ? 1 : 2;
  const totalPages = Math.ceil(activeItems.length / pageSize);
  const visibleItems = activeItems.slice(page * pageSize, (page + 1) * pageSize);

  return (
    <div className="overflow-hidden rounded-[6px] border border-gray-200 bg-gray-50">
      {/* Group header */}
      <div
        className="flex cursor-pointer items-center px-3.5 py-3 gap-3 hover:bg-gray-100"
        onClick={() => setExpanded(!expanded)}
      >
        <span className={`rounded-full px-2 py-0.5 text-[14px] font-semibold ${badgeColors[severity]}`}>
          {activeItems.length}
        </span>
        <span className="text-[12px] font-semibold text-gray-800">{group.title}</span>
      </div>

      {/* Items */}
      <div
        className="overflow-hidden transition-[max-height] duration-250 ease-out"
        style={{ maxHeight: expanded ? "2000px" : "0px" }}
      >
        <div className="flex flex-col gap-1.5 px-3.5 pb-3">
          {visibleItems.map((item) =>
            item.canGenerate ? (
              /* Layout 4: Alt text — expanded vertical layout */
              <div
                key={item.id}
                className="rounded-[6px] border border-gray-200 bg-white px-3.5 py-3 animate-[fade-in_0.25s_ease]"
              >
                {/* Title row */}
                <div className="flex items-start gap-2 mb-3">
                  <div className={`mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full ${dotColors[severity]}`} />
                  <div className="min-w-0">
                    <div className="text-[12px] font-semibold text-gray-800">{item.text}</div>
                    <div className="mt-0.5 text-[11px] leading-snug text-gray-500">{item.description}</div>
                  </div>
                </div>

                {/* Generate button */}
                <button
                  className={`mb-3 flex w-full items-center justify-center gap-2 rounded-[6px] px-4 py-2.5 text-[13px] font-semibold text-white transition-all active:scale-[0.99] ${generating[item.id]
                    ? "pointer-events-none bg-secondary-700"
                    : "bg-secondary-600 hover:bg-secondary-700"
                    }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleGenerate(item.id);
                  }}
                >
                  {generating[item.id] ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    "Generate Alt Text"
                  )}
                </button>

                {/* Manual input */}
                <div className="mb-3">
                  <label className="mb-1.5 block text-[12px] font-medium text-gray-700">
                    Write your meaningful alt text here
                  </label>
                  <input
                    type="text"
                    placeholder="Your Alt text..."
                    value={altTexts[item.id] ?? ""}
                    onChange={(e) => {
                      e.stopPropagation();
                      setAltTexts((prev) => ({ ...prev, [item.id]: e.target.value }));
                    }}
                    className="w-full rounded-[6px] border border-gray-200 bg-white px-3 py-2 text-[12px] text-gray-600 outline-none transition-colors placeholder:text-gray-400 focus:border-primary-400 focus:ring-1 focus:ring-primary-400"
                    onClick={(e) => e.stopPropagation()}
                  />
                </div>

                {/* Divider with "Or" */}
                <div className="mb-3 flex items-center gap-3">
                  <div className="h-px flex-1 bg-gray-200" />
                  <span className="text-[11px] text-gray-400">Or</span>
                  <div className="h-px flex-1 bg-gray-200" />
                </div>

                {/* Decorative checkbox */}
                <label className="mb-3 flex cursor-pointer items-center gap-2 text-[12px] text-gray-700" onClick={(e) => e.stopPropagation()}>
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                    checked={decorative[item.id] ?? false}
                    onChange={(e) => setDecorative((prev) => ({ ...prev, [item.id]: e.target.checked }))}
                  />
                  This image is decorative
                </label>

                {/* Save button — visible when alt text entered or decorative checked */}
                {(altTexts[item.id]?.trim() || decorative[item.id]) && (
                  <button
                    className="w-full animate-[fade-in_0.25s_ease] rounded-[6px] border border-secondary-300 bg-white px-4 py-2 text-[13px] font-semibold text-secondary-600 transition-all hover:bg-secondary-50 active:scale-[0.99]"
                    onClick={(e) => {
                      e.stopPropagation();
                      onFixItem(item.id);
                    }}
                  >
                    Add
                  </button>
                )}
              </div>
            ) : item.fixable ? (
              /* Layout 3: Manual Fix + AutoPilot Fix — content top, buttons row below */
              <div
                key={item.id}
                className="rounded-[6px] border border-gray-200 bg-white px-3.5 py-3 animate-[fade-in_0.25s_ease]"
              >
                <div className="flex items-start gap-2 mb-3">
                  <div className={`mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full ${dotColors[severity]}`} />
                  <div className="min-w-0">
                    <div className="text-[12px] font-semibold text-gray-800">{item.text}</div>
                    <div className="mt-0.5 text-[11px] leading-snug text-gray-500">{item.description}</div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    className="flex-1 rounded-[6px] border border-gray-200 bg-white px-4 py-2 text-[12px] font-semibold text-gray-600 transition-all hover:border-gray-300 hover:bg-gray-50"
                    onClick={(e) => {
                      e.stopPropagation();
                      onFixItem(item.id);
                    }}
                  >
                    Manual Fix
                  </button>
                  <button
                    className="flex-1 rounded-[6px] border border-primary-200 bg-primary-50 px-4 py-2 text-[12px] font-semibold text-primary-600 transition-all hover:bg-primary-100"
                    onClick={(e) => {
                      e.stopPropagation();
                      onFixItem(item.id);
                    }}
                  >
                    AutoPilot Fix
                  </button>
                </div>
              </div>
            ) : (
              /* Layout 2: Manual Fix only — horizontal row */
              <div
                key={item.id}
                className="flex items-center justify-between gap-2 rounded-[6px] border border-gray-200 bg-white px-3.5 py-2.5 animate-[fade-in_0.25s_ease]"
              >
                <div className="flex items-start gap-2 min-w-0">
                  <div className={`mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full ${dotColors[severity]}`} />
                  <div className="min-w-0">
                    <div className="text-[12px] font-semibold text-gray-800">{item.text}</div>
                    <div className="mt-0.5 text-[11px] leading-snug text-gray-500">{item.description}</div>
                  </div>
                </div>
                <button
                  className="ml-2 flex-shrink-0 rounded-[6px] border border-gray-200 bg-white px-4 py-1.5 text-[11px] font-semibold text-gray-600 transition-all hover:border-gray-300 hover:bg-gray-50"
                  onClick={(e) => {
                    e.stopPropagation();
                    onFixItem(item.id);
                  }}
                >
                  Manual Fix
                </button>
              </div>
            )
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-1.5 px-3.5 pb-3">
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

      {/* Footer */}
      <div className="flex justify-between gap-3 border-t border-gray-200 px-3.5 py-2">
        <button className="text-xs font-medium text-primary-600 underline">Why this matters</button>
        <button className="text-xs cursor-pointer font-medium text-primary-600 underline" onClick={() => setExpanded(true)}>Fix now</button>
      </div>
    </div>
  );
}
