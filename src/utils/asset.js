// Prefix public-folder paths with Vite's base URL so they work both in
// local dev ("/") and on GitHub Pages ("/lagom/"). Runtime string URLs like
// `src="/foo.jpg"` are NOT rewritten by Vite during build — this helper
// handles that gap.
export const asset = (path) =>
  `${import.meta.env.BASE_URL}${String(path).replace(/^\//, "")}`;
