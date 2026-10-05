"use client";

import { useState, useMemo } from "react";
import lawyerData from "../../data/lawyers.json";

interface Lawyer {
  name: string;
  firm: string;
  region: string;
  province: string;
  specialties: string[];
  website: string;
  phone: string;
  freeConsultation: boolean;
  notes: string;
}

const lawyers: Lawyer[] = lawyerData;

const PROVINCE_LABELS: Record<string, string> = {
  ON: "Ontario",
  BC: "British Columbia",
  AB: "Alberta",
  QC: "Quebec",
  MB: "Manitoba",
  SK: "Saskatchewan",
  NS: "Nova Scotia",
  NB: "New Brunswick",
  NL: "Newfoundland and Labrador",
  PE: "Prince Edward Island",
  NT: "Northwest Territories",
  YT: "Yukon",
  NU: "Nunavut",
};

const PROVINCE_OPTIONS = [
  { value: "ALL", label: "All Provinces" },
  ...[...new Set(lawyers.map((l) => l.province).filter((p) => p !== "ALL"))]
    .sort()
    .map((code) => ({
      value: code,
      label: PROVINCE_LABELS[code] || code,
    })),
];

const SPECIALTY_OPTIONS = [
  "wrongful dismissal",
  "severance negotiation",
  "constructive dismissal",
  "executive employment",
  "non-compete",
  "human rights",
  "workplace harassment",
];

export function LawyerDirectory() {
  const [provinceFilter, setProvinceFilter] = useState("ALL");
  const [specialtyFilter, setSpecialtyFilter] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = useMemo(() => {
    return lawyers.filter((l) => {
      if (
        provinceFilter !== "ALL" &&
        l.province !== provinceFilter &&
        l.province !== "ALL"
      )
        return false;
      if (specialtyFilter && !l.specialties.includes(specialtyFilter))
        return false;
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        return (
          l.name.toLowerCase().includes(q) ||
          l.firm.toLowerCase().includes(q) ||
          l.region.toLowerCase().includes(q) ||
          l.notes.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [provinceFilter, specialtyFilter, searchQuery]);

  return (
    <div>
      {/* Filters - stack on mobile, row on desktop */}
      <div className="space-y-3 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-3 mb-6">
        <select
          value={provinceFilter}
          onChange={(e) => setProvinceFilter(e.target.value)}
          className="w-full rounded-lg border border-gray-300 px-3 py-3 sm:py-2 text-base sm:text-sm focus:border-blue focus:ring-1 focus:ring-blue outline-none"
        >
          {PROVINCE_OPTIONS.map((p) => (
            <option key={p.value} value={p.value}>
              {p.label}
            </option>
          ))}
        </select>

        <select
          value={specialtyFilter}
          onChange={(e) => setSpecialtyFilter(e.target.value)}
          className="w-full rounded-lg border border-gray-300 px-3 py-3 sm:py-2 text-base sm:text-sm focus:border-blue focus:ring-1 focus:ring-blue outline-none"
        >
          <option value="">All Specialties</option>
          {SPECIALTY_OPTIONS.map((s) => (
            <option key={s} value={s}>
              {s.charAt(0).toUpperCase() + s.slice(1)}
            </option>
          ))}
        </select>

        <div>
          <label className="sr-only" htmlFor="lawyer-search">Search lawyers</label>
          <input
            id="lawyer-search"
            type="text"
            placeholder="Search by name, firm, or city..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-3 py-3 sm:py-2 text-base sm:text-sm focus:border-blue focus:ring-1 focus:ring-blue outline-none"
          />
        </div>
      </div>

      {/* Disclaimer */}
      <div className="mb-4 p-3 rounded-lg bg-amber-50 border border-amber-200">
        <p className="text-xs text-amber-800 leading-relaxed">
          <strong>Disclaimer:</strong> This directory is for informational
          purposes only. ClearCareer has not independently verified credentials
          or licensing status. ClearCareer does not receive referral fees.
          Inclusion does not constitute an endorsement. Free consultation
          availability was last checked April 2026. Verify licensing with your
          provincial law society.
        </p>
      </div>

      <div className="flex items-center justify-between mb-4">
        <p className="text-xs text-gray-500">
          Showing {filtered.length} of {lawyers.length} firms
        </p>
        {(provinceFilter !== "ALL" || specialtyFilter || searchQuery) && (
          <button
            onClick={() => {
              setProvinceFilter("ALL");
              setSpecialtyFilter("");
              setSearchQuery("");
            }}
            className="text-xs text-blue underline underline-offset-2"
          >
            Clear filters
          </button>
        )}
      </div>

      {/* Cards */}
      <div className="space-y-4">
        {filtered.map((l, i) => (
          <div
            key={i}
            className="border border-gray-200 rounded-xl p-4 sm:p-5 hover:border-blue/20 transition-colors"
          >
            {/* Header */}
            <div className="flex items-start justify-between gap-3 mb-2">
              <div>
                <h3 className="font-semibold text-gray-900 text-base">
                  {l.name}
                </h3>
                <p className="text-sm text-gray-600">{l.firm}</p>
              </div>
              <div className="flex flex-col sm:flex-row items-end sm:items-center gap-1.5 shrink-0">
                {l.freeConsultation && (
                  <span className="text-xs bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full font-medium">
                    Free Consult
                  </span>
                )}
                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                  {l.region}, {l.province}
                </span>
              </div>
            </div>

            {/* Notes */}
            <p className="text-sm text-gray-600 leading-relaxed mb-3">
              {l.notes}
            </p>

            {/* Specialties */}
            <div className="flex flex-wrap gap-1.5 mb-4">
              {l.specialties.map((s) => (
                <span
                  key={s}
                  className="text-xs bg-blue-50 text-blue px-2 py-0.5 rounded"
                >
                  {s}
                </span>
              ))}
            </div>

            {/* Action buttons - stacked on mobile for better touch targets */}
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
              <a
                href={l.website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 sm:py-2 rounded-lg bg-blue text-white text-sm font-medium hover:bg-blue-dark transition-colors"
              >
                Visit Website
                <svg
                  className="w-3.5 h-3.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </a>
              {l.phone && (
                <a
                  href={`tel:${l.phone}`}
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 sm:py-2 rounded-lg border border-gray-200 text-gray-700 text-sm font-medium hover:bg-gray-50 transition-colors"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  {l.phone}
                </a>
              )}
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <p>No lawyers found matching your filters.</p>
            <button
              onClick={() => {
                setProvinceFilter("ALL");
                setSpecialtyFilter("");
                setSearchQuery("");
              }}
              className="text-blue text-sm mt-2 underline"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>

      <p className="mt-6 text-xs text-gray-400 text-center">
        Always verify a lawyer's licensing status with your provincial law
        society before retaining them.
      </p>
    </div>
  );
}
