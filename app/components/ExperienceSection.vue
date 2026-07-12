<script setup lang="ts">
import type { Component } from 'vue';
import { Cpu, Server, Database } from 'lucide-vue-next';

interface Event {
  year: string;
  title: string;
  subtitle: string;
  icon: Component;
  description: string[];
}

const timeline: Event[] = [
  {
    year: '2025 - PRESENT',
    title: 'Senior Systems Deployments',
    subtitle: 'Independent Engineering',
    icon: Server,
    description: [
      'Architected highly responsive full-stack applications utilizing Nuxt 3 / Vue 3 and Node.js.',
      'Designed custom scrapers and API systems parsing real-time transit and database states.',
      'Optimized backend services with deep indexing and queries in Postgres and MySQL databases.',
    ],
  },
  {
    year: '2023 - 2024',
    title: 'Full-Stack Integration Operations',
    subtitle: 'Consultancy & Client Integrations',
    icon: Cpu,
    description: [
      'Built and managed real-time websocket platforms utilizing Socket.IO and Express server clusters.',
      'Packaged services inside Docker environments for multi-host devops pipeline deployments.',
      'Spearheaded transition from legacy databases to hybrid NoSQL (MongoDB) and Relational structures.',
    ],
  },
  {
    year: '2021 - 2022',
    title: 'Systems Inception',
    subtitle: 'Junior Backend & Frontend Operations',
    icon: Database,
    description: [
      'Initiated professional commercial operations in backend application logic development.',
      'Coded complex queries, relational tables, and administration interfaces using raw PHP & Javascript.',
      'Integrated Vue SPA environments, optimizing performance, client state routing, and server payloads.',
    ],
  },
];
</script>

<template>
  <div class="space-y-6">
    <div class="border-b border-border/60 pb-4">
      <h2
        class="text-lg font-bold font-heading tracking-tight flex items-center gap-2 text-foreground"
      >
        <span class="w-1 h-5 bg-primary rounded-full"></span>
        LOGGED_OPERATIONS.log
      </h2>
      <p class="text-xs text-muted-foreground uppercase font-mono mt-1">
        Chronological activity of systems deployment since 2021
      </p>
    </div>
    <div class="pt-4 font-sans">
      <div class="relative border-l-2 border-border/70 pl-8 ml-4 space-y-10">
        <!-- Event node -->
        <div v-for="event in timeline" :key="event.year" class="relative group">
          <!-- Bullet Node Icon with Glow -->
          <div
            class="absolute -left-[45px] top-0.5 bg-card border border-border p-2 rounded-xl z-10 transition-all duration-300 group-hover:border-primary group-hover:shadow-[0_0_12px_var(--glow-color)] text-foreground group-hover:text-primary"
          >
            <component :is="event.icon" class="size-4" />
          </div>

          <div class="space-y-2">
            <span
              class="inline-block text-[9px] bg-primary/10 text-primary border border-primary/20 px-2 py-0.5 rounded font-mono font-bold uppercase tracking-wider"
            >
              {{ event.year }}
            </span>
            <h3 class="text-base font-bold text-foreground uppercase tracking-tight">
              {{ event.title }}
            </h3>
            <h4 class="text-xs text-muted-foreground uppercase font-mono font-medium tracking-wide">
              {{ event.subtitle }}
            </h4>

            <ul class="list-none space-y-2 mt-4 pl-0 text-sm text-foreground/80">
              <li
                v-for="bullet in event.description"
                :key="bullet"
                class="flex gap-2 items-start leading-relaxed"
              >
                <span class="text-primary font-black select-none font-mono text-xs mt-0.5">></span>
                <span>{{ bullet }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
