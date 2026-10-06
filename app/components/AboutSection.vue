<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { Activity, RefreshCw } from 'lucide-vue-next';

const isScanning = ref(false);
const scanProgress = ref(0);
const cpuLoads = ref([38, 22, 54, 30, 48, 16, 65, 40]);
const liveLogs = ref<string[]>([
  'System initialized and listening on port 443',
  'PostgreSQL connection pool verified (0.3ms)',
  'Redis cache tier synchronized',
  'Nitro server route cache warm',
]);

const { playScan, playSuccessLog } = useAudio();

let metricInterval: ReturnType<typeof setInterval>;
onMounted(() => {
  metricInterval = setInterval(() => {
    cpuLoads.value = cpuLoads.value.map((load) => {
      const delta = Math.floor(Math.random() * 17) - 8;
      return Math.max(10, Math.min(95, load + delta));
    });
  }, 2500);
});

onUnmounted(() => {
  clearInterval(metricInterval);
});

const triggerDiagnostics = () => {
  if (isScanning.value) return;
  isScanning.value = true;
  scanProgress.value = 0;
  playScan();

  const interval = setInterval(() => {
    scanProgress.value += 5;
    if (scanProgress.value >= 100) {
      clearInterval(interval);
      isScanning.value = false;
      playSuccessLog();
    }
  }, 60);
};
</script>

<template>
  <div class="space-y-8">
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
      <!-- Main Narrative Column (7 cols) -->
      <div class="lg:col-span-7 space-y-6">
        <div class="space-y-4">
          <h3 class="text-xl md:text-2xl font-bold tracking-tight text-foreground font-heading">
            Engineering resilient backend architectures with modern web interfaces.
          </h3>
          <p class="text-sm md:text-base text-muted-foreground leading-relaxed">
            I am a full-stack engineer and backend systems architect based in Dhaka, Bangladesh.
            Since 2021, I have designed and deployed commercial APIs, high-throughput database
            topologies, and reactive web applications using Vue, Nuxt, Node.js, and modern
            relational database engines.
          </p>
          <p class="text-sm md:text-base text-muted-foreground leading-relaxed">
            My core philosophy revolves around system simplicity, strict type-safety, database query
            performance, and crafting friction-free user experiences.
          </p>
        </div>

        <!-- Key Metrics Cards -->
        <div class="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
          <div class="bg-card border border-border p-4 rounded-xl space-y-1">
            <span class="text-xs text-muted-foreground font-mono">EXPERIENCE</span>
            <div class="text-xl font-bold text-foreground font-heading">
              {{ new Date().getFullYear() - 2021 }}+ Years
            </div>
            <span class="text-[11px] text-muted-foreground block">Commercial work</span>
          </div>

          <div class="bg-card border border-border p-4 rounded-xl space-y-1">
            <span class="text-xs text-muted-foreground font-mono">LOCATION</span>
            <div class="text-xl font-bold text-foreground font-heading">Dhaka, BD</div>
            <span class="text-[11px] text-muted-foreground block">UTC+06:00</span>
          </div>

          <div
            class="bg-card border border-border p-4 rounded-xl space-y-1 col-span-2 sm:col-span-1"
          >
            <span class="text-xs text-muted-foreground font-mono">STATUS</span>
            <div class="text-xl font-bold text-emerald-400 font-heading flex items-center gap-1.5">
              <span class="size-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Available
            </div>
            <span class="text-[11px] text-muted-foreground block">Open to roles</span>
          </div>
        </div>
      </div>

      <!-- Interactive System Diagnostics Widget (5 cols) -->
      <div class="lg:col-span-5 bg-card border border-border rounded-xl p-5 space-y-4">
        <div class="flex items-center justify-between border-b border-border/80 pb-3">
          <div class="flex items-center gap-2">
            <Activity class="size-4 text-accent" />
            <span class="text-xs font-semibold text-foreground font-mono">CORE_DIAGNOSTICS</span>
          </div>
          <span
            class="text-[10px] text-muted-foreground font-mono bg-secondary px-2 py-0.5 rounded-full"
          >
            8x Virtual Cores
          </span>
        </div>

        <!-- Cores Load Histogram -->
        <div class="space-y-3">
          <div class="flex items-center justify-between text-xs font-mono text-muted-foreground">
            <span>REAL-TIME THREAD LOAD</span>
            <span class="text-foreground font-semibold"
              >{{ Math.round(cpuLoads.reduce((a, b) => a + b, 0) / 8) }}% avg</span
            >
          </div>

          <div
            class="grid grid-cols-8 gap-1.5 h-16 items-end bg-background/50 p-2 rounded-lg border border-border/60"
          >
            <div
              v-for="(load, idx) in cpuLoads"
              :key="idx"
              class="w-full bg-secondary rounded-sm overflow-hidden flex flex-col justify-end h-full"
            >
              <div
                class="w-full bg-accent/80 transition-all duration-300 rounded-sm"
                :style="`height: ${load}%`"
              ></div>
            </div>
          </div>
        </div>

        <!-- Live Server Log Feed -->
        <div
          class="bg-background/80 p-3 rounded-lg border border-border/60 space-y-1.5 font-mono text-[11px]"
        >
          <div
            v-for="(log, i) in liveLogs.slice(0, 3)"
            :key="i"
            class="text-muted-foreground truncate flex items-center gap-1.5"
          >
            <span class="text-accent/60">›</span>
            <span>{{ log }}</span>
          </div>
        </div>

        <!-- Action Button -->
        <button
          class="w-full py-2 bg-secondary hover:bg-secondary/80 text-foreground font-mono text-xs font-medium rounded-lg border border-border transition-all flex items-center justify-center gap-2 cursor-pointer"
          :disabled="isScanning"
          @click="triggerDiagnostics"
        >
          <RefreshCw
            class="size-3.5"
            :class="isScanning ? 'animate-spin text-accent' : 'text-muted-foreground'"
          />
          <span>{{ isScanning ? 'Running diagnostic...' : 'Run Diagnostics Check' }}</span>
        </button>
      </div>
    </div>
  </div>
</template>
