<script setup lang="ts">
import { ref, onMounted, onUnmounted, defineAsyncComponent } from 'vue';
import { useTheme } from '~/composables/useTheme';

import { useHead } from '#imports';

import { Sun, Moon, Cpu, Coffee, ShieldCheck, Volume2, VolumeX } from 'lucide-vue-next';

import AboutSection from '~/components/AboutSection.vue';
import OperatorIcon from '~/components/OperatorIcon.vue';

const SkillsSection = defineAsyncComponent(() => import('~/components/SkillsSection.vue'));
const ProjectsSection = defineAsyncComponent(() => import('~/components/ProjectsSection.vue'));
const ExperienceSection = defineAsyncComponent(() => import('~/components/ExperienceSection.vue'));
const ContactSection = defineAsyncComponent(() => import('~/components/ContactSection.vue'));
const TerminalPrompt = defineAsyncComponent(() => import('~/components/TerminalPrompt.vue'));
const GlobalTelemetry = defineAsyncComponent(() => import('~/components/GlobalTelemetry.vue'));

useHead({
  title: 'ABDULLAH DEWAN // FULL-STACK ENGINEER',
  htmlAttrs: { lang: 'en' },
  meta: [
    {
      name: 'description',
      content: 'Abdullah Dewan - Full-Stack Engineer and Backend Systems Architect.',
    },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { name: 'color-scheme', content: 'light dark' },
    { name: 'theme-color', content: '#f8fafc', media: '(prefers-color-scheme: light)' },
    { name: 'theme-color', content: '#030712', media: '(prefers-color-scheme: dark)' },
    { name: 'og:title', content: 'ABDULLAH DEWAN // FULL-STACK ENGINEER' },
    {
      name: 'og:description',
      content: 'Abdullah Dewan - Full-Stack Engineer and Backend Systems Architect.',
    },
    { name: 'og:type', content: 'website' },
    { name: 'og:url', content: 'https://abdullahdewan.com' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: 'ABDULLAH DEWAN // FULL-STACK ENGINEER' },
    {
      name: 'twitter:description',
      content: 'Abdullah Dewan - Full-Stack Engineer and Backend Systems Architect.',
    },
  ],
  link: [
    { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
    { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    { rel: 'canonical', href: 'https://abdullahdewan.com' },
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

  // Format local time as 12-hour AM/PM format
  const options = {
    hour: '2-digit' as const,
    minute: '2-digit' as const,
    second: '2-digit' as const,
    hour12: true,
  };
  const timePart = d.toLocaleTimeString('en-US', options);

  // Get local timezone name (e.g. Asia/Dhaka)
  let tz: string;
  try {
    tz = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
  } catch {
    try {
      const parts = new Intl.DateTimeFormat('en-US', { timeZoneName: 'short' }).formatToParts(d);
      const tzPart = parts.find((p) => p.type === 'timeZoneName');
      tz = tzPart ? tzPart.value : '';
    } catch {
      const offset = -d.getTimezoneOffset();
      const sign = offset >= 0 ? '+' : '-';
      const offsetHrs = String(Math.floor(Math.abs(offset) / 60)).padStart(2, '0');
      tz = `GMT${sign}${offsetHrs}`;
    }
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

  // Setup scrollspy observer
  if (typeof IntersectionObserver !== 'undefined') {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -60% 0px', // Trigger when section is around top-middle
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
    class="min-h-screen bg-background text-foreground flex flex-col font-sans selection:bg-primary/30 selection:text-foreground pb-8 relative"
  >
    <!-- Ambient background glows -->
    <div class="ambient-glow-1"></div>
    <div class="ambient-glow-2"></div>

    <!-- Floating background decorative elements -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none z-0" aria-hidden="true">
      <!-- Element 1: Rotating Code Tag (Top Left) -->
      <div class="float-item animate-float-slow top-[12%] left-[8%]">
        <svg
          class="w-16 h-16 text-primary"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <polyline points="16 18 22 12 16 6"></polyline>
          <polyline points="8 6 2 12 8 18"></polyline>
        </svg>
      </div>

      <!-- Element 2: Floating Custom Bracket (Top Right) -->
      <div class="float-item animate-float-fast top-[18%] right-[10%]">
        <svg
          class="w-20 h-20 text-accent"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="0.8"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path
            d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"
          ></path>
        </svg>
      </div>

      <!-- Element 3: Floating Network Node Grid (Middle Left) -->
      <div class="float-item animate-float-side top-[45%] left-[5%]">
        <svg
          class="w-24 h-24 text-primary"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="0.8"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
        </svg>
      </div>

      <!-- Element 4: Floating Operator Icon Outline (Middle Right) -->
      <div class="float-item animate-float-slow top-[60%] right-[6%]">
        <svg
          class="w-20 h-20 text-primary"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="0.8"
          stroke-linecap="butt"
          stroke-linejoin="miter"
        >
          <path d="M 8 18 L 12 6" />
          <path d="M 11.5 18 L 15.5 6" />
          <path d="M 15.5 6 L 19.7 12 L 11.7 18" stroke="currentColor" />
          <rect x="4.5" y="15.8" width="2" height="2" fill="currentColor" stroke="none" />
        </svg>
      </div>

      <!-- Element 5: Floating Terminal Prompt Symbol (Bottom Left) -->
      <div class="float-item animate-float-fast top-[78%] left-[9%]">
        <svg
          class="w-14 h-14 text-accent"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <polyline points="4 17 10 11 4 5"></polyline>
          <line x1="12" y1="19" x2="20" y2="19"></line>
        </svg>
      </div>

      <!-- Element 6: Floating Hexagonal Core Outline (Bottom Right) -->
      <div class="float-item animate-float-side top-[85%] right-[12%]">
        <svg
          class="w-20 h-20 text-primary"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="0.8"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <polygon points="12 2 22 7 22 17 12 22 2 17 2 7"></polygon>
        </svg>
      </div>
    </div>

    <!-- Telemetry Header Banner -->
    <header class="sticky top-0 z-50 border-b border-border/80 bg-background/70 backdrop-blur-md">
      <div class="mx-auto max-w-7xl flex items-center justify-between px-4 h-16">
        <div class="flex items-center gap-3">
          <div
            class="size-10 flex items-center justify-center bg-primary text-primary-foreground font-black rounded-xl select-none shadow-[0_0_15px_var(--glow-color)]"
          >
            <OperatorIcon class="size-6" />
          </div>
          <div class="leading-none select-none">
            <div class="flex items-center gap-1.5">
              <span class="text-sm font-bold uppercase tracking-tight font-heading"
                >ABDULLAH.DEWAN</span
              >
              <span class="inline-block w-1.5 h-3 bg-primary animate-[pulse_1s_infinite]"></span>
            </div>
            <p class="text-[8px] text-muted-foreground tracking-wider uppercase mt-1 font-mono">
              SYS_OPERATOR // SECURE_PORTFOLIO_NODE
            </p>
          </div>
        </div>

        <!-- Live telemetry readout & controls -->
        <div class="flex items-center gap-3">
          <div
            class="hidden sm:flex items-center gap-2 border-l border-border pl-4 text-[10px] font-mono text-muted-foreground select-none"
          >
            <span>SYS_STATUS: <span class="text-primary font-bold">ONLINE</span></span>
            <span class="text-border">|</span>
            <span class="text-foreground font-bold tabular-nums">{{ timeString }}</span>
          </div>

          <div
            class="flex items-center border border-border bg-card/50 rounded-lg overflow-hidden p-0.5"
          >
            <!-- Theme Toggle -->
            <button
              class="w-8 h-8 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/80 rounded-md transition-colors cursor-pointer"
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
              class="w-8 h-8 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/80 rounded-md transition-colors cursor-pointer border-l border-border/40"
              :aria-label="isMuted ? 'Unmute telemetry audio' : 'Mute telemetry audio'"
              @click="toggleMute"
            >
              <Volume2 v-if="!isMuted" class="size-4 text-primary animate-pulse" />
              <VolumeX v-else class="size-4 text-muted-foreground" />
            </button>

            <div
              class="h-8 px-2 flex items-center justify-center text-muted-foreground text-[10px] font-mono font-bold select-none border-l border-border/40"
            >
              [TS_V4.0]
            </div>
          </div>
        </div>
      </div>
    </header>

    <main class="flex-1 max-w-7xl w-full mx-auto px-4 pt-6 space-y-6">
      <!-- Operator Hero Banner -->
      <section
        class="border border-border/80 bg-card/60 backdrop-blur-md text-card-foreground p-6 md:p-8 rounded-2xl relative overflow-hidden shadow-lg shadow-indigo-950/5 group"
      >
        <div
          class="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-2xl pointer-events-none"
        ></div>
        <div class="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div class="space-y-3">
            <div
              class="text-[10px] uppercase font-bold text-primary tracking-widest font-mono flex items-center gap-1.5"
            >
              <span class="inline-block w-1.5 h-1.5 bg-primary rounded-full animate-ping"></span>
              // INITIALIZING OPERATOR IDENTIFICATION...
            </div>
            <h1
              class="text-3xl md:text-5xl font-black uppercase tracking-tight font-heading bg-clip-text text-transparent bg-linear-to-r from-foreground via-foreground to-primary/80"
            >
              ABDULLAH DEWAN
            </h1>
            <p
              class="text-xs md:text-sm text-foreground/80 uppercase font-mono max-w-xl font-bold tracking-wider"
            >
              [FULL-STACK ENGINEER / BACKEND SYSTEMS ARCHITECT]
            </p>
            <div
              class="text-[10px] md:text-xs text-muted-foreground uppercase font-mono flex flex-wrap gap-x-2 gap-y-2 items-center"
            >
              <span class="mr-1">EST. 2021 // CORE_STACK:</span>
              <a
                href="https://developer.mozilla.org/en-US/docs/Web/JavaScript"
                target="_blank"
                rel="noopener noreferrer"
                class="hover:text-primary transition-all font-bold px-2 py-1 bg-muted/40 hover:bg-primary/10 rounded border border-border/40 text-[9px] tracking-wide"
                >JS</a
              >
              <a
                href="https://www.typescriptlang.org/"
                target="_blank"
                rel="noopener noreferrer"
                class="hover:text-primary transition-all font-bold px-2 py-1 bg-muted/40 hover:bg-primary/10 rounded border border-border/40 text-[9px] tracking-wide"
                >TS</a
              >
              <a
                href="https://www.php.net/"
                target="_blank"
                rel="noopener noreferrer"
                class="hover:text-primary transition-all font-bold px-2 py-1 bg-muted/40 hover:bg-primary/10 rounded border border-border/40 text-[9px] tracking-wide"
                >PHP</a
              >
              <a
                href="https://www.mysql.com/"
                target="_blank"
                rel="noopener noreferrer"
                class="hover:text-primary transition-all font-bold px-2 py-1 bg-muted/40 hover:bg-primary/10 rounded border border-border/40 text-[9px] tracking-wide"
                >MYSQL</a
              >
              <a
                href="https://www.postgresql.org/"
                target="_blank"
                rel="noopener noreferrer"
                class="hover:text-primary transition-all font-bold px-2 py-1 bg-muted/40 hover:bg-primary/10 rounded border border-border/40 text-[9px] tracking-wide"
                >POSTGRES</a
              >
              <a
                href="https://www.mongodb.com/"
                target="_blank"
                rel="noopener noreferrer"
                class="hover:text-primary transition-all font-bold px-2 py-1 bg-muted/40 hover:bg-primary/10 rounded border border-border/40 text-[9px] tracking-wide"
                >MONGODB</a
              >
              <a
                href="https://vuejs.org/"
                target="_blank"
                rel="noopener noreferrer"
                class="hover:text-primary transition-all font-bold px-2 py-1 bg-muted/40 hover:bg-primary/10 rounded border border-border/40 text-[9px] tracking-wide"
                >VUE</a
              >
              <a
                href="https://nuxt.com/"
                target="_blank"
                rel="noopener noreferrer"
                class="hover:text-primary transition-all font-bold px-2 py-1 bg-muted/40 hover:bg-primary/10 rounded border border-border/40 text-[9px] tracking-wide"
                >NUXT</a
              >
            </div>
          </div>

          <div
            class="flex flex-wrap md:flex-col gap-2 shrink-0 md:text-right font-mono text-[9px] text-muted-foreground uppercase select-none"
          >
            <div
              class="flex items-center gap-1.5 md:justify-end bg-muted/40 px-2 py-1 rounded-md border border-border"
            >
              <Cpu class="size-3.5 text-primary" />
              <span>ENV: LINUX_AMD64</span>
            </div>
            <div
              class="flex items-center gap-1.5 md:justify-end bg-muted/40 px-2 py-1 rounded-md border border-border"
            >
              <ShieldCheck class="size-3.5 text-primary" />
              <span>SEC: AES_256_GCM</span>
            </div>
            <div
              class="flex items-center gap-1.5 md:justify-end bg-muted/40 px-2 py-1 rounded-md border border-border"
            >
              <Coffee class="size-3.5 text-primary" />
              <span>ENG: COFFEE_FUEL</span>
            </div>
          </div>
        </div>
      </section>

      <!-- Main Columns Grid Layout -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        <!-- Left Panel: Interactive Console CLI & Diagnostics -->
        <div class="lg:col-span-1 lg:sticky lg:top-24 space-y-4">
          <div
            class="text-[10px] text-muted-foreground uppercase font-bold tracking-wider select-none font-mono flex items-center gap-2"
          >
            <span class="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
            // INTERACTIVE_SHELL_INTERFACE
          </div>
          <TerminalPrompt />

          <div
            class="text-[10px] text-muted-foreground uppercase font-bold tracking-wider select-none font-mono flex items-center gap-2 pt-2"
          >
            <span class="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
            // GLOBAL_TELEMETRY_INTERFACE
          </div>
          <GlobalTelemetry />
        </div>

        <!-- Right Panel: Visual GUI Sections -->
        <div class="lg:col-span-2 space-y-6">
          <div class="flex items-center justify-between select-none">
            <div
              class="text-[10px] text-muted-foreground uppercase font-bold tracking-wider font-mono flex items-center gap-2"
            >
              <span class="w-1.5 h-1.5 rounded-full bg-primary"></span>
              // TELEMETRY_VISUAL_INTERFACE
            </div>
            <div
              class="text-[9px] text-muted-foreground uppercase font-mono bg-muted/50 px-2 py-0.5 rounded border border-border"
            >
              GUI_MODE: STACKED
            </div>
          </div>

          <nav
            aria-label="Section navigation"
            class="sticky top-16 z-40 bg-background/80 backdrop-blur-md border-b border-border/60 py-3 flex flex-wrap gap-2 items-center select-none"
          >
            <span class="text-[10px] text-muted-foreground uppercase font-bold mr-2 font-mono"
              >// JUMP_TO:</span
            >
            <button
              v-for="section in sections"
              :key="section.id"
              :aria-current="activeSection === section.id ? 'true' : undefined"
              class="px-3 py-1.5 text-[10px] uppercase font-mono font-bold transition-all rounded-md cursor-pointer border cyber-tab"
              :class="
                activeSection === section.id
                  ? 'bg-primary text-primary-foreground border-primary shadow-[0_0_12px_var(--glow-color)] cyber-tab-active font-extrabold'
                  : 'text-muted-foreground border-border bg-card/40 hover:text-foreground hover:bg-muted/80'
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
              class="premium-card bg-card/60 backdrop-blur-md rounded-2xl flex flex-col scroll-mt-32 overflow-hidden"
            >
              <!-- Section Header -->
              <div
                class="flex justify-between items-center border-b border-border bg-muted/30 px-5 py-3 select-none"
              >
                <span
                  class="text-xs uppercase font-bold text-foreground font-heading tracking-wider"
                >
                  {{ section.label }}
                </span>
                <span class="text-[9px] text-muted-foreground uppercase font-mono tracking-widest">
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
    <footer class="mt-12 border-t border-border/60 pt-6 max-w-7xl w-full mx-auto px-4">
      <div
        class="flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[10px] text-muted-foreground uppercase select-none"
      >
        <div>
          <span>© {{ new Date().getFullYear() }} ABDULLAH DEWAN // SECURE NODE</span>
        </div>
        <div class="flex items-center gap-3">
          <a
            href="https://github.com/abdullahdewan"
            target="_blank"
            rel="noopener noreferrer"
            class="hover:text-primary transition-colors font-bold underline decoration-primary/30 hover:decoration-primary"
          >
            GITHUB_NODE
          </a>
          <span class="text-border">|</span>
          <span>SYS_VER: 4.3.0</span>
          <span class="text-border">|</span>
          <span class="text-primary font-bold">STABLE</span>
        </div>
      </div>
    </footer>
  </div>
</template>
