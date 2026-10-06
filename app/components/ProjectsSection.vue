<script setup lang="ts">
import { ArrowUpRight } from 'lucide-vue-next';

interface Project {
  name: string;
  description: string;
  category: string;
  url: string;
  githubUrl?: string;
  techStack: string[];
}

const projects: Project[] = [
  {
    name: 'TrainInfo Live',
    category: 'Full-Stack Platform',
    description:
      'A real-time Bangladesh Railway schedule and train tracking platform featuring clean timetables, live telemetry, and instant station lookups.',
    url: 'https://github.com/abdullahdewan/traininfo',
    githubUrl: 'https://github.com/abdullahdewan/traininfo',
    techStack: ['Nuxt 3', 'Vue 3', 'Tailwind', 'Pinia'],
  },
  {
    name: 'TicTacToe Realtime',
    category: 'Interactive WebApp',
    description:
      'A multiplayer web game supporting dynamic lobby creation, instant match state syncing, and containerized Docker deployments.',
    url: 'https://github.com/abdullahdewan/tictactoe',
    githubUrl: 'https://github.com/abdullahdewan/tictactoe',
    techStack: ['Node.js', 'Socket.IO', 'Express', 'MongoDB'],
  },
  {
    name: 'Renpy to Markdown',
    category: 'Developer CLI Tool',
    description:
      'A high-speed parser written in Python to convert visual novel scripts into clean documentation and readable Markdown formats.',
    url: 'https://github.com/abdullahdewan/renpy-to-md',
    githubUrl: 'https://github.com/abdullahdewan/renpy-to-md',
    techStack: ['Python 3', 'Regex Engine', 'CLI'],
  },
];
</script>

<template>
  <div class="space-y-8">
    <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
      <div>
        <span
          class="text-xs uppercase tracking-widest text-zinc-400 font-medium inline-flex items-center gap-2 mb-2"
        >
          <span class="w-1.5 h-1.5 rounded-full bg-primary"></span>
          Portfolio
        </span>
        <h2 class="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
          Featured Works
        </h2>
      </div>
      <a
        href="https://github.com/abdullahdewan"
        target="_blank"
        rel="noopener noreferrer"
        class="text-xs text-zinc-400 hover:text-primary inline-flex items-center gap-1.5 transition-colors font-medium self-start sm:self-auto"
      >
        <span>Explore GitHub repositories</span>
        <ArrowUpRight class="size-3.5" />
      </a>
    </div>

    <!-- Cards Grid -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div
        v-for="project in projects"
        :key="project.name"
        class="group relative bg-[#18181a] hover:bg-[#1d1d20] rounded-2xl p-6 border border-white/5 hover:border-orange-500/30 transition-all duration-300 flex flex-col justify-between"
      >
        <div class="space-y-3">
          <span class="text-[11px] font-mono uppercase tracking-wider text-primary">
            {{ project.category }}
          </span>
          <h3
            class="text-xl font-bold text-white group-hover:text-orange-400 transition-colors flex items-center justify-between"
          >
            <span>{{ project.name }}</span>
          </h3>
          <p class="text-xs sm:text-sm text-zinc-400 leading-relaxed line-clamp-3">
            {{ project.description }}
          </p>
        </div>

        <div class="pt-6 mt-6 border-t border-white/5 flex items-center justify-between">
          <div class="flex flex-wrap gap-1.5">
            <span
              v-for="tech in project.techStack.slice(0, 3)"
              :key="tech"
              class="text-[10px] bg-white/5 text-zinc-400 px-2.5 py-0.5 rounded-full"
            >
              {{ tech }}
            </span>
          </div>

          <a
            :href="project.url"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-1.5 text-xs font-semibold bg-primary text-white hover:bg-orange-600 px-3.5 py-1.5 rounded-full shadow-sm hover:shadow-orange-500/20 transition-all shrink-0 ml-3"
          >
            <span>View live</span>
            <ArrowUpRight class="size-3" />
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
