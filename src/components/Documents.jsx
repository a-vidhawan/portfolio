// src/components/Documents.jsx
import React, { useEffect, useRef, useState } from "react";

const documents = [
  {
    id: "doc1",
    title: "Curriculum Vitae",
    desc: "Full academic and professional history.",
    url: "/docs/AaravVidhawan_CV.pdf",
  },
  {
    id: "doc2",
    title: "Resume",
    desc: "Concise summary of skills and experience.",
    url: "/docs/AaravVidhawan_Resume.pdf",
  },
  {
    id: "doc3",
    title: "Other",
    desc: "Portfolio, transcripts or certificates.",
    url: "/docs/AaravVidhawan_Other.pdf",
  },
];

export default function Documents() {
  const stripRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const el = stripRef.current;
    if (!el) return;

    const handleScroll = () => {
      const { scrollLeft, scrollWidth, clientWidth } = el;
      const maxScroll = Math.max(1, scrollWidth - clientWidth);
      const progress = scrollLeft / maxScroll;
      const idx = Math.round(progress * (documents.length - 1));
      setActiveIndex(idx);
    };

    handleScroll();
    el.addEventListener("scroll", handleScroll);
    return () => el.removeEventListener("scroll", handleScroll);
  }, []);

  const handleWheel = (e) => {
    if (!stripRef.current) return;
    stripRef.current.scrollLeft += e.deltaY || e.deltaX;
    e.preventDefault();
    e.stopPropagation();
  };

  const handleOpen = (url) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <section className="relative rounded-[32px] bg-slate-950/80 px-6 py-8 md:px-8 md:py-9 shadow-[0_40px_120px_rgba(15,23,42,0.8)]">
      <h2 className="text-2xl md:text-3xl font-semibold text-slate-50">
        Important Documents
      </h2>

      <div className="mt-6">
        <div
          ref={stripRef}
          className="scroll-area flex gap-5 overflow-x-auto pb-2 scroll-smooth"
          onWheel={handleWheel}
          style={{ overscrollBehaviorX: "contain" }}
        >
          {documents.map((doc) => (
            <div
              key={doc.id}
              className="shrink-0 w-48 h-48 rounded-2xl bg-slate-900/85 p-4 flex flex-col justify-between shadow-[0_18px_60px_rgba(15,23,42,0.9)]"
            >
              <div>
                <h3 className="text-sm font-semibold text-slate-50">
                  {doc.title}
                </h3>
                <p className="mt-2 text-xs text-slate-300/90">{doc.desc}</p>
              </div>
              <div className="flex flex-col gap-2 mt-3">
                <button
                  type="button"
                  onClick={() => handleOpen(doc.url)}
                  className="text-xs font-medium rounded-full bg-sky-500 text-white py-1.5 px-3 hover:bg-sky-400 transition"
                >
                  Open
                </button>
                <a
                  href={doc.url}
                  download
                  className="text-xs font-medium rounded-full border border-slate-500 text-slate-100 py-1.5 px-3 text-center hover:bg-slate-800 transition"
                >
                  Download
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* dynamic dots */}
        <div className="mt-5 flex justify-center gap-2">
          {documents.map((doc, idx) => (
            <span
              key={doc.id}
              className={`h-1.5 w-1.5 rounded-full transition-colors ${
                idx === activeIndex ? "bg-sky-400" : "bg-slate-600/70"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
