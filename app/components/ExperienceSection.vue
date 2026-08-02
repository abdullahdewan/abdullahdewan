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
    <div class="border-b-3 border-black dark:border-white pb-4">
      <h2
        class="text-lg font-black font-mono tracking-tight flex items-center gap-2 text-foreground uppercase"
      >
        <span class="w-3 h-5 bg-primary border border-black dark:border-white"></span>
        LOGGED_OPERATIONS.log
      </h2>
      <p class="text-xs text-foreground font-mono font-bold uppercase mt-1">
        Chronological activity of systems deployment since 2021
      </p>
    </div>

    <div class="pt-4 font-sans">
      <div class="relative border-l-4 border-black dark:border-white pl-8 ml-4 space-y-8">
        <!-- Event node -->
        <div v-for="event in timeline" :key="event.year" class="relative group">
          <!-- Bullet Node Icon with Hard Shadow -->
          <div
            class="absolute -left-[49px] top-1 bg-primary border-2 border-black dark:border-white p-2 text-primary-foreground shadow-[2px_2px_0px_0px_#000000] dark:shadow-[2px_2px_0px_0px_#ffffff]"
          >
            <component :is="event.icon" class="size-4" />
          </div>

          <div
            class="bg-card border-3 border-black dark:border-white p-5 shadow-[4px_4px_0px_0px_#000000] dark:shadow-[4px_4px_0px_0px_#06b6d4] space-y-3"
          >
            <span
              class="inline-block text-[9px] bg-secondary text-secondary-foreground border-2 border-black dark:border-white px-2.5 py-1 font-mono font-black uppercase tracking-wider shadow-[2px_2px_0px_0px_#000]"
            >
              {{ event.year }}
            </span>
            <h3 class="text-base font-black text-foreground uppercase tracking-tight font-heading">
              {{ event.title }}
            </h3>
            <h4 class="text-xs text-muted-foreground uppercase font-mono font-bold tracking-wide">
              {{ event.subtitle }}
            </h4>

            <ul
              class="list-none space-y-2 mt-4 pl-0 text-sm text-foreground font-medium border-t-2 border-black dark:border-white pt-3"
            >
              <li
                v-for="bullet in event.description"
                :key="bullet"
                class="flex gap-2 items-start leading-relaxed"
              >
                <span class="text-primary font-black select-none font-mono text-xs mt-0.5"
                  >&gt;</span
                >
                <span>{{ bullet }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
