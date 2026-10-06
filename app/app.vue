<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { useHead } from '#imports';
import { Volume2, VolumeX, ArrowRight, Github, Mail, FileText, Terminal } from 'lucide-vue-next';

import ProjectsSection from '~/components/ProjectsSection.vue';
import SkillsSection from '~/components/SkillsSection.vue';
import ExperienceSection from '~/components/ExperienceSection.vue';
import AboutSection from '~/components/AboutSection.vue';
import ContactSection from '~/components/ContactSection.vue';
import TerminalPrompt from '~/components/TerminalPrompt.vue';
import GlobalTelemetry from '~/components/GlobalTelemetry.vue';
import OperatorIcon from '~/components/OperatorIcon.vue';

useHead({
  title: 'Abdullah Dewan — Full-Stack Engineer & Systems Architect',
  htmlAttrs: { lang: 'en', class: 'dark' },
  meta: [
    {
      name: 'description',
      content:
        'Abdullah Dewan - Full-Stack Engineer and Backend Systems Architect specializing in Vue, Nuxt, TypeScript, PHP, PostgreSQL, and Node.js.',
    },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { name: 'theme-color', content: '#030305' },
    { name: 'og:title', content: 'Abdullah Dewan — Full-Stack Engineer & Systems Architect' },
    {
      name: 'og:description',
      content:
        'Abdullah Dewan - Full-Stack Engineer and Backend Systems Architect specializing in Vue, Nuxt, TypeScript, PHP, PostgreSQL, and Node.js.',
    },
    { name: 'og:type', content: 'website' },
    { name: 'og:url', content: 'https://abdullahdewan.com' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: 'Abdullah Dewan — Full-Stack Engineer & Systems Architect' },
    {
      name: 'twitter:description',
      content:
        'Abdullah Dewan - Full-Stack Engineer and Backend Systems Architect specializing in Vue, Nuxt, TypeScript, PHP, PostgreSQL, and Node.js.',
    },
  ],
  link: [
    { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
    { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    { rel: 'canonical', href: 'https://abdullahdewan.com' },
  ],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: 'Abdullah Dewan',
        jobTitle: 'Full-Stack Engineer & Backend Systems Architect',
        url: 'https://abdullahdewan.com',
        sameAs: ['https://github.com/abdullahdewan'],
        knowsAbout: [
          'JavaScript',
          'TypeScript',
          'PHP',
          'MySQL',
          'PostgreSQL',
          'MongoDB',
          'Vue.js',
          'Nuxt.js',
          'Backend Architecture',
        ],
      }),
    },
  ],
});

const { isMuted, toggleMute, playClick } = useAudio();

const activeSection = ref('projects');
const showTerminalDock = ref(false);

const sections = [
  { id: 'projects', label: 'Projects', num: '01' },
  { id: 'skills', label: 'Capabilities', num: '02' },
  { id: 'experience', label: 'Experience', num: '03' },
  { id: 'about', label: 'About', num: '04' },
  { id: 'contact', label: 'Contact', num: '05' },
];

const scrollTo = (id: string) => {
  playClick();
  activeSection.value = id;
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};

let observer: IntersectionObserver | null = null;

onMounted(() => {
  if (typeof window !== 'undefined') {
    const handleChunkError = (e: ErrorEvent | PromiseRejectionEvent) => {
      const errorMsg = 'message' in e ? e.message : e.reason && e.reason.message;
      if (errorMsg && errorMsg.includes('Failed to fetch dynamically imported module')) {
        window.location.reload();
      }
    };
    window.addEventListener('error', handleChunkError, true);
    window.addEventListener('unhandledrejection', handleChunkError, true);
  }

  if (typeof IntersectionObserver !== 'undefined') {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -60% 0px',
      threshold: 0,
    };

    observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          activeSection.value = entry.target.id;
        }
      });
    }, observerOptions);

    sections.forEach((sec) => {
      const el = document.getElementById(sec.id);
      if (el) observer?.observe(el);
    });
  }
});

onUnmounted(() => {
  if (observer) observer.disconnect();
});
</script>

<template>
  <div
    class="min-h-screen bg-background text-foreground flex flex-col font-sans selection:bg-accent/20 selection:text-accent"
  >
    <!-- Top Minimalist Header -->
    <header class="sticky top-0 z-50 border-b border-border/80 bg-background/80 backdrop-blur-md">
      <div class="max-w-6xl mx-auto flex items-center justify-between px-4 sm:px-6 h-14">
        <!-- Logo -->
        <a
          href="/"
          class="flex items-center gap-2 text-sm font-bold text-foreground hover:text-accent transition-colors font-heading"
        >
          <div class="size-6 rounded-md bg-secondary flex items-center justify-center text-accent">
            <OperatorIcon class="size-3.5" />
          </div>
          <span>Abdullah Dewan</span>
        </a>

        <!-- Center Nav Items (Projects-First Order) -->
        <nav
          class="hidden md:flex items-center gap-1 bg-secondary/50 border border-border px-1.5 py-1 rounded-full text-xs font-medium"
        >
          <button
            v-for="sec in sections"
            :key="sec.id"
            class="px-3 py-1 rounded-full transition-all cursor-pointer"
            :class="
              activeSection === sec.id
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            "
            @click="scrollTo(sec.id)"
          >
            {{ sec.label }}
          </button>
        </nav>

        <!-- Right Quick Actions -->
        <div class="flex items-center gap-2">
          <!-- Terminal Dock Toggle Button -->
          <button
            class="h-8 px-2.5 rounded-lg border border-border bg-secondary/50 hover:bg-secondary text-xs font-mono text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5 cursor-pointer"
            :class="showTerminalDock ? 'border-accent text-accent' : ''"
            @click="showTerminalDock = !showTerminalDock"
          >
            <Terminal class="size-3.5" />
            <span class="hidden sm:inline">CLI</span>
          </button>

          <!-- Audio Toggle -->
          <button
            class="h-8 w-8 rounded-lg border border-border bg-secondary/50 hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors flex items-center justify-center cursor-pointer"
            :aria-label="isMuted ? 'Unmute telemetry audio' : 'Mute telemetry audio'"
            @click="toggleMute"
          >
            <Volume2 v-if="!isMuted" class="size-3.5 text-accent" />
            <VolumeX v-else class="size-3.5" />
          </button>

          <a
            href="/resume"
            target="_blank"
            class="h-8 px-3 rounded-lg bg-foreground text-background hover:bg-foreground/90 font-medium text-xs transition-colors hidden sm:flex items-center gap-1.5 cursor-pointer"
          >
            <FileText class="size-3.5" />
            <span>Resume</span>
          </a>
        </div>
      </div>
    </header>

    <!-- Collapsible Interactive Terminal Drawer (if toggled) -->
    <div
      v-if="showTerminalDock"
      class="border-b border-border bg-card/95 backdrop-blur-md px-4 sm:px-6 py-4 transition-all"
    >
      <div class="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-4">
        <div class="md:col-span-8">
          <TerminalPrompt />
        </div>
        <div class="md:col-span-4">
          <GlobalTelemetry />
        </div>
      </div>
    </div>

    <!-- Main Content Container -->
    <main class="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-12 md:py-16 space-y-24">
      <!-- HERO SECTION -->
      <section class="space-y-8 max-w-3xl pt-4">
        <div
          class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary border border-border text-xs text-muted-foreground"
        >
          <span class="size-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>Available for full-stack engineering &amp; architecture roles</span>
        </div>

        <div class="space-y-4">
          <h1
            class="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-foreground font-heading leading-tight"
          >
            Building resilient backend systems &amp; modern web interfaces.
          </h1>
          <p class="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl">
            Full-Stack Engineer &amp; Backend Systems Architect specializing in
            <a
              href="https://www.typescriptlang.org/"
              target="_blank"
              rel="noopener noreferrer"
              class="text-foreground hover:text-accent underline underline-offset-4 transition-colors"
              >TypeScript</a
            >,
            <a
              href="https://nuxt.com/"
              target="_blank"
              rel="noopener noreferrer"
              class="text-foreground hover:text-accent underline underline-offset-4 transition-colors"
              >Nuxt 3</a
            >,
            <a
              href="https://vuejs.org/"
              target="_blank"
              rel="noopener noreferrer"
              class="text-foreground hover:text-accent underline underline-offset-4 transition-colors"
              >Vue</a
            >,
            <a
              href="https://www.php.net/"
              target="_blank"
              rel="noopener noreferrer"
              class="text-foreground hover:text-accent underline underline-offset-4 transition-colors"
              >PHP</a
            >, and high-performance
            <a
              href="https://www.postgresql.org/"
              target="_blank"
              rel="noopener noreferrer"
              class="text-foreground hover:text-accent underline underline-offset-4 transition-colors"
              >relational databases</a
            >.
          </p>
        </div>

        <div class="flex flex-wrap items-center gap-3 pt-2">
          <button
            class="px-5 py-2.5 rounded-lg bg-foreground text-background hover:bg-foreground/90 font-medium text-xs sm:text-sm transition-colors flex items-center gap-2 cursor-pointer"
            @click="scrollTo('projects')"
          >
            <span>Explore Projects</span>
            <ArrowRight class="size-4" />
          </button>
          <button
            class="px-5 py-2.5 rounded-lg bg-secondary hover:bg-secondary/80 border border-border text-foreground font-medium text-xs sm:text-sm transition-colors cursor-pointer"
            @click="scrollTo('contact')"
          >
            Get in Touch
          </button>
        </div>
      </section>

      <!-- SECTION 1: FEATURED PROJECTS & OPEN SOURCE (PROJECTS-FIRST) -->
      <section id="projects" class="space-y-8 scroll-mt-20">
        <div class="flex items-center gap-3 border-b border-border/80 pb-4">
          <span class="text-xs font-mono text-accent">01 //</span>
          <h2 class="text-lg font-bold text-foreground font-heading tracking-tight">
            Selected Work &amp; Open Source
          </h2>
        </div>
        <ProjectsSection />
      </section>

      <!-- SECTION 2: TECHNICAL CAPABILITIES & MATRIX -->
      <section id="skills" class="space-y-8 scroll-mt-20">
        <div class="flex items-center gap-3 border-b border-border/80 pb-4">
          <span class="text-xs font-mono text-accent">02 //</span>
          <h2 class="text-lg font-bold text-foreground font-heading tracking-tight">
            Technical Capabilities
          </h2>
        </div>
        <SkillsSection />
      </section>

      <!-- SECTION 3: CAREER HISTORY & EXPERIENCE -->
      <section id="experience" class="space-y-8 scroll-mt-20">
        <div class="flex items-center gap-3 border-b border-border/80 pb-4">
          <span class="text-xs font-mono text-accent">03 //</span>
          <h2 class="text-lg font-bold text-foreground font-heading tracking-tight">
            Engineering Career &amp; Experience
          </h2>
        </div>
        <ExperienceSection />
      </section>

      <!-- SECTION 4: BIO & SYSTEM DIAGNOSTICS -->
      <section id="about" class="space-y-8 scroll-mt-20">
        <div class="flex items-center gap-3 border-b border-border/80 pb-4">
          <span class="text-xs font-mono text-accent">04 //</span>
          <h2 class="text-lg font-bold text-foreground font-heading tracking-tight">
            About &amp; Overview
          </h2>
        </div>
        <AboutSection />
      </section>

      <!-- SECTION 5: CONTACT TRANSMISSION -->
      <section id="contact" class="space-y-8 scroll-mt-20">
        <div class="flex items-center gap-3 border-b border-border/80 pb-4">
          <span class="text-xs font-mono text-accent">05 //</span>
          <h2 class="text-lg font-bold text-foreground font-heading tracking-tight">
            Contact &amp; Transmission
          </h2>
        </div>
        <ContactSection />
      </section>
    </main>

    <!-- Clean Minimalist Footer -->
    <footer
      class="mt-20 border-t border-border/80 bg-background/80 py-8 px-4 sm:px-6 text-xs text-muted-foreground"
    >
      <div class="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <span
            >© {{ new Date().getFullYear() }} Abdullah Dewan. Engineered with Nuxt 3 &amp; Tailwind
            CSS.</span
          >
        </div>
        <div class="flex items-center gap-4">
          <a
            href="https://github.com/abdullahdewan"
            target="_blank"
            rel="noopener noreferrer"
            class="text-foreground hover:text-accent transition-colors flex items-center gap-1.5"
          >
            <Github class="size-3.5" />
            <span>GitHub</span>
          </a>
          <span>·</span>
          <a
            href="mailto:hello@abdullahdewan.com"
            class="text-foreground hover:text-accent transition-colors flex items-center gap-1.5"
          >
            <Mail class="size-3.5" />
            <span>hello@abdullahdewan.com</span>
          </a>
        </div>
      </div>
    </footer>
  </div>
</template>
