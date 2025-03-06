import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import sitemap from "vite-plugin-sitemap";

export default defineConfig({
  plugins: [
    react(),
    sitemap({
      hostname: "https://tiptamcode.com", //si tu ne lie pas sa ne marchera pas
      routes: ["/services", "/contact ", "apropos", "realisation", "/"],
    }), // Remplace par ton domaine
  ],

  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            if (id.includes("react")) return "vendor-react"; // Sépare React
            if (id.includes("lucide-react")) return "icons"; // Sépare les icônes
            return "vendor"; // Groupe les autres libs
          }
        },
      },
    },
    chunkSizeWarningLimit: 1000, // Augmente la limite (1000 = 1 Mo)
    outDir: "dist", // Assurez-vous que la sortie est "dist"
    sourcemap: true,
  },
});
