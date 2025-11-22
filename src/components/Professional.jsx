import React, { useRef, useState } from "react";
import { ArrowUpRight, Minus } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Data for the mini cards in the professional list
export const experienceList = [
  {
    id: "exp1",
    title: "CSE Department Tutor",
    company: "UC San Diego",
    period: "June 2025 – Present",
    summary: "Orchestrated academic success for 50+ students in Computer Architecture, driving measurable grade improvements through targeted intervention.",
  },
  {
    id: "exp2",
    title: "Research Intern - VLSI System Design",
    company: "Bangalore, India",
    period: "Oct 2024 – Nov 2024",
    summary: "Profiled RISC-V instruction execution and optimized assembly loops, slashing execution cycles by ~10% while preserving functionality.",
  },
  {
    id: "exp3",
    title: "Student Developer",
    company: "UCSD ITS",
    period: "Oct 2023 – June 2024",
    summary: "Shipped 10+ production workflows and automated manual processes, achieving a 50% reduction in request handling latency.",
  },
  {
    id: "exp4",
    title: "Embedded Team Member",
    company: "TRITONS RCSC - RoboCup Soccer",
    period: "Oct 2023 – June 2024",
    summary: "Engineered high-precision solenoid actuation circuits and STM32-based activation systems with <20ms trigger response.",
  },
  {
    id: "exp5",
    title: "Battery Team Member",
    company: "TRITON SolarCar",
    period: "Oct 2023 – June 2024",
    summary: "Calibrated 3-phase BLDC motor controllers and integrated pedal feedback systems for optimized torque control.",
  },
];

// Data for the full‑detail cards (keyed by id)
export const experienceFull = {
  exp1: {
    title: "CSE Department Tutor - Computer Architecture",
    company: "UC San Diego",
    period: "June 2025 – Present",
    details:
      "Spearheaded academic support for ~50 undergraduates in CSE 141/L. Architected targeted problem sets focusing on ARMv8 pipelines, hazards, caches, and memory models. \n\nLeveraged data-driven insights to co-design midterms and finals, resulting in a ~15-point average increase on Midterm 2 and a ~10% boost on Final exam scores through high-impact 1-on-1 interventions. Guided 100+ students in designing custom ISAs and single-cycle CPUs in SystemVerilog, debugging complex datapath/control logic to maximize synthesis success.",
  },
  exp2: {
    title: "Research Intern - VLSI System Design",
    company: "Bangalore, India",
    period: "Oct 2024 – Nov 2024",
    details:
      "Executed comprehensive profiling of CH32V RISC-V instruction execution, analyzing 50+ traces to identify and mitigate 12% stall overheads. \n\nOptimized critical assembly loops, removing redundant loads/stores to cut execution cycles by ~10%. Engineered a MacroPad proof-of-concept using VSDSquadron Mini, integrating complex display and dual-button firmware on the CH32V platform. All simulation and debugging performed in a virtualized environment.",
  },
  exp3: {
    title: "Student Developer - Document & Case Management",
    company: "UCSD ITS",
    period: "Oct 2023 – June 2024",
    details:
      "Delivered 10+ mission-critical production workflows (Messaging Colab, Laptop Borrow Request) serving 3,000+ users. \n\nRevolutionized operational efficiency by automating manual handling, slashing processing time from 30 to 15 minutes (-50%). Architected 3+ analytical dashboards using ServiceNow’s experience builder and executed 100+ rigorous E2E tests to ensure flawless deployment of developer assets.",
  },
  exp4: {
    title: "Embedded Team Member",
    company: "TRITONS RCSC - RoboCup Soccer",
    period: "Oct 2023 – June 2024",
    details:
      "Designed and simulated advanced linear and chip kick circuits using PSpice/LTSpice, validating charge timing and energy delivery for optimal performance. \n\nBuilt and deployed STM32-based activation circuitry, guaranteeing reliable <20ms trigger response under high-stress test conditions.",
  },
  exp5: {
    title: "Battery Team Member",
    company: "TRITON SolarCar",
    period: "Oct 2023 – June 2024",
    details:
      "Configured and fine-tuned 3-phase BLDC motor controllers, meticulously calibrating pedal and throttle mapping for silky-smooth torque control. \n\nIntegrated and validated pedal feedback mechanisms with the primary drive system, ensuring stable current draw and highly responsive motor behavior.",
  },
};

export default function Professional() {
  const [expandedId, setExpandedId] = useState(null);
  const listRef = useRef(null);
  const navigate = useNavigate();

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
            onClick={() => navigate("/experience")}
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
