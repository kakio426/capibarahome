import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    assetsInlineLimit: 0,
    rollupOptions: {
      output: {
        manualChunks(id) {
          const normalized = id.replaceAll("\\", "/");
          if (normalized.includes("/node_modules/")) {
            if (normalized.includes("/react") || normalized.includes("/react-dom")) {
              return "react-vendor";
            }
            return "vendor";
          }
          if (normalized.includes("/src/assets/generated/")) return "generated-assets";
          if (normalized.includes("/src/config/")) return "game-config";
          if (normalized.includes("/src/systems/")) return "game-runtime";
          if (
            normalized.includes("/src/core/")
            || normalized.includes("/src/game/")
            || normalized.includes("/src/state/")
          ) {
            return "game-runtime";
          }
          if (normalized.includes("/src/ui/")) return "ui";
        },
      },
    },
  },
  server: {
    host: "127.0.0.1",
    port: 5173,
  },
  test: {
    environment: "node",
    globals: true,
    include: ["src/tests/**/*.test.ts"],
  },
});
