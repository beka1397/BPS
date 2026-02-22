"use client";

import { useTranslations, useLocale } from "next-intl";
import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";

/* ─── types & storage ─── */

interface QuoteRequest {
  id: string;
  name: string;
  service: string;
  area: string;
  urgency: string;
  budget: string;
  phone: string;
  email: string;
  status: "new" | "contacted";
}

const STORAGE_KEY = "demo-quote-requests";

function loadRequests(): QuoteRequest[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  } catch {
    return [];
  }
}
function saveRequests(r: QuoteRequest[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(r));
}

/* ═══════════════════════════════════════════════════════
   QUOTE FORM – bold industrial style
   ═══════════════════════════════════════════════════════ */

function QuoteForm({
  t,
  onSubmit,
}: {
  t: ReturnType<typeof useTranslations>;
  onSubmit: () => void;
}) {
  const [name, setName] = useState("");
  const [service, setService] = useState("");
  const [area, setArea] = useState("");
  const [urgency, setUrgency] = useState("");
  const [budget, setBudget] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);

  const services = [
    { value: "renovation", label: t("serviceRenovation") },
    { value: "plumbing", label: t("servicePlumbing") },
    { value: "electrical", label: t("serviceElectrical") },
    { value: "painting", label: t("servicePainting") },
  ];

  const urgencies = [
    { value: "this-week", label: t("urgencyThisWeek") },
    { value: "this-month", label: t("urgencyThisMonth") },
    { value: "flexible", label: t("urgencyFlexible") },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const selectedService = services.find((s) => s.value === service);
    const selectedUrgency = urgencies.find((u) => u.value === urgency);
    const request: QuoteRequest = {
      id: Date.now().toString(),
      name,
      service: selectedService?.label || service,
      area,
      urgency: selectedUrgency?.label || urgency,
      budget,
      phone,
      email,
      status: "new",
    };
    saveRequests([...loadRequests(), request]);
    setSuccess(true);
    onSubmit();
  };

  const reset = () => {
    setName("");
    setService("");
    setArea("");
    setUrgency("");
    setBudget("");
    setPhone("");
    setEmail("");
    setSuccess(false);
  };

  if (success) {
    return (
      <div className="bg-slate-800 p-8 text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-sm bg-amber-400">
          <svg
            className="h-7 w-7 text-slate-900"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h3 className="text-lg font-bold text-white">{t("successTitle")}</h3>
        <p className="mt-2 text-sm text-slate-400">{t("successMessage")}</p>
        <button
          onClick={reset}
          className="mt-6 border-2 border-amber-400 px-6 py-2.5 text-sm font-bold uppercase tracking-wider text-amber-400 transition-colors hover:bg-amber-400 hover:text-slate-900"
        >
          {t("submitAnother")}
        </button>
      </div>
    );
  }

  const inputClass =
    "mt-1 w-full border-0 border-b-2 border-slate-600 bg-transparent px-0 py-2.5 text-sm text-white outline-none transition-colors placeholder:text-slate-500 focus:border-amber-400";
  const labelClass =
    "block text-xs font-bold uppercase tracking-wider text-slate-400";

  return (
    <div className="bg-slate-800 p-6 sm:p-8">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label className={labelClass}>{t("fieldName")}</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>{t("fieldEmail")}</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={inputClass}
            />
          </div>
        </div>
        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label className={labelClass}>{t("fieldService")}</label>
            <select
              required
              value={service}
              onChange={(e) => setService(e.target.value)}
              className={`${inputClass} cursor-pointer`}
            >
              <option value="" disabled className="bg-slate-800"></option>
              {services.map((s) => (
                <option key={s.value} value={s.value} className="bg-slate-800">
                  {s.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className={labelClass}>{t("fieldArea")}</label>
            <input
              type="number"
              required
              value={area}
              onChange={(e) => setArea(e.target.value)}
              className={inputClass}
            />
          </div>
        </div>
        <div className="grid gap-6 sm:grid-cols-3">
          <div>
            <label className={labelClass}>{t("fieldUrgency")}</label>
            <select
              required
              value={urgency}
              onChange={(e) => setUrgency(e.target.value)}
              className={`${inputClass} cursor-pointer`}
            >
              <option value="" disabled className="bg-slate-800"></option>
              {urgencies.map((u) => (
                <option key={u.value} value={u.value} className="bg-slate-800">
                  {u.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className={labelClass}>{t("fieldBudget")}</label>
            <input
              type="text"
              required
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>{t("fieldPhone")}</label>
            <input
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className={inputClass}
            />
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-amber-400 py-4 text-sm font-bold uppercase tracking-widest text-slate-900 transition-colors hover:bg-amber-300"
        >
          {t("submitButton")}
        </button>
      </form>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   ADMIN VIEW
   ═══════════════════════════════════════════════════════ */

function AdminView({
  t,
  requests,
  onUpdate,
}: {
  t: ReturnType<typeof useTranslations>;
  requests: QuoteRequest[];
  onUpdate: () => void;
}) {
  const handleContact = (id: string) => {
    saveRequests(
      loadRequests().map((r) =>
        r.id === id ? { ...r, status: "contacted" as const } : r,
      ),
    );
    onUpdate();
  };
  const handleDelete = (id: string) => {
    saveRequests(loadRequests().filter((r) => r.id !== id));
    onUpdate();
  };

  if (requests.length === 0) {
    return (
      <div className="bg-slate-800 p-8 text-center text-sm text-slate-500">
        {t("adminEmpty")}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-bold uppercase tracking-wider text-slate-200">
        {t("adminTitle")}
      </h3>
      {/* Mobile cards */}
      <div className="space-y-3 md:hidden">
        {requests.map((r) => (
          <div
            key={r.id}
            className="border-l-4 border-amber-400 bg-slate-800 p-5"
          >
            <div className="flex items-start justify-between">
              <div>
                <div className="font-bold text-white">{r.name}</div>
                <div className="mt-1 text-sm text-slate-400">
                  {r.service} · {r.area} sqm
                </div>
                <div className="text-sm text-slate-500">
                  {r.budget} · {r.urgency}
                </div>
              </div>
              <span
                className={[
                  "px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider",
                  r.status === "new"
                    ? "bg-amber-400/20 text-amber-400"
                    : "bg-emerald-400/20 text-emerald-400",
                ].join(" ")}
              >
                {r.status === "new" ? t("statusNew") : t("statusContacted")}
              </span>
            </div>
            <div className="mt-3 flex gap-2">
              {r.status === "new" && (
                <button
                  onClick={() => handleContact(r.id)}
                  className="border border-slate-600 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-slate-300 hover:border-amber-400 hover:text-amber-400"
                >
                  {t("actionContact")}
                </button>
              )}
              <button
                onClick={() => handleDelete(r.id)}
                className="border border-red-800 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-red-400 hover:bg-red-900/30"
              >
                {t("actionDelete")}
              </button>
            </div>
          </div>
        ))}
      </div>
      {/* Desktop table */}
      <div className="hidden overflow-x-auto md:block">
        <div className="bg-slate-800">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-700 text-left">
                <th className="px-5 py-3.5 text-xs font-bold uppercase tracking-wider text-slate-400">
                  {t("colName")}
                </th>
                <th className="px-5 py-3.5 text-xs font-bold uppercase tracking-wider text-slate-400">
                  {t("colService")}
                </th>
                <th className="px-5 py-3.5 text-xs font-bold uppercase tracking-wider text-slate-400">
                  {t("colArea")}
                </th>
                <th className="px-5 py-3.5 text-xs font-bold uppercase tracking-wider text-slate-400">
                  {t("colBudget")}
                </th>
                <th className="px-5 py-3.5 text-xs font-bold uppercase tracking-wider text-slate-400">
                  {t("colUrgency")}
                </th>
                <th className="px-5 py-3.5 text-xs font-bold uppercase tracking-wider text-slate-400">
                  {t("colStatus")}
                </th>
                <th className="px-5 py-3.5 text-xs font-bold uppercase tracking-wider text-slate-400">
                  {t("colActions")}
                </th>
              </tr>
            </thead>
            <tbody>
              {requests.map((r) => (
                <tr
                  key={r.id}
                  className="border-b border-slate-700/50 last:border-0"
                >
                  <td className="px-5 py-3.5 font-medium text-white">
                    {r.name}
                  </td>
                  <td className="px-5 py-3.5 text-slate-300">{r.service}</td>
                  <td className="px-5 py-3.5 text-slate-300">{r.area} sqm</td>
                  <td className="px-5 py-3.5 text-slate-300">{r.budget}</td>
                  <td className="px-5 py-3.5 text-slate-300">{r.urgency}</td>
                  <td className="px-5 py-3.5">
                    <span
                      className={[
                        "px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider",
                        r.status === "new"
                          ? "bg-amber-400/20 text-amber-400"
                          : "bg-emerald-400/20 text-emerald-400",
                      ].join(" ")}
                    >
                      {r.status === "new"
                        ? t("statusNew")
                        : t("statusContacted")}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex gap-2">
                      {r.status === "new" && (
                        <button
                          onClick={() => handleContact(r.id)}
                          className="border border-slate-600 px-3 py-1 text-xs font-bold uppercase tracking-wider text-slate-300 hover:border-amber-400 hover:text-amber-400"
                        >
                          {t("actionContact")}
                        </button>
                      )}
                      <button
                        onClick={() => handleDelete(r.id)}
                        className="border border-red-800 px-3 py-1 text-xs font-bold uppercase tracking-wider text-red-400 hover:bg-red-900/30"
                      >
                        {t("actionDelete")}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   PAGE – Bold Industrial Renovation Website
   ═══════════════════════════════════════════════════════ */

export default function RequestQuotePage() {
  const t = useTranslations("RequestQuote");
  const locale = useLocale();

  const [showAdmin, setShowAdmin] = useState(false);
  const [requests, setRequests] = useState<QuoteRequest[]>([]);
  const initialized = useRef(false);

  const refresh = useCallback(() => {
    setRequests(loadRequests());
  }, []);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;
    queueMicrotask(() => refresh());
  }, [refresh]);

  const serviceCards = [
    { num: "01", name: t("service1Name"), desc: t("service1Desc") },
    { num: "02", name: t("service2Name"), desc: t("service2Desc") },
    { num: "03", name: t("service3Name"), desc: t("service3Desc") },
    { num: "04", name: t("service4Name"), desc: t("service4Desc") },
  ];

  const steps = [
    { num: "1", title: t("step1Title"), desc: t("step1Desc") },
    { num: "2", title: t("step2Title"), desc: t("step2Desc") },
    { num: "3", title: t("step3Title"), desc: t("step3Desc") },
  ];

  const reviews = [
    { text: t("review1Text"), author: t("review1Author") },
    { text: t("review2Text"), author: t("review2Author") },
    { text: t("review3Text"), author: t("review3Author") },
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200">
      {/* ── Demo banner ── */}
      <div className="bg-amber-400 px-4 py-2 text-center text-xs font-bold uppercase tracking-wider text-slate-900">
        {t("banner")} ·{" "}
        <Link
          href={`/${locale}#demos`}
          className="underline hover:text-slate-700"
        >
          {t("backToPortfolio")}
        </Link>
      </div>

      {/* ── Header ── */}
      <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-900/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="h-8 w-1.5 bg-amber-400" />
            <div>
              <div className="text-lg font-bold tracking-tight text-white">
                {t("businessName")}
              </div>
              <div className="text-[11px] uppercase tracking-widest text-slate-500">
                {t("businessArea")}
              </div>
            </div>
          </div>
          <nav className="hidden items-center gap-7 text-[13px] font-medium text-slate-400 md:flex">
            <a
              href="#services"
              className="transition-colors hover:text-amber-400"
            >
              {t("navServices")}
            </a>
            <a
              href="#process"
              className="transition-colors hover:text-amber-400"
            >
              {t("navProcess")}
            </a>
            <a
              href="#reviews"
              className="transition-colors hover:text-amber-400"
            >
              {t("navReviews")}
            </a>
            <a
              href="#contact"
              className="transition-colors hover:text-amber-400"
            >
              {t("navContact")}
            </a>
            <a
              href="#quote"
              className="bg-amber-400 px-5 py-2.5 text-[13px] font-bold uppercase tracking-wider text-slate-900 transition-colors hover:bg-amber-300"
            >
              {t("navQuote")}
            </a>
          </nav>
          {/* Mobile CTA */}
          <a
            href="#quote"
            className="bg-amber-400 px-4 py-2 text-[13px] font-bold uppercase tracking-wider text-slate-900 md:hidden"
          >
            {t("navQuote")}
          </a>
        </div>
      </header>

      {/* ── Hero ── */}
      <section className="relative overflow-hidden border-b border-slate-800 py-28">
        {/* Decorative grid lines */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.03]">
          <div
            className="h-full w-full"
            style={{
              backgroundImage:
                "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />
        </div>
        <div className="relative mx-auto max-w-6xl px-6">
          <div className="max-w-2xl">
            <div className="mb-6 h-1 w-16 bg-amber-400" />
            <h1 className="text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
              {t("heroTitle")}
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-slate-400">
              {t("heroSubtitle")}
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href="#quote"
                className="bg-amber-400 px-8 py-4 text-sm font-bold uppercase tracking-widest text-slate-900 transition-colors hover:bg-amber-300"
              >
                {t("heroCta")}
              </a>
              <a
                href="#services"
                className="border-2 border-slate-600 px-8 py-4 text-sm font-bold uppercase tracking-widest text-slate-300 transition-colors hover:border-slate-400 hover:text-white"
              >
                {t("navServices")}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Services ── */}
      <section id="services" className="scroll-mt-20 py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex items-center gap-4">
            <div className="h-1 w-10 bg-amber-400" />
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-400">
              {t("servicesTitle")}
            </p>
          </div>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-white">
            {t("servicesSubtitle")}
          </h2>
          <div className="mt-14 grid gap-0 sm:grid-cols-2 lg:grid-cols-4">
            {serviceCards.map((svc) => (
              <div
                key={svc.num}
                className="group border border-slate-800 p-7 transition-colors hover:bg-slate-800/60"
              >
                <div className="text-3xl font-bold text-slate-700 transition-colors group-hover:text-amber-400">
                  {svc.num}
                </div>
                <h3 className="mt-4 font-bold text-white">{svc.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">
                  {svc.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Process ── */}
      <section
        id="process"
        className="scroll-mt-20 border-y border-slate-800 bg-slate-800/30 py-24"
      >
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex items-center gap-4">
            <div className="h-1 w-10 bg-amber-400" />
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-400">
              {t("processTitle")}
            </p>
          </div>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-white">
            {t("processSubtitle")}
          </h2>
          <div className="mt-14 grid gap-0 sm:grid-cols-3">
            {steps.map((s, i) => (
              <div key={s.num} className="relative p-8">
                {/* connector line */}
                {i < steps.length - 1 && (
                  <div className="absolute right-0 top-1/2 hidden h-px w-full bg-gradient-to-r from-transparent via-slate-700 to-transparent sm:block" />
                )}
                <div className="relative">
                  <div className="flex h-12 w-12 items-center justify-center bg-amber-400 text-lg font-bold text-slate-900">
                    {s.num}
                  </div>
                  <h3 className="mt-5 font-bold text-white">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-400">
                    {s.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Reviews ── */}
      <section id="reviews" className="scroll-mt-20 py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex items-center gap-4">
            <div className="h-1 w-10 bg-amber-400" />
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-400">
              {t("reviewsTitle")}
            </p>
          </div>
          <div className="mt-14 grid gap-6 sm:grid-cols-3">
            {reviews.map((rev) => (
              <div
                key={rev.author}
                className="border-l-4 border-amber-400 bg-slate-800/50 p-7"
              >
                <svg
                  className="h-8 w-8 text-amber-400/30"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
                <p className="mt-4 text-sm leading-relaxed text-slate-300">
                  {rev.text}
                </p>
                <div className="mt-5 flex items-center gap-2">
                  <div className="h-px w-4 bg-amber-400" />
                  <span className="text-sm font-bold text-white">
                    {rev.author}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Quote Form ── */}
      <section
        id="quote"
        className="scroll-mt-20 border-y border-slate-800 py-24"
      >
        <div className="mx-auto max-w-3xl px-6">
          <div className="flex items-center gap-4">
            <div className="h-1 w-10 bg-amber-400" />
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-400">
              {t("quoteTitle")}
            </p>
          </div>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-white">
            {t("quoteSubtitle")}
          </h2>
          <div className="mt-10">
            <QuoteForm t={t} onSubmit={refresh} />
          </div>
        </div>
      </section>

      {/* ── Contact ── */}
      <section id="contact" className="scroll-mt-20 py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex items-center gap-4">
            <div className="h-1 w-10 bg-amber-400" />
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-400">
              {t("contactTitle")}
            </p>
          </div>
          <div className="mt-14 grid gap-10 sm:grid-cols-2">
            <div className="space-y-8">
              <div className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center bg-amber-400">
                  <svg
                    className="h-5 w-5 text-slate-900"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    {t("contactHoursLabel")}
                  </div>
                  <div className="mt-1 text-sm text-slate-300">
                    {t("contactHours")}
                  </div>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center bg-amber-400">
                  <svg
                    className="h-5 w-5 text-slate-900"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                    />
                  </svg>
                </div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    {t("contactAreaLabel")}
                  </div>
                  <div className="mt-1 text-sm text-slate-300">
                    {t("contactAreaValue")}
                  </div>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center bg-amber-400">
                  <svg
                    className="h-5 w-5 text-slate-900"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                    />
                  </svg>
                </div>
                <div>
                  <div className="mt-1 text-sm text-slate-300">
                    {t("contactPhone")}
                  </div>
                  <div className="text-sm text-slate-500">
                    {t("contactEmail")}
                  </div>
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <button className="bg-amber-400 px-5 py-2.5 text-sm font-bold uppercase tracking-wider text-slate-900 transition-colors hover:bg-amber-300">
                  {t("contactCallButton")}
                </button>
                <button className="border-2 border-slate-600 px-5 py-2.5 text-sm font-bold uppercase tracking-wider text-slate-300 transition-colors hover:border-slate-400 hover:text-white">
                  {t("contactMessageButton")}
                </button>
              </div>
            </div>
            <div className="flex items-center justify-center border border-slate-800 bg-slate-800/40 p-10">
              <span className="text-sm text-slate-600">
                {t("contactMapPlaceholder")}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Admin Panel ── */}
      {showAdmin && (
        <section className="border-t border-slate-800 bg-slate-900 py-12">
          <div className="mx-auto max-w-4xl px-6">
            <AdminView t={t} requests={requests} onUpdate={refresh} />
          </div>
        </section>
      )}

      {/* ── Footer ── */}
      <footer className="border-t border-slate-800 bg-slate-950 py-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 text-sm sm:flex-row">
          <div className="flex items-center gap-3">
            <div className="h-5 w-1 bg-amber-400" />
            <span className="text-slate-500">© 2026 {t("footerRights")}</span>
          </div>
          <button
            onClick={() => setShowAdmin(!showAdmin)}
            className="text-xs text-slate-600 transition-colors hover:text-amber-400"
          >
            {t("footerStaffLink")}
          </button>
        </div>
      </footer>
    </div>
  );
}
