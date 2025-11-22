import React from 'react';

/**
 * A simple vertical navigation bar anchored to the top right of the
 * viewport.  Each link corresponds to an element on the page.  The
 * nav uses a translucent background so that it remains legible even
 * when placed over the PCB animation.  Feel free to customise the
 * styling or add active-state tracking via hooks if desired.
 */
function Navbar() {
  const links = [
    { id: 'about', label: 'About' },
    { id: 'professional', label: 'Professional' },
    { id: 'projects', label: 'Projects' },
    { id: 'research', label: 'Research' },
    { id: 'documents', label: 'Documents' },
  ];

  return (
    <nav className="fixed top-4 right-4 z-50">
      <ul className="flex flex-col gap-2 p-3 bg-white/80 backdrop-blur-md rounded shadow-lg">
        {links.map(({ id, label }) => (
          <li key={id}>
            <a
              href={`#${id}`}
              className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
            >
              {label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Navbar;