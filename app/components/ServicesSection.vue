<script setup lang="ts">
import { Layers, Cpu, Database, Server } from '@lucide/vue';
import type { ServiceCapability } from '~/types';

const services: ServiceCapability[] = [
  {
    id: 'fullstack',
    title: 'Full-Stack Web Architecture',
    description:
      'Designing robust, end-to-end web applications with Vue 3 and Nuxt 4, featuring optimized server-side rendering, type-safe client states, and responsive user experiences.',
    icon: Layers,
    tags: ['Nuxt 4 / Vue 3', 'TypeScript Strict', 'SSR / Hydration', 'Tailwind CSS v4'],
  },
  {
    id: 'apis',
    title: 'High-Throughput APIs & Realtime',
    description:
      'Building resilient HTTP/REST endpoints and WebSocket pub/sub microservices engineered for low latency, secure authentication, and high concurrent throughput.',
    icon: Cpu,
    tags: ['Node.js & Express', 'Socket.IO Realtime', 'JWT & Session Auth', 'API Gateways'],
  },
  {
    id: 'database',
    title: 'Database Architecture & Query Tuning',
    description:
      'Architecting relational schemas and document stores with composite indexing, query execution optimization, ACID transaction guarantees, and connection pooling.',
    icon: Database,
    tags: ['PostgreSQL & MySQL', 'MongoDB Documents', 'Query Profiling', 'Schema Migrations'],
  },
  {
    id: 'devops',
    title: 'Containerization & Cloud Runtime',
    description:
      'Packaging services in reproducible multi-stage Docker containers with automated CI/CD pipelines, container health-check monitors, and edge distribution.',
    icon: Server,
    tags: ['Docker Containers', 'Linux AMD64', 'GitHub Actions CI', 'Edge Deployment'],
  },
];
</script>

<template>
  <div class="space-y-12">
    <!-- Clean Section Head -->
    <div class="text-center space-y-4 max-w-3xl mx-auto">
      <h2 class="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white">
        Architectural Capabilities & Core Disciplines
      </h2>
      <p class="text-zinc-400 text-base sm:text-lg leading-relaxed">
        Specialized engineering disciplines anchored in distributed systems, low-latency
        microservices, database query optimization, and resilient cloud container runtimes.
      </p>
    </div>

    <!-- 4 Cards Grid with Side-by-Side Icon & Heading -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
      <div
        v-for="service in services"
        :key="service.id"
        class="card-spotlight p-6 sm:p-8 lg:p-10 flex flex-col justify-between group"
      >
        <div class="space-y-6">
          <div class="flex items-center gap-4">
            <div
              class="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white group-hover:scale-105 group-hover:bg-brand transition-all duration-300 shrink-0"
            >
              <component :is="service.icon" class="size-6" />
            </div>
            <h3 class="text-xl sm:text-2xl font-bold text-white transition-colors">
              {{ service.title }}
            </h3>
          </div>

          <p class="text-zinc-400 text-base leading-relaxed">
            {{ service.description }}
          </p>
        </div>

        <div class="pt-6 border-t border-white/5 flex flex-wrap gap-2 mt-8">
          <span
            v-for="tag in service.tags"
            :key="tag"
            class="text-xs font-mono px-3 py-1.5 rounded-full bg-white/5 text-zinc-300 border border-white/10"
          >
            {{ tag }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
