import React from "react";
import { experienceList, experienceFull } from "../components/Professional";

export default function ExperiencePage() {
  return (
    <div className="min-h-screen">
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-slate-50 mb-4">
          Professional Experience
        </h1>
        <p className="text-slate-400 max-w-2xl text-lg">
          A timeline of my career in computer architecture, embedded systems, and research.
        </p>
      </div>

      <div className="space-y-8">
        {experienceList.map((item) => {
          const details = experienceFull[item.id];
          return (
            <div
              key={item.id}
              className="relative rounded-[32px] border border-slate-800/70 bg-slate-950/80 px-6 py-8 md:px-8 md:py-9 shadow-[0_40px_120px_rgba(15,23,42,0.8)] overflow-hidden"
            >
              <div className="flex items-start justify-between mb-6">
                <div>
                  <p className="text-xs uppercase tracking-[0.22em] text-sky-400 mb-1">
                    Professional Role
                  </p>
                  <h2 className="text-xl md:text-2xl font-semibold text-slate-50 mb-2">
                    {details.title}
                  </h2>
                  <div className="mb-4">
                    <h3 className="text-lg font-medium text-slate-200">
                      {details.company}
                    </h3>
                    <p className="text-sm text-slate-500">
                      {details.period}
                    </p>
                  </div>
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
