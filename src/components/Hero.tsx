import { useTranslations } from "next-intl";
import { Section } from "./Section";

function KPI({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="rounded-2xl border border-neutral-200 p-5">
      <div className="font-medium">{title}</div>
      <div className="mt-1 text-sm text-neutral-600">{desc}</div>
    </div>
  );
}

export function Hero() {
  const t = useTranslations("Hero");

  return (
    <Section className="bg-white">
      <p className="text-sm font-medium text-neutral-600">{t("meta")}</p>

      <h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">
        {t("title")}
      </h1>

      <p className="mt-4 max-w-2xl text-lg text-neutral-600">{t("subtitle")}</p>

      <p className="mt-3 text-sm font-medium text-neutral-500">
        {t("supportLine")}
      </p>

      <div className="mt-8 flex flex-wrap gap-3">
        <a
          className="inline-flex rounded-xl bg-neutral-900 px-5 py-3 text-sm font-medium text-white"
          href="#contacto"
        >
          {t("ctaPrimary")}
        </a>
        <a
          className="inline-flex rounded-xl border border-neutral-200 px-5 py-3 text-sm font-medium"
          href="#demos"
        >
          {t("ctaSecondary")}
        </a>
      </div>

      <div className="mt-10 grid gap-4 md:grid-cols-3">
        <KPI title={t("kpi1Title")} desc={t("kpi1Desc")} />
        <KPI title={t("kpi2Title")} desc={t("kpi2Desc")} />
        <KPI title={t("kpi3Title")} desc={t("kpi3Desc")} />
      </div>
    </Section>
  );
}
