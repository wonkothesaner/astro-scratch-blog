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

// Blog categories live in EmDash (Admin → Taxonomies → Category), not here —
// look them up with `await getTerm("category", slug)` from "emdash". Their
// order on /blog follows the term order you set in the admin.

// /blog shows one collapsible section per category; these start open.
export const BLOG_CATEGORIES_OPEN_BY_DEFAULT: readonly string[] = ["sap", "web-dev-for-sapians"];

// Home page: at most this many pinned posts (a post's "Pin order", 1–3),
// then this many recent posts not already shown as pinned.
export const HOME_PINNED_LIMIT = 3;
export const HOME_RECENT_LIMIT = 5;
