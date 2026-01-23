import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

/**
 * If deploying to:
 * - https://USERNAME.github.io/REPO/  -> base should be "/REPO/"
 * - https://USERNAME.github.io/       -> base should be "/"
 */
export default defineConfig({
  plugins: [react()],
  base: "/PortfolioV2/",
});
