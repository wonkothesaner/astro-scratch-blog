// Place any global data in this file.
// You can import this data from anywhere in your site by using the `import` keyword.

// Site title/description live in EmDash's site settings now (admin-editable),
// not here — use `await getSiteSetting("title" | "tagline")` from "emdash".

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
