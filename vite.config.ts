import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    headers: {
      "Permissions-Policy": "geolocation=(), microphone=(), camera=(), payment=(), usb=(), magnetometer=(), gyroscope=(), speaker=()",
    },
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
          // Recharts - large library, separate chunk (lazy loaded)
          if (id.includes('node_modules/recharts')) {
            return 'chart-vendor';
          }
          
          // Radix UI - large collection of components
          if (id.includes('node_modules/@radix-ui')) {
            return 'radix-vendor';
          }
          
          // All other node_modules (including React) go to vendor chunk
          // This ensures React is loaded synchronously with the main bundle
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        },
      },
      // Ensure proper dependency resolution
      preserveEntrySignatures: 'strict',
    },
    chunkSizeWarningLimit: 1000,
    // Ensure proper module resolution
    commonjsOptions: {
      include: [/node_modules/],
    },
  },
}));
