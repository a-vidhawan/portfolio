import React, { useRef, useState, useEffect } from "react";
import { ArrowUpRight, Minus } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Placeholder thumbnails. Generated images saved to src/assets/generated/
// with the matching name (e.g. "macropad.png") replace these automatically.
import cpuImg from "../assets/cpu.png";
import fpgaImg from "../assets/fpga.png";
import macropadImg from "../assets/macropad.svg";
import mipsImg from "../assets/mips.svg";
import nachosImg from "../assets/nachos.svg";
import nixieImg from "../assets/nixie.svg";
import smarthomeImg from "../assets/smarthome.png";
import { generatedImage } from "../lib/images";

const thumbs = {
  proj1: generatedImage("macropad", macropadImg),
  proj2: generatedImage("mips-ooo", mipsImg),
  proj3: generatedImage("sora-cpu", cpuImg),
  proj4: generatedImage("nachos-os", nachosImg),
  proj5: generatedImage("viterbi", fpgaImg),
  proj6: generatedImage("nixie-clock", nixieImg),
  proj7: generatedImage("smart-clock", smarthomeImg),
};

// Thumbnail first, then any optional extra gallery shots ("<name>-2", "<name>-3")
const gallery = (id, name) =>
  [thumbs[id], generatedImage(`${name}-2`), generatedImage(`${name}-3`)].filter(Boolean);

// Mini‑list data (thumbnail, title, summary)
export const projectsList = [
  {
    id: "proj1",
    title: "MacroPad - Project Lead",
    summary: "Led a 9-person team to build a modular ESP32 MacroPad with 9 RGB OLED keys, rotary encoders, a custom PCB and a cross-platform Qt companion app.",
    thumb: thumbs.proj1,
  },
  {
    id: "proj2",
    title: "MIPS CPU with Advanced Optimizations",
    summary: "Extended a MIPS CPU with R10k-style out-of-order execution, McFarling hybrid branch prediction, stream-buffer prefetching and victim caches.",
    thumb: thumbs.proj2,
  },
  {
    id: "proj3",
    title: "Sora v1.0 - Custom ISA & CPU",
    summary: "Authored a 9-bit ISA and single-cycle CPU in SystemVerilog with a Python assembler; fastest execution in the class.",
    thumb: thumbs.proj3,
  },
  {
    id: "proj4",
    title: "Nachos Operating System",
    summary: "Implemented preemptive threading, multiprogramming, process syscalls and demand-paged virtual memory in Java/MIPS.",
    thumb: thumbs.proj4,
  },
  {
    id: "proj5",
    title: "Viterbi Encoder/Decoder",
    summary: "Built a K=7 convolutional encoder and pipelined Viterbi decoder in SystemVerilog; verified with deterministic and random error injection.",
    thumb: thumbs.proj5,
  },
  {
    id: "proj6",
    title: "Nixie Tube Clock",
    summary: "Designed a retro clock driving IN-14 vacuum tubes from a CH32V RISC-V board, with alarm and 4 preset time zones.",
    thumb: thumbs.proj6,
  },
  {
    id: "proj7",
    title: "Ultrasonic Smart Clock",
    summary: "Prototyped an alarm clock that uses an ultrasonic sensor to tell whether you're still in bed before it rings.",
    thumb: thumbs.proj7,
  },
];

// Full detail data (title, details, gallery)
export const projectsFull = {
  proj1: {
    title: "MacroPad - Project Lead",
    details:
      "Led a 9-person engineering team to design a modular ESP32 MacroPad featuring 9 64x64 RGB OLEDs, mechanical keys, and 2 rotary encoders. \n\nBuilt seamless desktop activation through a custom, cross-platform Qt companion application written in C++ and Objective-C. Implemented a serial protocol supporting profile switches in <50 ms and activation latency <40 ms. Designed the driver circuit for the SSD1357z display controller and integrated it into the custom keyboard PCB. \n\nRan sprint cadence, code reviews, and integration across the full team. \n\nTools: C++, KiCad, LTSpice.",
    gallery: gallery("proj1", "macropad"),
  },
  proj2: {
    title: "MIPS CPU with Advanced Optimizations",
    details:
      "Extended a baseline MIPS CPU with four optimizations inspired by research papers and modern processors. \n\nImplemented McFarling-style hybrid branch prediction (bimodal + gshare) with BTB integration in the IF stage. Built a MIPS R10k-style out-of-order execution engine with register renaming, dynamic scheduling, and in-order commit. \n\nIntegrated hardware data prefetching using a 4-way stream buffer for the D-cache and a 1-way stream buffer for the I-cache to hide miss latency. Added victim caches for both to reduce conflict misses and improve effective cache hit rate. \n\nTools: SystemVerilog, Python, C.",
    gallery: gallery("proj2", "mips-ooo"),
  },
  proj3: {
    title: "Sora v1.0 - Self Designed ISA and CPU",
    details:
      "Authored a 9-bit ISA (16 instructions, 2 addressing modes, load-store architecture) with an 8-bit datapath, and wrote its assembler in Python. \n\nAchieved Hamming distance calculation and double-precision multiplication using only 9-bit instructions, with the fastest execution in the class. \n\nSingle-cycle design with RTL in SystemVerilog, simulated in ModelSim, and resource-mapped onto a Cyclone V using Quartus Prime.",
    gallery: gallery("proj3", "sora-cpu"),
  },
  proj4: {
    title: "Nachos Operating System",
    details:
      "Implemented preemptive threads with Alarm, join, interrupt-based condition variables, sleepFor and tagged Rendezvous. \n\nAdded full multiprogramming with safe rVM/wVM, 16-FD file tables, and concurrent user-program execution. Built exec/join/exit with unique PIDs, parent–child synchronization, and robust process cleanup on abnormal termination. \n\nDesigned a demand-paged virtual memory system with lazy loading, swap, clock eviction, dirty-bit optimization, and page pinning. \n\nTools: Java, Nachos, MIPS.",
    gallery: gallery("proj4", "nachos-os"),
  },
  proj5: {
    title: "Viterbi Encoder/Decoder",
    details:
      "Implemented a convolutional encoder (rate 1/2, K=7) and a pipelined Viterbi decoder (ACS + traceback depth 35) in SystemVerilog. Passed the end-to-end tx/rx testbench and verified min branch metric = 0 in a no-error channel. \n\nBuilt deterministic and random error injection, and evaluated uncorrected errors across periodic and burst patterns up to a 1/16 rate. \n\nSynthesized on Cyclone V; exported RTL-viewer/netlist and wrote state-transition and branch-metric notes for reproducibility. \n\nTools: SystemVerilog, ModelSim, Quartus.",
    gallery: gallery("proj5", "viterbi"),
  },
  proj6: {
    title: "Nixie Tube Clock",
    details:
      "Designed a 'Nixie Clock' using vintage IN-14 vacuum tubes with an 11-pin cathode/anode interface. \n\nBuilt on the VSDSquadron Mini (CH32V RISC-V platform) in C++, with a built-in alarm using a standard alarm-clock setting layout. Added time zone switching with 4 buttons for 4 preset time zones. \n\nTools: PSpice, LTSpice, circuit design, CH32V.",
    gallery: gallery("proj6", "nixie-clock"),
  },
  proj7: {
    title: "Ultrasonic Smart Clock",
    details:
      "Designed a 'Smart Clock' that uses an ultrasonic sensor to detect whether the user is still sleeping, and decides accordingly whether to ring the alarm. Programmed in CircuitPython on a Metro M0 Express. \n\nAdded 'Stop' and 'Snooze' functionality, with 'Time Setting' planned for a future iteration. \n\nModeled the prototype in Onshape and drew the circuit diagrams in EagleCAD.",
    gallery: gallery("proj7", "smart-clock"),
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
