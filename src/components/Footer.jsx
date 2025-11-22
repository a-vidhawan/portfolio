import React from 'react';

function Footer() {
  return (
    <footer className="border-t border-slate-800/80 bg-slate-950/90">
      <div className="max-w-5xl mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between gap-3 text-xs md:text-sm text-slate-400">
        <span>© {new Date().getFullYear()} Aarav Vidhawan</span>
        <div className="flex items-center gap-4">
          <a
            href="mailto:avidhawan@ucsd.edu"
            className="hover:text-sky-300 transition"
          >
            Email
          </a>
          <a
            href="https://github.com/a-vidhawan"
            target="_blank"
            rel="noreferrer"
            className="hover:text-sky-300 transition"
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com/in/a-vidhawan"
            target="_blank"
            rel="noreferrer"
            className="hover:text-sky-300 transition"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
