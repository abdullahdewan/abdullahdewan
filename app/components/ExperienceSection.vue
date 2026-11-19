<script setup lang="ts">
import { Server, Cpu, Database, Calendar, Building2 } from '@lucide/vue';
import type { ExperienceTimelineItem } from '~/types';

const timeline: ExperienceTimelineItem[] = [
  {
    year: '2025 - PRESENT',
    title: 'Senior Systems & Architecture Engagements',
    subtitle: 'Independent Software Engineering & Systems Architecture',
    icon: Server,
    achievements: [
      'Architected highly performant, full-stack web applications utilizing Nuxt 4, Vue 3, and Node.js with strict type safety.',
      'Designed custom telemetry collectors and real-time scrapers parsing railway transit and database states with low latency.',
      'Optimized persistence layers with composite indexing, query profiling, and connection pooling across PostgreSQL and MySQL databases.',
    ],
  },
  {
    year: '2023 - 2024',
    title: 'Full-Stack Integration Operations',
    subtitle: 'Consultancy & Client Application Integrations',
    icon: Cpu,
    achievements: [
      'Engineered and scaled real-time WebSocket platforms utilizing Socket.IO, Node.js, and Express server clusters.',
      'Containerized microservices within Docker environments for automated CI/CD pipelines and reproducible deployments.',
      'Managed migration initiatives transitioning legacy persistence systems into hybrid MongoDB and relational structures.',
    ],
  },
  {
    year: '2021 - 2022',
    title: 'Systems Inception & Backend Engineering',
    subtitle: 'Junior Backend & Frontend Operations',
    icon: Database,
    achievements: [
      'Initiated professional commercial operations in backend application logic and relational schema development.',
      'Wrote high-throughput queries, relational tables, and administrative interfaces using PHP, MySQL, and JavaScript.',
      'Built reactive Vue SPA interfaces, optimizing client-side state routing, asset bundling, and server payload efficiency.',
    ],
  },
];
</script>

<template>
  <div class="space-y-12">
    <!-- Clean Section Head -->
    <div class="text-center space-y-4 max-w-3xl mx-auto">
      <h2 class="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white">
        Commercial Experience
      </h2>
      <p class="text-zinc-400 text-base sm:text-lg leading-relaxed">
        A chronological record of production deployments, systems architecture milestones, and
        commercial engineering roles.
      </p>
    </div>

    <div
      class="max-w-4xl mx-auto relative border-l border-white/10 pl-5 sm:pl-10 ml-2 sm:ml-8 space-y-8"
    >
      <div v-for="item in timeline" :key="item.year" class="relative group">
        <!-- Timeline Node Indicator -->
        <div class="timeline-indicator"></div>

        <!-- Experience Card -->
        <div class="card-spotlight p-5 sm:p-8 space-y-5">
          <div
            class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/5"
          >
            <div class="space-y-1">
              <h3 class="text-xl sm:text-2xl font-bold text-white transition-colors">
                {{ item.title }}
              </h3>
              <div class="text-sm text-zinc-400 flex items-center gap-1.5 font-medium">
                <Building2 class="size-4 text-zinc-400" />
                <span>{{ item.subtitle }}</span>
              </div>
            </div>

            <div
              class="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono font-semibold text-zinc-300 shrink-0 self-start sm:self-auto"
            >
              <Calendar class="size-3.5" />
              <span>{{ item.year }}</span>
            </div>
          </div>

          <ul class="space-y-3 text-sm text-zinc-400">
            <li
              v-for="achievement in item.achievements"
              :key="achievement"
              class="flex items-start gap-3 leading-relaxed"
            >
              <span class="w-1.5 h-1.5 rounded-full bg-brand shrink-0 mt-2"></span>
              <span>{{ achievement }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
