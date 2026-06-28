<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useTheme } from '~/composables/useTheme';

import { useHead } from '@unhead/vue';

useHead({
  title: 'ABDULLAH DEWAN // FULL-STACK ENGINEER',
  meta: [
    { name: 'description', content: 'Abdullah Dewan - Full-Stack Engineer and Backend Systems Architect.' },
    { name: 'theme-color', content: '#000000' }
  ],
  link: [
    { rel: 'icon', type: 'image/svg+xml', href: '/vite.svg' }
  ]
});

import { Terminal as TerminalIcon, Sun, Moon, Cpu, Coffee, ShieldCheck } from 'lucide-vue-next';

// Import components
import AboutTab from '~/components/AboutTab.vue';
import SkillsTab from '~/components/SkillsTab.vue';
import ProjectsTab from '~/components/ProjectsTab.vue';
import ExperienceTab from '~/components/ExperienceTab.vue';
import ContactTab from '~/components/ContactTab.vue';
import TerminalPrompt from '~/components/TerminalPrompt.vue';

// Theme setup
const { colorMode, toggle } = useTheme();

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
  } catch (e) {
    try {
      const parts = new Intl.DateTimeFormat('en-US', { timeZoneName: 'short' }).formatToParts(d);
      const tzPart = parts.find((p) => p.type === 'timeZoneName');
      tz = tzPart ? tzPart.value : '';
    } catch (e2) {
      const offset = -d.getTimezoneOffset();
      const sign = offset >= 0 ? '+' : '-';
      const offsetHrs = String(Math.floor(Math.abs(offset) / 60)).padStart(2, '0');
      tz = `GMT${sign}${offsetHrs}`;
    }
  }

  timeString.value = `${timePart} ${tz}`.toUpperCase();
};

// Active Tab navigation state
const activeTab = ref('about');

const tabs = [
  { id: 'about', label: 'ABOUT.md', component: AboutTab },
  { id: 'skills', label: 'SKILLS.exe', component: SkillsTab },
  { id: 'projects', label: 'PROJECTS.sh', component: ProjectsTab },
  { id: 'experience', label: 'HISTORY.log', component: ExperienceTab },
  { id: 'contact', label: 'TRANSMIT.cfg', component: ContactTab },
];

const activeTabComponent = computed(() => {
  const tab = tabs.find((t) => t.id === activeTab.value);
  return tab ? tab.component : AboutTab;
});

onMounted(() => {
  updateClock();
  timer = setInterval(updateClock, 1000);
});

onUnmounted(() => {
  clearInterval(timer);
});
</script>

<template>
  <div
    class="min-h-screen bg-background text-foreground flex flex-col font-mono selection:bg-foreground selection:text-background pb-8"
  >
    <!-- Telemetry Header Banner -->
    <header class="sticky top-0 z-50 border-b-2 border-foreground bg-background">
      <div class="mx-auto max-w-7xl flex items-center justify-between px-4 h-16">
        <div class="flex items-center gap-3">
          <div
            class="size-9 flex items-center justify-center bg-foreground text-background font-black select-none"
          >
            <TerminalIcon class="size-4" />
          </div>
          <div class="leading-none select-none">
            <div class="flex items-center gap-1.5">
              <span class="text-sm font-bold uppercase tracking-tight">ABDULLAH.DEWAN</span>
              <span class="inline-block w-1.5 h-3 bg-foreground animate-[pulse_1s_infinite]"></span>
            </div>
            <p class="text-[8px] text-muted-foreground tracking-wider uppercase mt-1">
              SYS_OPERATOR // SECURE_PORTFOLIO_NODE
            </p>
          </div>
        </div>

        <!-- Live telemetry readout & controls -->
        <div class="flex items-center gap-3">
          <div
            class="hidden sm:flex items-center gap-2 border-l border-foreground/20 pl-4 text-[10px] font-mono text-muted-foreground select-none"
          >
            <span>SYS_STATUS: <span class="text-foreground font-bold">ONLINE</span></span>
            <span class="text-foreground/20">|</span>
            <span class="text-foreground font-bold tabular-nums">{{ timeString }}</span>
          </div>

          <div class="flex items-center border border-foreground">
            <!-- Theme Toggle -->
            <button
              class="w-9 h-9 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors border-r border-foreground cursor-pointer"
              aria-label="Toggle Theme"
              @click="toggle"
            >
              <Moon v-if="colorMode === 'dark'" class="size-4 text-foreground" />
              <Sun v-else class="size-4 text-foreground" />
            </button>

            <div
              class="h-9 px-3 flex items-center justify-center text-muted-foreground text-[10px] font-bold select-none"
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
        class="border-2 border-foreground bg-card text-card-foreground p-6 relative overflow-hidden terminal-screen"
      >
        <div class="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div class="space-y-2">
            <div
              class="text-[10px] uppercase font-bold text-muted-foreground tracking-widest font-mono"
            >
              // INITIALIZING OPERATOR IDENTIFICATION...
            </div>
            <h1
              class="text-3xl md:text-5xl font-black uppercase tracking-tight text-foreground font-mono"
            >
              ABDULLAH DEWAN
            </h1>
            <p class="text-xs md:text-sm text-foreground/80 uppercase font-mono max-w-xl font-bold">
              [FULL-STACK ENGINEER / BACKEND SYSTEMS ARCHITECT]
            </p>
            <p class="text-[10px] md:text-xs text-muted-foreground uppercase font-mono">
              EST. 2021 // CORE_STACK: JS, TS, PHP, MYSQL, POSTGRES, MONGODB, VUE, NUXT
            </p>
          </div>

          <div
            class="flex flex-wrap md:flex-col gap-2 shrink-0 md:text-right font-mono text-[9px] text-muted-foreground uppercase select-none"
          >
            <div class="flex items-center gap-1.5 md:justify-end">
              <Cpu class="size-3.5 text-foreground" />
              <span>ENV: LINUX_AMD64</span>
            </div>
            <div class="flex items-center gap-1.5 md:justify-end">
              <ShieldCheck class="size-3.5 text-foreground" />
              <span>SEC: AES_256_GCM</span>
            </div>
            <div class="flex items-center gap-1.5 md:justify-end">
              <Coffee class="size-3.5 text-foreground" />
              <span>ENG: COFFEE_FUEL</span>
            </div>
          </div>
        </div>
      </section>

      <!-- Main Columns Grid Layout -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        <!-- Left Panel: Interactive Console CLI -->
        <div class="lg:col-span-1 space-y-4">
          <div
            class="text-[10px] text-muted-foreground uppercase font-bold tracking-wider select-none"
          >
            // INTERACTIVE_SHELL_INTERFACE
          </div>
          <TerminalPrompt />
        </div>

        <!-- Right Panel: Visual GUI Tabs component -->
        <div class="lg:col-span-2 space-y-4">
          <div class="flex items-center justify-between select-none">
            <div class="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">
              // TELEMETRY_VISUAL_INTERFACE
            </div>
            <div class="text-[9px] text-muted-foreground uppercase font-mono">GUI_MODE: ACTIVE</div>
          </div>

          <!-- Unified Card Container with Tab Header -->
          <div class="border-2 border-foreground bg-card text-card-foreground flex flex-col">
            <!-- Tab Bar headers -->
            <div class="flex flex-wrap border-b-2 border-foreground bg-background p-1 select-none">
              <button
                v-for="tab in tabs"
                :key="tab.id"
                @click="activeTab = tab.id"
                class="px-3 py-2 text-xs uppercase font-bold transition-all border border-transparent cursor-pointer"
                :class="
                  activeTab === tab.id
                    ? 'bg-foreground text-background font-black'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                "
              >
                [{{ tab.label }}]
              </button>
            </div>

            <!-- Active tab container -->
            <div class="p-6">
              <keep-alive>
                <component :is="activeTabComponent" />
              </keep-alive>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- Footer -->
    <footer class="mt-8 border-t border-foreground/20 pt-6 max-w-7xl w-full mx-auto px-4">
      <div
        class="flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[10px] text-muted-foreground uppercase select-none"
      >
        <div>
          <span>© {{ new Date().getFullYear() }} ABDULLAH DEWAN // ANONYMOUS PORTFOLIO</span>
        </div>
        <div class="flex items-center gap-3">
          <a
            href="https://github.com/abdullahdewan"
            target="_blank"
            rel="noopener noreferrer"
            class="hover:text-foreground transition-colors font-bold underline"
          >
            GITHUB_NODE
          </a>
          <span>|</span>
          <span>SYS_VER: 4.3.0</span>
          <span>|</span>
          <span class="text-green-500 font-bold">STABLE</span>
        </div>
      </div>
    </footer>
  </div>
</template>
