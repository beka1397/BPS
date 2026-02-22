import { useTranslations } from "next-intl";
import { Section } from "./Section";

export function ClinicComparison() {
  const t = useTranslations("ClinicComparison");

  return (
    <Section id="case-study" className="bg-white">
      <div className="text-center">
        <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
          {t("title")}
        </h2>
        <p className="mt-4 max-w-3xl mx-auto text-neutral-600">
          {t("subtitle")}
        </p>
      </div>
      {/* Two-column comparison */}
      <div className="mt-12 grid gap-8 md:grid-cols-2">
        {/* Social Media Only */}
        <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-8">
          <h3 className="text-xl font-semibold text-neutral-900">
            {t("clinic1Title")}
          </h3>
          <p className="mt-2 text-sm text-neutral-500">
            {t("clinic1Subtitle")}
          </p>

          <div className="mt-6 space-y-3">
            <div className="flex gap-3">
              <span className="text-neutral-400">•</span>
              <span className="text-sm text-neutral-700">
                {t("clinic1Item1")}
              </span>
            </div>
            <div className="flex gap-3">
              <span className="text-neutral-400">•</span>
              <span className="text-sm text-neutral-700">
                {t("clinic1Item2")}
              </span>
            </div>
            <div className="flex gap-3">
              <span className="text-neutral-400">•</span>
              <span className="text-sm text-neutral-700">
                {t("clinic1Item3")}
              </span>
            </div>
            <div className="flex gap-3">
              <span className="text-neutral-400">•</span>
              <span className="text-sm text-neutral-700">
                {t("clinic1Item4")}
              </span>
            </div>
            <div className="flex gap-3">
              <span className="text-neutral-400">•</span>
              <span className="text-sm text-neutral-700">
                {t("clinic1Item5")}
              </span>
            </div>
            <div className="flex gap-3">
              <span className="text-neutral-400">•</span>
              <span className="text-sm text-neutral-700">
                {t("clinic1Item6")}
              </span>
            </div>
          </div>

          <div className="mt-6 rounded-lg border border-neutral-200 bg-white p-4">
            <p className="text-sm font-semibold text-neutral-900 mb-2">
              {t("clinic1ConsequencesTitle")}
            </p>
            <ul className="space-y-2 text-sm text-neutral-600">
              <li>• {t("clinic1Consequence1")}</li>
              <li>• {t("clinic1Consequence5")}</li>
              <li>• {t("clinic1Consequence6")}</li>
              <li>• {t("clinic1Consequence2")}</li>
              <li>• {t("clinic1Consequence3")}</li>
              <li>• {t("clinic1Consequence4")}</li>
            </ul>
          </div>
        </div>

        {/* Digitally Organized */}
        <div className="rounded-2xl border-2 border-neutral-900 bg-white p-8">
          <h3 className="text-xl font-semibold text-neutral-900">
            {t("clinic2Title")}
          </h3>

          <div className="mt-6 space-y-3">
            <div className="flex gap-3">
              <span className="text-neutral-900">✓</span>
              <span className="text-sm text-neutral-700">
                {t("clinic2Item1")}
              </span>
            </div>
            <div className="flex gap-3">
              <span className="text-neutral-900">✓</span>
              <span className="text-sm text-neutral-700">
                {t("clinic2Item2")}
              </span>
            </div>
            <div className="flex gap-3">
              <span className="text-neutral-900">✓</span>
              <span className="text-sm text-neutral-700">
                {t("clinic2Item3")}
              </span>
            </div>
            <div className="flex gap-3">
              <span className="text-neutral-900">✓</span>
              <span className="text-sm text-neutral-700">
                {t("clinic2Item4")}
              </span>
            </div>
            <div className="flex gap-3">
              <span className="text-neutral-900">✓</span>
              <span className="text-sm text-neutral-700">
                {t("clinic2Item5")}
              </span>
            </div>
            <div className="flex gap-3">
              <span className="text-neutral-900">✓</span>
              <span className="text-sm text-neutral-700">
                {t("clinic2Item6")}
              </span>
            </div>
            <div className="flex gap-3">
              <span className="text-neutral-900">✓</span>
              <span className="text-sm text-neutral-700">
                {t("clinic2Item7")}
              </span>
            </div>
          </div>

          <div className="mt-6 space-y-4">
            <div className="rounded-lg bg-neutral-50 p-4">
              <p className="font-semibold text-sm text-neutral-900">
                {t("advantage1Title")}
              </p>
              <p className="mt-1 text-sm text-neutral-600">
                {t("advantage1Desc")}
              </p>
            </div>
            <div className="rounded-lg bg-neutral-50 p-4">
              <p className="font-semibold text-sm text-neutral-900">
                {t("advantage2Title")}
              </p>
              <p className="mt-1 text-sm text-neutral-600">
                {t("advantage2Desc")}
              </p>
            </div>
            <div className="rounded-lg bg-neutral-50 p-4">
              <p className="font-semibold text-sm text-neutral-900">
                {t("advantage3Title")}
              </p>
              <p className="mt-1 text-sm text-neutral-600">
                {t("advantage3Desc")}
              </p>
            </div>
            <div className="rounded-lg bg-neutral-50 p-4">
              <p className="font-semibold text-sm text-neutral-900">
                {t("advantage4Title")}
              </p>
              <p className="mt-1 text-sm text-neutral-600">
                {t("advantage4Desc")}
              </p>
            </div>
            <div className="rounded-lg bg-neutral-50 p-4">
              <p className="font-semibold text-sm text-neutral-900">
                {t("advantage5Title")}
              </p>
              <p className="mt-1 text-sm text-neutral-600">
                {t("advantage5Desc")}
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* Reflective micro-block */}
      <div className="mt-8 text-center max-w-2xl mx-auto">
        <p className="text-base font-medium text-neutral-900">
          {t("reflectionQuestion")}
        </p>
        <p className="mt-2 text-sm text-neutral-500">{t("reflectionNote")}</p>
      </div>{" "}
      {/* Conclusion */}
      <div className="mt-12 text-center max-w-3xl mx-auto">
        <p className="text-lg text-neutral-600">{t("conclusion")}</p>
      </div>
    </Section>
  );
}
