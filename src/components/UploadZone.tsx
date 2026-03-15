"use client";

import { useCallback, useRef } from "react";
import { Upload } from "lucide-react";

interface UploadZoneProps {
  onUpload: (fileName: string) => void;
}

export default function UploadZone({ onUpload }: UploadZoneProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = useCallback(() => {
    inputRef.current?.click();
  }, []);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length > 0) {
        onUpload(e.target.files[0].name);
      }
    },
    [onUpload]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.currentTarget.classList.add("!border-primary-400", "!bg-primary-100");
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.currentTarget.classList.remove("!border-primary-400", "!bg-primary-100");
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.currentTarget.classList.remove("!border-primary-400", "!bg-primary-100");
      if (e.dataTransfer.files.length > 0) {
        onUpload(e.dataTransfer.files[0].name);
      }
    },
    [onUpload]
  );

  return (
    <div
      className="cursor-pointer rounded-[10px] border-2 border-dashed border-gray-300 bg-gray-50 transition-all duration-200 hover:border-primary-400 hover:bg-primary-100"
      onClick={handleClick}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="flex flex-col items-center justify-center gap-2.5 px-5 py-7">
        <Upload
          className="h-9 w-9 text-gray-400 transition-colors duration-200 group-hover:text-primary-600"
          strokeWidth={2}
        />
        <span className="text-sm font-semibold text-gray-600">Upload File</span>
        <span className="text-xs text-gray-400">Drop a document here or click to browse</span>
      </div>
      <input
        ref={inputRef}
        type="file"
        className="hidden"
        accept=".pdf,.doc,.docx,.pptx,.html"
        onChange={handleChange}
      />
    </div>
  );
}
