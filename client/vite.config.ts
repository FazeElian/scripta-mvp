import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { visualizer } from "rollup-plugin-visualizer";

export default defineConfig({
  plugins: [react(), visualizer({ open: true })],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    chunkSizeWarningLimit: 500,
    rollupOptions: {
      output: {
        manualChunks(id) {
            if (id.includes("react-dom")) return "react-core";
            if (id.includes("react-router")) return "react-router";
            if (id.includes("@tanstack")) return "tanstack";
            if (id.includes("sonner")) return "sonner";
            if (id.includes("lucide-react")) return "icons";
            if (id.includes("react-zoom-pan-pinch")) return "zoom-pan-pinch";
            if (id.includes("mermaid")) return "mermaid";
            if (id.includes("node_modules")) return "vendor";
        }
      }
    }
  }
})