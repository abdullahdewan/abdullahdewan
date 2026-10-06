<script setup lang="ts">
import { Server, Layers, Database, ShieldCheck, Cpu, Workflow } from 'lucide-vue-next';

interface Highlight {
  metric: string;
  label: string;
}

const highlights: Highlight[] = [
  { metric: '5+', label: 'Years Experience' },
  { metric: '20+', label: 'Production Projects' },
  { metric: '99.9%', label: 'Uptime & Quality' },
];

const architectureLayers = [
  {
    layer: 'Presentation & UI',
    tech: 'Nuxt 4 / Vue 3 / Tailwind',
    status: 'OPTIMAL',
    statusColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
    icon: Layers,
  },
  {
    layer: 'API & Orchestration',
    tech: 'Node.js / Express / Socket.IO',
    status: 'HIGH-THROUGHPUT',
    statusColor: 'text-orange-400 bg-orange-500/10 border-orange-500/20',
    icon: Workflow,
  },
  {
    layer: 'Storage & Persistence',
    tech: 'PostgreSQL / MySQL / MongoDB',
    status: 'INDEXED',
    statusColor: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20',
    icon: Database,
  },
  {
    layer: 'Deployment & Runtime',
    tech: 'Docker / Linux AMD64 / CI/CD',
    status: 'CONTAINERIZED',
    statusColor: 'text-purple-400 bg-purple-500/10 border-purple-500/20',
    icon: Server,
  },
];
</script>

<template>
  <div class="relative space-y-12">
    <!-- Top isometric cube decoration -->
    <div
      class="isometric-cube isometric-cube-sm -top-6 -right-2 md:right-8 opacity-80 hidden sm:block"
    ></div>

    <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
      <!-- Left Column: Modern Systems Architecture & Blueprint Spec Block -->
      <div class="lg:col-span-5 flex justify-center items-center w-full">
        <div class="relative w-full max-w-md group">
          <!-- Ambient warm backlight -->
          <div
            class="absolute -inset-2 bg-gradient-to-r from-orange-500/15 via-amber-500/10 to-transparent rounded-2xl blur-xl group-hover:from-orange-500/25 transition-all duration-500"
          ></div>

          <!-- Architecture & Infrastructure Blueprint Card -->
          <div
            class="relative rounded-2xl overflow-hidden border border-white/10 bg-[#161618] p-5 sm:p-6 shadow-2xl space-y-5"
          >
            <!-- Card Title / Terminal Bar -->
            <div class="flex items-center justify-between pb-3 border-b border-white/5">
              <div class="flex items-center gap-2">
                <div class="w-2.5 h-2.5 rounded-full bg-red-500/70"></div>
                <div class="w-2.5 h-2.5 rounded-full bg-yellow-500/70"></div>
                <div class="w-2.5 h-2.5 rounded-full bg-green-500/70"></div>
              </div>
              <span class="text-[11px] font-mono text-zinc-400 flex items-center gap-1.5">
                <Cpu class="size-3 text-primary" />
                <span>stack-architecture.spec</span>
              </span>
            </div>

            <!-- Architecture Stack Layers Pipeline -->
            <div class="space-y-2.5">
              <div
                v-for="item in architectureLayers"
                :key="item.layer"
                class="flex items-center justify-between p-3 rounded-xl bg-black/25 border border-white/5 hover:border-orange-500/30 transition-all duration-200 group/layer"
              >
                <div class="flex items-center gap-3">
                  <div
                    class="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-zinc-300 group-hover/layer:text-primary transition-colors"
                  >
                    <component :is="item.icon" class="size-4" />
                  </div>
                  <div>
                    <div class="text-xs font-bold text-white tracking-wide">
                      {{ item.layer }}
                    </div>
                    <div class="text-[11px] text-zinc-400 font-mono mt-0.5">
                      {{ item.tech }}
                    </div>
                  </div>
                </div>

                <span
                  :class="[
                    'text-[9px] font-mono font-semibold px-2 py-0.5 rounded-full border shrink-0',
                    item.statusColor,
                  ]"
                >
                  {{ item.status }}
                </span>
              </div>
            </div>

            <!-- Bottom System Telemetry / Specs -->
            <div
              class="pt-3 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-zinc-400"
            >
              <div class="flex items-center gap-1.5 text-zinc-300">
                <ShieldCheck class="size-3.5 text-emerald-400" />
                <span>PRODUCTION HARDENED</span>
              </div>
              <span class="text-primary font-bold">100% MODULAR</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Column: Copy / Bio Column -->
      <div class="lg:col-span-7 space-y-6">
        <div>
          <span
            class="text-xs uppercase tracking-widest text-zinc-400 font-medium inline-flex items-center gap-2 mb-3"
          >
            <span class="w-1.5 h-1.5 rounded-full bg-primary"></span>
            About me
          </span>
          <h2
            class="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white leading-tight"
          >
            I will <span class="text-primary">Design & Develop</span> the best websites and scalable
            systems
          </h2>
        </div>

        <p class="text-zinc-400 text-sm sm:text-base leading-relaxed font-normal">
          I am a Full-Stack Software Engineer and Backend Systems Architect with deep expertise in
          Vue, Nuxt, TypeScript, and modern scalable server pipelines. I specialize in turning
          complex business requirements into high-performance, polished digital experiences that
          scale seamlessly.
        </p>

        <p class="text-zinc-400 text-sm sm:text-base leading-relaxed font-normal">
          From resilient distributed databases (Postgres, MySQL, MongoDB) to reactive web interfaces
          and microservices, my focus is delivering bulletproof engineering coupled with thoughtful
          UX design.
        </p>

        <!-- Highlights Row -->
        <div class="grid grid-cols-3 gap-4 pt-4 border-t border-white/5">
          <div v-for="item in highlights" :key="item.label" class="space-y-1">
            <div class="text-xl sm:text-2xl font-extrabold text-white font-sans">
              {{ item.metric }}
            </div>
            <div class="text-xs text-zinc-400 font-medium">{{ item.label }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
