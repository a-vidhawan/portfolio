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
    ? "fixed top-4 right-4 z-50 transition-all duration-300"
    : "fixed top-0 left-0 w-full z-50 transition-all duration-300 bg-transparent";

  const ulClasses = scrolled
    ? "flex flex-col gap-2 p-3 bg-white/80 backdrop-blur-md rounded shadow-lg items-end"
    : "flex flex-row gap-6 p-6 justify-end items-center bg-gradient-to-b from-slate-950/80 to-transparent";

  const linkClasses = scrolled
    ? "text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors text-right"
    : "text-sm font-medium text-slate-200 hover:text-sky-400 transition-colors shadow-black drop-shadow-md";

  return (
    <nav className={navClasses}>
      <div className={scrolled ? "" : "max-w-7xl mx-auto w-full flex justify-between items-center px-4"}>
        {/* Back Button for non-home pages */}
        {!isHome && (
          <button
            onClick={() => navigate('/')}
            className={`${scrolled ? "hidden" : "flex items-center gap-2 text-slate-200 hover:text-sky-400 transition-colors"}`}
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Back to Home</span>
          </button>
        )}

        {/* Spacer for when back button is hidden or on home page to keep alignment if needed */}
        {/* But since we use justify-end in ulClasses for non-scrolled, we might not need it if we structure correctly.
            Let's keep it simple. If scrolled, the nav is just the floating pill on the right.
            If not scrolled, it's a full width bar.
        */}

        <ul className={ulClasses}>
          {/* If scrolled and not home, show a mini back button in the list? 
               Or maybe keep the back button separate? 
               User asked for "a button on the top left oft he screen to go backl too".
               So the back button logic above handles the top-left requirement when at top.
               When scrolled, the user said "collapses into what it is now". 
               "What it is now" is just the list. 
               So maybe we add a "Home" link to the list when scrolled on non-home pages?
           */}
          {!isHome && scrolled && (
            <li>
              <button
                onClick={() => navigate('/')}
                className={linkClasses}
              >
                ← Home
              </button>
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