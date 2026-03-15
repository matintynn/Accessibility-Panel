"use client";

import { Upload } from "lucide-react";

interface DocumentUploadProps {
  onUpload: (fileName: string) => void;
}

export default function DocumentUpload({ onUpload }: DocumentUploadProps) {
  const handleClick = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".pdf,.doc,.docx,.pptx,.html";
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) onUpload(file.name);
    };
    input.click();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.currentTarget.classList.remove("!border-primary-400", "!bg-primary-100/50");
    if (e.dataTransfer.files.length > 0) {
      onUpload(e.dataTransfer.files[0].name);
    }
  };

  return (
    <div className="flex h-full flex-col items-center justify-center rounded-[10px] border-2 border-dashed border-gray-300 bg-white transition-all hover:border-primary-400">
      <div
        className="flex h-full w-full flex-col items-center justify-center gap-5 p-8"
        onClick={handleClick}
        onDragOver={(e) => {
          e.preventDefault();
          e.currentTarget.parentElement?.classList.add("!border-primary-400", "!bg-primary-100/50");
        }}
        onDragLeave={(e) => {
          e.currentTarget.parentElement?.classList.remove("!border-primary-400", "!bg-primary-100/50");
        }}
        onDrop={handleDrop}
        style={{ cursor: "pointer" }}
      >
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-100">
          <Upload className="h-8 w-8 text-primary-600" strokeWidth={1.5} />
        </div>
        <div className="text-center">
          <div className="text-base font-semibold text-gray-800">Upload a document</div>
          <div className="mt-1 text-sm text-gray-500">
            Drop a PDF, Word, or PowerPoint file here
          </div>
          <div className="mt-1 text-xs text-gray-400">
            We&apos;ll scan it for WCAG 2.1/2.2 and AODA compliance
          </div>
        </div>
        <button
          className="rounded-[6px] bg-primary-600 px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-primary-700 hover:shadow-md active:scale-[0.98]"
          onClick={(e) => {
            e.stopPropagation();
            handleClick();
          }}
        >
          Browse Files
        </button>
        <div className="flex gap-3 text-[11px] text-gray-400">
          <span>PDF</span>
          <span>DOC</span>
          <span>DOCX</span>
          <span>PPTX</span>
          <span>HTML</span>
        </div>
      </div>
    </div>
  );
}
