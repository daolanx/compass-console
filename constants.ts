/**
 * App-wide configuration constants.
 */

// ── Auth ──────────────────────────────────────────────
export const authConfig = {
  /** Paths that don't require authentication. */
  publicPaths: ["/auth", "/login", "/api"],
  /** Where to redirect unauthenticated users. */
  loginPath: "/auth/login",
};

// ── App ───────────────────────────────────────────────
export const siteConfig = {
  name: "Compass Console",
  description: "",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
};
