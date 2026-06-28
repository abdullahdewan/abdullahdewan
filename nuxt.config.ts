import tailwindcss from '@tailwindcss/vite';

export default defineNuxtConfig({
  srcDir: 'src/',
  css: ['~/style.css'],

  modules: ['@nuxtjs/turnstile'],

  turnstile: {
    siteKey: process.env.TURNSTILE_SITE_KEY,
  },

  runtimeConfig: {
    webhookUrl: process.env.WEBHOOK_URL,
    turnstile: {
      secretKey: process.env.TURNSTILE_SECRET_KEY,
    },
  },

  vite: {
    plugins: [tailwindcss()],
  },

  compatibilityDate: '2025-01-01',
});
