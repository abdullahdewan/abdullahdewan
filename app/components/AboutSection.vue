<script setup lang="ts">
import {
  Layers,
  Workflow,
  Database,
  Server,
  Zap,
  ShieldCheck,
  ArrowRight,
  ExternalLink,
} from '@lucide/vue';

const architectureLayers = [
  {
    layer: 'Presentation Layer',
    tech: 'Nuxt 4 / Vue 3 / Tailwind CSS v4',
    badge: 'OPTIMAL SSR',
    icon: Layers,
  },
  {
    layer: 'API & Orchestration Layer',
    tech: 'Node.js / Express / Socket.IO',
    badge: 'HIGH-THROUGHPUT',
    icon: Workflow,
  },
  {
    layer: 'Storage & Persistence Layer',
    tech: 'PostgreSQL / MySQL / MongoDB',
    badge: 'INDEX-OPTIMIZED',
    icon: Database,
  },
  {
    layer: 'Deployment & Runtime Layer',
    tech: 'Docker Containers / Linux AMD64',
    badge: 'CONTAINERIZED',
    icon: Server,
  },
];
</script>

<template>
  <div class="space-y-12">
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
      <!-- Left Column (Experience Highlight & Architecture Spec Block) -->
      <div class="lg:col-span-6 space-y-6">
        <div class="card-spotlight p-6 sm:p-10 flex flex-col justify-between">
          <div class="flex items-center justify-between pb-6 border-b border-white/5">
            <div>
              <div
                class="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white font-mono flex items-baseline gap-1"
              >
                <span>3+</span>
              </div>
              <p class="text-zinc-400 text-base font-medium mt-1">
                Years of Commercial Software Engineering
              </p>
            </div>
            <div
              class="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white shrink-0"
            >
              <Zap class="size-7 sm:size-8" />
            </div>
          </div>

          <!-- Architecture Layers Breakdown -->
          <div class="pt-6 space-y-3">
            <div
              v-for="layer in architectureLayers"
              :key="layer.layer"
              class="p-3.5 sm:p-4 rounded-xl bg-white/5 border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-4 hover:border-white/20 transition-colors"
            >
              <div class="flex items-center gap-3 min-w-0">
                <component :is="layer.icon" class="size-5 text-white shrink-0" />
                <div class="min-w-0">
                  <div class="text-sm font-bold text-white">{{ layer.layer }}</div>
                  <div class="text-xs font-mono text-zinc-400">{{ layer.tech }}</div>
                </div>
              </div>
              <span
                class="text-xs font-mono font-semibold px-2.5 py-1 rounded-full bg-white/5 text-zinc-300 border border-white/10 self-start sm:self-auto shrink-0"
              >
                {{ layer.badge }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Column: Heading & Detailed Bio -->
      <div class="lg:col-span-6 space-y-6">
        <div class="space-y-4">
          <h2
            class="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight"
          >
            Engineering High-Throughput <br class="hidden sm:block" />
            Full-Stack Systems
          </h2>
          <p class="text-zinc-400 text-base sm:text-lg leading-relaxed">
            I am a Full-Stack Software Engineer & Backend Systems Architect based in Dhaka,
            Bangladesh. With over 3 years of commercial production experience, I build resilient
            systems where fast client interaction meets dependable, low-latency backend execution.
          </p>
        </div>

        <!-- 2 Mini Feature Cards with In-Flow Icons -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div class="card-spotlight p-6 space-y-3">
            <div class="flex items-center gap-3">
              <Zap class="size-5 text-white shrink-0" />
              <h3 class="text-xl font-bold text-white">Edge Performance</h3>
            </div>
            <p class="text-sm text-zinc-400 leading-relaxed">
              Sub-20ms edge response times, 100/100 Lighthouse benchmark compliance, and lean
              runtime bundles.
            </p>
          </div>

          <div class="card-spotlight p-6 space-y-3">
            <div class="flex items-center gap-3">
              <ShieldCheck class="size-5 text-white shrink-0" />
              <h3 class="text-xl font-bold text-white">Type-Strict Architecture</h3>
            </div>
            <p class="text-sm text-zinc-400 leading-relaxed">
              Comprehensive typed contracts across Vue 3, TypeScript strict mode, and defensive API
              validation.
            </p>
          </div>
        </div>

        <div class="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
          <a
            href="https://github.com/abdullahdewan"
            target="_blank"
            rel="noopener noreferrer"
            class="btn-primary w-full sm:w-auto justify-center"
          >
            <span>GitHub Profile</span>
            <ExternalLink class="size-4" />
          </a>
          <a
            href="https://linkedin.com/in/abdullahdewan"
            target="_blank"
            rel="noopener noreferrer"
            class="btn-outline w-full sm:w-auto justify-center"
          >
            <span>LinkedIn Profile</span>
            <ArrowRight class="size-4" />
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
