<script setup lang="ts">
import { ArrowUpRight, ExternalLink, Terminal, Gamepad2, Train } from '@lucide/vue';
import type { Project, ProjectFilterCategory } from '~/types';

const activeFilter = ref<ProjectFilterCategory>('All');

const projects: Project[] = [
  {
    name: 'TrainInfo Live',
    category: 'Fullstack',
    categoryLabel: 'Full-Stack Platform',
    badge: 'Transit Telemetry',
    description:
      'A real-time Bangladesh Railway schedule and train tracking platform featuring clean timetables, live telemetry, and instant station lookups.',
    githubUrl: 'https://github.com/abdullahdewan/traininfo',
    techStack: ['Nuxt 3', 'Vue 3', 'Tailwind CSS', 'Pinia'],
    icon: Train,
    metric: 'Sub-Second Sync',
    telemetryType: 'transit',
  },
  {
    name: 'TicTacToe Realtime',
    category: 'Realtime',
    categoryLabel: 'Interactive WebApp',
    badge: 'WebSocket Cluster',
    description:
      'A multiplayer web game supporting dynamic lobby creation, instant match state syncing over WebSockets, and containerized Docker deployments.',
    githubUrl: 'https://github.com/abdullahdewan/tictactoe',
    techStack: ['Node.js', 'Socket.IO', 'Express', 'MongoDB'],
    icon: Gamepad2,
    metric: 'WebSocket State Sync',
    telemetryType: 'websocket',
  },
  {
    name: 'Renpy to Markdown',
    category: 'Tools',
    categoryLabel: 'Developer CLI Tool',
    badge: 'CLI Parser Core',
    description:
      'A high-speed parser written in Python to convert visual novel scripts into clean documentation and readable Markdown formats.',
    githubUrl: 'https://github.com/abdullahdewan/renpy-to-md',
    techStack: ['Python 3', 'Regex Engine', 'CLI Tooling'],
    icon: Terminal,
    metric: 'High-Speed Parsing',
    telemetryType: 'cli',
  },
];

const filteredProjects = computed(() => {
  if (activeFilter.value === 'All') return projects;
  return projects.filter((p) => p.category === activeFilter.value);
});
</script>

<template>
  <div class="space-y-12">
    <!-- Clean Section Head -->
    <div class="text-center space-y-4 max-w-3xl mx-auto">
      <h2 class="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white">
        My Latest Projects
      </h2>
      <p class="text-zinc-400 text-base sm:text-lg leading-relaxed">
        Production applications, real-time distributed platforms, and developer tooling built with
        architectural rigor.
      </p>

      <!-- Centered Filter Tabs -->
      <div class="pt-4 flex justify-center">
        <div
          class="inline-flex flex-wrap items-center justify-center gap-1 sm:gap-2 p-1.5 rounded-2xl sm:rounded-full bg-white/5 border border-white/10 max-w-full"
        >
          <button
            v-for="filter in ['All', 'Fullstack', 'Realtime', 'Tools'] as const"
            :key="filter"
            type="button"
            :class="[
              'px-3 py-1.5 sm:px-6 sm:py-2.5 rounded-xl sm:rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 cursor-pointer whitespace-nowrap',
              activeFilter === filter
                ? 'bg-brand text-white shadow-md shadow-black/50'
                : 'text-zinc-400 hover:text-white hover:bg-white/5',
            ]"
            @click="activeFilter = filter"
          >
            <span class="sm:hidden">{{ filter }}</span>
            <span class="hidden sm:inline">{{ filter === 'All' ? 'All Systems' : filter }}</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Projects Cards Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
      <div
        v-for="project in filteredProjects"
        :key="project.name"
        class="card-spotlight p-6 sm:p-8 flex flex-col justify-between group"
      >
        <div class="space-y-6">
          <!-- Rich Architecture Preview Card -->
          <div
            v-if="project.telemetryType === 'transit'"
            class="h-44 rounded-xl bg-black/60 border border-white/10 p-4 flex flex-col justify-between font-mono text-xs overflow-hidden group-hover:border-white/20 transition-colors select-none"
          >
            <div class="flex items-center justify-between text-zinc-400">
              <span class="flex items-center gap-1.5 text-emerald-400 font-semibold">
                <span class="size-2 rounded-full bg-emerald-400 animate-pulse"></span>
                LIVE_POLLING // ACTIVE
              </span>
              <span class="text-zinc-400 font-medium">SRV: BR-EAST</span>
            </div>
            <div class="py-2 space-y-1.5 text-zinc-300">
              <div class="flex items-center justify-between text-xs">
                <span class="text-white font-bold">DHAKA</span>
                <span class="text-zinc-400">➔ COMILLA ➔</span>
                <span class="text-white font-bold">CHITTAGONG</span>
              </div>
              <div class="h-1.5 rounded-full bg-white/10 overflow-hidden relative">
                <div class="h-full w-2/3 bg-brand rounded-full"></div>
              </div>
              <div class="flex items-center justify-between text-xs text-zinc-400">
                <span>TRACKING: SUB-SECOND</span>
                <span class="text-emerald-400 font-mono">LATENCY: 14MS</span>
              </div>
            </div>
            <div
              class="flex items-center justify-between text-xs text-zinc-400 pt-1 border-t border-white/5"
            >
              <span class="px-2 py-0.5 rounded-md bg-white/10 text-white font-medium">{{
                project.metric
              }}</span>
              <span class="text-zinc-300">{{ project.badge }}</span>
            </div>
          </div>

          <div
            v-else-if="project.telemetryType === 'websocket'"
            class="h-44 rounded-xl bg-black/60 border border-white/10 p-4 flex flex-col justify-between font-mono text-xs overflow-hidden group-hover:border-white/20 transition-colors select-none"
          >
            <div class="flex items-center justify-between text-zinc-400">
              <span class="flex items-center gap-1.5 text-emerald-400 font-semibold">
                <span class="size-2 rounded-full bg-emerald-400 animate-pulse"></span>
                SOCKET.IO // CLUSTER
              </span>
              <span class="text-zinc-400 font-medium">PORT: 8080</span>
            </div>
            <div class="py-2 space-y-2 text-zinc-300">
              <div
                class="p-2 rounded-lg bg-white/5 border border-white/5 flex items-center justify-around text-xs"
              >
                <span class="text-white font-bold">Client A</span>
                <span class="text-brand font-bold">⇄ MESH ⇄</span>
                <span class="text-white font-bold">Client B</span>
              </div>
              <div class="flex items-center justify-between text-xs text-zinc-400">
                <span>DISPATCH: PUB/SUB</span>
                <span class="text-emerald-400 font-mono">ROOM: #SYNC-PROD</span>
              </div>
            </div>
            <div
              class="flex items-center justify-between text-xs text-zinc-400 pt-1 border-t border-white/5"
            >
              <span class="px-2 py-0.5 rounded-md bg-white/10 text-white font-medium">{{
                project.metric
              }}</span>
              <span class="text-zinc-300">{{ project.badge }}</span>
            </div>
          </div>

          <div
            v-else
            class="h-44 rounded-xl bg-black/60 border border-white/10 p-4 flex flex-col justify-between font-mono text-xs overflow-hidden group-hover:border-white/20 transition-colors select-none"
          >
            <div class="flex items-center justify-between text-zinc-400">
              <span class="flex items-center gap-1.5 text-zinc-300 font-semibold">
                <Terminal class="size-3.5 text-brand" />
                CLI_PARSER // AMD64
              </span>
              <span class="text-emerald-400 font-mono">EXIT: 0</span>
            </div>
            <div class="py-2 space-y-1 text-zinc-300 text-xs leading-relaxed">
              <div class="text-zinc-400">$ renpy-to-md input.rpy -o docs/</div>
              <div class="text-emerald-400">✓ 14,200 AST tokens parsed</div>
              <div class="text-zinc-400 text-xs">OUTPUT: /dist/documentation.md (0.04s)</div>
            </div>
            <div
              class="flex items-center justify-between text-xs text-zinc-400 pt-1 border-t border-white/5"
            >
              <span class="px-2 py-0.5 rounded-md bg-white/10 text-white font-medium">{{
                project.metric
              }}</span>
              <span class="text-zinc-300">{{ project.badge }}</span>
            </div>
          </div>

          <div class="space-y-3">
            <h3
              class="text-2xl font-bold text-white transition-colors flex items-center justify-between"
            >
              <span>{{ project.name }}</span>
              <ArrowUpRight
                class="size-5 opacity-0 -translate-x-1 translate-y-1 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300 text-white"
              />
            </h3>
            <p class="text-zinc-400 text-sm sm:text-base leading-relaxed line-clamp-3">
              {{ project.description }}
            </p>
          </div>
        </div>

        <div
          class="pt-6 border-t border-white/5 mt-6 flex flex-wrap items-center justify-between gap-3"
        >
          <div class="flex flex-wrap gap-2">
            <span
              v-for="tech in project.techStack.slice(0, 3)"
              :key="tech"
              class="text-xs font-mono px-2.5 py-1 rounded-full bg-white/5 text-zinc-300 border border-white/5"
            >
              {{ tech }}
            </span>
          </div>

          <div class="flex items-center gap-2">
            <a
              :href="project.githubUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="px-3.5 py-2 min-h-11 rounded-lg bg-white/5 hover:bg-brand text-zinc-300 hover:text-white transition-all inline-flex items-center gap-2 text-xs font-semibold cursor-pointer"
              aria-label="View Source Repository & Specs"
            >
              <IconGithub class="size-4" />
              <span>Repository & Specs</span>
            </a>
            <a
              v-if="project.liveUrl"
              :href="project.liveUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="p-2.5 min-h-11 min-w-11 rounded-lg bg-white/5 hover:bg-brand text-zinc-300 hover:text-white transition-all inline-flex items-center justify-center cursor-pointer"
              aria-label="Visit Live Deployment"
            >
              <ExternalLink class="size-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
