"use client";

import { useCallback, useMemo, useState } from "react";
import { initialQuickWins, initialSeveritySections } from "@/lib/data";
import { QuickWinItem, SeveritySection, ResolvedEntry, Severity } from "@/lib/types";
import AccessibilityScore from "@/components/AccessibilityScore";
import QuickWins from "@/components/QuickWins";
import SeverityCard from "@/components/SeverityCard";
import ComplianceBar from "@/components/ComplianceBar";
import DocumentViewer from "@/components/DocumentViewer";
import DocumentUpload from "@/components/DocumentUpload";
import WelcomePage from "@/components/WelcomePage";
import { CheckCircle2, Download, Upload } from "lucide-react";
import ResolutionSummary from "@/components/ResolutionSummary";
import Toast from "@/components/Toast";

type AppView = "welcome" | "upload" | "panel";

const TOTAL_ISSUES = initialSeveritySections.reduce(
  (sum, s) => sum + s.groups.reduce((gs, g) => gs + g.items.length, 0), 0
);

export default function Home() {
  const [view, setView] = useState<AppView>("welcome");
  const [quickWins, setQuickWins] = useState<QuickWinItem[]>(initialQuickWins);
  const [sections, setSections] = useState<SeveritySection[]>(initialSeveritySections);
  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [progressLabel, setProgressLabel] = useState("");
  const [toastMessage, setToastMessage] = useState("");
  const [toastVisible, setToastVisible] = useState(false);
  const [resolvedLog, setResolvedLog] = useState<ResolvedEntry[]>([]);
  const [fixedIds, setFixedIds] = useState<Set<string>>(new Set());
  const [confirmed, setConfirmed] = useState(false);

  const totalResolved = useMemo(() => {
    return sections.reduce(
      (sum, s) => sum + s.groups.reduce(
        (gs, g) => gs + g.items.filter((i) => i.resolved).length, 0
      ), 0
    );
  }, [sections]);

  const score = useMemo(() => {
    const base = 15;
    const earned = (100 - base) * (totalResolved / TOTAL_ISSUES);
    return Math.round(Math.min(100, base + earned));
  }, [totalResolved]);

  const allResolved = totalResolved === TOTAL_ISSUES;

  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
    setToastVisible(true);
  }, []);

  const hideToast = useCallback(() => {
    setToastVisible(false);
  }, []);

  const countActive = useCallback((section: SeveritySection) => {
    return section.groups.reduce(
      (sum, g) => sum + g.items.filter((i) => !i.resolved).length, 0
    );
  }, []);

  const handleDownload = useCallback(() => {
    showToast("Downloading accessible document...");
  }, [showToast]);

  const markFixed = useCallback((ids: string[]) => {
    setFixedIds((prev) => {
      const next = new Set(prev);
      ids.forEach((id) => next.add(id));
      return next;
    });
  }, []);

  const logResolutions = useCallback((items: { id: string; text: string; severity: Severity }[]) => {
    setResolvedLog((prev) => [
      ...prev,
      ...items.map((item) => ({ ...item, timestamp: Date.now() })),
    ]);
  }, []);

  // AutoPilot: resolves all fixable items (headings, contrast, links, forms, lang -- NOT images)
  const handleAutoPilot = useCallback(() => {
    if (isRunning) return;
    setIsRunning(true);
    setProgress(0);
    setProgressLabel("Scanning issues...");

    const steps = [
      { progress: 15, label: "Scanning issues..." },
      { progress: 30, label: "Analyzing fixes..." },
      { progress: 50, label: "Applying fixes..." },
      { progress: 70, label: "Verifying changes..." },
      { progress: 90, label: "Almost done..." },
      { progress: 100, label: "Complete!" },
    ];

    let stepIndex = 0;

    function nextStep() {
      if (stepIndex >= steps.length) {
        setQuickWins((prev) => prev.map((qw) => ({ ...qw, resolved: true })));

        const resolvedIds: string[] = [];
        const resolvedItems: { id: string; text: string; severity: Severity }[] = [];
        setSections((prev) =>
          prev.map((section) => ({
            ...section,
            groups: section.groups.map((group) => ({
              ...group,
              items: group.items.map((item) => {
                if (item.fixable && !item.resolved) {
                  resolvedIds.push(item.id);
                  resolvedItems.push({ id: item.id, text: item.text, severity: section.severity });
                  return { ...item, resolved: true };
                }
                return item;
              }),
            })),
          }))
        );

        markFixed(resolvedIds);
        logResolutions(resolvedItems);
        showToast(`${resolvedItems.length} issues resolved successfully`);

        setTimeout(() => {
          setIsRunning(false);
          setProgress(0);
        }, 2000);
        return;
      }

      const step = steps[stepIndex];
      setProgress(step.progress);
      setProgressLabel(step.label);
      stepIndex++;
      setTimeout(nextStep, 600);
    }

    setTimeout(nextStep, 300);
  }, [isRunning, showToast, markFixed, logResolutions]);

  // Fix a single item
  const handleFixItem = useCallback(
    (sectionIndex: number, groupId: string, itemId: string) => {
      let resolvedText = "";
      let resolvedSeverity: Severity = "minor";

      setSections((prev) => {
        const updated = [...prev];
        const section = { ...updated[sectionIndex] };
        resolvedSeverity = section.severity;
        section.groups = section.groups.map((g) => {
          if (g.id !== groupId) return g;
          return {
            ...g,
            items: g.items.map((item) => {
              if (item.id === itemId) {
                resolvedText = item.text;
                return { ...item, resolved: true };
              }
              return item;
            }),
          };
        });
        updated[sectionIndex] = section;
        return updated;
      });

      markFixed([itemId]);
      logResolutions([{ id: itemId, text: resolvedText, severity: resolvedSeverity }]);

      setQuickWins((prev) => {
        const idx = prev.findIndex((qw) => !qw.resolved);
        if (idx === -1) return prev;
        const updated = [...prev];
        updated[idx] = { ...updated[idx], resolved: true };
        return updated;
      });

      showToast("1 issue resolved");
    },
    [showToast, markFixed, logResolutions]
  );

  const handleUpload = useCallback((name: string) => {
    showToast(`Scanning "${name}" for accessibility issues...`);
    setTimeout(() => setView("panel"), 1200);
  }, [showToast]);

  // Filter out fully resolved severity sections
  const activeSections = sections.filter((s) => countActive(s) > 0);

  if (view === "welcome") {
    return <WelcomePage onEnter={() => setView("upload")} />;
  }

  if (view === "upload") {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50 p-8">
        <div className="flex w-full max-w-[520px] flex-col items-center">
          <div className="mb-1 text-[11px] font-medium text-primary-600">Step 1 of 2</div>
          <h2 className="mb-1 text-lg font-bold text-gray-900">Upload a document to begin</h2>
          <p className="mb-5 text-center text-[13px] text-gray-500">Any file works — we&apos;ll load a demo accessibility report We&apos;ll scan it for WCAG 2.1/2.2 and AODA compliance</p>
          <div className="w-full">
            <DocumentUpload onUpload={handleUpload} />
          </div>
        </div>
        <Toast message={toastMessage} visible={toastVisible} onHide={hideToast} />
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Left: Document Viewer */}
      <div className="flex-1 p-4">
        <DocumentViewer fixes={fixedIds} />
      </div>

      {/* Right: Accessibility Panel */}
      <div className="w-[400px] flex-shrink-0 overflow-y-auto border-l border-gray-200 bg-gray-50 p-4">
        <div className="flex flex-col gap-4">
          {/* Header */}
          <div className="px-1 pb-1 text-center">
            <h1 className="text-xl font-bold tracking-tight text-gray-900">
              Accessibility Report
            </h1>
            <div className="text-sm text-gray-500">
              Intro to intertextualities.pptx
            </div>
          </div>

          {/* Score */}
          <AccessibilityScore score={score} />

          {allResolved ? (
            <>
              {confirmed ? (
                /* Success state — shown after user confirms */
                <div className="animate-[fade-in_0.4s_ease] rounded-[10px] border border-gray-200 bg-white transition-colors hover:border-gray-300">
                  <div className="flex flex-col items-center px-6 py-8 text-center">
                    <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-success-accent/15">
                      <CheckCircle2 className="h-7 w-7 text-success-accent" strokeWidth={2} />
                    </div>
                    <div className="mb-1 text-[16px] font-bold text-success-accent">
                      No issues remaining
                    </div>
                    <div className="mb-4 text-[13px] text-gray-500">
                      Your document is ready and meets accessibility standards.
                    </div>

                    {/* Compliance tags */}
                    <div className="mb-5 flex flex-wrap items-center justify-center gap-2">
                      <span className="rounded-full border border-success-accent/20 bg-success-bg px-3 py-1 text-[11px] font-semibold text-success-accent">
                        WCAG 2.0
                      </span>
                      <span className="rounded-full border border-success-accent/20 bg-success-bg px-3 py-1 text-[11px] font-semibold text-success-accent">
                        WCAG 2.1
                      </span>
                      <span className="rounded-full border border-success-accent/20 bg-success-bg px-3 py-1 text-[11px] font-semibold text-success-accent">
                        AODA
                      </span>
                    </div>

                    <button
                      className="flex w-full items-center justify-center gap-2 rounded-[6px] bg-secondary-600 px-5 py-3 text-[14px] font-semibold text-white transition-all hover:bg-[#361f5c] hover:shadow-md active:scale-[0.98]"
                      onClick={handleDownload}
                    >
                      <Download className="h-4 w-4" strokeWidth={2} />
                      Download Accessible Document
                    </button>
                  </div>
                </div>
              ) : (
                /* Resolution Summary — shown first when score hits 100% */
                <ResolutionSummary
                  entries={resolvedLog}
                  allResolved
                  onConfirm={() => setConfirmed(true)}
                  onRevert={() => setConfirmed(false)}
                />
              )}
            </>
          ) : (
            <>
              {/* Quick Wins */}
              <QuickWins
                items={quickWins}
                onAutoPilot={handleAutoPilot}
                isRunning={isRunning}
                progress={progress}
                progressLabel={progressLabel}
              />

              {/* Active Severity Sections only */}
              {activeSections.map((section) => {
                const originalIdx = sections.indexOf(section);
                return (
                  <SeverityCard
                    key={section.severity}
                    severity={section.severity}
                    label={section.label}
                    description={section.description}
                    groups={section.groups}
                    totalCount={countActive(section)}
                    onFixItem={(groupId, itemId) => handleFixItem(originalIdx, groupId, itemId)}
                  />
                );
              })}

              {/* Resolution Summary */}
              {resolvedLog.length > 0 && <ResolutionSummary entries={resolvedLog} allResolved={false} />}

              {/* Upload another file */}
              <div
                className="cursor-pointer rounded-[10px] border-2 border-dashed border-gray-300 bg-gray-50 transition-all duration-200 hover:border-primary-400 hover:bg-primary-100"
                onClick={() => {
                  const input = document.createElement("input");
                  input.type = "file";
                  input.accept = ".pdf,.doc,.docx,.pptx,.html";
                  input.onchange = (e) => {
                    const file = (e.target as HTMLInputElement).files?.[0];
                    if (file) handleUpload(file.name);
                  };
                  input.click();
                }}
              >
                <div className="flex items-center justify-center gap-2.5 px-5 py-4">
                  <Upload className="h-5 w-5 text-gray-400" strokeWidth={2} />
                  <span className="text-sm font-semibold text-gray-600">Upload New Document</span>
                </div>
              </div>

              {/* Compliance */}
              <ComplianceBar score={score} />
            </>
          )}

          <div className="h-4" />
        </div>
      </div>

      {/* Toast */}
      <Toast message={toastMessage} visible={toastVisible} onHide={hideToast} />
    </div>
  );
}
