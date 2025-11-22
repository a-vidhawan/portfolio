import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { experienceList } from './Professional';
import { projectsList } from './Projects';
import { researchItems } from './Research';

/**
 * A dynamic navigation bar that changes based on scroll position and current page.
 * - Top of page: Transparent background, blends in.
 * - Scrolled: Floating pill style with blur.
 * - Context-aware: Shows relevant links for Professional, Projects, and Research pages.
 */
function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll for dynamic styling
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Determine links based on current path
  const getLinks = () => {
    const path = location.pathname;

    if (path === '/experience') {
      return experienceList.map(item => ({
        id: item.id,
        label: item.title.split(' - ')[0] // Shorten title for navbar
      }));
    }

    if (path === '/projects') {
      return projectsList.map(item => ({
        id: item.id,
        label: item.title.split(' - ')[0]
      }));
    }

    if (path === '/research') {
      return researchItems.map(item => ({
        id: item.id,
        label: item.title
      }));
    }

    // Default home links
    return [
      { id: 'about', label: 'About' },
      { id: 'professional', label: 'Professional' },
      { id: 'projects', label: 'Projects' },
      { id: 'research', label: 'Research' },
      { id: 'documents', label: 'Documents' },
    ];
  };

  const links = getLinks();
  const isHome = location.pathname === '/';

  // Dynamic classes
  const navClasses = scrolled
    ? "fixed top-0 left-0 w-full z-50 transition-all duration-300 pointer-events-none"
    : "fixed top-0 left-0 w-full z-50 transition-all duration-300 bg-transparent";

  const ulClasses = scrolled
    ? "flex flex-col gap-2 p-3 bg-white/80 backdrop-blur-md rounded shadow-lg items-end pointer-events-auto"
    : "flex flex-row gap-6 p-6 justify-end items-center bg-gradient-to-b from-slate-950/80 to-transparent";

  const linkClasses = scrolled
    ? "text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors text-right"
    : "text-sm font-medium text-slate-200 hover:text-sky-400 transition-colors shadow-black drop-shadow-md";

  // Determine current section label
  const getSectionLabel = () => {
    if (location.pathname === '/experience') return 'Professional';
    if (location.pathname === '/projects') return 'Projects';
    if (location.pathname === '/research') return 'Research';
    return 'Home';
  };

  return (
    <nav className={navClasses}>
      <div className={scrolled ? "flex justify-between items-start px-4 pt-4" : "max-w-7xl mx-auto w-full flex justify-between items-center px-4"}>
        {/* Back Button for non-home pages (only when NOT scrolled) */}
        <div className="pointer-events-auto">
          {!isHome && !scrolled && (
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-2 text-slate-200 hover:text-sky-400 transition-colors"
              aria-label="Back to Home"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">Back to Home</span>
            </button>
          )}
        </div>

        <ul className={ulClasses}>
          {/* Section Header with Back Button when scrolled */}
          {scrolled && (
            <li className="w-full flex items-center justify-between pb-2 mb-2 border-b border-gray-200/50">
              {!isHome ? (
                <button
                  onClick={() => navigate('/')}
                  className="p-1.5 rounded-full text-slate-400 hover:text-sky-500 hover:bg-slate-100 transition-all"
                  aria-label="Back to Home"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
              ) : (
                <span />
              )}
              <span className="text-xs font-extrabold text-slate-500 uppercase tracking-widest">
                {getSectionLabel()}
              </span>
            </li>
          )}

          {links.map(({ id, label }) => (
            <li key={id}>
              <a
                href={`#${id}`}
                className={linkClasses}
                onClick={(e) => {
                  // Smooth scroll handling
                  e.preventDefault();
                  const element = document.getElementById(id);
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;