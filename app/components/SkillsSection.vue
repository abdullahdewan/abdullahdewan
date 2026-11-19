<script setup lang="ts">
import { ArrowUpRight } from '@lucide/vue';
import type { SkillItem } from '~/types';

const skills: SkillItem[] = [
  {
    name: 'Vue.js & Nuxt 4',
    icon: '/tech/nuxt.svg',
    category: 'Full-Stack Framework',
    description: 'Server-side rendering, universal state hydration, and reactive UI architecture.',
    url: 'https://nuxt.com',
  },
  {
    name: 'TypeScript',
    icon: '/tech/typescript.svg',
    category: 'Strict Type System',
    description: 'Strict type safety across API boundaries, data models, and component contracts.',
    url: 'https://www.typescriptlang.org',
  },
  {
    name: 'Node.js & Express',
    icon: '/tech/nodejs.svg',
    category: 'Backend & APIs',
    description: 'High-throughput microservices, REST endpoints, and WebSocket pub/sub engines.',
    url: 'https://nodejs.org',
  },
  {
    name: 'PostgreSQL & MySQL',
    icon: '/tech/postgresql.svg',
    category: 'Relational Database',
    description:
      'Relational schema design, query plan optimization, indexing, and ACID transactions.',
    url: 'https://www.postgresql.org',
  },
  {
    name: 'Docker & Linux',
    icon: '/tech/docker.svg',
    category: 'Infrastructure & DevOps',
    description:
      'Containerized deployment pipelines, multi-stage builds, and edge environment configuration.',
    url: 'https://www.docker.com',
  },
  {
    name: 'Tailwind CSS v4',
    icon: '/tech/tailwindcss.svg',
    category: 'Modern UI Engine',
    description:
      'Engineered design systems, sub-millisecond compile times, and responsive layouts.',
    url: 'https://tailwindcss.com',
  },
];
</script>

<template>
  <div class="space-y-12">
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
      <!-- Left Column -->
      <div class="lg:col-span-5 space-y-6">
        <div class="space-y-4">
          <h2
            class="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight"
          >
            Core Areas Where <br class="hidden sm:block" />
            I Deliver Depth
          </h2>
          <p class="text-zinc-400 text-base sm:text-lg leading-relaxed">
            Over years of commercial development, I've honed deep specializations in full-stack
            engineering, distributed systems, and modern database performance.
          </p>
        </div>

        <div class="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-3">
          <div class="text-xs font-mono font-bold text-white uppercase tracking-wider">
            Architectural Standard
          </div>
          <p class="text-sm text-zinc-400 leading-relaxed">
            Every layer from the client UI down to database execution plans is built for
            determinism, resilience, and strict type verification.
          </p>
        </div>
      </div>

      <!-- Right Column -->
      <div class="lg:col-span-7">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
          <a
            v-for="skill in skills"
            :key="skill.name"
            :href="skill.url"
            target="_blank"
            rel="noopener noreferrer"
            :aria-label="`Visit ${skill.name} official documentation`"
            class="card-spotlight p-6 flex flex-col justify-between group"
          >
            <div class="space-y-4">
              <div class="flex items-center justify-between">
                <div
                  class="w-12 h-12 rounded-xl bg-white/5 border border-white/10 p-2.5 flex items-center justify-center group-hover:scale-110 group-hover:border-white/20 transition-all duration-300"
                >
                  <img
                    :src="skill.icon"
                    :alt="`${skill.name} Icon`"
                    class="w-full h-full object-contain"
                  />
                </div>
                <ArrowUpRight
                  class="size-4 text-zinc-400 group-hover:text-white transition-colors"
                />
              </div>

              <div class="space-y-1.5">
                <h3 class="text-lg sm:text-xl font-bold text-white transition-colors">
                  {{ skill.name }}
                </h3>
                <p class="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                  {{ skill.description }}
                </p>
              </div>
            </div>

            <div class="pt-4 border-t border-white/5 mt-4 flex items-center justify-between">
              <span class="text-xs font-mono text-zinc-400 font-semibold">
                {{ skill.category }}
              </span>
              <span
                class="text-xs font-mono text-zinc-400 group-hover:text-zinc-200 transition-colors flex items-center gap-1"
              >
                <span>Docs</span>
                <ArrowUpRight class="size-3" />
              </span>
            </div>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
