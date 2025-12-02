import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Force esbuild minification - do not use terser
  const isProduction = mode === 'production';
  
  return {
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
  esbuild: {
    // Remove console and debugger in production
    drop: isProduction ? ['console', 'debugger'] : [],
    legalComments: 'none', // Remove comments
  },
  build: {
    // CRITICAL: Use esbuild for minification (built into Vite, no terser needed)
    // This prevents the "terser not found" error on hosting
    // DO NOT CHANGE TO 'terser' - esbuild is faster and built-in
    minify: 'esbuild' as const,
    // Optimize chunk splitting
    rollupOptions: {
      output: {
        manualChunks(id) {
          // React and React DOM - core framework
          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom')) {
            return 'react-vendor';
          }
          
          // React Router - routing library
          if (id.includes('node_modules/react-router')) {
            return 'router-vendor';
          }
          
          // React Query - data fetching
          if (id.includes('node_modules/@tanstack/react-query')) {
            return 'query-vendor';
          }
          
          // i18next - internationalization
          if (id.includes('node_modules/i18next') || id.includes('node_modules/react-i18next')) {
            return 'i18n-vendor';
          }
          
          // Framer Motion - animations
          if (id.includes('node_modules/framer-motion')) {
            return 'motion-vendor';
          }
          
          // Recharts - large library, separate chunk (lazy loaded)
          if (id.includes('node_modules/recharts')) {
            return 'chart-vendor';
          }
          
          // Radix UI - large collection of components
          if (id.includes('node_modules/@radix-ui')) {
            return 'radix-vendor';
          }
          
          // Headless UI
          if (id.includes('node_modules/@headlessui')) {
            return 'headless-vendor';
          }
          
          // All other node_modules
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        },
        // Optimize chunk file names
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name?.split('.') || [];
          const ext = info[info.length - 1];
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(ext || '')) {
            return `assets/images/[name]-[hash][extname]`;
          }
          if (/woff2?|eot|ttf|otf/i.test(ext || '')) {
            return `assets/fonts/[name]-[hash][extname]`;
          }
          return `assets/[name]-[hash][extname]`;
        },
      },
      // Ensure proper dependency resolution
      preserveEntrySignatures: 'strict',
    },
    chunkSizeWarningLimit: 1000,
    // Enable source maps only in development
    sourcemap: mode === 'development',
    // Optimize CSS
    cssCodeSplit: true,
    cssMinify: 'esbuild', // Use esbuild for CSS minification too
    // Ensure proper module resolution
    commonjsOptions: {
      include: [/node_modules/],
    },
    // Target modern browsers for smaller bundle
    target: 'esnext',
    // Enable tree shaking
    modulePreload: {
      polyfill: false, // Modern browsers support module preload
    },
  },
  // Optimize dependencies
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      '@tanstack/react-query',
      'i18next',
      'react-i18next',
    ],
    exclude: ['recharts'], // Exclude large libraries that are lazy loaded
  },
  };
});
