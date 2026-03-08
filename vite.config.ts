import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'
import { resolve } from 'path'

export default defineConfig({
  plugins: [
    vue(),
    dts({
      insertTypesEntry: true,
      include: ['src/**/*.ts', 'src/**/*.vue'],
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'QuantUI',
      fileName: 'quant-ui',
    },
    rollupOptions: {
      // Vue ne doit pas être bundlé dans la lib
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue',
        },
        // CSS séparé du JS
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === 'style.css') return 'style.css'
          return assetInfo.name ?? 'asset'
        },
      },
    },
    // Pas de minification pour la lisibilité du code source distribué
    minify: false,
    sourcemap: true,
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
})