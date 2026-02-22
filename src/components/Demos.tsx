import { useTranslations } from "next-intl";
import { Section } from "./Section";

function DemoCard({
  title,
  desc,
  tags,
}: {
  title: string;
  desc: string;
  tags: string[];
}) {
  return (
    <div className="rounded-2xl border border-neutral-200 p-6">
      <div className="text-lg font-medium">{title}</div>
      <p className="mt-2 text-sm text-neutral-600">{desc}</p>

      <div className="mt-4 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-neutral-100 px-3 py-1 text-xs text-neutral-700"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

export function Demos() {
  const t = useTranslations("Demos");

  return (
    <Section id="demos">
      <h2 className="text-2xl font-semibold tracking-tight">{t("title")}</h2>
      <p className="mt-2 text-neutral-600">{t("subtitle")}</p>

      <div className="mt-8 grid gap-6 md:grid-cols-3">
        <DemoCard
          title={t("demo1Title")}
          desc={t("demo1Desc")}
          tags={[t("demo1Tag1"), t("demo1Tag2"), t("demo1Tag3")]}
        />
        <DemoCard
          title={t("demo2Title")}
          desc={t("demo2Desc")}
          tags={[t("demo2Tag1"), t("demo2Tag2"), t("demo2Tag3")]}
        />
        <DemoCard
          title={t("demo3Title")}
          desc={t("demo3Desc")}
          tags={[t("demo3Tag1"), t("demo3Tag2"), t("demo3Tag3")]}
        />
      </div>
    </Section>
  );
}
