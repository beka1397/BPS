"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";

export function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const switchLocale = (newLocale: string) => {
    if (newLocale === locale) return;

    // Replace the locale segment in the pathname
    // Current pathname is like: /en/... or /ka/...
    const segments = pathname.split("/");
    segments[1] = newLocale;
    const newPathname = segments.join("/");

    router.push(newPathname);
  };

  return (
    <div className="flex items-center gap-1 rounded-lg border border-neutral-200 bg-white p-1">
      <button
        onClick={() => switchLocale("ka")}
        className={[
          "rounded px-2 py-1 text-xs font-medium transition-colors",
          locale === "ka"
            ? "bg-neutral-900 text-white"
            : "text-neutral-600 hover:text-neutral-900",
        ].join(" ")}
      >
        ქართული
      </button>
      <button
        onClick={() => switchLocale("en")}
        className={[
          "rounded px-2 py-1 text-xs font-medium transition-colors",
          locale === "en"
            ? "bg-neutral-900 text-white"
            : "text-neutral-600 hover:text-neutral-900",
        ].join(" ")}
      >
        English
      </button>
    </div>
  );
}
