import { defineConfig, loadEnv } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import path from "path";

export default ({ mode }: { mode: string }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };
  const ENVIRONS = process.env.ENVIRONS;

  let base = "/";

  if (mode === "production") {
    if (ENVIRONS === "web-local") {
      base = "/";
    } else {
      base = "/music-visualizer-svelte";
    }
  }

  return defineConfig({
    define: {
      __ENVIRONS__: JSON.stringify(ENVIRONS || "web"),
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    base,
    plugins: [svelte()],
    build: {
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes("node_modules")) {
              if (id.includes("three")) {
                return "three";
              }
              return "vendor";
            }
          },
        },
      },
    },
  });
};
