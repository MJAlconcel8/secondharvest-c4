import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  
  // Ensure assets are built with correct paths
  base: '/',
  
  build: {
    // Output directory
    outDir: 'dist',
    
    // Generate sourcemaps for debugging (optional, remove in production)
    sourcemap: false,
    
    // Asset handling
    assetsDir: 'assets',
    
    // Ensure all assets are included
    rollupOptions: {
      output: {
        // Manual chunking for better caching
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
        },
        // Asset file naming
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name.split('.')
          const ext = info[info.length - 1]
          
          if (/\.(png|jpe?g|svg|gif|tiff|bmp|ico)$/i.test(assetInfo.name)) {
            return `assets/images/[name]-[hash][extname]`
          } else if (/\.(woff2?|eot|ttf|otf)$/i.test(assetInfo.name)) {
            return `assets/fonts/[name]-[hash][extname]`
          }
          
          return `assets/[name]-[hash][extname]`
        },
      },
    },
    
    // Clear output directory before build
    emptyOutDir: true,
  },
  
  // Path resolution
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@assets': path.resolve(__dirname, './src/assets'),
    },
  },
  
  // Development server configuration
  server: {
    port: 5173,
    strictPort: false,
    host: true,
    open: true,
  },
  
  // Preview server configuration
  preview: {
    port: 4173,
    strictPort: false,
    host: true,
    open: true,
  },
})
