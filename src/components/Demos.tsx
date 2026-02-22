"use client";

import { useTranslations, useLocale } from "next-intl";
import { Section } from "./Section";
import Link from "next/link";

export function Demos() {
  const t = useTranslations("DemosPage");
  const locale = useLocale();

  const demos = [
    {
      titleKey: "card1Title" as const,
      descKey: "card1Desc" as const,
      bullets: ["card1Bullet1", "card1Bullet2", "card1Bullet3"] as const,
      buttonKey: "card1Button" as const,
      href: `/${locale}/demos/aesthetic-booking`,
    },
    {
      titleKey: "card2Title" as const,
      descKey: "card2Desc" as const,
      bullets: ["card2Bullet1", "card2Bullet2", "card2Bullet3"] as const,
      buttonKey: "card2Button" as const,
      href: `/${locale}/demos/request-quote`,
    },
    {
      titleKey: "card3Title" as const,
      descKey: "card3Desc" as const,
      bullets: ["card3Bullet1", "card3Bullet2", "card3Bullet3"] as const,
      buttonKey: "card3Button" as const,
      href: `/${locale}/demos/restaurant`,
    },
  ];

  return (
    <Section id="demos">
      <h2 className="text-2xl font-semibold tracking-tight">{t("title")}</h2>
      <p className="mt-2 text-neutral-600">{t("subtitle")}</p>

      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {demos.map((demo) => (
          <div
            key={demo.titleKey}
            className="flex flex-col rounded-2xl border border-neutral-200 p-6"
          >
            <h3 className="text-lg font-semibold">{t(demo.titleKey)}</h3>
            <p className="mt-2 text-sm text-neutral-600">{t(demo.descKey)}</p>
            <ul className="mt-4 space-y-2 text-sm text-neutral-700">
              {demo.bullets.map((b) => (
                <li key={b} className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-neutral-400" />
                  {t(b)}
                </li>
              ))}
            </ul>
            <div className="mt-auto pt-6">
              <Link
                href={demo.href}
                className="inline-flex rounded-xl bg-neutral-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-neutral-800"
              >
                {t(demo.buttonKey)}
              </Link>
            </div>
          </div>
        ))}
      </div>

      <p className="mt-8 text-center text-sm text-neutral-500">
        {t("disclaimer")}
      </p>
    </Section>
  );
}
