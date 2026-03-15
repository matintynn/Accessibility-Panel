"use client";

import React, { useState } from "react";
import { Severity, IssueGroup as IssueGroupType } from "@/lib/types";
import { useAnimatedNumber } from "@/hooks/useAnimatedNumber";
import IssueGroupCard from "./IssueGroupCard";
import { TriangleAlert, AlertCircle, Info, ChevronRight } from "lucide-react";

const severityStyles: Record<Severity, {
  bar: string;
  countColor: string;
  btnBg: string;
  btnColor: string;
}> = {
  severe: {
    bar: "bg-severe-accent",
    countColor: "text-severe-accent",
    btnBg: "bg-severe-bg",
    btnColor: "text-severe-accent",
  },
  major: {
    bar: "bg-major-accent",
    countColor: "text-major-accent",
    btnBg: "bg-major-bg",
    btnColor: "text-major-accent",
  },
  minor: {
    bar: "bg-minor-accent",
    countColor: "text-minor-accent",
    btnBg: "bg-minor-bg",
    btnColor: "text-minor-accent",
  },
};

const severityIcons: Record<Severity, React.ReactNode> = {
  severe: <TriangleAlert className="h-4 w-4" />,
  major: <AlertCircle className="h-4 w-4" />,
  minor: <Info className="h-4 w-4" />,
};

interface SeverityCardProps {
  severity: Severity;
  label: string;
  description: string;
  groups: IssueGroupType[];
  totalCount: number;
  onFixItem: (groupId: string, itemId: string) => void;
}

export default function SeverityCard({
  severity,
  label,
  description,
  groups,
  totalCount,
  onFixItem,
}: SeverityCardProps) {
  const [expanded, setExpanded] = useState(false);
  const styles = severityStyles[severity];
  const displayCount = useAnimatedNumber(totalCount, 500);

  return (
    <div className="relative overflow-hidden rounded-[10px] border border-gray-200 bg-white hover:border-gray-300 transition-colors">
      {/* Left color bar */}
      <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${styles.bar}`} />

      {/* Header */}
      <div
        className="flex cursor-pointer select-none items-center justify-between py-[18px] pr-5 pl-6"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-center gap-3.5">
          <span className={`min-w-[32px] text-[32px] font-bold leading-none transition-all duration-400 ${styles.countColor}`}>
            {displayCount}
          </span>
          <div>
            <div className="text-[15px] font-semibold text-gray-800">{label}</div>
            <div className="mt-px text-xs text-gray-500">{description}</div>
          </div>
        </div>
        <div className="flex items-center">
          <div
            className={`flex h-8 w-8 items-center justify-center ${styles.btnColor}`}
          >
            {severityIcons[severity]}
          </div>
          <ChevronRight
            className={`h-[18px] w-[18px] flex-shrink-0 text-gray-400 transition-transform duration-250 ease-out ${expanded ? "rotate-90" : ""}`}
          />
        </div>
      </div>

      {/* Dropdown */}
      <div
        className="transition-[max-height] duration-300 ease-out"
        style={{ maxHeight: expanded ? "400px" : "0px", overflow: expanded ? "auto" : "hidden" }}
      >
        <div className="flex flex-col gap-3 px-5 pb-4 pl-6">
          {groups
            .filter((group) => group.items.some((i) => !i.resolved))
            .map((group) => (
              <IssueGroupCard
                key={group.id}
                group={group}
                severity={severity}
                onFixItem={(itemId) => onFixItem(group.id, itemId)}
              />
            ))}
        </div>
      </div>
    </div>
  );
}
