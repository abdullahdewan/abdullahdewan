<script setup lang="ts">
const { initNavigationObserver } = useNavigation();
const { initCardSpotlight } = useCardSpotlight();

useHead({
  title: 'Abdullah Dewan — Full-Stack Engineer & Backend Systems Architect',
  htmlAttrs: { lang: 'en' },
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { name: 'theme-color', content: '#060606' },
  ],
  link: [
    {
      rel: 'preload',
      href: '/fonts/rubik-latin.woff2',
      as: 'font',
      type: 'font/woff2',
      crossorigin: 'anonymous',
    },
    {
      rel: 'preload',
      href: '/fonts/rajdhani-700-latin.woff2',
      as: 'font',
      type: 'font/woff2',
      crossorigin: 'anonymous',
    },
    {
      rel: 'preload',
      href: '/fonts/orbitron-bold.woff2',
      as: 'font',
      type: 'font/woff2',
      crossorigin: 'anonymous',
    },
    { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
    { rel: 'icon', type: 'image/png', href: '/favicon.png', sizes: '48x48' },
    { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    { rel: 'apple-touch-icon', href: '/apple-touch-icon.png', sizes: '180x180' },
    { rel: 'canonical', href: 'https://abdullahdewan.com' },
  ],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: 'Abdullah Dewan',
        url: 'https://abdullahdewan.com',
        jobTitle: 'Full-Stack Engineer & Backend Systems Architect',
        sameAs: [
          'https://github.com/abdullahdewan',
          'https://linkedin.com/in/abdullahdewan',
          'https://x.com/xabdullahdewan',
        ],
        knowsAbout: [
          'Vue.js',
          'Nuxt.js',
          'TypeScript',
          'Node.js',
          'Distributed Systems',
          'System Architecture',
          'PostgreSQL',
          'Docker',
        ],
      }),
    },
  ],
});

useSeoMeta({
  title: 'Abdullah Dewan — Full-Stack Engineer & Backend Systems Architect',
  description:
    'Abdullah Dewan - Full-Stack Engineer and Backend Systems Architect specializing in Vue 3, Nuxt 4, TypeScript, Node.js, and high-performance scalable systems.',
  ogTitle: 'Abdullah Dewan — Full-Stack Engineer & Architect',
  ogDescription:
    'Full-Stack Engineer and Backend Systems Architect specializing in Vue 3, Nuxt 4, TypeScript, and high-performance scalable systems.',
  ogType: 'website',
  ogUrl: 'https://abdullahdewan.com',
  ogLocale: 'en_US',
  ogSiteName: 'Abdullah Dewan Portfolio',
  ogImage: 'https://abdullahdewan.com/logo.png',
  twitterCard: 'summary_large_image',
  twitterTitle: 'Abdullah Dewan — Full-Stack Engineer & Architect',
  twitterDescription:
    'Full-Stack Engineer and Backend Systems Architect specializing in Vue 3, Nuxt 4, TypeScript, and high-performance applications.',
  twitterImage: 'https://abdullahdewan.com/logo.png',
});

onMounted(() => {
  initNavigationObserver();
  initCardSpotlight();
});
</script>

<template>
  <div
    class="min-h-screen bg-canvas text-zinc-300 font-sans relative selection:bg-brand selection:text-white"
  >
    <AppHeader />

    <ClientOnly>
      <AppMobileDrawer />
    </ClientOnly>

    <main>
      <HeroSection />

      <!-- Services Section ("Architectural Capabilities & Core Disciplines") -->
      <section
        id="services"
        class="py-20 sm:py-28 lg:py-32 bg-canvas-subtle border-y border-white/5"
      >
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ServicesSection />
        </div>
      </section>

      <!-- About Me Section -->
      <section id="about" class="py-20 sm:py-28 lg:py-32">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AboutSection />
        </div>
      </section>

      <!-- Counter Funfacts Strip -->
      <section class="py-14 sm:py-18 bg-canvas-subtle border-y border-white/5">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <CounterSection />
        </div>
      </section>

      <!-- Portfolio Section ("Latest Projects") -->
      <section id="portfolio" class="py-20 sm:py-28 lg:py-32">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ProjectsSection />
        </div>
      </section>

      <!-- Experience Section ("Commercial Experience") -->
      <section
        id="experience"
        class="py-20 sm:py-28 lg:py-32 bg-canvas-subtle border-y border-white/5"
      >
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ExperienceSection />
        </div>
      </section>

      <!-- Skills Section -->
      <section id="skills" class="py-20 sm:py-28 lg:py-32">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SkillsSection />
        </div>
      </section>

      <!-- Contact Section ("Get In Touch") -->
      <section
        id="contact"
        class="py-20 sm:py-28 lg:py-32 bg-canvas-subtle border-t border-white/5"
      >
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ContactSection />
        </div>
      </section>
    </main>

    <ClientOnly>
      <BackToTop />
    </ClientOnly>

    <AppFooter />
  </div>
</template>
