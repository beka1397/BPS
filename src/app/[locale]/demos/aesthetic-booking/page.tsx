"use client";

import { useTranslations, useLocale } from "next-intl";
import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";

/* ─── types & storage ─── */

interface Booking {
  id: string;
  service: string;
  date: string;
  time: string;
  name: string;
  email: string;
  phone: string;
  status: "confirmed" | "cancelled";
}

const STORAGE_KEY = "demo-aesthetic-bookings";

function loadBookings(): Booking[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  } catch {
    return [];
  }
}
function saveBookings(b: Booking[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(b));
}

const TIME_SLOTS = [
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
];

/* ═══════════════════════════════════════════════════════
   BOOKING FORM – warm / premium style
   ═══════════════════════════════════════════════════════ */

function BookingForm({
  t,
  onBook,
}: {
  t: ReturnType<typeof useTranslations>;
  onBook: () => void;
}) {
  const [step, setStep] = useState(0);
  const [service, setService] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [success, setSuccess] = useState(false);

  const services = [
    { key: "serviceFacial", label: t("serviceFacial") },
    { key: "serviceBotox", label: t("serviceBotox") },
    { key: "serviceLaser", label: t("serviceLaser") },
  ];

  const dates = Array.from({ length: 14 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i + 1);
    return d.toISOString().split("T")[0];
  });

  const handleConfirm = () => {
    const booking: Booking = {
      id: Date.now().toString(),
      service,
      date,
      time,
      name,
      email,
      phone,
      status: "confirmed",
    };
    saveBookings([...loadBookings(), booking]);
    setSuccess(true);
    onBook();
  };

  const reset = () => {
    setStep(0);
    setService("");
    setDate("");
    setTime("");
    setName("");
    setEmail("");
    setPhone("");
    setSuccess(false);
  };

  if (success) {
    return (
      <div className="rounded-2xl bg-white p-8 text-center shadow-sm">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50">
          <svg
            className="h-7 w-7 text-emerald-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-stone-900">
          {t("successTitle")}
        </h3>
        <p className="mt-2 text-sm text-stone-500">{t("successMessage")}</p>
        <div className="mt-5 rounded-xl bg-stone-50 p-4 text-left text-sm">
          <div>
            <span className="font-medium text-stone-700">
              {t("colService")}:
            </span>{" "}
            <span className="text-stone-600">{service}</span>
          </div>
          <div className="mt-1">
            <span className="font-medium text-stone-700">{t("colDate")}:</span>{" "}
            <span className="text-stone-600">{date}</span>
          </div>
          <div className="mt-1">
            <span className="font-medium text-stone-700">{t("colTime")}:</span>{" "}
            <span className="text-stone-600">{time}</span>
          </div>
        </div>
        <button
          onClick={reset}
          className="mt-6 rounded-full border border-stone-200 px-6 py-2.5 text-sm font-medium text-stone-700 transition-colors hover:bg-stone-50"
        >
          {t("bookAnother")}
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {/* step 0 — service */}
      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <h3 className="font-medium text-stone-800">{t("selectService")}</h3>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          {services.map((s) => (
            <button
              key={s.key}
              onClick={() => {
                setService(s.label);
                setStep(1);
              }}
              className={[
                "rounded-xl p-4 text-left text-sm font-medium transition-all",
                service === s.label
                  ? "bg-rose-600 text-white shadow-md shadow-rose-200"
                  : "bg-stone-50 text-stone-700 hover:bg-rose-50 hover:text-rose-700",
              ].join(" ")}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* step 1 — date */}
      {step >= 1 && (
        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <h3 className="font-medium text-stone-800">{t("selectDate")}</h3>
          <div className="mt-4 grid grid-cols-4 gap-2 sm:grid-cols-7">
            {dates.map((d) => (
              <button
                key={d}
                onClick={() => {
                  setDate(d);
                  setStep(2);
                }}
                className={[
                  "rounded-lg px-2 py-2.5 text-xs font-medium transition-all",
                  date === d
                    ? "bg-rose-600 text-white shadow-md shadow-rose-200"
                    : "bg-stone-50 text-stone-600 hover:bg-rose-50 hover:text-rose-700",
                ].join(" ")}
              >
                {new Date(d + "T12:00:00").toLocaleDateString(undefined, {
                  month: "short",
                  day: "numeric",
                })}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* step 2 — time */}
      {step >= 2 && (
        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <h3 className="font-medium text-stone-800">{t("selectTime")}</h3>
          <div className="mt-4 grid grid-cols-4 gap-2">
            {TIME_SLOTS.map((slot) => (
              <button
                key={slot}
                onClick={() => {
                  setTime(slot);
                  setStep(3);
                }}
                className={[
                  "rounded-lg px-3 py-2.5 text-sm font-medium transition-all",
                  time === slot
                    ? "bg-rose-600 text-white shadow-md shadow-rose-200"
                    : "bg-stone-50 text-stone-600 hover:bg-rose-50 hover:text-rose-700",
                ].join(" ")}
              >
                {slot}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* step 3 — details */}
      {step >= 3 && (
        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <h3 className="font-medium text-stone-800">{t("yourDetails")}</h3>
          <div className="mt-4 space-y-4">
            <div>
              <label className="block text-sm font-medium text-stone-600">
                {t("fieldName")}
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 w-full rounded-xl border-0 bg-stone-50 px-4 py-2.5 text-sm outline-none ring-1 ring-stone-200 transition-shadow focus:ring-2 focus:ring-rose-300"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-stone-600">
                {t("fieldEmail")}
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 w-full rounded-xl border-0 bg-stone-50 px-4 py-2.5 text-sm outline-none ring-1 ring-stone-200 transition-shadow focus:ring-2 focus:ring-rose-300"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-stone-600">
                {t("fieldPhone")}
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="mt-1 w-full rounded-xl border-0 bg-stone-50 px-4 py-2.5 text-sm outline-none ring-1 ring-stone-200 transition-shadow focus:ring-2 focus:ring-rose-300"
              />
            </div>
            <button
              onClick={handleConfirm}
              disabled={!name || !email || !phone}
              className="w-full rounded-full bg-rose-600 px-5 py-3 text-sm font-medium text-white shadow-md shadow-rose-200 transition-colors hover:bg-rose-700 disabled:opacity-40 disabled:shadow-none"
            >
              {t("confirmBooking")}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   ADMIN VIEW
   ═══════════════════════════════════════════════════════ */

function AdminView({
  t,
  bookings,
  onUpdate,
}: {
  t: ReturnType<typeof useTranslations>;
  bookings: Booking[];
  onUpdate: () => void;
}) {
  const handleCancel = (id: string) => {
    saveBookings(
      loadBookings().map((b) =>
        b.id === id ? { ...b, status: "cancelled" as const } : b,
      ),
    );
    onUpdate();
  };
  const handleDelete = (id: string) => {
    saveBookings(loadBookings().filter((b) => b.id !== id));
    onUpdate();
  };

  if (bookings.length === 0) {
    return (
      <div className="rounded-2xl bg-white p-8 text-center text-sm text-stone-400 shadow-sm">
        {t("adminEmpty")}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-stone-800">
        {t("adminTitle")}
      </h3>
      {/* Mobile cards */}
      <div className="space-y-3 md:hidden">
        {bookings.map((b) => (
          <div key={b.id} className="rounded-2xl bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <div className="font-medium text-stone-800">{b.name}</div>
                <div className="mt-1 text-sm text-stone-500">{b.service}</div>
                <div className="text-sm text-stone-400">
                  {b.date} · {b.time}
                </div>
              </div>
              <span
                className={[
                  "rounded-full px-2.5 py-0.5 text-xs font-medium",
                  b.status === "confirmed"
                    ? "bg-emerald-50 text-emerald-700"
                    : "bg-red-50 text-red-700",
                ].join(" ")}
              >
                {b.status === "confirmed"
                  ? t("statusConfirmed")
                  : t("statusCancelled")}
              </span>
            </div>
            <div className="mt-3 flex gap-2">
              {b.status === "confirmed" && (
                <button
                  onClick={() => handleCancel(b.id)}
                  className="rounded-full bg-stone-100 px-3.5 py-1.5 text-xs font-medium text-stone-600 hover:bg-stone-200"
                >
                  {t("actionCancel")}
                </button>
              )}
              <button
                onClick={() => handleDelete(b.id)}
                className="rounded-full bg-red-50 px-3.5 py-1.5 text-xs font-medium text-red-600 hover:bg-red-100"
              >
                {t("actionDelete")}
              </button>
            </div>
          </div>
        ))}
      </div>
      {/* Desktop table */}
      <div className="hidden overflow-x-auto md:block">
        <div className="rounded-2xl bg-white shadow-sm">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-stone-100 text-left text-stone-500">
                <th className="px-5 py-3.5 font-medium">{t("colDate")}</th>
                <th className="px-5 py-3.5 font-medium">{t("colTime")}</th>
                <th className="px-5 py-3.5 font-medium">{t("colService")}</th>
                <th className="px-5 py-3.5 font-medium">{t("colCustomer")}</th>
                <th className="px-5 py-3.5 font-medium">{t("colStatus")}</th>
                <th className="px-5 py-3.5 font-medium">{t("colActions")}</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((b) => (
                <tr
                  key={b.id}
                  className="border-b border-stone-50 last:border-0"
                >
                  <td className="px-5 py-3.5 text-stone-600">{b.date}</td>
                  <td className="px-5 py-3.5 text-stone-600">{b.time}</td>
                  <td className="px-5 py-3.5 text-stone-600">{b.service}</td>
                  <td className="px-5 py-3.5 text-stone-800">{b.name}</td>
                  <td className="px-5 py-3.5">
                    <span
                      className={[
                        "rounded-full px-2.5 py-0.5 text-xs font-medium",
                        b.status === "confirmed"
                          ? "bg-emerald-50 text-emerald-700"
                          : "bg-red-50 text-red-700",
                      ].join(" ")}
                    >
                      {b.status === "confirmed"
                        ? t("statusConfirmed")
                        : t("statusCancelled")}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex gap-2">
                      {b.status === "confirmed" && (
                        <button
                          onClick={() => handleCancel(b.id)}
                          className="rounded-full bg-stone-100 px-3 py-1 text-xs font-medium text-stone-600 hover:bg-stone-200"
                        >
                          {t("actionCancel")}
                        </button>
                      )}
                      <button
                        onClick={() => handleDelete(b.id)}
                        className="rounded-full bg-red-50 px-3 py-1 text-xs font-medium text-red-600 hover:bg-red-100"
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
   PAGE – Premium Aesthetic Clinic
   ═══════════════════════════════════════════════════════ */

export default function AestheticBookingPage() {
  const t = useTranslations("AestheticBooking");
  const locale = useLocale();

  const [showAdmin, setShowAdmin] = useState(false);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const initialized = useRef(false);

  const refresh = useCallback(() => {
    setBookings(loadBookings());
  }, []);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;
    queueMicrotask(() => refresh());
  }, [refresh]);

  const treatments = [
    {
      name: t("treatment1Name"),
      desc: t("treatment1Desc"),
      duration: t("treatment1Duration"),
    },
    {
      name: t("treatment2Name"),
      desc: t("treatment2Desc"),
      duration: t("treatment2Duration"),
    },
    {
      name: t("treatment3Name"),
      desc: t("treatment3Desc"),
      duration: t("treatment3Duration"),
    },
    {
      name: t("treatment4Name"),
      desc: t("treatment4Desc"),
      duration: t("treatment4Duration"),
    },
    {
      name: t("treatment5Name"),
      desc: t("treatment5Desc"),
      duration: t("treatment5Duration"),
    },
    {
      name: t("treatment6Name"),
      desc: t("treatment6Desc"),
      duration: t("treatment6Duration"),
    },
  ];

  const doctors = [
    { name: t("doctor1Name"), title: t("doctor1Title"), bio: t("doctor1Bio") },
    { name: t("doctor2Name"), title: t("doctor2Title"), bio: t("doctor2Bio") },
  ];

  const reviews = [
    { text: t("review1Text"), author: t("review1Author") },
    { text: t("review2Text"), author: t("review2Author") },
    { text: t("review3Text"), author: t("review3Author") },
  ];

  return (
    <div className="min-h-screen bg-stone-50">
      {/* ── Demo banner ── */}
      <div className="bg-rose-50 px-4 py-2 text-center text-xs font-medium text-rose-600">
        {t("banner")} ·{" "}
        <Link
          href={`/${locale}#demos`}
          className="underline hover:text-rose-800"
        >
          {t("backToPortfolio")}
        </Link>
      </div>

      {/* ── Header ── */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <div>
            <div className="text-xl font-semibold tracking-tight text-stone-800">
              {t("businessName")}
            </div>
            <div className="text-[11px] uppercase tracking-widest text-stone-400">
              {t("businessLocation")}
            </div>
          </div>
          <nav className="hidden items-center gap-8 text-[13px] font-medium text-stone-500 md:flex">
            <a
              href="#treatments"
              className="transition-colors hover:text-stone-800"
            >
              {t("navTreatments")}
            </a>
            <a
              href="#doctors"
              className="transition-colors hover:text-stone-800"
            >
              {t("navDoctors")}
            </a>
            <a
              href="#reviews"
              className="transition-colors hover:text-stone-800"
            >
              {t("navReviews")}
            </a>
            <a
              href="#contact"
              className="transition-colors hover:text-stone-800"
            >
              {t("navContact")}
            </a>
            <a
              href="#booking"
              className="rounded-full bg-rose-600 px-5 py-2.5 text-white shadow-md shadow-rose-200 transition-colors hover:bg-rose-700"
            >
              {t("navBooking")}
            </a>
          </nav>
          {/* Mobile CTA */}
          <a
            href="#booking"
            className="rounded-full bg-rose-600 px-5 py-2.5 text-[13px] font-medium text-white shadow-md shadow-rose-200 md:hidden"
          >
            {t("navBooking")}
          </a>
        </div>
      </header>

      {/* ── Hero ── */}
      <section className="bg-gradient-to-b from-rose-50/60 via-stone-50 to-stone-50 py-28">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-rose-500">
            Tbilisi
          </p>
          <h1 className="mt-4 text-4xl font-semibold leading-tight tracking-tight text-stone-900 sm:text-5xl">
            {t("heroTitle")}
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-stone-500">
            {t("heroSubtitle")}
          </p>
          <a
            href="#booking"
            className="mt-10 inline-flex rounded-full bg-rose-600 px-8 py-3.5 text-sm font-medium text-white shadow-lg shadow-rose-200 transition-all hover:bg-rose-700 hover:shadow-xl hover:shadow-rose-200"
          >
            {t("heroCta")}
          </a>
        </div>
      </section>

      {/* ── Treatments ── */}
      <section id="treatments" className="scroll-mt-20 py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-rose-500">
              {t("treatmentsTitle")}
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-stone-900">
              {t("treatmentsSubtitle")}
            </h2>
          </div>
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {treatments.map((tr) => (
              <div
                key={tr.name}
                className="group rounded-2xl bg-white p-7 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
              >
                <h3 className="font-semibold text-stone-800">{tr.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-stone-500">
                  {tr.desc}
                </p>
                <div className="mt-5 inline-flex rounded-full bg-rose-50 px-3.5 py-1 text-xs font-medium text-rose-600">
                  {tr.duration}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Doctors ── */}
      <section id="doctors" className="scroll-mt-20 py-24">
        <div className="mx-auto max-w-5xl px-6">
          <div className="text-center">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-rose-500">
              {t("doctorsTitle")}
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-stone-900">
              {t("doctorsSubtitle")}
            </h2>
          </div>
          <div className="mt-14 grid gap-6 sm:grid-cols-2">
            {doctors.map((doc) => (
              <div
                key={doc.name}
                className="flex gap-5 rounded-2xl bg-white p-6 shadow-sm"
              >
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-rose-100 to-rose-200 text-lg font-semibold text-rose-600">
                  {doc.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div>
                  <h3 className="font-semibold text-stone-800">{doc.name}</h3>
                  <div className="text-sm font-medium text-rose-500">
                    {doc.title}
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-stone-500">
                    {doc.bio}
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
          <div className="text-center">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-rose-500">
              {t("reviewsTitle")}
            </p>
          </div>
          <div className="mt-14 grid gap-6 sm:grid-cols-3">
            {reviews.map((rev) => (
              <div
                key={rev.author}
                className="rounded-2xl bg-white p-7 shadow-sm"
              >
                {/* stars */}
                <div className="flex gap-0.5 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="h-4 w-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="mt-4 text-sm leading-relaxed text-stone-600">
                  {rev.text}
                </p>
                <div className="mt-5 text-sm font-medium text-stone-800">
                  {rev.author}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Booking ── */}
      <section
        id="booking"
        className="scroll-mt-20 bg-gradient-to-b from-stone-50 to-rose-50/40 py-24"
      >
        <div className="mx-auto max-w-3xl px-6">
          <div className="text-center">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-rose-500">
              {t("bookingTitle")}
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-stone-900">
              {t("bookingSubtitle")}
            </h2>
          </div>
          <div className="mt-10">
            <BookingForm t={t} onBook={refresh} />
          </div>
        </div>
      </section>

      {/* ── Contact ── */}
      <section id="contact" className="scroll-mt-20 bg-white py-24">
        <div className="mx-auto max-w-5xl px-6">
          <div className="text-center">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-rose-500">
              {t("contactTitle")}
            </p>
          </div>
          <div className="mt-14 grid gap-10 sm:grid-cols-3">
            <div className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-rose-50">
                <svg
                  className="h-5 w-5 text-rose-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div className="mt-4 text-xs font-semibold uppercase tracking-wider text-stone-400">
                {t("contactHoursLabel")}
              </div>
              <div className="mt-1 text-sm text-stone-600">
                {t("contactHours")}
              </div>
            </div>
            <div className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-rose-50">
                <svg
                  className="h-5 w-5 text-rose-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
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
              <div className="mt-4 text-xs font-semibold uppercase tracking-wider text-stone-400">
                Address
              </div>
              <div className="mt-1 text-sm text-stone-600">
                {t("contactAddress")}
              </div>
            </div>
            <div className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-rose-50">
                <svg
                  className="h-5 w-5 text-rose-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                  />
                </svg>
              </div>
              <div className="mt-4 text-xs font-semibold uppercase tracking-wider text-stone-400">
                Contact
              </div>
              <div className="mt-1 text-sm text-stone-600">
                {t("contactPhone")}
              </div>
              <div className="text-sm text-stone-400">{t("contactEmail")}</div>
            </div>
          </div>
          <div className="mt-12 flex justify-center gap-3">
            <button className="rounded-full bg-rose-600 px-6 py-2.5 text-sm font-medium text-white shadow-md shadow-rose-200 transition-colors hover:bg-rose-700">
              {t("contactCallButton")}
            </button>
            <button className="rounded-full border border-stone-200 bg-white px-6 py-2.5 text-sm font-medium text-stone-700 transition-colors hover:bg-stone-50">
              {t("contactMessageButton")}
            </button>
          </div>
        </div>
      </section>

      {/* ── Admin Panel ── */}
      {showAdmin && (
        <section className="bg-stone-100 py-12">
          <div className="mx-auto max-w-4xl px-6">
            <AdminView t={t} bookings={bookings} onUpdate={refresh} />
          </div>
        </section>
      )}

      {/* ── Footer ── */}
      <footer className="bg-stone-900 py-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 text-sm sm:flex-row">
          <span className="text-stone-400">© 2026 {t("footerRights")}</span>
          <button
            onClick={() => setShowAdmin(!showAdmin)}
            className="text-xs text-stone-500 transition-colors hover:text-stone-300"
          >
            {t("footerStaffLink")}
          </button>
        </div>
      </footer>
    </div>
  );
}
