"use client";

import { useTranslations } from "next-intl";
import { LanguageSwitcher } from "./LanguageSwitcher";

export function Header() {
  const t = useTranslations("Header");

  return (
    <header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-6 px-6 py-4">
        <div>
          <div className="font-semibold tracking-tight">{t("brand")}</div>
          <div className="text-xs text-neutral-600">{t("subtitle")}</div>
        </div>

        <nav className="hidden items-center gap-4 text-sm text-neutral-600 md:flex">
          <a className="hover:text-neutral-900" href="#about">
            {t("about")}
          </a>
          <a className="hover:text-neutral-900" href="#digital">
            {t("digital")}
          </a>
          <a className="hover:text-neutral-900" href="#case-study">
            {t("caseStudy")}
          </a>
          <a className="hover:text-neutral-900" href="#proceso">
            {t("process")}
          </a>
          <a className="hover:text-neutral-900" href="#demos">
            {t("demos")}
          </a>
          <a className="hover:text-neutral-900" href="#contacto">
            {t("contact")}
          </a>
        </nav>

        <LanguageSwitcher />
      </div>
    </header>
  );
}
