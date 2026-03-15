"use client";

import { useEffect, useRef, useState } from "react";
import { CheckCircle2 } from "lucide-react";

interface ToastProps {
  message: string;
  visible: boolean;
  onHide: () => void;
}

export default function Toast({ message, visible, onHide }: ToastProps) {
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (visible && message) {
      setShow(true);
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        setShow(false);
        setTimeout(onHide, 350);
      }, 3500);
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [visible, message, onHide]);

  return (
    <div
      className={`fixed bottom-8 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2.5 whitespace-nowrap rounded-[10px] bg-gray-900 px-6 py-3 text-sm font-medium text-white transition-all duration-350 ease-[cubic-bezier(0.4,0,0.2,1)] ${show
        ? "translate-y-0 opacity-100"
        : "translate-y-[100px] opacity-0"
        }`}
      style={{ transform: show ? "translateX(-50%) translateY(0)" : "translateX(-50%) translateY(100px)" }}
    >
      <CheckCircle2 className="h-[18px] w-[18px] text-success-accent" strokeWidth={2.5} />
      <span>{message}</span>
    </div>
  );
}
