import { getRequestConfig } from "next-intl/server";

const locales = ["ka", "en"] as const;
type Locale = (typeof locales)[number];

function isLocale(value: unknown): value is Locale {
  return (
    typeof value === "string" && (locales as readonly string[]).includes(value)
  );
}

export default getRequestConfig(async ({ requestLocale }) => {
  // En next-intl v4+, requestLocale es una Promise
  const locale = await requestLocale;
  const safeLocale: Locale = isLocale(locale) ? locale : "ka";

  return {
    locale: safeLocale,
    messages: (await import(`../../messages/${safeLocale}.json`)).default,
  };
});
