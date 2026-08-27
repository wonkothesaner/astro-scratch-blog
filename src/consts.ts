// Place any global data in this file.
// You can import this data from anywhere in your site by using the `import` keyword.

export const SITE_TITLE = "Sane Musings";
export const SITE_DESCRIPTION =
  "Martin Driscoll's thoughts on how to learn to code if you are over 50 and other issues of today.";

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

// Utility look up on blog categories
export const CATEGORIES = {
  sap: "SAP",
  "50-plus-dev": "Web Dev for 50+",
  miscellany: "Miscellany",
  "life-in-general": "Life in general",
} as const;

export type CategorySlug = keyof typeof CATEGORIES;
