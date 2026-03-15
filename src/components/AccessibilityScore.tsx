"use client";

import { useAnimatedNumber } from "@/hooks/useAnimatedNumber";

interface AccessibilityScoreProps {
  score: number;
}

export default function AccessibilityScore({ score }: AccessibilityScoreProps) {
  const displayScore = useAnimatedNumber(score, 800);

  const barColor =
    displayScore < 50
      ? "bg-severe-accent"
      : displayScore < 80
        ? "bg-major-accent"
        : "bg-primary-500";

  return (
    <div className="rounded-[10px] border border-gray-200 bg-white transition-colors hover:border-gray-300">
      <div className="p-5">
        <div className="mb-3.5 flex items-center justify-between">
          <span className="flex items-center gap-1.5 text-sm font-semibold text-gray-600">
            Accessibility Score
          </span>
          <span className="text-[28px] font-bold tracking-tight text-gray-900 transition-all duration-600">
            {displayScore}%
          </span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
          <div
            className={`h-full rounded-full ${barColor} transition-[width] duration-800 ease-[cubic-bezier(0.4,0,0.2,1)]`}
            style={{ width: `${displayScore}%` }}
          />
        </div>
      </div>
    </div>
  );
}
