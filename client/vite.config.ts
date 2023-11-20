import react from "@vitejs/plugin-react";
import dotenv from "dotenv";
import path from "path";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig(({ mode }) => {
  const envFile = mode === "development" ? ".env" : ".env.production";
  dotenv.config({ path: envFile });
  return {
    plugins: [react(), tsconfigPaths()],
    build: {
      outDir: "build",
      assetsDir: "assets",
      emptyOutDir: true,
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
