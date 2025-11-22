import React from "react";
import { researchItems, researchFull } from "../components/Research";

export default function ResearchPage() {
  return (
    <div className="min-h-screen">
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-slate-50 mb-4">
          Research
        </h1>
        <p className="text-slate-400 max-w-2xl text-lg">
          Academic research and experimental projects.
        </p>
      </div>

      <div className="space-y-8">
        {researchItems.map((item) => {
          const details = researchFull[item.id];
          return (
            <div
              key={item.id}
              className="relative rounded-[32px] border border-slate-800/70 bg-slate-950/80 px-6 py-8 md:px-8 md:py-9 shadow-[0_40px_120px_rgba(15,23,42,0.8)] overflow-hidden"
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-xs uppercase tracking-[0.22em] text-sky-400">
                    Research Detail
                  </p>
                  <h2 className="text-xl md:text-2xl font-semibold text-slate-50">
                    {details.title}
                  </h2>
                </div>
              </div>

              <div className="flex-1">
                <p className="text-sm md:text-base text-slate-300 leading-relaxed whitespace-pre-line">
                  {details.details}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
