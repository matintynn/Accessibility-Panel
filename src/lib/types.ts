export type Severity = "severe" | "major" | "minor";

export interface IssueItem {
  id: string;
  text: string;
  description: string;
  fixable: boolean;
  canGenerate: boolean;
  resolved: boolean;
}

export interface IssueGroup {
  id: string;
  title: string;
  items: IssueItem[];
}

export interface SeveritySection {
  severity: Severity;
  label: string;
  description: string;
  actionLabel: string;
  groups: IssueGroup[];
}

export interface QuickWinItem {
  id: string;
  text: string;
  icon: "image" | "heading" | "form" | "link" | "contrast" | "code" | "document" | "table";
  resolved: boolean;
}

export interface ResolvedEntry {
  id: string;
  text: string;
  severity: Severity;
  timestamp: number;
}
