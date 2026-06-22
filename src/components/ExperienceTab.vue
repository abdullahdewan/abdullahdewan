<script setup lang="ts">
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Terminal, Shield, Cpu, Activity, Server, Database } from 'lucide-vue-next';

interface Event {
  year: string;
  title: string;
  subtitle: string;
  icon: any;
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
    <div class="border-b-2 border-foreground pb-4">
      <h2 class="text-xl uppercase font-bold tracking-tight">LOGGED_OPERATIONS.log</h2>
      <p class="text-xs text-muted-foreground uppercase font-mono mt-1">
        Chronological activity of systems deployment since 2021
      </p>
    </div>
    <div class="pt-2">
      <div class="relative border-l-2 border-foreground/30 pl-6 ml-2 space-y-8 font-mono">
        <!-- Event node -->
        <div v-for="event in timeline" :key="event.year" class="relative">
          <!-- Bullet Node Icon -->
          <div
            class="absolute -left-[35px] top-1 bg-background border-2 border-foreground p-1 z-10"
          >
            <component :is="event.icon" class="size-3.5 text-foreground" />
          </div>

          <div class="space-y-1">
            <span
              class="text-[10px] bg-foreground text-background px-1.5 py-0.5 font-bold uppercase tracking-wider"
            >
              {{ event.year }}
            </span>
            <h3 class="text-sm font-bold text-foreground uppercase mt-1">
              {{ event.title }}
            </h3>
            <h4 class="text-xs text-muted-foreground uppercase">
              {{ event.subtitle }}
            </h4>

            <ul class="list-none space-y-1 mt-3 pl-0 text-xs text-foreground/80">
              <li v-for="bullet in event.description" :key="bullet" class="flex gap-2 items-start">
                <span class="text-foreground font-black select-none">></span>
                <span>{{ bullet }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
