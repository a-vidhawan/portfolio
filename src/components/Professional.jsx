import React, { useRef, useState } from "react";
import { ArrowUpRight, Minus } from "lucide-react";

// Data for the mini cards in the professional list
export const experienceList = [
  {
    id: "exp1",
    title: "Computer Architecture Engineer",
    company: "ABC Technology Inc.",
    period: "June 2023 – Present",
    summary: "Designed high‑performance RISC‑V CPU cores and optimised memory hierarchies.",
  },
  {
    id: "exp2",
    title: "Embedded Systems Engineer",
    company: "XYZ Robotics",
    period: "Jul 2021 – May 2023",
    summary: "Developed RTOS‑based firmware and low‑level drivers for robotics platforms.",
  },
  {
    id: "exp3",
    title: "Graduate Research Assistant",
    company: "University of California",
    period: "Sep 2019 – Jun 2021",
    summary: "Investigated cache coherence protocols and energy‑efficient microarchitectures.",
  },
  {
    id: "exp4",
    title: "Teaching Assistant – Computer Architecture",
    company: "UC San Diego",
    period: "2024 – Present",
    summary: "Led discussions, debugged student CPUs and taught pipeline/hazard concepts.",
  },
  {
    id: "exp5",
    title: "Hardware/Firmware Project Lead – MacroPad",
    company: "Student Project",
    period: "2024",
    summary: "Led a team building a custom ESP32‑based Macropad with multiple OLEDs.",
  },
];

// Data for the full‑detail cards (keyed by id)
export const experienceFull = {
  exp1: {
    title: "Computer Architecture Engineer",
    company: "ABC Technology Inc.",
    period: "June 2023 – Present",
    details:
      "Owned microarchitecture of multiple RISC‑V cores including pipeline depth, branch prediction and hazard/forwarding logic. Brought up RTL on FPGA prototypes, debugged timing issues and collaborated with firmware teams on bring‑up guides, documentation and performance scripts.",
  },
  exp2: {
    title: "Embedded Systems Engineer",
    company: "XYZ Robotics",
    period: "Jul 2021 – May 2023",
    details:
      "Implemented CAN/I²C/SPI/UART drivers and real‑time sensor fusion loops. Tuned ISR latency and task scheduling, added diagnostics over UART/CAN and used oscilloscopes/logic analyzers to characterise timing. Reviewed schematics and supported board bring‑up.",
  },
  exp3: {
    title: "Graduate Research Assistant",
    company: "University of California",
    period: "Sep 2019 – Jun 2021",
    details:
      "Prototyped novel coherence protocols in a cycle‑accurate simulator and evaluated them on SPEC‑like workloads. Designed teaching labs for pipelining, out‑of‑order execution and caches; mentored students on debugging RTL and simulator code.",
  },
  exp4: {
    title: "Teaching Assistant – Computer Architecture",
    company: "UC San Diego",
    period: "2024 – Present",
    details:
      "Led weekly discussion sections, debugged student designs and created worksheets to connect lecture concepts to real RTL problems. Helped students reason about control signals, hazards and forwarding paths.",
  },
  exp5: {
    title: "Hardware/Firmware Project Lead – MacroPad",
    company: "Student Project",
    period: "2024",
    details:
      "Coordinated firmware, hardware and desktop‑app workstreams. Designed PCB layouts, wrote ESP32 firmware, low‑level display drivers and a custom serial protocol. Documented the system so others can extend it.",
  },
};

export default function Professional() {
  const [expandedId, setExpandedId] = useState(null);
  const listRef = useRef(null);

  // Lock vertical scroll to the card list when hovering
  const handleWheel = (e) => {
    if (!listRef.current || expandedId) return;
    listRef.current.scrollTop += e.deltaY;
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <section
      id="professional"
      className="relative rounded-[32px] border border-slate-800/70 bg-slate-950/80 px-6 py-8 md:px-8 md:py-9 shadow-[0_40px_120px_rgba(15,23,42,0.8)] overflow-hidden transition-all duration-500"
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
              Career Timeline
            </p>
            <h2 className="text-2xl md:text-3xl font-semibold text-slate-50">
              Professional Experience
            </h2>
          </div>
          <button
            className="group border border-slate-600 rounded-lg p-1.5 transition hover:border-sky-500"
            onClick={() => (window.location.href = "/experience")}
            aria-label="View all experience"
          >
            <ArrowUpRight className="w-5 h-5 text-slate-400 group-hover:text-sky-400" />
          </button>
        </div>

        <div
          ref={listRef}
          onWheel={handleWheel}
          className="max-h-[420px] overflow-y-auto space-y-4 pr-2 scroll-smooth"
          style={{ overscrollBehaviorY: "contain" }}
        >
          {experienceList.map((item) => (
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
                  <p className="text-sm text-slate-400">{item.company}</p>
                  <p className="text-xs text-slate-500 mt-1">{item.period}</p>
                </div>
                <button
                  className="w-7 h-7 rounded-full border border-slate-600 text-slate-200 group-hover:bg-sky-500/20 group-hover:border-sky-500/50 transition flex items-center justify-center"
                >
                  +
                </button>
              </div>
              <p className="mt-3 text-sm text-slate-300/90">{item.summary}</p>
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
            <div className="flex items-start justify-between mb-6">
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-sky-400 mb-1">
                  Professional Role
                </p>
                <h2 className="text-xl md:text-2xl font-semibold text-slate-50 mb-2">
                  {experienceFull[expandedId].title}
                </h2>
                <div className="mb-4">
                  <h3 className="text-lg font-medium text-slate-200">
                    {experienceFull[expandedId].company}
                  </h3>
                  <p className="text-sm text-slate-500">
                    {experienceFull[expandedId].period}
                  </p>
                </div>
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
                {experienceFull[expandedId].details}
              </p>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
