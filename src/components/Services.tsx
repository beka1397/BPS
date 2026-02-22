"use client";

import { useTranslations } from "next-intl";
import { Section } from "./Section";
import { useState } from "react";

/**
 * PROCESS ACCORDION
 * Structured 4-phase process for Georgian SMBs
 * Focus: Trust, transparency, and responsibility
 */

function ServiceAccordionItem({
  title,
  subtitle,
  items,
  specialNote,
  isOpen,
  onToggle,
}: {
  title: string;
  subtitle?: string;
  items: string[];
  specialNote?: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      className={[
        "rounded-xl border bg-white transition-all",
        "border-neutral-200",
        isOpen ? "shadow-md" : "",
      ].join(" ")}
    >
      {/* Header - always visible */}
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between p-6 text-left"
      >
        <div className="flex-1">
          <h3 className="text-lg font-semibold">{title}</h3>
          {subtitle && (
            <div className="mt-1 text-sm font-medium text-neutral-600">
              {subtitle}
            </div>
          )}
        </div>

        {/* Expand/collapse icon */}
        <div
          className={[
            "transition-transform duration-200",
            isOpen ? "rotate-180" : "",
          ].join(" ")}
        >
          <svg
            className="h-5 w-5 text-neutral-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </button>

      {/* Expandable content */}
      {isOpen && (
        <div className="border-t border-neutral-100 px-6 pb-6 pt-4">
          <ul className="space-y-2.5 text-sm text-neutral-700">
            {items.map((item, index) => (
              <li key={index} className="flex gap-2">
                <span className="mt-0.5 inline-block h-2 w-2 rounded-full bg-neutral-900" />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          {specialNote && (
            <div className="mt-4 rounded-lg bg-neutral-50 px-4 py-3 text-sm text-neutral-700">
              {specialNote}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export function Services() {
  const t = useTranslations("Process");
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <Section id="proceso" className="bg-neutral-50">
      <h2 className="text-2xl font-semibold tracking-tight">{t("title")}</h2>
      <p className="mt-2 text-neutral-600">{t("subtitle")}</p>

      <div className="mt-8 space-y-4">
        <ServiceAccordionItem
          title={t("service1Title")}
          subtitle={t("service1Subtitle")}
          items={[
            t("service1Item1"),
            t("service1Item2"),
            t("service1Item3"),
            t("service1Item4"),
          ]}
          specialNote={t("service1SpecialNote")}
          isOpen={openIndex === 0}
          onToggle={() => setOpenIndex(openIndex === 0 ? null : 0)}
        />

        <ServiceAccordionItem
          title={t("service2Title")}
          subtitle={t("service2Subtitle")}
          items={[
            t("service2Item1"),
            t("service2Item2"),
            t("service2Item3"),
            t("service2Item4"),
            t("service2Item5"),
          ]}
          specialNote={t("service2SpecialNote")}
          isOpen={openIndex === 1}
          onToggle={() => setOpenIndex(openIndex === 1 ? null : 1)}
        />

        <ServiceAccordionItem
          title={t("service3Title")}
          subtitle={t("service3Subtitle")}
          items={[
            t("service3Item1"),
            t("service3Item2"),
            t("service3Item3"),
            t("service3Item4"),
          ]}
          specialNote={t("service3SpecialNote")}
          isOpen={openIndex === 2}
          onToggle={() => setOpenIndex(openIndex === 2 ? null : 2)}
        />
      </div>

      <p className="mt-8 text-center text-sm text-neutral-600 max-w-2xl mx-auto">
        {t("footerNote")}
      </p>
    </Section>
  );
}
