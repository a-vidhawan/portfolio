import React, { useState } from "react";
import { researchItems, researchFull } from "../components/Research";
import { X } from "lucide-react";

export default function ResearchPage() {
  const [selectedId, setSelectedId] = useState(null);

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

      {/* Grid Layout */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {researchItems.map((item) => (
          <div
            key={item.id}
            onClick={() => setSelectedId(item.id)}
            className="group relative bg-slate-900/80 border border-slate-800/60 rounded-2xl p-6 cursor-pointer hover:border-sky-500/50 hover:bg-slate-900/95 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_40px_rgba(14,165,233,0.15)]"
          >
            <div className="mb-4">
              <h3 className="text-xl font-semibold text-slate-100 group-hover:text-sky-300 transition-colors">
                {item.title}
              </h3>
            </div>
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
            className="relative w-full max-w-2xl bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl p-8 animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedId(null)}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-800 text-slate-400 hover:text-slate-200 transition"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="mb-6">
              <h2 className="text-2xl font-bold text-slate-50 mb-1">
                {researchFull[selectedId].title}
              </h2>
            </div>

            <div className="prose prose-invert prose-sm max-w-none">
              <p className="text-slate-300 leading-relaxed whitespace-pre-line">
                {researchFull[selectedId].details}
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
