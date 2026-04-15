import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
import { mockupPreviewPlugin } from "./mockupPreviewPlugin";

/**
 * =========================
 * SAFE ENV HANDLING (Vercel + Local)
 * =========================
 */

// Vite does NOT need a real server port for build
const port = Number(process.env.PORT) || 5173;

// Base path fallback (important for Vercel + GitHub Pages compatibility)
const basePath = process.env.BASE_PATH || "/";

// Detect Replit environment safely
const isReplit = process.env.REPL_ID !== undefined;

export default defineConfig({
  base: basePath,

  plugins: [
    mockupPreviewPlugin(),
    react(),
    tailwindcss(),
    runtimeErrorOverlay(),

    /**
     * Replit-only tooling (disabled in production builds like Vercel)
     */
    ...(process.env.NODE_ENV !== "production" && isReplit
      ? [
          await import("@replit/vite-plugin-cartographer").then((m) =>
            m.cartographer({
              root: path.resolve(import.meta.dirname, ".."),
            })
          ),
        ]
      : []),
  ],

  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "src"),
    },
  },

  root: path.resolve(import.meta.dirname),

  build: {
    outDir: path.resolve(import.meta.dirname, "dist"),
    emptyOutDir: true,
  },

  /**
   * Dev server config (ONLY used locally, NOT Vercel build)
   */
  server: {
    port,
    host: "0.0.0.0",
    allowedHosts: true,
    fs: {
      strict: true,
      deny: ["**/.*"],
    },
  },

  /**
   * Preview server config
   */
  preview: {
    port,
    host: "0.0.0.0",
    allowedHosts: true,
  },
});
