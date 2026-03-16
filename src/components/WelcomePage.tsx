"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowRight, Eye, EyeOff } from "lucide-react";

interface WelcomePageProps {
    onEnter: () => void;
}

const VALID_PASSWORD = "a11y2026";

export default function WelcomePage({ onEnter }: WelcomePageProps) {
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (password === VALID_PASSWORD) {
            onEnter();
        } else {
            setError(true);
            setTimeout(() => setError(false), 2000);
        }
    };

    return (
        <div className="min-h-screen bg-secondary-25 px-8 py-12">
            <div className="mx-auto flex min-h-[calc(100vh-6rem)] w-full max-w-7xl flex-col">
                <div className="grid flex-1 grid-cols-1 items-center gap-12 lg:grid-cols-[1fr_1.25fr]">

                    {/* Left column */}
                    <div className="flex flex-col gap-6">

                        {/* YuJa logo */}
                        <div>
                            <Image
                                src="/yuja-logo.svg"
                                alt="YuJa"
                                width={110}
                                height={36}
                                priority
                            />
                        </div>

                        {/* Badge */}
                        <div>
                            <span className="inline-block rounded-full border border-secondary-200 bg-white/60 px-3.5 py-1 text-[12px] font-medium text-secondary-600 tracking-wide">
                                Design Challenge Prototype
                            </span>
                        </div>

                        {/* Heading */}
                        <div>
                            <h1 className="text-[2rem] font-bold leading-tight text-secondary-800">
                                <span className="bg-linear-to-r from-secondary-400 via-secondary-500 to-secondary-700 bg-clip-text text-transparent font-extrabold">
                                    Accessibility Report
                                </span>{" "}
                            </h1>
                        </div>
                        {/* Description */}
                        <p className="text-sm">Action-focused interface that combines strong information organization with quick task completion — reducing cognitive load while encouraging resolution.</p>
                        {/* How to explore */}
                        <div className="flex flex-col gap-4">
                            <div className="text-[11px] font-bold uppercase tracking-wider text-secondary-600">
                                How to explore
                            </div>
                            <div className="flex flex-col gap-3.5">
                                <div className="flex items-start gap-3">
                                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-secondary-100 text-[12px] font-bold text-secondary-600">
                                        1
                                    </div>
                                    <div>
                                        <div className="text-[14px] font-semibold text-gray-800">Upload any file</div>
                                        <div className="text-[13px] text-gray-500">A demo report will load automatically</div>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-secondary-100 text-[12px] font-bold text-secondary-600">
                                        2
                                    </div>
                                    <div>
                                        <div className="text-[14px] font-semibold text-gray-800">Try the features</div>
                                        <div className="text-[13px] text-gray-500">AutoPilot, manual fixes, and alt text generation</div>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-secondary-100 text-[12px] font-bold text-secondary-600">
                                        3
                                    </div>
                                    <div>
                                        <div className="text-[14px] font-semibold text-gray-800">Resolve all issues</div>
                                        <div className="text-[13px] text-gray-500">Watch the score and document update in real time</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Divider */}
                        <div className="h-px bg-gray-200" />

                        {/* Password form */}
                        <form onSubmit={handleSubmit} className="flex flex-col gap-2.5">
                            <div className="flex gap-2.5 items-center">
                                <div className="relative w-52">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        value={password}
                                        onChange={(e) => {
                                            setPassword(e.target.value);
                                            setError(false);
                                        }}
                                        placeholder="Password"
                                        className={`w-full rounded-lg border bg-white px-4 py-3 pr-10 text-[14px] text-gray-700 outline-none transition-all placeholder:text-gray-400 shadow-sm ${error
                                            ? "border-severe-accent focus:ring-2 focus:ring-severe-accent/30"
                                            : "border-gray-200 focus:border-secondary-400 focus:ring-2 focus:ring-secondary-400/20"
                                            }`}
                                        autoFocus
                                    />
                                    <button
                                        type="button"
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                        onClick={() => setShowPassword(!showPassword)}
                                        tabIndex={-1}
                                    >
                                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                    </button>
                                </div>
                                <button
                                    type="submit"
                                    className="flex items-center gap-2 rounded-lg bg-secondary-500 px-6 py-3 text-[14px] font-semibold text-white shadow-sm transition-all hover:bg-secondary-600 active:scale-[0.98]"
                                >
                                    Enter
                                    <ArrowRight className="h-4 w-4" />
                                </button>
                            </div>
                            {error && (
                                <p className="text-[12px] text-severe-accent">
                                    Incorrect password. Please try again.
                                </p>
                            )}
                        </form>

                    </div>

                    {/* Right column — Hero image */}
                    <div className="flex items-center justify-center lg:justify-end">
                        <Image
                            src="/cover.png"
                            alt="Accessibility Report Preview"
                            width={920}
                            height={580}
                            className="w-full rounded-3xl object-cover border border-gray-200"
                            priority
                        />
                    </div>

                </div>

                <footer className="mt-8 border-t border-gray-200 pt-4">
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                        <p className="text-[13px] font-semibold text-secondary-600">Thank you for reviewing my work team &#9825;</p>
                        <p className="text-[13px] font-medium text-gray-700">&mdash; Matin Truong, UX/UI Designer</p>
                    </div>
                </footer>
            </div>
        </div>
    );
}
