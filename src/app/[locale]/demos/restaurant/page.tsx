"use client";

import { useTranslations, useLocale } from "next-intl";
import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";

/* ─── types & storage ─── */

interface Reservation {
  id: string;
  name: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  seating: string;
  notes: string;
  status: "new" | "confirmed" | "cancelled";
}

const STORAGE_KEY = "demo-restaurant-reservations";
const MAX_GUESTS_PER_SLOT = 20;

function loadReservations(): Reservation[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  } catch {
    return [];
  }
}
function saveReservations(r: Reservation[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(r));
}

const TIME_SLOTS = [
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "18:00",
  "19:00",
  "20:00",
  "21:00",
  "22:00",
];

/* ═══════════════════════════════════════════════════════
   MENU SECTION
   ═══════════════════════════════════════════════════════ */

type MenuCategory =
  | "all"
  | "starters"
  | "mains"
  | "salads"
  | "desserts"
  | "drinks";

interface MenuItem {
  name: string;
  desc: string;
  price: string;
  category: MenuCategory;
  badge?: string;
}

function MenuSection({ t }: { t: ReturnType<typeof useTranslations> }) {
  const [active, setActive] = useState<MenuCategory>("all");

  const categories: { key: MenuCategory; label: string }[] = [
    { key: "all", label: t("catAll") },
    { key: "starters", label: t("catStarters") },
    { key: "mains", label: t("catMains") },
    { key: "salads", label: t("catSalads") },
    { key: "desserts", label: t("catDesserts") },
    { key: "drinks", label: t("catDrinks") },
  ];

  const items: MenuItem[] = [
    // starters
    {
      name: t("menuItem1Name"),
      desc: t("menuItem1Desc"),
      price: t("menuItem1Price"),
      category: "starters",
    },
    {
      name: t("menuItem2Name"),
      desc: t("menuItem2Desc"),
      price: t("menuItem2Price"),
      category: "starters",
      badge: t("menuItem2Badge"),
    },
    {
      name: t("menuItem3Name"),
      desc: t("menuItem3Desc"),
      price: t("menuItem3Price"),
      category: "starters",
    },
    // mains
    {
      name: t("menuItem4Name"),
      desc: t("menuItem4Desc"),
      price: t("menuItem4Price"),
      category: "mains",
    },
    {
      name: t("menuItem5Name"),
      desc: t("menuItem5Desc"),
      price: t("menuItem5Price"),
      category: "mains",
      badge: t("menuItem5Badge"),
    },
    {
      name: t("menuItem6Name"),
      desc: t("menuItem6Desc"),
      price: t("menuItem6Price"),
      category: "mains",
      badge: t("menuItem6Badge"),
    },
    {
      name: t("menuItem7Name"),
      desc: t("menuItem7Desc"),
      price: t("menuItem7Price"),
      category: "mains",
    },
    // salads
    {
      name: t("menuItem8Name"),
      desc: t("menuItem8Desc"),
      price: t("menuItem8Price"),
      category: "salads",
      badge: t("menuItem8Badge"),
    },
    {
      name: t("menuItem9Name"),
      desc: t("menuItem9Desc"),
      price: t("menuItem9Price"),
      category: "salads",
    },
    // desserts
    {
      name: t("menuItem10Name"),
      desc: t("menuItem10Desc"),
      price: t("menuItem10Price"),
      category: "desserts",
    },
    {
      name: t("menuItem11Name"),
      desc: t("menuItem11Desc"),
      price: t("menuItem11Price"),
      category: "desserts",
      badge: t("menuItem11Badge"),
    },
    // drinks
    {
      name: t("menuItem12Name"),
      desc: t("menuItem12Desc"),
      price: t("menuItem12Price"),
      category: "drinks",
    },
    {
      name: t("menuItem13Name"),
      desc: t("menuItem13Desc"),
      price: t("menuItem13Price"),
      category: "drinks",
    },
    {
      name: t("menuItem14Name"),
      desc: t("menuItem14Desc"),
      price: t("menuItem14Price"),
      category: "drinks",
    },
    {
      name: t("menuItem15Name"),
      desc: t("menuItem15Desc"),
      price: t("menuItem15Price"),
      category: "drinks",
    },
  ];

  const filtered =
    active === "all" ? items : items.filter((i) => i.category === active);

  const currency = t("currencySymbol");

  return (
    <>
      {/* category tabs */}
      <div className="flex flex-wrap gap-2">
        {categories.map((c) => (
          <button
            key={c.key}
            onClick={() => setActive(c.key)}
            className={[
              "rounded-full px-4 py-2 text-sm font-medium transition-all",
              active === c.key
                ? "bg-emerald-700 text-white"
                : "bg-emerald-50 text-emerald-800 hover:bg-emerald-100",
            ].join(" ")}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* items grid */}
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((item) => (
          <div
            key={item.name}
            className="group flex flex-col justify-between rounded-xl border border-stone-200 bg-white p-5 transition-shadow hover:shadow-md"
          >
            <div>
              <div className="flex items-start justify-between gap-3">
                <h3 className="font-semibold text-stone-800">{item.name}</h3>
                <span className="shrink-0 text-lg font-bold text-emerald-700">
                  {item.price}{" "}
                  <span className="text-xs font-medium text-stone-400">
                    {currency}
                  </span>
                </span>
              </div>
              {item.desc && (
                <p className="mt-1.5 text-sm leading-relaxed text-stone-500">
                  {item.desc}
                </p>
              )}
            </div>
            {item.badge && (
              <div className="mt-3">
                <span
                  className={[
                    "inline-flex rounded-full px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider",
                    item.badge === "Popular"
                      ? "bg-amber-50 text-amber-700"
                      : "bg-emerald-50 text-emerald-700",
                  ].join(" ")}
                >
                  {item.badge}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
}

/* ═══════════════════════════════════════════════════════
   RESERVATION FORM
   ═══════════════════════════════════════════════════════ */

function ReservationForm({
  t,
  onSubmit,
}: {
  t: ReturnType<typeof useTranslations>;
  onSubmit: () => void;
}) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [guests, setGuests] = useState("2");
  const [seating, setSeating] = useState("no-preference");
  const [notes, setNotes] = useState("");
  const [success, setSuccess] = useState(false);
  const [slotWarning, setSlotWarning] = useState("");

  const dates = Array.from({ length: 14 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i);
    return d.toISOString().split("T")[0];
  });

  const seatingOptions = [
    { value: "indoors", label: t("seatingIndoors") },
    { value: "terrace", label: t("seatingTerrace") },
    { value: "no-preference", label: t("seatingNoPreference") },
  ];

  // Simple availability check
  useEffect(() => {
    if (!date || !time) {
      setSlotWarning("");
      return;
    }
    const existing = loadReservations().filter(
      (r) => r.date === date && r.time === time && r.status !== "cancelled",
    );
    const totalGuests = existing.reduce((sum, r) => sum + r.guests, 0);
    if (totalGuests + parseInt(guests) > MAX_GUESTS_PER_SLOT) {
      setSlotWarning("Limited availability for this time slot.");
    } else {
      setSlotWarning("");
    }
  }, [date, time, guests]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const selectedSeating = seatingOptions.find((s) => s.value === seating);
    const reservation: Reservation = {
      id: Date.now().toString(),
      name,
      phone,
      date,
      time,
      guests: parseInt(guests),
      seating: selectedSeating?.label || seating,
      notes,
      status: "new",
    };
    saveReservations([...loadReservations(), reservation]);
    setSuccess(true);
    onSubmit();
  };

  const reset = () => {
    setName("");
    setPhone("");
    setDate("");
    setTime("");
    setGuests("2");
    setSeating("no-preference");
    setNotes("");
    setSuccess(false);
  };

  if (success) {
    return (
      <div className="rounded-xl border border-stone-200 bg-white p-8 text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50">
          <svg
            className="h-7 w-7 text-emerald-600"
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
        <h3 className="text-lg font-semibold text-stone-800">
          {t("successTitle")}
        </h3>
        <p className="mt-2 text-sm text-stone-500">{t("successMessage")}</p>
        <button
          onClick={reset}
          className="mt-6 rounded-lg border border-stone-200 px-5 py-2.5 text-sm font-medium text-stone-700 transition-colors hover:bg-stone-50"
        >
          {t("reserveAnother")}
        </button>
      </div>
    );
  }

  const inputClass =
    "mt-1 w-full rounded-lg border border-stone-200 bg-stone-50 px-3.5 py-2.5 text-sm text-stone-800 outline-none transition-all focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100";
  const labelClass = "block text-sm font-medium text-stone-600";

  return (
    <div className="rounded-xl border border-stone-200 bg-white p-6">
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid gap-5 sm:grid-cols-2">
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
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className={labelClass}>{t("fieldDate")}</label>
            <select
              required
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className={`${inputClass} cursor-pointer`}
            >
              <option value="" disabled />
              {dates.map((d) => (
                <option key={d} value={d}>
                  {new Date(d + "T12:00:00").toLocaleDateString(undefined, {
                    weekday: "short",
                    month: "short",
                    day: "numeric",
                  })}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className={labelClass}>{t("fieldTime")}</label>
            <select
              required
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className={`${inputClass} cursor-pointer`}
            >
              <option value="" disabled />
              {TIME_SLOTS.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
        </div>
        {slotWarning && (
          <p className="text-xs font-medium text-amber-600">{slotWarning}</p>
        )}
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className={labelClass}>{t("fieldGuests")}</label>
            <select
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
              className={`${inputClass} cursor-pointer`}
            >
              {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className={labelClass}>{t("fieldSeating")}</label>
            <select
              value={seating}
              onChange={(e) => setSeating(e.target.value)}
              className={`${inputClass} cursor-pointer`}
            >
              {seatingOptions.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div>
          <label className={labelClass}>{t("fieldNotes")}</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={3}
            className={`${inputClass} resize-none`}
          />
        </div>
        <button
          type="submit"
          className="w-full rounded-lg bg-emerald-700 px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-emerald-800"
        >
          {t("submitReservation")}
        </button>
      </form>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   ADMIN VIEW
   ═══════════════════════════════════════════════════════ */

type AdminFilter = "today" | "week" | "all";

function AdminView({
  t,
  reservations,
  onUpdate,
}: {
  t: ReturnType<typeof useTranslations>;
  reservations: Reservation[];
  onUpdate: () => void;
}) {
  const [filter, setFilter] = useState<AdminFilter>("all");

  const handleConfirm = (id: string) => {
    saveReservations(
      loadReservations().map((r) =>
        r.id === id ? { ...r, status: "confirmed" as const } : r,
      ),
    );
    onUpdate();
  };
  const handleCancel = (id: string) => {
    saveReservations(
      loadReservations().map((r) =>
        r.id === id ? { ...r, status: "cancelled" as const } : r,
      ),
    );
    onUpdate();
  };
  const handleDelete = (id: string) => {
    saveReservations(loadReservations().filter((r) => r.id !== id));
    onUpdate();
  };

  const today = new Date().toISOString().split("T")[0];
  const weekEnd = (() => {
    const d = new Date();
    d.setDate(d.getDate() + 7);
    return d.toISOString().split("T")[0];
  })();

  const filtered = reservations.filter((r) => {
    if (filter === "today") return r.date === today;
    if (filter === "week") return r.date >= today && r.date <= weekEnd;
    return true;
  });

  const filters: { key: AdminFilter; label: string }[] = [
    { key: "today", label: t("filterToday") },
    { key: "week", label: t("filterWeek") },
    { key: "all", label: t("filterAll") },
  ];

  const statusColor = (s: string) => {
    if (s === "confirmed") return "bg-emerald-50 text-emerald-700";
    if (s === "cancelled") return "bg-red-50 text-red-700";
    return "bg-amber-50 text-amber-700";
  };
  const statusLabel = (s: string) => {
    if (s === "confirmed") return t("statusConfirmed");
    if (s === "cancelled") return t("statusCancelled");
    return t("statusNew");
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h3 className="text-lg font-semibold text-stone-800">
          {t("adminTitle")}
        </h3>
        <div className="flex gap-2">
          {filters.map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={[
                "rounded-lg px-3.5 py-1.5 text-xs font-medium transition-colors",
                filter === f.key
                  ? "bg-emerald-700 text-white"
                  : "bg-stone-100 text-stone-600 hover:bg-stone-200",
              ].join(" ")}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <p className="text-xs text-stone-400">{t("adminNote")}</p>

      {filtered.length === 0 ? (
        <div className="rounded-xl border border-stone-200 bg-white p-8 text-center text-sm text-stone-400">
          {t("adminEmpty")}
        </div>
      ) : (
        <>
          {/* Mobile cards */}
          <div className="space-y-3 md:hidden">
            {filtered.map((r) => (
              <div
                key={r.id}
                className="rounded-xl border border-stone-200 bg-white p-5"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="font-semibold text-stone-800">{r.name}</div>
                    <div className="mt-1 text-sm text-stone-500">
                      {r.date} · {r.time} · {r.guests}{" "}
                      {r.guests === 1 ? "guest" : "guests"}
                    </div>
                    <div className="text-sm text-stone-400">
                      {r.seating} · {r.phone}
                    </div>
                    {r.notes && (
                      <div className="mt-1 text-xs text-stone-400 italic">
                        {r.notes}
                      </div>
                    )}
                  </div>
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${statusColor(r.status)}`}
                  >
                    {statusLabel(r.status)}
                  </span>
                </div>
                <div className="mt-3 flex gap-2">
                  {r.status === "new" && (
                    <button
                      onClick={() => handleConfirm(r.id)}
                      className="rounded-lg bg-emerald-50 px-3 py-1.5 text-xs font-medium text-emerald-700 hover:bg-emerald-100"
                    >
                      {t("actionConfirm")}
                    </button>
                  )}
                  {r.status !== "cancelled" && (
                    <button
                      onClick={() => handleCancel(r.id)}
                      className="rounded-lg bg-stone-100 px-3 py-1.5 text-xs font-medium text-stone-600 hover:bg-stone-200"
                    >
                      {t("actionCancel")}
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(r.id)}
                    className="rounded-lg bg-red-50 px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-100"
                  >
                    {t("actionDelete")}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop table */}
          <div className="hidden overflow-x-auto md:block">
            <div className="rounded-xl border border-stone-200 bg-white">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-stone-100 text-left text-stone-500">
                    <th className="px-4 py-3 font-medium">{t("colDate")}</th>
                    <th className="px-4 py-3 font-medium">{t("colTime")}</th>
                    <th className="px-4 py-3 font-medium">{t("colName")}</th>
                    <th className="px-4 py-3 font-medium">{t("colGuests")}</th>
                    <th className="px-4 py-3 font-medium">{t("colPhone")}</th>
                    <th className="px-4 py-3 font-medium">{t("colSeating")}</th>
                    <th className="px-4 py-3 font-medium">{t("colStatus")}</th>
                    <th className="px-4 py-3 font-medium">{t("colActions")}</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((r) => (
                    <tr
                      key={r.id}
                      className="border-b border-stone-50 last:border-0"
                    >
                      <td className="px-4 py-3 text-stone-600">{r.date}</td>
                      <td className="px-4 py-3 text-stone-600">{r.time}</td>
                      <td className="px-4 py-3 font-medium text-stone-800">
                        {r.name}
                      </td>
                      <td className="px-4 py-3 text-stone-600">{r.guests}</td>
                      <td className="px-4 py-3 text-stone-600">{r.phone}</td>
                      <td className="px-4 py-3 text-stone-600">{r.seating}</td>
                      <td className="px-4 py-3">
                        <span
                          className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${statusColor(r.status)}`}
                        >
                          {statusLabel(r.status)}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex gap-1.5">
                          {r.status === "new" && (
                            <button
                              onClick={() => handleConfirm(r.id)}
                              className="rounded-lg bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700 hover:bg-emerald-100"
                            >
                              {t("actionConfirm")}
                            </button>
                          )}
                          {r.status !== "cancelled" && (
                            <button
                              onClick={() => handleCancel(r.id)}
                              className="rounded-lg bg-stone-100 px-2.5 py-1 text-xs font-medium text-stone-600 hover:bg-stone-200"
                            >
                              {t("actionCancel")}
                            </button>
                          )}
                          <button
                            onClick={() => handleDelete(r.id)}
                            className="rounded-lg bg-red-50 px-2.5 py-1 text-xs font-medium text-red-600 hover:bg-red-100"
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
        </>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   PAGE – Vake Garden Bistro
   ═══════════════════════════════════════════════════════ */

export default function RestaurantPage() {
  const t = useTranslations("Restaurant");
  const locale = useLocale();

  const [showAdmin, setShowAdmin] = useState(false);
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const initialized = useRef(false);

  const refresh = useCallback(() => {
    setReservations(loadReservations());
  }, []);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;
    queueMicrotask(() => refresh());
  }, [refresh]);

  const reviews = [
    {
      title: t("review1Title"),
      text: t("review1Text"),
      author: t("review1Author"),
    },
    {
      title: t("review2Title"),
      text: t("review2Text"),
      author: t("review2Author"),
    },
    {
      title: t("review3Title"),
      text: t("review3Text"),
      author: t("review3Author"),
    },
  ];

  return (
    <div className="min-h-screen bg-stone-50">
      {/* ── Demo banner ── */}
      <div className="bg-emerald-50 px-4 py-2 text-center text-xs font-medium text-emerald-700">
        {t("banner")} ·{" "}
        <Link
          href={`/${locale}#demos`}
          className="underline hover:text-emerald-900"
        >
          {t("backToPortfolio")}
        </Link>
      </div>

      {/* ── Header ── */}
      <header className="sticky top-0 z-50 border-b border-stone-200 bg-white/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div>
            <div className="text-lg font-bold tracking-tight text-stone-800">
              {t("businessName")}
            </div>
            <div className="text-xs text-stone-400">
              {t("businessLocation")}
            </div>
          </div>
          <nav className="hidden items-center gap-6 text-sm font-medium text-stone-500 md:flex">
            <a
              href="#menu"
              className="transition-colors hover:text-emerald-700"
            >
              {t("navMenu")}
            </a>
            <a
              href="#reserve"
              className="transition-colors hover:text-emerald-700"
            >
              {t("navReserve")}
            </a>
            <a
              href="#reviews"
              className="transition-colors hover:text-emerald-700"
            >
              {t("navReviews")}
            </a>
            <a
              href="#contact"
              className="transition-colors hover:text-emerald-700"
            >
              {t("navContact")}
            </a>
            <a
              href="#reserve"
              className="rounded-lg bg-emerald-700 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-emerald-800"
            >
              {t("navReserveCta")}
            </a>
          </nav>
          <a
            href="#reserve"
            className="rounded-lg bg-emerald-700 px-4 py-2 text-sm font-medium text-white md:hidden"
          >
            {t("navReserveCta")}
          </a>
        </div>
      </header>

      {/* ── Hero ── */}
      <section className="relative overflow-hidden border-b border-stone-200 bg-white py-24">
        {/* subtle pattern */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.02]">
          <div
            className="h-full w-full"
            style={{
              backgroundImage:
                "radial-gradient(circle, #000 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
          />
        </div>
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <h1 className="text-3xl font-bold leading-tight tracking-tight text-stone-900 sm:text-4xl lg:text-5xl">
            {t("heroTitle")}
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-stone-500">
            {t("heroSubtitle")}
          </p>
          <p className="mt-4 text-sm text-stone-400">{t("heroTrust")}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a
              href="#reserve"
              className="rounded-lg bg-emerald-700 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-emerald-800"
            >
              {t("heroCta")}
            </a>
            <a
              href="#menu"
              className="rounded-lg border border-stone-200 bg-white px-6 py-3 text-sm font-medium text-stone-700 transition-colors hover:bg-stone-50"
            >
              {t("heroSecondary")}
            </a>
          </div>
        </div>
      </section>

      {/* ── Menu ── */}
      <section id="menu" className="scroll-mt-20 py-20">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-2xl font-bold tracking-tight text-stone-900">
            {t("menuTitle")}
          </h2>
          <p className="mt-2 text-stone-500">{t("menuSubtitle")}</p>
          <div className="mt-8">
            <MenuSection t={t} />
          </div>
        </div>
      </section>

      {/* ── Reservation ── */}
      <section
        id="reserve"
        className="scroll-mt-20 border-y border-stone-200 bg-emerald-50/40 py-20"
      >
        <div className="mx-auto max-w-2xl px-6">
          <h2 className="text-2xl font-bold tracking-tight text-stone-900">
            {t("reserveTitle")}
          </h2>
          <p className="mt-2 text-stone-500">{t("reserveSubtitle")}</p>
          <div className="mt-8">
            <ReservationForm t={t} onSubmit={refresh} />
          </div>
        </div>
      </section>

      {/* ── Reviews ── */}
      <section id="reviews" className="scroll-mt-20 py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <h2 className="text-2xl font-bold tracking-tight text-stone-900">
              {t("reviewsTitle")}
            </h2>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-emerald-700">
                {t("reviewsRating")}
              </span>
              <span className="text-sm text-stone-400">
                {t("reviewsRatingLabel")}
              </span>
            </div>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {reviews.map((rev) => (
              <div
                key={rev.author}
                className="rounded-xl border border-stone-200 bg-white p-6"
              >
                <h4 className="font-semibold text-stone-800">{rev.title}</h4>
                <p className="mt-2 text-sm leading-relaxed text-stone-500">
                  {rev.text}
                </p>
                <div className="mt-4 text-sm font-medium text-stone-700">
                  — {rev.author}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Contact ── */}
      <section
        id="contact"
        className="scroll-mt-20 border-t border-stone-200 bg-white py-20"
      >
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-2xl font-bold tracking-tight text-stone-900">
            {t("contactTitle")}
          </h2>
          <div className="mt-10 grid gap-8 sm:grid-cols-2">
            <div className="space-y-6">
              <div>
                <div className="text-sm font-medium text-stone-400">
                  {t("contactHoursLabel")}
                </div>
                <div className="mt-1 text-sm text-stone-700">
                  {t("contactHours")}
                </div>
              </div>
              <div>
                <div className="mt-1 text-sm text-stone-700">
                  {t("contactAddress")}
                </div>
              </div>
              <div>
                <div className="mt-1 text-sm text-stone-700">
                  {t("contactPhone")}
                </div>
                <div className="text-sm text-stone-400">
                  {t("contactEmail")}
                </div>
              </div>
              <div className="flex gap-3">
                <button className="rounded-lg bg-emerald-700 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-emerald-800">
                  {t("contactCallButton")}
                </button>
                <button className="rounded-lg border border-stone-200 px-4 py-2 text-sm font-medium text-stone-700 transition-colors hover:bg-stone-50">
                  {t("contactMessageButton")}
                </button>
              </div>
            </div>
            <div className="flex items-center justify-center rounded-xl border border-stone-200 bg-stone-50 p-10">
              <span className="text-sm text-stone-400">
                {t("contactMapPlaceholder")}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Admin Panel ── */}
      {showAdmin && (
        <section className="border-t border-stone-200 bg-stone-100 py-12">
          <div className="mx-auto max-w-5xl px-6">
            <AdminView t={t} reservations={reservations} onUpdate={refresh} />
          </div>
        </section>
      )}

      {/* ── Footer ── */}
      <footer className="border-t border-stone-200 bg-stone-900 py-10">
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
