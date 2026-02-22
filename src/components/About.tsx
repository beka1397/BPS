import { useTranslations } from "next-intl";
import { Section } from "./Section";

export function About() {
  const t = useTranslations("About");

  return (
    <Section id="about">
      <h2 className="text-2xl font-semibold tracking-tight">{t("title")}</h2>

      <p className="mt-4 max-w-3xl text-neutral-600">{t("p1")}</p>

      <p className="mt-4 max-w-3xl text-neutral-600">{t("p2")}</p>

      <p className="mt-4 max-w-3xl text-neutral-600">{t("p3")}</p>

      <p className="mt-4 max-w-3xl text-neutral-600">{t("p4")}</p>
    </Section>
  );
}
