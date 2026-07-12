import tailwindcss from '@tailwindcss/vite';

export default defineNuxtConfig({
  css: ['./app/assets/css/style.css'],

  modules: ['@nuxt/eslint', '@nuxtjs/turnstile'],

  turnstile: {
    siteKey: process.env.TURNSTILE_SITE_KEY,
  },

  runtimeConfig: {
    webhookUrl: process.env.WEBHOOK_URL,
    turnstile: {
      secretKey: process.env.TURNSTILE_SECRET_KEY,
    },
  },

  routeRules: {
    '/api/**': { cors: true },
    '/resume': { prerender: true },
  },

  nitro: {
    minify: true,
    compressPublicAssets: true,
    esbuild: {
      options: {
        target: 'esnext',
        minify: true,
        minifyIdentifiers: true,
        minifySyntax: true,
        minifyWhitespace: true,
      },
    },
    routeRules: {
      '/**': { headers: { 'cache-control': 's-maxage=3600, stale-while-revalidate=86400' } },
    },
  },

  app: {
    buildAssetsDir: 'assets',
  },

  vite: {
    plugins: [tailwindcss()],
    build: {
      cssMinify: 'esbuild',
      minify: 'esbuild',
      rollupOptions: {
        output: {
          manualChunks(id: string) {
            if (id.includes('node_modules/vue/')) return 'vue';
            if (id.includes('lucide-vue-next')) return 'icons';
            if (
              id.includes('reka-ui') ||
              id.includes('class-variance-authority') ||
              id.includes('tailwind-merge') ||
              id.includes('clsx')
            )
              return 'ui';
          },
        },
      },
    },
  },

  typescript: { shim: false },

  compatibilityDate: '2025-01-01',
});
