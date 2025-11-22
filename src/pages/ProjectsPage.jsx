import React, { useRef } from "react";
import { projectsList, projectsFull } from "../components/Projects";

export default function ProjectsPage() {
  return (
    <div className="min-h-screen">
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-slate-50 mb-4">
          Projects
        </h1>
        <p className="text-slate-400 max-w-2xl text-lg">
          A collection of my technical projects, from custom CPUs to embedded systems.
        </p>
      </div>

      <div className="space-y-8">
        {projectsList.map((item) => {
          const details = projectsFull[item.id];
          return (
            <div
              key={item.id}
              className="relative rounded-[32px] border border-slate-800/70 bg-slate-950/80 px-6 py-8 md:px-8 md:py-9 shadow-[0_40px_120px_rgba(15,23,42,0.8)] overflow-hidden"
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-xs uppercase tracking-[0.22em] text-sky-400">
                    Project Detail
                  </p>
                  <h2 className="text-xl md:text-2xl font-semibold text-slate-50">
                    {details.title}
                  </h2>
                </div>
              </div>

              <div className="flex-1 pr-2">
                {/* Gallery */}
                <div className="mb-6">
                  <p className="text-xs text-slate-400 mb-2">Project Media</p>
                  <div className="flex gap-4 overflow-x-auto pb-2 scroll-smooth" style={{ overscrollBehaviorX: "contain" }}>
                    {details.gallery.map((imgSrc, idx) => (
                      <img
                        key={idx}
                        src={imgSrc}
                        alt={`${details.title} media ${idx + 1}`}
                        className="h-32 rounded-lg border border-slate-700/60 object-cover"
                      />
                    ))}
                  </div>
                </div>

                {/* Details */}
                <div>
                  <p className="text-sm md:text-base text-slate-300 leading-relaxed whitespace-pre-line">
                    {details.details}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
