"use client";

import { useTranslations } from "next-intl";
import { Section } from "./Section";
import { useState } from "react";

export function Contact() {
  const t = useTranslations("Contact");
  const [formData, setFormData] = useState({
    fullName: "",
    businessName: "",
    businessType: "",
    website: "",
    message: "",
    email: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsSubmitting(false);
    setIsSubmitted(true);

    // Reset form after 3 seconds
    setTimeout(() => {
      setFormData({
        fullName: "",
        businessName: "",
        businessType: "",
        website: "",
        message: "",
        email: "",
      });
      setIsSubmitted(false);
    }, 3000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (isSubmitted) {
    return (
      <Section id="contacto" className="bg-neutral-50">
        <div className="mx-auto max-w-2xl text-center">
          <div className="rounded-2xl border border-neutral-200 bg-white p-12">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-neutral-900">
              <svg
                className="h-8 w-8 text-white"
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
            <p className="text-lg font-medium text-neutral-900">
              {t("successMessage")}
            </p>
          </div>
        </div>
      </Section>
    );
  }

  return (
    <Section id="contacto" className="bg-neutral-50">
      <div className="mx-auto max-w-2xl">
        <div className="text-center">
          <h2 className="text-2xl font-semibold tracking-tight">
            {t("title")}
          </h2>
          <p className="mt-3 text-neutral-600">{t("subtitle")}</p>
        </div>

        <form onSubmit={handleSubmit} className="mt-10">
          <div className="space-y-5">
            {/* Full Name */}
            <div>
              <label
                htmlFor="fullName"
                className="block text-sm font-medium text-neutral-700"
              >
                {t("fieldFullName")} <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                required
                value={formData.fullName}
                onChange={handleChange}
                className="mt-1 block w-full rounded-lg border border-neutral-200 px-4 py-3 text-sm focus:border-neutral-900 focus:outline-none focus:ring-1 focus:ring-neutral-900"
              />
            </div>

            {/* Business Name */}
            <div>
              <label
                htmlFor="businessName"
                className="block text-sm font-medium text-neutral-700"
              >
                {t("fieldBusinessName")} <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                id="businessName"
                name="businessName"
                required
                value={formData.businessName}
                onChange={handleChange}
                className="mt-1 block w-full rounded-lg border border-neutral-200 px-4 py-3 text-sm focus:border-neutral-900 focus:outline-none focus:ring-1 focus:ring-neutral-900"
              />
            </div>

            {/* Type of Business */}
            <div>
              <label
                htmlFor="businessType"
                className="block text-sm font-medium text-neutral-700"
              >
                {t("fieldBusinessType")} <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                id="businessType"
                name="businessType"
                required
                placeholder={t("fieldBusinessTypePlaceholder")}
                value={formData.businessType}
                onChange={handleChange}
                className="mt-1 block w-full rounded-lg border border-neutral-200 px-4 py-3 text-sm focus:border-neutral-900 focus:outline-none focus:ring-1 focus:ring-neutral-900"
              />
            </div>

            {/* Website or Instagram */}
            <div>
              <label
                htmlFor="website"
                className="block text-sm font-medium text-neutral-700"
              >
                {t("fieldWebsite")}
              </label>
              <input
                type="text"
                id="website"
                name="website"
                placeholder={t("fieldWebsitePlaceholder")}
                value={formData.website}
                onChange={handleChange}
                className="mt-1 block w-full rounded-lg border border-neutral-200 px-4 py-3 text-sm focus:border-neutral-900 focus:outline-none focus:ring-1 focus:ring-neutral-900"
              />
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-neutral-700"
              >
                {t("fieldEmail")} <span className="text-red-600">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="mt-1 block w-full rounded-lg border border-neutral-200 px-4 py-3 text-sm focus:border-neutral-900 focus:outline-none focus:ring-1 focus:ring-neutral-900"
              />
            </div>

            {/* Message */}
            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-neutral-700"
              >
                {t("fieldMessage")}
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                placeholder={t("fieldMessagePlaceholder")}
                value={formData.message}
                onChange={handleChange}
                className="mt-1 block w-full rounded-lg border border-neutral-200 px-4 py-3 text-sm focus:border-neutral-900 focus:outline-none focus:ring-1 focus:ring-neutral-900"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-8 w-full rounded-lg bg-neutral-900 py-3 text-sm font-medium text-white transition-colors hover:bg-neutral-800 disabled:opacity-50"
          >
            {isSubmitting ? t("submitting") : t("submitButton")}
          </button>

          {/* Trust Line */}
          <p className="mt-4 text-center text-xs text-neutral-500">
            {t("trustLine")}
          </p>
        </form>
      </div>
    </Section>
  );
}
