import glsl from 'vite-plugin-glsl';
import { defineConfig, loadEnv } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import path from "path";

export default ({ mode }: { mode: string }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };
  const base = mode === "development" ? "/" : "/music-visualizer-svelte";
  return defineConfig({
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    base,
    plugins: [svelte(), glsl()],
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
