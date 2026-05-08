// Place any global data in this file.
// You can import this data from anywhere in your site by using the `import` keyword.

export const SITE_TITLE = 'Sane Musings';
export const SITE_DESCRIPTION = 'Thoughts on learning to code and others issues of today.';

// Top-level navigation links.
// Edit these arrays to add, remove, or reorder links.
// On wide screens all links render inline.
// On narrow screens, NAV_PRIMARY render inline and NAV_SECONDARY collapse under "More".
export const NAV_PRIMARY = [
  { href: "/", label: "Home" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
] as const;

export const NAV_SECONDARY = [
  { href: "/wisdom", label: "Wisdom" },
  { href: "/projects", label: "Projects" },
  { href: "/glossary", label: "Glossary" },
] as const;
