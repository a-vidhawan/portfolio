// src/components/Hero.jsx
import React from 'react';

/**
 * Hero section with tall portrait on the left and text on the right.
 * "UC San Diego" replaces the generic "Portfolio" label.
 */
function Hero() {
  return (
    <div className="relative bg-slate-950/80 border border-slate-800/70 rounded-3xl p-8 md:p-10 lg:p-12 backdrop-blur flex flex-col md:flex-row gap-8 md:gap-10 items-center">
      {/* Left: tall rectangular photo placeholder */}
      <div className="w-full md:w-56 lg:w-64">
        <div className="aspect-[3/5] rounded-2xl border border-slate-700/80 bg-gradient-to-b from-slate-800 to-slate-950 flex items-center justify-center text-slate-400 text-xs tracking-wide">
          {/* later: replace this whole div with an <img> */}
          <span className="px-4 text-center">
            Your photo goes here
            <br />
            (tall rectangular portrait)
          </span>
        </div>
      </div>

      {/* Right: text */}
      <div className="flex-1 space-y-4 md:space-y-5">
        <p className="text-xs md:text-sm uppercase tracking-[0.35em] text-sky-400">
          UC San Diego
        </p>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-slate-50">
          Aarav Vidhawan
        </h1>
        <p className="text-lg md:text-xl text-sky-300/90">
          Computer Engineer — Architecture &amp; Embedded Systems
        </p>
        <p className="text-sm md:text-base text-slate-300/90 max-w-xl">
          I build at the boundary between hardware and software: custom ISAs,
          CPU microarchitectures and digital logic on one side; embedded
          firmware, tools and system integration on the other.
        </p>
      </div>
    </div>
  );
}

export default Hero;
