import { useTranslations } from "next-intl";
import { Section } from "./Section";

export function WhyDigitalize() {
  const t = useTranslations("WhyDigitalize");

  return (
    <Section id="digital" className="bg-neutral-50">
      {/* Hero impact */}
      <div className="text-center">
        <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
          {t("heroQuestion")}
        </h2>
        <div className="mt-8 mx-auto max-w-2xl rounded-2xl border-2 border-neutral-900 bg-white p-8">
          <div className="text-6xl font-bold text-neutral-900 md:text-7xl">
            53%
          </div>
          <p className="mt-4 text-lg text-neutral-700">{t("statText")}</p>
          <p className="mt-2 text-xs text-neutral-500">{t("statSource")}</p>
        </div>
      </div>

      {/* Problem vs Solution */}
      <div className="mt-16 grid gap-8 md:grid-cols-2">
        {/* What you're losing */}
        <div className="rounded-2xl border border-neutral-200 bg-white p-8">
          <div className="text-xl font-semibold text-neutral-900">
            {t("losingTitle")}
          </div>
          <div className="mt-4 text-sm text-neutral-600">
            {t("losingIntro")}
          </div>

          <div className="mt-6 space-y-3">
            {["losing1", "losing2", "losing3", "losing4", "losing5"].map(
              (key) => (
                <div key={key} className="flex gap-3">
                  <span className="text-neutral-500">✗</span>
                  <span className="text-sm text-neutral-700">{t(key)}</span>
                </div>
              ),
            )}
          </div>
        </div>

        {/* What you gain */}
        <div className="rounded-2xl border-2 border-neutral-900 bg-white p-8">
          <div className="text-xl font-semibold text-neutral-900">
            {t("gainingTitle")}
          </div>

          <div className="mt-6 space-y-6">
            <div>
              <div className="text-3xl font-bold text-neutral-900">+20-40%</div>
              <p className="mt-2 text-sm text-neutral-700">{t("gain1")}</p>
            </div>

            <div>
              <div className="text-lg font-semibold text-neutral-900">
                {t("gain2Title")}
              </div>
              <p className="mt-2 text-sm text-neutral-700">{t("gain2")}</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Conclusion */}
      <div className="mt-12 text-center rounded-xl bg-neutral-900 px-8 py-8 text-white">
        <p className="text-xl font-semibold">{t("conclusion")}</p>
        <p className="mt-3 text-neutral-300">{t("conclusionSub")}</p>
        <a
          href="#contact"
          className="mt-6 inline-block rounded-lg bg-white px-6 py-3 text-sm font-medium text-neutral-900"
        >
          {t("ctaButton")}
        </a>
      </div>
    </Section>
  );
}
