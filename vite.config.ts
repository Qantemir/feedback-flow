import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          // React core
          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom')) {
            return 'react-vendor';
          }
          
          // React Router
          if (id.includes('node_modules/react-router')) {
            return 'router-vendor';
          }
          
          // Radix UI components
          if (id.includes('node_modules/@radix-ui')) {
            return 'radix-vendor';
          }
          
          // React Query
          if (id.includes('node_modules/@tanstack/react-query')) {
            return 'query-vendor';
          }
          
          // Recharts (charts library - can be large)
          if (id.includes('node_modules/recharts')) {
            return 'chart-vendor';
          }
          
          // Form libraries
          if (id.includes('node_modules/react-hook-form') || id.includes('node_modules/@hookform') || id.includes('node_modules/zod')) {
            return 'form-vendor';
          }
          
          // i18n
          if (id.includes('node_modules/i18next') || id.includes('node_modules/react-i18next')) {
            return 'i18n-vendor';
          }
          
          // Icons
          if (id.includes('node_modules/lucide-react') || id.includes('node_modules/react-icons')) {
            return 'icons-vendor';
          }
          
          // Date libraries
          if (id.includes('node_modules/date-fns') || id.includes('node_modules/react-day-picker')) {
            return 'date-vendor';
          }
          
          // Other large dependencies
          if (id.includes('node_modules/framer-motion')) {
            return 'motion-vendor';
          }
          
          // All other node_modules
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
}));
