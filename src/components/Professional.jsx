import React, { useRef, useState } from "react";
import { ArrowUpRight, Minus } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Data for the mini cards in the professional list
export const experienceList = [
  {
    id: "exp1",
    title: "Undergraduate Research Assistant - SRIP",
    company: "UCSD Jacobs School of Engineering",
    period: "Apr 2026 – Present",
    summary: "Advised by Prof. Bill Lin. Built a compiler from trained Hopfield networks to clockless, synthesizable SystemVerilog; verified at N=256 with 240/240 patterns recalled.",
  },
  {
    id: "exp2",
    title: "CSE Department Tutor",
    company: "UC San Diego",
    period: "June 2025 – Present",
    summary: "Supporting ~50 students per quarter in CSE 141/L & 140 (Computer Architecture + Digital Design); ~15-pt avg. Midterm 2 improvement via 1-on-1 office hours. ~40 forum replies/quarter, <2 hr avg. response.",
  },
  {
    id: "exp3",
    title: "CSE Department Chair (Events)",
    company: "HKN – Eta Kappa Nu, UCSD",
    period: "2024 – Present",
    summary: "Designed and hosted 10+ technical workshops (Macro Key, I2C, ECE Depths Seminar). Coordinated with 15+ professors and alumni for events and technical guidance.",
  },
  {
    id: "exp4",
    title: "Research Intern - VLSI System Design",
    company: "Bangalore, India",
    period: "Oct 2024 – Nov 2024",
    summary: "Profiled RISC-V instruction execution and optimized assembly loops, slashing execution cycles by ~10% while preserving functionality.",
  },
  {
    id: "exp5",
    title: "Volunteer Engineer",
    company: "Early Learning & Cognition Lab, UCSD",
    period: "2024",
    summary: "Designed a child-proof 'blicket' machine using Arduino, 5 hall sensors, a rotary mode switch, and RGB LED to study probabilistic vs. deterministic learning in children under age 5.",
  },
  {
    id: "exp6",
    title: "Student Developer",
    company: "UCSD ITS",
    period: "Oct 2023 – June 2024",
    summary: "Shipped 10+ production forms and workflows used by 3,000+ students and faculty; automation cut manual handling per request by 50%.",
  },
  {
    id: "exp7",
    title: "Embedded Team Member",
    company: "TRITONS RCSC - RoboCup Soccer",
    period: "Oct 2023 – June 2024",
    summary: "Engineered high-precision solenoid actuation circuits and STM32-based activation systems with <20ms trigger response.",
  },
  {
    id: "exp8",
    title: "Battery Team Member",
    company: "TRITON SolarCar",
    period: "Oct 2023 – June 2024",
    summary: "Calibrated 3-phase BLDC motor controllers and integrated pedal feedback systems for optimized torque control.",
  },
];

// Data for the full‑detail cards (keyed by id)
export const experienceFull = {
  exp1: {
    title: "Undergraduate Research Assistant - SRIP",
    company: "UCSD Jacobs School of Engineering · Advised by Prof. Bill Lin",
    period: "Apr 2026 – Present",
    details:
      "Built a compiler that turns trained Hopfield network weights into synthesizable SystemVerilog, using Espresso logic minimization and graph-colored delay scheduling. Verified at N=256 neurons with 240/240 test vectors recalled. \n\nCut per-neuron logic from 627–2,918 down to 31–54 product terms by exploiting operating-region don't-cares, making fan-in 32 synthesizable where full enumeration is impossible. \n\nShowed that clockless settling requires distinct delay values (equal delays: 0% convergence) and inertial rather than transport delay elements (100% vs 1–16% convergence). Raised storage capacity from α=0.138 to α=0.5 (≥95% recall) via margin retraining. \n\nTools: SystemVerilog, Python, Yosys.",
  },
  exp2: {
    title: "CSE Department Tutor - Computer Architecture & Digital Design",
    company: "UC San Diego",
    period: "June 2025 – Present",
    details:
      "Led weekly sections and office hours for ~50 undergraduates in CSE 141/L (Computer Architecture) and CSE 140 (Digital Design). Prepared targeted problem sets on ARMv8 and MIPS pipelines, hazards, caches, memory models, Boolean logic, combinational & sequential logic, FSMs and RTL abstraction. \n\nResponded to ~40 forum questions per quarter with an average response time under 2 hours. Co-designed and proctored midterms and finals; graded ~80 submissions using a structured rubric to ensure consistency and conceptual clarity. \n\n1-on-1 office hour discussions led to an average ~15-point increase on Midterm 2 and ~10% improvement on the Final. Guided 100+ students in CSE 141L through designing custom ISAs and single-cycle CPUs in SystemVerilog, debugging datapath and control logic to improve synthesis success and understanding of microarchitecture.",
  },
  exp3: {
    title: "CSE Department Chair (Events)",
    company: "HKN – Eta Kappa Nu, UCSD",
    period: "2024 – Present",
    details:
      "Serving as CSE Department Chair for Events within Eta Kappa Nu (HKN), the IEEE honor society for ECE/CSE. \n\nDesigned and hosted 10+ technical workshops including the Macro Key Workshop, I2C Workshop, and ECE Depths Seminar, providing hands-on embedded systems education to the UCSD engineering community. \n\nCommunicated and coordinated with 15+ professors and alumni for event planning, technical guidance, and project support. Participated in weekly meetings to facilitate the creation and execution of HKN events ranging from professional to social.",
  },
  exp4: {
    title: "Research Intern - VLSI System Design",
    company: "Bangalore, India",
    period: "Oct 2024 – Nov 2024",
    details:
      "Executed comprehensive profiling of CH32V RISC-V instruction execution, analyzing 50+ traces to identify and mitigate 12% stall overheads. \n\nOptimized critical assembly loops, removing redundant loads/stores to cut execution cycles by ~10%. Engineered a MacroPad proof-of-concept using VSDSquadron Mini, integrating complex display and dual-button firmware on the CH32V platform. All simulation and debugging performed in a virtualized environment.",
  },
  exp5: {
    title: "Volunteer Engineer",
    company: "Early Learning & Cognition Lab, UCSD",
    period: "2024",
    details:
      "Designed and built a child-proof 'blicket' machine used to study probabilistic vs. deterministic learning in children under age 5. \n\nConstructed using an Arduino microcontroller, 5 hall-effect sensors, a rotary mode switch, and an RGB LED to create an interactive object-detection toy. Also 3D-designed and printed a custom enclosure to make the hardware safe and appealing for young children.",
  },
  exp6: {
    title: "Student Developer - Document & Case Management",
    company: "UCSD ITS",
    period: "Oct 2023 – June 2024",
    details:
      "Shipped 10+ production forms and workflows (Messaging Colab, Laptop Borrow Request, and more) used by 3,000+ students and faculty. Automation improvements cut manual handling from ~30 to ~15 minutes per request (-50%). \n\nBuilt 3+ analysis dashboards using ServiceNow's Experience Builder (25+ hours of platform coursework). Wrote QA scripts and performed 100+ end-to-end tests of other developers' work. \n\nTools: JavaScript, React, HTML, CSS, ServiceNow.",
  },
  exp7: {
    title: "Embedded Team Member",
    company: "TRITONS RCSC - RoboCup Soccer",
    period: "Oct 2023 – June 2024",
    details:
      "Designed and simulated advanced linear and chip kick circuits using PSpice/LTSpice, validating charge timing and energy delivery for optimal performance. \n\nBuilt and deployed STM32-based activation circuitry, guaranteeing reliable <20ms trigger response under high-stress test conditions.",
  },
  exp8: {
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
      {/* LIST VIEW (TIMELINE) */}
      <div
        className={`transition-all duration-500 ease-in-out ${expandedId
          ? "opacity-0 translate-x-[-20px] pointer-events-none absolute inset-0 p-6 md:p-8"
          : "opacity-100 translate-x-0 relative"
          }`}
      >
        <div className="flex items-center justify-between mb-8">
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
          className="max-h-[420px] overflow-y-auto pr-2 scroll-smooth relative pl-4 custom-scrollbar"
          style={{ overscrollBehaviorY: "contain" }}
        >
          {/* Vertical Line */}
          <div className="absolute left-[27px] top-2 bottom-0 w-px bg-slate-800" />

          <div className="space-y-8 relative">
            {experienceList.map((item) => (
              <div
                key={item.id}
                className="relative pl-12 group cursor-pointer"
                onClick={() => setExpandedId(item.id)}
              >
                {/* Timeline Dot */}
                <div className="absolute left-[21px] top-1.5 w-3.5 h-3.5 rounded-full border-2 border-slate-600 bg-slate-950 group-hover:border-sky-500 group-hover:bg-sky-500/20 transition-colors z-10" />

                {/* Content Card */}
                <div className="rounded-xl bg-slate-900/40 border border-slate-800/60 p-4 hover:border-sky-500/30 hover:bg-slate-900/60 transition-all">
                  <div className="flex items-start justify-between mb-1">
                    <div>
                      <h3 className="text-base font-semibold text-slate-100 group-hover:text-sky-300 transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-sm text-sky-400/80 font-medium">{item.company}</p>
                    </div>
                    <span className="text-xs text-slate-500 font-mono bg-slate-950/50 px-2 py-1 rounded border border-slate-800">
                      {item.period}
                    </span>
                  </div>
                  <p className="text-sm text-slate-400 line-clamp-2">
                    {item.summary}
                  </p>
                </div>
              </div>
            ))}
          </div>
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
