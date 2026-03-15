"use client";

import { Image, Type, CircleAlert, Link, Monitor, Terminal, FileText, Table } from "lucide-react";

interface QuickWinIconProps {
  icon: string;
  className?: string;
}

export default function QuickWinIcon({ icon, className = "h-4 w-4 text-primary-400" }: QuickWinIconProps) {
  switch (icon) {
    case "image":
      return <Image className={className} />;
    case "heading":
      return <Type className={className} />;
    case "form":
      return <CircleAlert className={className} />;
    case "link":
      return <Link className={className} />;
    case "contrast":
      return <Monitor className={className} />;
    case "code":
      return <Terminal className={className} />;
    case "document":
      return <FileText className={className} />;
    case "table":
      return <Table className={className} />;
    default:
      return null;
  }
}
