import { QuickWinItem, SeveritySection } from "./types";

export const initialQuickWins: QuickWinItem[] = [
  { id: "qw-1", text: "Heading structure: title uses <p>", icon: "heading", resolved: false },
  { id: "qw-2", text: "Heading structure: subtitle uses <p>", icon: "heading", resolved: false },
  { id: "qw-3", text: "Heading structure: subtitle uses <p>", icon: "heading", resolved: false },
  { id: "qw-4", text: "Low contrast body text (paragraph 1)", icon: "contrast", resolved: false },
  { id: "qw-5", text: "Low contrast body text (paragraph 4)", icon: "contrast", resolved: false },
  { id: "qw-6", text: "Non-descriptive link: \"click here\"", icon: "link", resolved: false },
  { id: "qw-7", text: "Non-descriptive link: \"read more\"", icon: "link", resolved: false },
  { id: "qw-8", text: "Missing form label (name input)", icon: "form", resolved: false },
  { id: "qw-9", text: "Missing form label (email input)", icon: "form", resolved: false },
  { id: "qw-10", text: "Missing lang attribute", icon: "code", resolved: false },
];

export const initialSeveritySections: SeveritySection[] = [
  {
    severity: "severe",
    label: "Severe Issues",
    description: "Blocks access for users",
    actionLabel: "Critical",
    groups: [
      {
        id: "sg-1",
        title: "Image Alt Text Missing",
        items: [
          { id: "fix-img-1", text: "Missing alt text", description: "pho-bo-hanoi.jpg has no alt attribute", fixable: false, canGenerate: true, resolved: false },
          { id: "fix-img-2", text: "Missing alt text", description: "banh-mi-saigon.jpg has no alt attribute", fixable: false, canGenerate: true, resolved: false },
          { id: "fix-img-3", text: "Missing alt text", description: "bun-cha-grill.jpg has no alt attribute", fixable: false, canGenerate: true, resolved: false },
        ],
      },
      {
        id: "sg-2",
        title: "Heading Structure",
        items: [
          { id: "fix-h-title", text: "Wrong heading tag", description: "Title uses <p> — should be <h1>", fixable: true, canGenerate: false, resolved: false },
          { id: "fix-h-sub1", text: "Wrong heading tag", description: "\"Phở\" section uses <p> — should be <h2>", fixable: true, canGenerate: false, resolved: false },
          { id: "fix-h-sub2", text: "Wrong heading tag", description: "\"Districts\" section uses <p> — should be <h2>", fixable: true, canGenerate: false, resolved: false },
        ],
      },
    ],
  },
  {
    severity: "major",
    label: "Major Issues",
    description: "Significant barriers to access",
    actionLabel: "Attention",
    groups: [
      {
        id: "mg-1",
        title: "Missing Form Labels",
        items: [
          { id: "fix-form-1", text: "No label element", description: "Name input has no associated <label>", fixable: true, canGenerate: false, resolved: false },
          { id: "fix-form-2", text: "No label element", description: "Email input has no associated <label>", fixable: true, canGenerate: false, resolved: false },
        ],
      },
      {
        id: "mg-2",
        title: "Link Text Not Descriptive",
        items: [
          { id: "fix-link-1", text: "Vague link text", description: "\"click here\" does not describe the destination", fixable: true, canGenerate: false, resolved: false },
          { id: "fix-link-2", text: "Vague link text", description: "\"read more\" does not describe the destination", fixable: true, canGenerate: false, resolved: false },
        ],
      },
    ],
  },
  {
    severity: "minor",
    label: "Minor Issues",
    description: "Small improvements needed",
    actionLabel: "Improve",
    groups: [
      {
        id: "ng-1",
        title: "Color Contrast",
        items: [
          { id: "fix-contrast-1", text: "Fails WCAG AA", description: "Paragraph 1 contrast ratio is 2.3:1 (needs 4.5:1)", fixable: true, canGenerate: false, resolved: false },
          { id: "fix-contrast-2", text: "Fails WCAG AA", description: "Paragraph 4 contrast ratio is 2.8:1 (needs 4.5:1)", fixable: true, canGenerate: false, resolved: false },
        ],
      },
      {
        id: "ng-2",
        title: "Document Metadata",
        items: [
          { id: "fix-lang", text: "Missing lang attribute", description: "<html> element has no lang attribute", fixable: true, canGenerate: false, resolved: false },
        ],
      },
    ],
  },
];
