import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { visualizer } from "rollup-plugin-visualizer"

export default defineConfig({
  plugins: [
    react(),
    process.env.NODE_ENV !== "production" && visualizer({
      open: true,
      gzipSize: true,
      brotliSize: true,
      filename: "stats.html",
    }),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    chunkSizeWarningLimit: 500,

    // ✅ Vite 8 + Rolldown: rollupOptions still works as the key,
    // but manualChunks is replaced by codeSplitting inside output
    rollupOptions: {
      output: {
        codeSplitting: {
          groups: [
            { name: 'chunk-reactflow', priority: 100, test: /node_modules[\\/]@xyflow/ },
            { name: 'chunk-editor',    priority: 95,  test: /node_modules[\\/](@codemirror|@lezer|codemirror)/ },
            { name: 'chunk-dagre',     priority: 90,  test: /node_modules[\\/]@dagrejs/ },
            { name: 'chunk-d3',        priority: 85,  test: /node_modules[\\/]d3[-/]/ },
            { name: 'chunk-markdown',  priority: 80,  test: /node_modules[\\/](react-markdown|remark|rehype|unified|micromark|mdast|hast|unist|vfile|bail|is-plain-obj|trough|decode-named-character-reference|character-entities)/ },
            { name: 'chunk-react',     priority: 60,  test: /node_modules[\\/](react|react-dom)[\\/]/ },
            { name: 'chunk-router',    priority: 50,  test: /node_modules[\\/]react-router/ },
            { name: 'chunk-tanstack',  priority: 40,  test: /node_modules[\\/]@tanstack/ },
            { name: 'chunk-axios',     priority: 35,  test: /node_modules[\\/]axios/ },
            { name: 'chunk-ui',        priority: 30,  test: /node_modules[\\/](lucide-react|sonner)/ },
            { name: 'chunk-vendor',    priority: 10,  test: /node_modules/ },
            { name: 'chunk-hljs', priority: 45, test: /node_modules[\\/]highlight\.js/ },
          ],
        },
      },
    },
  },
})