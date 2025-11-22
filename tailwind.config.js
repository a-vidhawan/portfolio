/**
 * Tailwind CSS configuration for the portfolio project.
 *
 * The `content` array tells Tailwind where to look for classes that
 * should be included in the final CSS.  We scan the HTML entry point
 * as well as every file in the `src` directory.  Feel free to add
 * additional globs if you move files around.
 */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      // Custom colours or spacing can be added here.  For example,
      // you could define a bespoke colour palette that matches your
      // personal brand.
    },
  },
  plugins: [],
};