// src/components/About.jsx
import React, { useState } from 'react';
import { Plus } from 'lucide-react';

/**
 * About section with toggleable Skill Map.
 * - Default: About text + compact skills on the right.
 * - On "+": About fades out; Skill Map scales in from the top-right.
 *   When closing, it scales back into the top-right.
 * - Because both views live inside the same card, sections below
 *   naturally slide down/up (no overlay collision).
 */
function About() {
  const [showSkills, setShowSkills] = useState(false);

  const topSkills = [
    'SystemVerilog / Verilog',
    'RISC-V & ARM',
    'Embedded C/C++',
    'ESP32 / CH32V',
    'Digital Design & Timing',
    'FPGA (Quartus / Vivado)',
    'PCB & Circuit Design',
  ];

  const categories = {
    Firmware: [
      'C, C++ (bare-metal & RTOS)',
      'Arduino / ESP32 / STM32 / CH32V',
      'FreeRTOS & task scheduling',
      'SPI, I²C, UART, USART drivers',
      'Low-level bring-up & debugging',
    ],
    Hardware: [
      'Custom ISA & CPU design',
      'RISC-V pipelines & hazards',
      'SystemVerilog RTL & testbenches',
      'FPGA prototyping (Cyclone V, Vivado)',
      'Viterbi encoder/decoder, encoding chains',
      'Power & driver stages (BLDC, solenoids)',
    ],
    Software: [
      'Python, Java, JavaScript',
      'React, HTML, CSS',
      'Operating Systems (Nachos)',
      'Linux, shell tooling',
      'Intro CUDA & parallel patterns',
    ],
    Tools: [
      'Quartus, ModelSim, Vivado',
      'PSpice / LTSpice',
      'KiCad / Eagle',
      'Git / GitHub',
      'VS Code, JIRA, Confluence',
      'Scopes, DMMs, lab equipment',
    ],
    'Other Skills': [
      'Technical tutoring & workshop design',
      'Team leadership (MacroPad project)',
      'Documentation & reproducible notes',
      'Cross-functional communication',
    ],
  };

  return (
    <div className="relative bg-slate-950/80 border border-slate-800/70 rounded-3xl p-8 md:p-10 backdrop-blur overflow-hidden">
      {/* ABOUT VIEW */}
      <div
        className={`transition-opacity duration-300 ${showSkills
          ? 'opacity-0 pointer-events-none absolute'
          : 'opacity-100 relative'
          }`}
      >
        <div className="grid md:grid-cols-12 gap-10 items-start">
          {/* Left: Photo (moved from Hero) */}
          <div className="md:col-span-4 lg:col-span-4">
            <div className="aspect-[3/4] rounded-2xl border border-slate-800 bg-slate-950/50 flex items-center justify-center text-slate-500 text-xs tracking-wide overflow-hidden relative group">
              {/* Placeholder for photo */}
              <div className="absolute inset-0 bg-gradient-to-b from-slate-800/20 to-slate-950/80" />
              <span className="px-4 text-center relative z-10">
                [Photo Placeholder]
              </span>
            </div>
          </div>

          {/* Right: Content */}
          <div className="md:col-span-8 lg:col-span-8 space-y-8">

            {/* Header & Bio */}
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-50">
                Hello, I'm Aarav
              </h2>
              <div className="space-y-4 text-slate-300/90 leading-relaxed text-base md:text-lg">
                <p>
                  I&apos;m a computer architecture and embedded systems engineer who
                  likes thinking about systems from the ISA down to timing diagrams
                  and then back up to firmware and tools.
                </p>
                <p>
                  I enjoy designing custom processors, debugging weird FPGA timing issues,
                  and building the firmware that makes hardware feel effortless to use.
                  Recently I&apos;ve been splitting time between tutoring computer
                  architecture, leading a Macropad project, and exploring RISC-V SoCs.
                </p>
              </div>
            </div>

            {/* Info Grid (Education & Skills) */}
            <div className="grid md:grid-cols-2 gap-4">
              {/* Education Box */}
              <div className="bg-slate-900/40 border border-slate-800/60 rounded-xl p-5 space-y-2 hover:border-slate-700 transition-colors">
                <p className="text-xs uppercase tracking-wider text-sky-400 font-semibold">
                  Education
                </p>
                <h3 className="text-lg font-semibold text-slate-100">
                  B.S. Computer Engineering
                </h3>
                <p className="text-slate-400 text-sm">
                  UC San Diego
                </p>
              </div>

              {/* Skills Box (Trigger) */}
              <div className="bg-slate-900/40 border border-slate-800/60 rounded-xl p-5 space-y-3 hover:border-sky-500/30 transition-colors group relative">
                <div className="flex items-center justify-between">
                  <p className="text-xs uppercase tracking-wider text-sky-400 font-semibold">
                    Core Skills
                  </p>
                  <button
                    type="button"
                    onClick={() => setShowSkills(true)}
                    className="w-8 h-8 rounded-full border border-slate-600 text-slate-300 flex items-center justify-center hover:bg-sky-500/20 hover:border-sky-500/50 hover:text-sky-400 transition-all"
                    aria-label="View Skills"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {topSkills.slice(0, 4).map((skill) => (
                    <span
                      key={skill}
                      className="text-[11px] px-2 py-0.5 rounded bg-slate-800/50 text-slate-300 border border-slate-700/50"
                    >
                      {skill}
                    </span>
                  ))}
                  <span className="text-[11px] px-2 py-0.5 text-slate-500">
                    + more...
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* SKILL MAP VIEW */}
      <div
        className={`transform-gpu origin-top-right transition-all duration-300 ${showSkills
          ? 'opacity-100 scale-100 relative'
          : 'opacity-0 scale-95 pointer-events-none absolute'
          }`}
      >
        <div className="flex items-center justify-between mb-4 md:mb-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold text-slate-50">
              Skill Map
            </h2>
            <p className="text-xs md:text-sm text-slate-400">
              Firmware, hardware, software, tools &amp; everything in between.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setShowSkills(false)}
            className="inline-flex items-center justify-center w-8 h-8 rounded-full border border-slate-600 text-slate-200 text-lg hover:bg-slate-800 transition"
            aria-label="Close skills"
          >
            &minus;
          </button>
        </div>

        <div className="grid gap-4 md:gap-6 md:grid-cols-2 lg:grid-cols-3 text-sm">
          {Object.entries(categories).map(([label, skills]) => (
            <div
              key={label}
              className="bg-slate-900/70 border border-slate-800/80 rounded-2xl p-4 space-y-2"
            >
              <h3 className="text-xs font-semibold uppercase tracking-wide text-sky-300">
                {label}
              </h3>
              <ul className="space-y-1.5 text-slate-200">
                {skills.map((s) => (
                  <li key={s} className="flex gap-1.5">
                    <span className="mt-[6px] h-1 w-1 rounded-full bg-sky-400" />
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className="mt-4 text-[11px] md:text-xs text-slate-500">
          Hit the &minus; in the top right to collapse the skill map and return
          to the About view.
        </p>
      </div>
    </div>
  );
}

export default About;
