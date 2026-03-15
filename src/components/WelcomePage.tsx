"use client";

import { useState } from "react";
import { ShieldCheck, ArrowRight, Eye, EyeOff, Upload, MousePointerClick, CheckCircle2 } from "lucide-react";

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
        <div className="flex min-h-screen items-center justify-center bg-gray-50 p-6">
            <div className="w-full max-w-[480px]">
                {/* Header icon */}
                <div className="mb-6 flex justify-center">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-100">
                        <ShieldCheck className="h-7 w-7 text-primary-600" strokeWidth={1.5} />
                    </div>
                </div>

                {/* Card */}
                <div className="rounded-[12px] border border-gray-200 bg-white px-8 py-8">
                    <h1 className="mb-1 text-center text-xl font-bold text-gray-900">
                        Accessibility Review Panel
                    </h1>
                    <p className="mb-6 text-center text-[13px] text-gray-500">
                        Design Challenge Prototype
                    </p>

                    {/* Problem */}
                    <div className="mb-5">
                        <div className="mb-1.5 text-[11px] font-bold uppercase tracking-wider text-primary-600">
                            Problem
                        </div>
                        <p className="text-[13px] leading-relaxed text-gray-600">
                            Instructors need to quickly understand and resolve accessibility issues
                            in their course materials, but reports often present complex information
                            that makes it difficult to identify priorities and take action.
                        </p>
                    </div>

                    {/* Design Goals */}
                    <div className="mb-5">
                        <div className="mb-1.5 text-[11px] font-bold uppercase tracking-wider text-primary-600">
                            Design Goals
                        </div>
                        <ul className="flex flex-col gap-1">
                            <li className="flex items-start gap-2 text-[13px] text-gray-600">
                                <span className="mt-0.5 text-primary-500">→</span>
                                Identify accessibility issues quickly
                            </li>
                            <li className="flex items-start gap-2 text-[13px] text-gray-600">
                                <span className="mt-0.5 text-primary-500">→</span>
                                Understand why the issues matter
                            </li>
                            <li className="flex items-start gap-2 text-[13px] text-gray-600">
                                <span className="mt-0.5 text-primary-500">→</span>
                                Take action to resolve them efficiently
                            </li>
                        </ul>
                    </div>

                    {/* Direction */}
                    <div className="mb-6">
                        <div className="mb-1.5 text-[11px] font-bold uppercase tracking-wider text-primary-600">
                            Approach
                        </div>
                        <p className="text-[13px] leading-relaxed text-gray-600">
                            Action-focused interface that combines strong information organization
                            with quick task completion — reducing cognitive load while
                            encouraging resolution.
                        </p>
                    </div>

                    {/* How to explore */}
                    <div className="mb-6">
                        <div className="mb-1.5 text-[11px] font-bold uppercase tracking-wider text-primary-600">
                            How to explore
                        </div>
                        <div className="flex flex-col gap-2.5">
                            <div className="flex items-start gap-3">
                                <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary-100 text-[11px] font-bold text-primary-600">
                                    1
                                </div>
                                <div>
                                    <div className="text-[13px] font-medium text-gray-700">Upload any file</div>
                                    <div className="text-[12px] text-gray-500">A demo report will load automatically</div>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary-100 text-[11px] font-bold text-primary-600">
                                    2
                                </div>
                                <div>
                                    <div className="text-[13px] font-medium text-gray-700">Try the features</div>
                                    <div className="text-[12px] text-gray-500">AutoPilot, manual fixes, and alt text generation</div>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary-100 text-[11px] font-bold text-primary-600">
                                    3
                                </div>
                                <div>
                                    <div className="text-[13px] font-medium text-gray-700">Resolve all issues</div>
                                    <div className="text-[12px] text-gray-500">Watch the score and document update in real time</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Divider */}
                    <div className="mb-5 h-px bg-gray-100" />

                    {/* Password form */}
                    <form onSubmit={handleSubmit}>
                        <label className="mb-1.5 block text-[12px] font-medium text-gray-700">
                            Enter password to view prototype
                        </label>
                        <div className="mb-3 flex gap-2">
                            <div className="relative flex-1">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                        setError(false);
                                    }}
                                    placeholder="Password"
                                    className={`w-full rounded-[6px] border bg-white px-3 py-2.5 pr-9 text-[13px] text-gray-700 outline-none transition-colors placeholder:text-gray-400 ${error
                                        ? "border-severe-accent focus:border-severe-accent focus:ring-1 focus:ring-severe-accent"
                                        : "border-gray-200 focus:border-primary-400 focus:ring-1 focus:ring-primary-400"
                                        }`}
                                    autoFocus
                                />
                                <button
                                    type="button"
                                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                    onClick={() => setShowPassword(!showPassword)}
                                    tabIndex={-1}
                                >
                                    {showPassword ? (
                                        <EyeOff className="h-4 w-4" />
                                    ) : (
                                        <Eye className="h-4 w-4" />
                                    )}
                                </button>
                            </div>
                            <button
                                type="submit"
                                className="flex items-center gap-1.5 rounded-[6px] bg-primary-600 px-5 py-2.5 text-[13px] font-semibold text-white transition-all hover:bg-primary-700 active:scale-[0.98]"
                            >
                                Enter
                                <ArrowRight className="h-4 w-4" />
                            </button>
                        </div>
                        {error && (
                            <p className="text-[12px] text-severe-accent animate-[fade-in_0.2s_ease]">
                                Incorrect password. Please try again.
                            </p>
                        )}
                    </form>

                    {/* Thank you */}
                    <div className="mt-5 border-t border-gray-100 pt-4">
                        <p className="text-center text-[14px] font-bold text-primary-600">
                            Thank you for reviewing my work team &#9825;
                        </p>
                        <p className="text-center text-[12px] text-gray-600">— Matin Truong, UX/UI Designer</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
