import React from 'react';
import { Github, Linkedin } from 'lucide-react';

/**
 * Hero section with tall portrait on the left and text on the right.
 * "UC San Diego" replaces the generic "Portfolio" label.
 */
function Hero() {
  return (
    <div className="relative flex flex-col items-center justify-center py-20 md:py-32 text-center">
      {/* Text Content */}
      <div className="max-w-3xl space-y-6">
        <p className="text-sm md:text-base uppercase tracking-[0.35em] text-sky-400 font-medium">
          UC San Diego
        </p>
        <h1 className="text-5xl md:text-7xl font-bold text-slate-50 tracking-tight">
          Aarav Vidhawan
        </h1>
        <p className="text-xl md:text-2xl text-sky-300/90 font-light">
          Computer Engineer — Architecture &amp; Embedded Systems
        </p>
        <p className="text-base md:text-lg text-slate-300/80 max-w-2xl mx-auto leading-relaxed">
          I build at the boundary between hardware and software: custom ISAs,
          CPU microarchitectures and digital logic on one side; embedded
          firmware, tools and system integration on the other.
        </p>

        {/* Social Links */}
        <div className="flex items-center justify-center gap-6 pt-6">
          <a
            href="https://github.com/a-vidhawan"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-slate-700/50 bg-slate-900/50 text-slate-300 text-sm font-medium hover:border-sky-500/50 hover:text-sky-400 hover:bg-slate-800/80 transition-all group"
          >
            <Github className="w-5 h-5 group-hover:scale-110 transition-transform" />
            GitHub
          </a>
          <a
            href="https://linkedin.com/in/a-vidhawan"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-slate-700/50 bg-slate-900/50 text-slate-300 text-sm font-medium hover:border-sky-500/50 hover:text-sky-400 hover:bg-slate-800/80 transition-all group"
          >
            <Linkedin className="w-5 h-5 group-hover:scale-110 transition-transform" />
            LinkedIn
          </a>
        </div>
      </div>
    </div>
  );
}

export default Hero;
