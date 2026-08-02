<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { useTheme } from '~/composables/useTheme';

import { useHead } from '#imports';

import { Sun, Moon, Cpu, Coffee, ShieldCheck, Volume2, VolumeX } from 'lucide-vue-next';

import AboutSection from '~/components/AboutSection.vue';
import SkillsSection from '~/components/SkillsSection.vue';
import ProjectsSection from '~/components/ProjectsSection.vue';
import ExperienceSection from '~/components/ExperienceSection.vue';
import ContactSection from '~/components/ContactSection.vue';
import TerminalPrompt from '~/components/TerminalPrompt.vue';
import GlobalTelemetry from '~/components/GlobalTelemetry.vue';
import OperatorIcon from '~/components/OperatorIcon.vue';

useHead({
  title: 'ABDULLAH DEWAN // FULL-STACK ENGINEER',
  htmlAttrs: { lang: 'en' },
  meta: [
    {
      name: 'description',
      content:
        'Abdullah Dewan - Full-Stack Engineer and Backend Systems Architect specializing in Vue, Nuxt, PHP, MySQL, Postgres, and Node.js.',
    },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { name: 'color-scheme', content: 'light dark' },
    { name: 'theme-color', content: '#fffdf5', media: '(prefers-color-scheme: light)' },
    { name: 'theme-color', content: '#0a0a0c', media: '(prefers-color-scheme: dark)' },
    { name: 'og:title', content: 'ABDULLAH DEWAN // FULL-STACK ENGINEER' },
    {
      name: 'og:description',
      content:
        'Abdullah Dewan - Full-Stack Engineer and Backend Systems Architect specializing in Vue, Nuxt, PHP, MySQL, Postgres, and Node.js.',
    },
    { name: 'og:type', content: 'website' },
    { name: 'og:url', content: 'https://abdullahdewan.com' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: 'ABDULLAH DEWAN // FULL-STACK ENGINEER' },
    {
      name: 'twitter:description',
      content:
        'Abdullah Dewan - Full-Stack Engineer and Backend Systems Architect specializing in Vue, Nuxt, PHP, MySQL, Postgres, and Node.js.',
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

// Theme setup
const { colorMode, toggle } = useTheme();
const { isMuted, toggleMute, playClick } = useAudio();

const handleThemeToggle = () => {
  playClick();
  toggle();
};

// Clock telemetry
const timeString = ref('00:00:00 AM LCL');
let timer: ReturnType<typeof setInterval>;

const updateClock = () => {
  const d = new Date();

  const options = {
    hour: '2-digit' as const,
    minute: '2-digit' as const,
    second: '2-digit' as const,
    hour12: true,
  };
  const timePart = d.toLocaleTimeString('en-US', options);

  let tz: string;
  try {
    tz = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
  } catch {
    const timeWithTz = d.toLocaleTimeString('en-US', { timeZoneName: 'short' });
    tz = timeWithTz.split(' ').pop() || '';
  }

  timeString.value = `${timePart} ${tz}`.toUpperCase();
};

// Active section scrollspy state
const activeSection = ref('about');

const sections = [
  { id: 'about', label: 'ABOUT.md', component: AboutSection },
  { id: 'skills', label: 'SKILLS.exe', component: SkillsSection },
  { id: 'projects', label: 'PROJECTS.sh', component: ProjectsSection },
  { id: 'experience', label: 'HISTORY.log', component: ExperienceSection },
  { id: 'contact', label: 'TRANSMIT.cfg', component: ContactSection },
];

const scrollToSection = (id: string) => {
  playClick();
  const el = document.getElementById(`section-${id}`);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};

const isMounted = ref(false);
let observer: IntersectionObserver | null = null;

onMounted(() => {
  isMounted.value = true;
  requestIdleCallback(() => {
    updateClock();
    timer = setInterval(updateClock, 1000);
  });

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
          activeSection.value = entry.target.id.replace('section-', '');
        }
      });
    }, observerOptions);

    sections.forEach((sec) => {
      const el = document.getElementById(`section-${sec.id}`);
      if (el) observer?.observe(el);
    });
  }
});

onUnmounted(() => {
  clearInterval(timer);
  if (observer) {
    observer.disconnect();
  }
});
</script>

<template>
  <div
    class="min-h-screen bg-background text-foreground flex flex-col font-sans selection:bg-primary selection:text-primary-foreground pb-12 relative"
  >
    <!-- Telemetry Header Banner -->
    <header
      class="sticky top-0 z-50 border-b-3 border-black dark:border-white bg-card shadow-[0_4px_0_0_#000000] dark:shadow-[0_4px_0_0_#06b6d4]"
    >
      <div class="mx-auto max-w-7xl flex items-center justify-between px-4 h-16">
        <div class="flex items-center gap-3">
          <div
            class="size-10 flex items-center justify-center bg-primary text-primary-foreground font-black border-2 border-black dark:border-white shadow-[2px_2px_0px_0px_#000000] dark:shadow-[2px_2px_0px_0px_#ffffff] select-none"
          >
            <OperatorIcon class="size-6" />
          </div>
          <div class="leading-none select-none">
            <div class="flex items-center gap-1.5">
              <span class="text-sm font-black uppercase tracking-tight font-heading"
                >ABDULLAH.DEWAN</span
              >
              <span
                class="inline-block w-2 h-3 bg-primary border border-black dark:border-white animate-[pulse_0.8s_infinite]"
              ></span>
            </div>
            <p
              class="text-[9px] text-muted-foreground tracking-wider uppercase mt-1 font-mono font-bold"
            >
              SYS_OPERATOR // SECURE_PORTFOLIO_NODE
            </p>
          </div>
        </div>

        <!-- Live telemetry readout & controls -->
        <div class="flex items-center gap-3">
          <div
            class="hidden sm:flex items-center gap-2 border-l-2 border-black dark:border-white pl-4 text-[10px] font-mono text-foreground font-bold select-none"
          >
            <span
              >SYS_STATUS:
              <span
                class="bg-primary text-primary-foreground px-1.5 py-0.5 border border-black dark:border-white font-black"
                >ONLINE</span
              ></span
            >
            <span class="text-black dark:text-white font-black">|</span>
            <span class="tabular-nums bg-muted px-2 py-0.5 border border-black dark:border-white">{{
              timeString
            }}</span>
          </div>

          <div class="flex items-center gap-2">
            <!-- Theme Toggle -->
            <button
              class="w-9 h-9 flex items-center justify-center bg-card border-2 border-black dark:border-white shadow-[2px_2px_0px_0px_#000000] dark:shadow-[2px_2px_0px_0px_#ffffff] hover:bg-primary transition-all cursor-pointer font-bold"
              aria-label="Toggle Theme"
              @click="handleThemeToggle"
            >
              <template v-if="isMounted">
                <Moon v-if="colorMode === 'dark'" class="size-4 text-foreground" />
                <Sun v-else class="size-4 text-foreground" />
              </template>
              <span v-else class="size-4 block"></span>
            </button>

            <!-- Sound Toggle -->
            <button
              class="w-9 h-9 flex items-center justify-center bg-card border-2 border-black dark:border-white shadow-[2px_2px_0px_0px_#000000] dark:shadow-[2px_2px_0px_0px_#ffffff] hover:bg-secondary transition-all cursor-pointer font-bold"
              :aria-label="isMuted ? 'Unmute telemetry audio' : 'Mute telemetry audio'"
              @click="toggleMute"
            >
              <Volume2 v-if="!isMuted" class="size-4 text-foreground" />
              <VolumeX v-else class="size-4 text-muted-foreground" />
            </button>

            <div
              class="h-9 px-2.5 hidden md:flex items-center justify-center bg-secondary text-secondary-foreground border-2 border-black dark:border-white shadow-[2px_2px_0px_0px_#000000] dark:shadow-[2px_2px_0px_0px_#ffffff] text-[10px] font-mono font-black select-none"
            >
              [NEO_V4.0]
            </div>
          </div>
        </div>
      </div>
    </header>

    <main class="flex-1 max-w-7xl w-full mx-auto px-4 pt-6 space-y-6">
      <!-- Operator Hero Banner -->
      <section
        class="neo-card bg-card p-6 md:p-8 relative overflow-hidden group border-3 border-black dark:border-white shadow-[6px_6px_0px_0px_#000000] dark:shadow-[6px_6px_0px_0px_#06b6d4]"
      >
        <div class="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div class="space-y-3">
            <div
              class="text-[10px] uppercase font-black tracking-widest font-mono flex items-center gap-2 bg-primary text-primary-foreground px-2.5 py-1 inline-flex border-2 border-black dark:border-white shadow-[2px_2px_0px_0px_#000000] dark:shadow-[2px_2px_0px_0px_#ffffff]"
            >
              <span class="inline-block w-2 h-2 bg-black dark:bg-white animate-ping"></span>
              // INITIALIZING OPERATOR IDENTIFICATION...
            </div>
            <h1
              class="text-3xl md:text-5xl font-black uppercase tracking-tight font-heading text-foreground drop-shadow-sm"
            >
              ABDULLAH DEWAN
            </h1>
            <p
              class="text-xs md:text-sm text-foreground uppercase font-mono max-w-xl font-black tracking-wider bg-muted p-2 border-2 border-black dark:border-white"
            >
              [FULL-STACK ENGINEER / BACKEND SYSTEMS ARCHITECT]
            </p>
            <div
              class="text-[10px] md:text-xs text-foreground uppercase font-mono flex flex-wrap gap-2 items-center pt-1"
            >
              <span
                class="font-black bg-black text-white dark:bg-white dark:text-black px-2 py-0.5 border border-black dark:border-white"
                >STACK:</span
              >
              <a
                href="https://developer.mozilla.org/en-US/docs/Web/JavaScript"
                target="_blank"
                rel="noopener noreferrer"
                class="font-black px-2 py-1 bg-yellow-400 text-black border-2 border-black dark:border-white shadow-[2px_2px_0px_0px_#000] hover:-translate-y-0.5 transition-transform"
                >JS</a
              >
              <a
                href="https://www.typescriptlang.org/"
                target="_blank"
                rel="noopener noreferrer"
                class="font-black px-2 py-1 bg-cyan-400 text-black border-2 border-black dark:border-white shadow-[2px_2px_0px_0px_#000] hover:-translate-y-0.5 transition-transform"
                >TS</a
              >
              <a
                href="https://www.php.net/"
                target="_blank"
                rel="noopener noreferrer"
                class="font-black px-2 py-1 bg-purple-400 text-black border-2 border-black dark:border-white shadow-[2px_2px_0px_0px_#000] hover:-translate-y-0.5 transition-transform"
                >PHP</a
              >
              <a
                href="https://www.mysql.com/"
                target="_blank"
                rel="noopener noreferrer"
                class="font-black px-2 py-1 bg-orange-400 text-black border-2 border-black dark:border-white shadow-[2px_2px_0px_0px_#000] hover:-translate-y-0.5 transition-transform"
                >MYSQL</a
              >
              <a
                href="https://www.postgresql.org/"
                target="_blank"
                rel="noopener noreferrer"
                class="font-black px-2 py-1 bg-blue-600 text-white border-2 border-black dark:border-white shadow-[2px_2px_0px_0px_#000] hover:-translate-y-0.5 transition-transform"
                >POSTGRES</a
              >
              <a
                href="https://www.mongodb.com/"
                target="_blank"
                rel="noopener noreferrer"
                class="font-black px-2 py-1 bg-emerald-400 text-black border-2 border-black dark:border-white shadow-[2px_2px_0px_0px_#000] hover:-translate-y-0.5 transition-transform"
                >MONGODB</a
              >
              <a
                href="https://vuejs.org/"
                target="_blank"
                rel="noopener noreferrer"
                class="font-black px-2 py-1 bg-emerald-400 text-black border-2 border-black dark:border-white shadow-[2px_2px_0px_0px_#000] hover:-translate-y-0.5 transition-transform"
                >VUE</a
              >
              <a
                href="https://nuxt.com/"
                target="_blank"
                rel="noopener noreferrer"
                class="font-black px-2 py-1 bg-teal-400 text-black border-2 border-black dark:border-white shadow-[2px_2px_0px_0px_#000] hover:-translate-y-0.5 transition-transform"
                >NUXT</a
              >
            </div>
          </div>

          <div
            class="flex flex-wrap md:flex-col gap-2 shrink-0 md:text-right font-mono text-[10px] font-bold text-foreground uppercase select-none"
          >
            <div
              class="flex items-center gap-1.5 md:justify-end bg-card px-2.5 py-1.5 border-2 border-black dark:border-white shadow-[2px_2px_0px_0px_#000000] dark:shadow-[2px_2px_0px_0px_#ffffff]"
            >
              <Cpu class="size-4 text-foreground" />
              <span>ENV: LINUX_AMD64</span>
            </div>
            <div
              class="flex items-center gap-1.5 md:justify-end bg-primary text-primary-foreground px-2.5 py-1.5 border-2 border-black dark:border-white shadow-[2px_2px_0px_0px_#000000] dark:shadow-[2px_2px_0px_0px_#ffffff]"
            >
              <ShieldCheck class="size-4 text-primary-foreground" />
              <span>SEC: AES_256_GCM</span>
            </div>
            <div
              class="flex items-center gap-1.5 md:justify-end bg-secondary text-secondary-foreground px-2.5 py-1.5 border-2 border-black dark:border-white shadow-[2px_2px_0px_0px_#000000] dark:shadow-[2px_2px_0px_0px_#ffffff]"
            >
              <Coffee class="size-4 text-secondary-foreground" />
              <span>ENG: COFFEE_FUEL</span>
            </div>
          </div>
        </div>
      </section>

      <!-- Main Columns Grid Layout -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        <!-- Left Panel: Interactive Console CLI & Diagnostics -->
        <div class="lg:col-span-1 lg:sticky lg:top-24 space-y-5">
          <div
            class="text-[10px] text-foreground uppercase font-black tracking-wider select-none font-mono flex items-center gap-2 bg-secondary text-secondary-foreground px-3 py-1.5 border-2 border-black dark:border-white shadow-[2px_2px_0px_0px_#000000] dark:shadow-[2px_2px_0px_0px_#ffffff]"
          >
            <span class="w-2 h-2 rounded-none bg-black dark:bg-white animate-pulse"></span>
            // INTERACTIVE_SHELL_INTERFACE
          </div>
          <TerminalPrompt />

          <div
            class="text-[10px] text-foreground uppercase font-black tracking-wider select-none font-mono flex items-center gap-2 bg-primary text-primary-foreground px-3 py-1.5 border-2 border-black dark:border-white shadow-[2px_2px_0px_0px_#000000] dark:shadow-[2px_2px_0px_0px_#ffffff]"
          >
            <span class="w-2 h-2 rounded-none bg-black dark:bg-white animate-pulse"></span>
            // GLOBAL_TELEMETRY_INTERFACE
          </div>
          <GlobalTelemetry />
        </div>

        <!-- Right Panel: Visual GUI Sections -->
        <div class="lg:col-span-2 space-y-6">
          <nav
            aria-label="Section navigation"
            class="sticky top-16 z-40 bg-card border-3 border-black dark:border-white p-3 flex flex-wrap gap-2 items-center select-none shadow-[4px_4px_0px_0px_#000000] dark:shadow-[4px_4px_0px_0px_#06b6d4]"
          >
            <span
              class="text-[10px] text-foreground uppercase font-black mr-1 font-mono bg-muted px-2 py-1 border border-black dark:border-white"
              >// JUMP_TO:</span
            >
            <button
              v-for="section in sections"
              :key="section.id"
              :aria-current="activeSection === section.id ? 'true' : undefined"
              class="px-3 py-1.5 text-[10px] uppercase font-mono font-black transition-all border-2 border-black dark:border-white cursor-pointer select-none"
              :class="
                activeSection === section.id
                  ? 'bg-primary text-primary-foreground shadow-[3px_3px_0px_0px_#000000] dark:shadow-[3px_3px_0px_0px_#06b6d4] -translate-y-0.5'
                  : 'bg-card text-foreground shadow-[2px_2px_0px_0px_#000000] dark:shadow-[2px_2px_0px_0px_#ffffff] hover:bg-muted'
              "
              @click="scrollToSection(section.id)"
            >
              {{ section.label }}
            </button>
          </nav>

          <!-- Sections Stack -->
          <div class="space-y-8">
            <div
              v-for="section in sections"
              :id="`section-${section.id}`"
              :key="section.id"
              class="neo-card bg-card rounded-none flex flex-col scroll-mt-32 overflow-hidden border-3 border-black dark:border-white shadow-[5px_5px_0px_0px_#000000] dark:shadow-[5px_5px_0px_0px_#06b6d4]"
            >
              <!-- Section Header Ribbon -->
              <div
                class="neo-ribbon flex justify-between items-center border-b-3 border-black dark:border-white px-5 py-3 bg-primary text-primary-foreground select-none"
              >
                <span class="text-xs uppercase font-black font-mono tracking-wider">
                  {{ section.label }}
                </span>
                <span
                  class="text-[9px] font-black uppercase font-mono tracking-widest bg-black text-white dark:bg-white dark:text-black px-2 py-0.5 border border-black dark:border-white"
                >
                  SYS_NODE // {{ section.id }}
                </span>
              </div>

              <!-- Section Content -->
              <div class="p-6">
                <component :is="section.component" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- Footer -->
    <footer
      class="mt-12 border-t-3 border-black dark:border-white pt-6 max-w-7xl w-full mx-auto px-4"
    >
      <div
        class="flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[11px] text-foreground font-black uppercase select-none bg-card p-4 border-2 border-black dark:border-white shadow-[4px_4px_0px_0px_#000000] dark:shadow-[4px_4px_0px_0px_#06b6d4]"
      >
        <div>
          <span>© {{ new Date().getFullYear() }} ABDULLAH DEWAN // SECURE NODE</span>
        </div>
        <div class="flex items-center gap-3">
          <a
            href="https://github.com/abdullahdewan"
            target="_blank"
            rel="noopener noreferrer"
            class="bg-primary text-primary-foreground px-2 py-1 border border-black dark:border-white hover:bg-secondary hover:text-secondary-foreground transition-colors font-black"
          >
            GITHUB_NODE
          </a>
          <span class="text-black dark:text-white font-black">|</span>
          <span>SYS_VER: 4.3.0</span>
          <span class="text-black dark:text-white font-black">|</span>
          <span
            class="bg-green-400 text-black px-2 py-0.5 border border-black dark:border-white font-black"
            >STABLE</span
          >
        </div>
      </div>
    </footer>
  </div>
</template>
