import React, { useRef, useState, useEffect } from "react";
import { ArrowUpRight, Minus } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Images for thumbnails (replace with your own files in /assets)
import cpuImg from "../assets/cpu.png";
import smarthomeImg from "../assets/smarthome.png";
import fpgaImg from "../assets/fpga.png";

// Mini‑list data (thumbnail, title, summary)
export const projectsList = [
  {
    id: "proj1",
    title: "MacroPad - Project Lead",
    summary: "Led 9-person team to build a modular ESP32 MacroPad with 9 OLEDs and custom Qt companion app.",
    thumb: smarthomeImg, // Placeholder, user said media later
  },
  {
    id: "proj2",
    title: "Sora v1.0 - Custom CPU",
    summary: "Architected 9-bit ISA and single-cycle CPU in SystemVerilog; achieved double precision math on constrained datapath.",
    thumb: cpuImg,
  },
  {
    id: "proj3",
    title: "Nachos Operating System",
    summary: "Implemented preemptive threading, multiprogramming, and demand-paged virtual memory in Java/MIPS.",
    thumb: smarthomeImg,
  },
  {
    id: "proj4",
    title: "Viterbi Encoder/Decoder",
    summary: "Built pipelined Viterbi decoder (K=7) in SystemVerilog; verified with deterministic/random error injection.",
    thumb: fpgaImg,
  },
  {
    id: "proj5",
    title: "Nixie Tube Clock",
    summary: "Designed retro-style clock using 1900s vacuum tubes and CH32V RISC-V platform.",
    thumb: smarthomeImg,
  },
  {
    id: "proj6",
    title: "Ultrasonic Smart Clock",
    summary: "Prototyped gesture-controlled smart clock with ultrasonic sensors and CircuitPython.",
    thumb: smarthomeImg,
  },
];

// Full detail data (title, details, gallery)
export const projectsFull = {
  proj1: {
    title: "MacroPad - Project Lead",
    details:
      "Led a high-velocity 9-person engineering team to design a modular ESP32 MacroPad featuring 9 64x64 RGB OLEDs, mechanical keys, and rotary encoders. \n\nEngineered a seamless desktop activation ecosystem via a custom, cross-platform Qt companion app (C++/Objective C). Implemented a high-performance serial protocol achieving profile switches in <50ms and activation latency <40ms. Designed custom driver circuits for SSD1357z controllers and integrated them into a bespoke PCB.",
    gallery: [smarthomeImg],
  },
  proj2: {
    title: "Sora v1.0 - Self Designed ISA and CPU",
    details:
      "Authored a novel 9-bit ISA (16 instructions, load-store architecture) and 8-bit datapath. \n\nAchieved Hamming Distance Calculation and double precision multiplication using only 9 bits—clocking the fastest execution in the class. Implemented single-cycle RTL in SystemVerilog, simulated in ModelSim, and resource-mapped on Cyclone-V using QuartusPrime. Wrote a custom assembler in Python to streamline development.",
    gallery: [cpuImg],
  },
  proj3: {
    title: "Nachos Operating System",
    details:
      "Engineered a robust OS kernel implementing preemptive threads with Alarm, join, and interrupt-based condition variables. \n\nAdded full multiprogramming capabilities with safe rVM/wVM, 16-FD file tables, and concurrent user-program execution. Designed a sophisticated demand-paged Virtual Memory system featuring lazy loading, swap space, clock eviction algorithms, dirty-bit optimization, and page pinning.",
    gallery: [smarthomeImg],
  },
  proj4: {
    title: "Viterbi Encoder/Decoder",
    details:
      "Implemented a high-performance convolutional encoder (rate 1/2, K=7) and pipelined Viterbi decoder (ACS + traceback depth 35) in SystemVerilog. \n\nVerified system integrity via end-to-end tx/rx testbenches, achieving min branch metric = 0 in noise-free channels. Built robust deterministic and random error-injection frameworks to evaluate uncorrected errors across periodic/burst patterns up to a 1/16 rate. Synthesized on Cyclone V.",
    gallery: [fpgaImg],
  },
  proj5: {
    title: "Nixie Tube Clock",
    details:
      "Designed a vintage-aesthetic 'Nixie Clock' utilizing 1900s IN-14 vacuum tubes with 11-pin interfaces. \n\nBuilt on the VSDSquadron Mini (CH32V platform) using C++. Integrated advanced features including multi-time zone support (4 presets) and a standard alarm layout. Engineered the hardware/firmware interface for reliable tube control.",
    gallery: [smarthomeImg],
  },
  proj6: {
    title: "Ultrasonic Smart Clock",
    details:
      "Innovated a 'Smart Clock' leveraging ultrasonic sensors to detect user presence/sleep state for intelligent alarm control. \n\nProgrammed using CircuitPython on a Metro M0 Express. Implemented gesture-based 'Stop' and 'Snooze' functionality. Utilized Onshape for 3D modeling of the prototype enclosure and EagleCAD for precision circuit design.",
    gallery: [smarthomeImg],
  },
};

export default function Projects() {
  const [expandedId, setExpandedId] = useState(null);
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);
  const stripRef = useRef(null);
  const galleryRef = useRef(null);

  // Track scroll position for dots
  useEffect(() => {
    const el = stripRef.current;
    if (!el) return;

    const handleScroll = () => {
      const { scrollLeft, scrollWidth, clientWidth } = el;
      const maxScroll = Math.max(1, scrollWidth - clientWidth);
      const progress = scrollLeft / maxScroll;
      const idx = Math.round(progress * (projectsList.length - 1));
      setActiveIndex(idx);
    };

    handleScroll();
    el.addEventListener("scroll", handleScroll);
    return () => el.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock horizontal scroll on projects strip
  const handleStripWheel = (e) => {
    if (!stripRef.current || expandedId) return;
    stripRef.current.scrollLeft += e.deltaY;
    e.preventDefault();
    e.stopPropagation();
  };

  // Lock horizontal scroll on gallery
  const handleGalleryWheel = (e) => {
    if (!galleryRef.current) return;
    galleryRef.current.scrollLeft += e.deltaY;
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <section
      id="projects"
      className="relative overflow-hidden transition-all duration-500 py-8"
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
              Selected Work
            </p>
            <h2 className="text-2xl md:text-3xl font-semibold text-slate-50">
              Projects
            </h2>
          </div>
          <button
            className="group border border-slate-600 rounded-lg p-1.5 transition hover:border-sky-500"
            onClick={() => navigate("/projects")}
            aria-label="View all projects"
          >
            <ArrowUpRight className="w-5 h-5 text-slate-400 group-hover:text-sky-400" />
          </button>
        </div>

        <div className="relative">
          <div
            ref={stripRef}
            className="flex gap-5 overflow-x-auto pb-3 pr-1 scroll-smooth snap-x snap-mandatory custom-scrollbar"
            onWheel={handleStripWheel}
            style={{ overscrollBehaviorX: "contain" }}
          >
            {projectsList.map((item) => (
              <div key={item.id} className="snap-start shrink-0 w-[260px]">
                <div
                  className="rounded-2xl bg-slate-900/85 border border-slate-700/60 hover:border-sky-500/60 transition shadow-[0_18px_60px_rgba(15,23,42,0.9)] p-5 flex flex-col justify-between cursor-pointer group h-full"
                  onClick={() => setExpandedId(item.id)}
                >
                  <div>
                    <img
                      src={item.thumb}
                      alt={item.title}
                      className="w-full h-[120px] object-cover rounded-lg mb-3"
                    />
                    <h3 className="text-base font-semibold text-slate-50 mb-1 group-hover:text-sky-300 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-sm text-slate-300/90">{item.summary}</p>
                  </div>
                  <div className="mt-4 flex items-center justify-end">
                    <button
                      className="w-7 h-7 rounded-full border border-slate-600 text-slate-200 group-hover:bg-sky-500/20 group-hover:border-sky-500/50 transition flex items-center justify-center"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* status dots */}
          <div className="mt-4 flex justify-center gap-2">
            {projectsList.map((item, idx) => (
              <span
                key={item.id}
                className={`h-1.5 w-1.5 rounded-full transition-colors ${idx === activeIndex ? "bg-sky-400" : "bg-slate-600/70"
                  }`}
              />
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
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-sky-400">
                  Project Detail
                </p>
                <h2 className="text-xl md:text-2xl font-semibold text-slate-50">
                  {projectsFull[expandedId].title}
                </h2>
              </div>
              <button
                className="group flex items-center justify-center w-9 h-9 rounded-full border border-slate-600 text-slate-300 hover:bg-slate-800 transition"
                onClick={() => setExpandedId(null)}
                aria-label="Back to list"
              >
                <Minus className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto pr-2">
              {/* Gallery */}
              <div className="mb-6">
                <p className="text-xs text-slate-400 mb-2">Project Media</p>
                <div
                  ref={galleryRef}
                  className="flex gap-4 overflow-x-auto pb-2 scroll-smooth custom-scrollbar"
                  onWheel={handleGalleryWheel}
                  style={{ overscrollBehaviorX: "contain" }}
                >
                  {projectsFull[expandedId].gallery.map((imgSrc, idx) => (
                    <img
                      key={idx}
                      src={imgSrc}
                      alt={`${projectsFull[expandedId].title} media ${idx + 1}`}
                      className="h-32 rounded-lg border border-slate-700/60 object-cover"
                    />
                  ))}
                </div>
              </div>

              {/* Details */}
              <div>
                <p className="text-sm md:text-base text-slate-300 leading-relaxed whitespace-pre-line">
                  {projectsFull[expandedId].details}
                </p>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
