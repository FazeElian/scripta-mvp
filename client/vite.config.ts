import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("react-dom")) return "react-core";
          if (id.includes("react-router")) return "react-router";
          if (id.includes("@tanstack")) return "tanstack";
          if (id.includes("sonner")) return "sonner";
        }
      }
    }
  }
})