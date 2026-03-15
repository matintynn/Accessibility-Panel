"use client";

import { useAnimatedNumber } from "@/hooks/useAnimatedNumber";
import { CheckCircle2, Download } from "lucide-react";

interface ComplianceBarProps {
  score: number;
}

export default function ComplianceBar({ score }: ComplianceBarProps) {
  const displayScore = useAnimatedNumber(score, 800);
  const isCompliant = score >= 90;

  return (
    <div className="rounded-[10px] border border-gray-200 bg-white transition-colors hover:border-gray-300">
      <div className="p-4">
        {/* Compliance badges */}
        <div className="mb-3 flex items-center gap-2">
          <span className="text-xs font-semibold text-gray-500">Compliance</span>
          <div className="flex gap-1.5">
            <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-bold ${isCompliant ? "bg-minor-bg text-minor-accent" : "bg-gray-100 text-gray-400"}`}>
              WCAG 2.1 AA
            </span>
            <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-bold ${isCompliant ? "bg-minor-bg text-minor-accent" : "bg-gray-100 text-gray-400"}`}>
              AODA
            </span>
          </div>
        </div>

        {/* Status line */}
        <div className="mb-3">
          <span className="text-[13px] text-gray-600">
            {isCompliant ? (
              <span className="flex items-center gap-1.5 text-minor-accent font-semibold">
                <CheckCircle2 className="h-3.5 w-3.5" strokeWidth={2.5} />
                Document meets compliance standards
              </span>
            ) : (
              <>
                <span className="font-semibold text-gray-800">{displayScore}%</span>{" "}
                toward compliance
              </>
            )}
          </span>
        </div>

        {/* Download button */}
        <button
          disabled={!isCompliant}
          className={`flex w-full items-center justify-center gap-2 rounded-[6px] px-5 py-3 text-[14px] font-semibold transition-all ${isCompliant
            ? "bg-secondary-600 text-white hover:bg-secondary-700 hover:shadow-md active:scale-[0.98]"
            : "cursor-not-allowed bg-gray-100 text-gray-400"
            }`}
        >
          <Download className="h-4 w-4" strokeWidth={2} />
          Download Accessible Document
        </button>

        {!isCompliant && (
          <p className="mt-2 text-center text-[11px] text-gray-400">
            Download available after all issues are resolved.
          </p>
        )}
      </div>
    </div>
  );
}
