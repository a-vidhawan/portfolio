import React, { useRef, useState, useEffect } from "react";
import { ArrowUpRight, Minus } from "lucide-react";

// Images for thumbnails (replace with your own files in /assets)
import cpuImg from "../assets/cpu.png";
import smarthomeImg from "../assets/smarthome.png";
import fpgaImg from "../assets/fpga.png";

// Mini‑list data (thumbnail, title, summary)
export const projectsList = [
  {
    id: "proj1",
    title: "Custom RISC‑V CPU",
    summary: "5‑stage pipelined RISC‑V core in SystemVerilog with custom ISA extensions.",
    thumb: cpuImg,
  },
  {
    id: "proj2",
    title: "ESP32 Macropad",
    summary: "Multi‑screen ESP32‑based Macropad with custom PCB and desktop app.",
    thumb: smarthomeImg,
  },
  {
    id: "proj3",
    title: "FPGA‑based Accelerator",
    summary: "Hardware accelerator prototype offloading compute‑intensive kernels to an FPGA.",
    thumb: fpgaImg,
  },
  {
    id: "proj4",
    title: "Smart Home Controller",
    summary: "Embedded hub talking to sensors/actuators over I²C/SPI.",
    thumb: smarthomeImg,
  },
];

// Full detail data (title, details, gallery)
export const projectsFull = {
  proj1: {
    title: "Custom RISC‑V CPU",
    details:
      "Designed the ISA, pipeline, hazard and forwarding logic, and wrote assembly test programs. Brought the design onto an FPGA, debugged timing issues and integrated the core into a simple SoC with instruction and data memories.",
    gallery: [cpuImg],
  },
  proj2: {
    title: "ESP32 Macropad",
    details:
      "Designed the PCB around an ESP32‑WROVER, nine mechanical switches and multiple OLED displays. Implemented a serial protocol to transfer PNG icons from a Qt desktop app, and wrote firmware to render icons and send programmable key macros.",
    gallery: [smarthomeImg],
  },
  proj3: {
    title: "FPGA‑based Accelerator",
    details:
      "Built a hardware accelerator datapath and control FSM, verified it with simulation and integrated it into a simple top‑level SoC, providing notable speedups over CPU implementations.",
    gallery: [fpgaImg],
  },
  proj4: {
    title: "Smart Home Controller",
    details:
      "Implemented an RTOS‑based firmware with sensor polling, command parsing and actuator control. Added UART logging and a CLI for debugging.",
    gallery: [smarthomeImg],
  },
};

export default function Projects() {
  const [expandedId, setExpandedId] = useState(null);
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
              Selected Work
            </p>
            <h2 className="text-2xl md:text-3xl font-semibold text-slate-50">
              Projects
            </h2>
          </div>
          <button
            className="group border border-slate-600 rounded-lg p-1.5 transition hover:border-sky-500"
            onClick={() => (window.location.href = "/projects")}
            aria-label="View all projects"
          >
            <ArrowUpRight className="w-5 h-5 text-slate-400 group-hover:text-sky-400" />
          </button>
        </div>

        <div className="relative">
          <div
            ref={stripRef}
            className="flex gap-5 overflow-x-auto pb-3 pr-1 scroll-smooth snap-x snap-mandatory"
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
                  className="flex gap-4 overflow-x-auto pb-2 scroll-smooth"
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
