// src/components/Research.jsx
import React, { useState } from "react";
import { ArrowUpRight, Minus } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const researchItems = [
  {
    id: "res1",
    title: "To be initiated",
    summary: "Stay tuned for upcoming research projects.",
    details: "Work in progress – check back soon!",
  },
];

export const researchFull = {
  res1: {
    title: "Research Experience",
    details: "Work in progress – check back soon!",
  },
};

export default function Research() {
  const [expandedId, setExpandedId] = useState(null);
  const navigate = useNavigate();

  return (
    <section
      id="research"
      className="relative overflow-hidden transition-all duration-500 py-8"
    >
      {/* LIST VIEW */}
      <div
        className={`transition-all duration-500 ease-in-out ${expandedId
          ? "opacity-0 translate-x-[-20px] pointer-events-none absolute inset-0 p-6 md:p-8"
          : "opacity-100 translate-x-0 relative"
          }`}
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-slate-500">
              Selected Work
            </p>
            <h2 className="text-2xl md:text-3xl font-semibold text-slate-50">
              Research Experience
            </h2>
          </div>
          <button
            className="group border border-slate-600 rounded-lg p-1.5 transition hover:border-sky-500"
            onClick={() => navigate("/research")}
            aria-label="View all research"
          >
            <ArrowUpRight className="w-5 h-5 text-slate-400 group-hover:text-sky-400" />
          </button>
        </div>

        <div className="space-y-4">
          {researchItems.map((item) => (
            <div
              key={item.id}
              className="rounded-2xl bg-slate-900/85 border border-slate-700/60 hover:border-sky-500/60 transition p-5 cursor-pointer group"
              onClick={() => setExpandedId(item.id)}
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-base font-semibold text-slate-50 group-hover:text-sky-300 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-300/90">{item.summary}</p>
                </div>
                <button
                  className="w-7 h-7 rounded-full border border-slate-600 text-slate-200 group-hover:bg-sky-500/20 group-hover:border-sky-500/50 transition flex items-center justify-center"
                >
                  +
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* DETAIL VIEW */}
      <div
        className={`transition-all duration-500 ease-in-out flex flex-col h-full ${expandedId
          ? "opacity-100 translate-x-0 relative"
          : "opacity-0 translate-x-[20px] pointer-events-none absolute inset-0 p-6 md:p-8"
          }`}
      >
        {expandedId && (
          <>
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-sky-400">
                  Research Detail
                </p>
                <h2 className="text-xl md:text-2xl font-semibold text-slate-50">
                  {researchFull[expandedId].title}
                </h2>
              </div>
              <button
                className="group flex items-center justify-center w-9 h-9 rounded-full border border-slate-600 text-slate-300 hover:bg-slate-800 transition"
                onClick={() => setExpandedId(null)}
                aria-label="Back to list"
              >
                <Minus className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto">
              <p className="text-sm md:text-base text-slate-300 leading-relaxed whitespace-pre-line">
                {researchFull[expandedId].details}
              </p>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
