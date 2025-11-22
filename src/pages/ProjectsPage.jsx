import React, { useState } from "react";
import { projectsList, projectsFull } from "../components/Projects";
import { X } from "lucide-react";

export default function ProjectsPage() {
  const [selectedId, setSelectedId] = useState(null);

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

      {/* Grid Layout */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projectsList.map((item) => (
          <div
            key={item.id}
            onClick={() => setSelectedId(item.id)}
            className="group relative bg-slate-900/80 border border-slate-800/60 rounded-2xl p-5 cursor-pointer hover:border-sky-500/50 hover:bg-slate-900/95 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_40px_rgba(14,165,233,0.15)] flex flex-col"
          >
            <div className="mb-4 overflow-hidden rounded-lg border border-slate-800/50">
              <img
                src={item.thumb}
                alt={item.title}
                className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <h3 className="text-xl font-semibold text-slate-100 group-hover:text-sky-300 transition-colors mb-2">
              {item.title}
            </h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              {item.summary}
            </p>
          </div>
        ))}
      </div>

      {/* Modal for Details */}
      {selectedId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div
            className="relative w-full max-w-3xl bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl p-8 animate-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedId(null)}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-800 text-slate-400 hover:text-slate-200 transition z-10"
            >
              <X className="w-6 h-6" />
            </button>

            <h2 className="text-2xl md:text-3xl font-bold text-slate-50 mb-6 pr-8">
              {projectsFull[selectedId].title}
            </h2>

            {/* Gallery */}
            <div className="flex gap-4 overflow-x-auto pb-4 mb-6 scroll-smooth">
              {projectsFull[selectedId].gallery.map((imgSrc, idx) => (
                <img
                  key={idx}
                  src={imgSrc}
                  alt={`${projectsFull[selectedId].title} media ${idx + 1}`}
                  className="h-48 md:h-64 rounded-xl border border-slate-700/60 object-cover shrink-0"
                />
              ))}
            </div>

            <div className="prose prose-invert prose-sm max-w-none bg-slate-800/30 p-6 rounded-2xl border border-slate-700/30">
              <p className="text-slate-300 leading-relaxed whitespace-pre-line">
                {projectsFull[selectedId].details}
              </p>
            </div>
          </div>
          {/* Click outside to close */}
          <div
            className="absolute inset-0 -z-10"
            onClick={() => setSelectedId(null)}
          />
        </div>
      )}
    </div>
  );
}
