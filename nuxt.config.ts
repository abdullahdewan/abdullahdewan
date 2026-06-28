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

  vite: {
    plugins: [tailwindcss()],
  },

  compatibilityDate: '2025-01-01',
});
