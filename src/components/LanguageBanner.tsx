"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";

export function LanguageBanner() {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const hasChecked = useRef(false);
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    // Only check once on mount
    if (hasChecked.current) return;
    hasChecked.current = true;

    // Check if banner has been dismissed before
    const dismissed = localStorage.getItem("language-banner-dismissed");
    if (!dismissed) {
      // Use queueMicrotask to avoid synchronous setState warning
      queueMicrotask(() => {
        setIsVisible(true);
      });
    }
  }, []);

  const dismiss = () => {
    setIsVisible(false);
    localStorage.setItem("language-banner-dismissed", "true");
  };

  const switchLocale = (newLocale: string) => {
    // Replace the locale segment in the pathname
    const segments = pathname.split("/");
    segments[1] = newLocale;
    const newPathname = segments.join("/");

    dismiss();
    router.push(newPathname);
  };

  if (!isVisible) return null;

  return (
    <div className="border-b bg-neutral-50">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-6 py-3">
        <div className="flex items-center gap-3 text-sm text-neutral-700">
          <span className="font-medium">Choose language:</span>
          <div className="flex gap-2">
            <button
              onClick={() => switchLocale("ka")}
              className={[
                "rounded-lg border px-3 py-1.5 text-sm font-medium transition-colors",
                locale === "ka"
                  ? "border-neutral-900 bg-neutral-900 text-white"
                  : "border-neutral-300 bg-white text-neutral-700 hover:border-neutral-400",
              ].join(" ")}
            >
              ქართული
            </button>
            <button
              onClick={() => switchLocale("en")}
              className={[
                "rounded-lg border px-3 py-1.5 text-sm font-medium transition-colors",
                locale === "en"
                  ? "border-neutral-900 bg-neutral-900 text-white"
                  : "border-neutral-300 bg-white text-neutral-700 hover:border-neutral-400",
              ].join(" ")}
            >
              English
            </button>
          </div>
        </div>

        <button
          onClick={dismiss}
          className="text-neutral-400 hover:text-neutral-600"
          aria-label="Close banner"
        >
          <svg
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
