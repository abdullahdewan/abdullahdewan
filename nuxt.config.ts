import tailwindcss from '@tailwindcss/vite';

export default defineNuxtConfig({
  css: ['~/assets/css/style.css'],

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

  features: {
    inlineStyles: true,
  },

  experimental: {
    payloadExtraction: false,
  },

  routeRules: {
    '/': { prerender: true },
    '/api/**': { cors: true },
    '/sitemap.xml': { prerender: true },
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
      '/fonts/**': {
        headers: {
          'cache-control': 'public, max-age=31536000, immutable',
        },
      },
      '/assets/**': {
        headers: {
          'cache-control': 'public, max-age=31536000, immutable',
        },
      },
      '/tech/**': {
        headers: {
          'cache-control': 'public, max-age=31536000, immutable',
        },
      },
      '/**': {
        headers: {
          'cache-control': 'public, max-age=3600, stale-while-revalidate=86400',
          'x-content-type-options': 'nosniff',
          'x-frame-options': 'DENY',
          'referrer-policy': 'strict-origin-when-cross-origin',
        },
      },
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
            if (id.includes('@lucide/vue')) return 'icons';
          },
        },
      },
    },
  },

  typescript: { shim: false },

  compatibilityDate: '2025-01-01',
});
