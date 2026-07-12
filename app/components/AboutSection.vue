<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { Terminal as TerminalIcon, Cpu, ShieldCheck, Activity, RefreshCw } from 'lucide-vue-next';

const currentView = ref<'radar' | 'cpu' | 'log'>('radar');
const systemStatus = ref('ONLINE');
const isScanning = ref(false);
const scanProgress = ref(0);
const cpuLoads = ref([42, 28, 65, 34, 51, 19, 78, 44]);
const consoleLogs = ref<string[]>([
  'SYS: CORE PIPELINE INITIALIZED',
  'NET: PORT 443 TUNNEL OPEN',
  'DB: POOL ACQUIRED (0.4ms)',
  'SEC: SYMMETRIC KEY SYNCED',
  'SYS: MEMORY ALLOC NOMINAL',
]);

const { playClick, playTick, playScan, playSuccessLog } = useAudio();

let cpuInterval: ReturnType<typeof setInterval>;
onMounted(() => {
  cpuInterval = setInterval(() => {
    // Generate minor random fluctuations in CPU loads
    cpuLoads.value = cpuLoads.value.map((load) => {
      const change = Math.floor(Math.random() * 21) - 10; // -10 to +10
      return Math.max(8, Math.min(100, load + change));
    });

    // Random console messages
    if (Math.random() > 0.75) {
      const messages = [
        'CACHE: PURGING STALE DATA',
        'DB: QUERY REINDEXED (0.12ms)',
        'SYS: LOAD BALANCER BALANCED',
        'NET: KEEPALIVE TIMEOUT RESET',
        'SYS: GARBAGE COLLECT NOMINAL',
      ];
      consoleLogs.value.unshift(messages[Math.floor(Math.random() * messages.length)] || '');
      if (consoleLogs.value.length > 5) {
        consoleLogs.value.pop();
      }
    }
  }, 2000);
});

onUnmounted(() => {
  clearInterval(cpuInterval);
});

const triggerScan = () => {
  if (isScanning.value) return;
  isScanning.value = true;
  systemStatus.value = 'SCANNING';
  scanProgress.value = 0;

  // Play scanning hum feedback
  playScan();
  const scanSoundInterval = setInterval(() => {
    if (!isScanning.value) {
      clearInterval(scanSoundInterval);
    } else {
      playScan();
    }
  }, 300);

  const interval = setInterval(() => {
    scanProgress.value += 4;
    if (scanProgress.value >= 100) {
      clearInterval(interval);
      isScanning.value = false;
      systemStatus.value = 'OPTIMIZED';
      playSuccessLog();
      setTimeout(() => {
        systemStatus.value = 'ONLINE';
      }, 4000);
    }
  }, 80);
};
</script>

<template>
  <div class="space-y-6">
    <div class="border-b border-border/60 pb-4">
      <h2
        class="text-lg font-bold font-heading tracking-tight flex items-center gap-2 text-foreground"
      >
        <span class="w-1 h-5 bg-primary rounded-full"></span>
        OPERATOR_PROFILE.md
      </h2>
      <p
        class="text-[10px] text-muted-foreground uppercase font-mono mt-1 flex flex-wrap items-center gap-1.5"
      >
        <span>STATUS:</span>
        <span
          class="font-bold transition-colors"
          :class="{
            'text-primary': systemStatus === 'ONLINE',
            'text-amber-500 animate-pulse': systemStatus === 'SCANNING',
            'text-emerald-400': systemStatus === 'OPTIMIZED',
          }"
        >
          {{ systemStatus }}
        </span>
        <span class="text-border">|</span>
        <span>CLEARANCE:</span>
        <span class="text-foreground font-bold">GUEST_ACCESS</span>
      </p>
    </div>

    <div class="space-y-6">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
        <!-- HUD Diagnostics Panel -->
        <div
          class="border border-border bg-card/45 backdrop-blur-md p-4 rounded-xl font-mono text-[10px] leading-relaxed select-none overflow-hidden col-span-1 shadow-inner relative group"
        >
          <!-- HUD Corner decors -->
          <div class="absolute top-0 left-0 w-2 h-2 border-t border-l border-primary/60"></div>
          <div class="absolute top-0 right-0 w-2 h-2 border-t border-r border-primary/60"></div>
          <div class="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-primary/60"></div>
          <div class="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-primary/60"></div>

          <!-- Holographic Display Box -->
          <div
            class="w-full aspect-square bg-muted/30 dark:bg-slate-950 rounded-lg border border-border relative overflow-hidden flex flex-col items-center justify-center p-3 mb-3"
          >
            <div
              class="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.12)_0%,transparent_70%)]"
            ></div>
            <div class="scanline"></div>

            <!-- Scanning Bar overlay -->
            <div
              v-if="isScanning"
              class="absolute top-0 left-0 right-0 h-0.5 bg-amber-500 shadow-[0_0_10px_#f59e0b] opacity-80"
              :style="`transform: translateY(${scanProgress * 2.2}px)`"
            ></div>

            <!-- View 1: Radar HUD -->
            <template v-if="currentView === 'radar'">
              <!-- Tech HUD Circle -->
              <div
                class="w-24 h-24 rounded-full border border-dashed border-primary/40 flex items-center justify-center animate-[spin_30s_linear_infinite] relative"
              >
                <div
                  class="w-20 h-20 rounded-full border border-primary/30 flex items-center justify-center"
                >
                  <div
                    class="w-16 h-16 rounded-full border-2 border-dotted border-primary/20 flex items-center justify-center"
                  ></div>
                </div>
              </div>

              <!-- Terminal Operator Code overlay -->
              <div class="absolute text-[8px] text-primary/70 font-mono top-2 left-2">
                LOC: DHAKA_BD
              </div>
              <div class="absolute text-[8px] text-primary/70 font-mono bottom-2 right-2">
                SYS: {{ systemStatus }}
              </div>

              <div class="absolute text-center mt-1 z-10">
                <TerminalIcon class="size-5 text-primary mx-auto animate-pulse" />
                <div class="text-[9px] uppercase font-bold tracking-wider text-primary mt-1">
                  DEV_CORE
                </div>
              </div>
            </template>

            <!-- View 2: CPU Temperature Core Load -->
            <template v-else-if="currentView === 'cpu'">
              <div class="w-full h-full flex flex-col justify-between pt-1">
                <div
                  class="text-[8px] text-primary/80 uppercase tracking-widest border-b border-border/40 pb-1 mb-1 flex items-center justify-between"
                >
                  <span>CORE LOAD METRICS</span>
                  <span class="text-emerald-400 animate-pulse">● LIVE</span>
                </div>
                <div class="grid grid-cols-4 gap-2 flex-1 items-end pb-1.5 pt-1">
                  <div
                    v-for="(load, index) in cpuLoads.slice(0, 4)"
                    :key="index"
                    class="flex flex-col items-center"
                  >
                    <!-- Progress track -->
                    <div
                      class="w-2.5 h-16 bg-muted/70 dark:bg-slate-900 border border-border/60 rounded-sm relative overflow-hidden flex flex-col justify-end"
                    >
                      <div
                        class="w-full bg-primary transition-all duration-300"
                        :style="`height: ${load}%`"
                      ></div>
                    </div>
                    <span class="text-[7px] text-muted-foreground mt-1">C0{{ index + 1 }}</span>
                  </div>
                  <div
                    v-for="(load, index) in cpuLoads.slice(4, 8)"
                    :key="index"
                    class="flex flex-col items-center"
                  >
                    <!-- Progress track -->
                    <div
                      class="w-2.5 h-16 bg-muted/70 dark:bg-slate-900 border border-border/60 rounded-sm relative overflow-hidden flex flex-col justify-end"
                    >
                      <div
                        class="w-full bg-accent transition-all duration-300"
                        :style="`height: ${load}%`"
                      ></div>
                    </div>
                    <span class="text-[7px] text-muted-foreground mt-1">C0{{ index + 5 }}</span>
                  </div>
                </div>
                <div
                  class="text-[7px] text-muted-foreground flex justify-between border-t border-border/40 pt-1"
                >
                  <span>AVG: {{ Math.round(cpuLoads.reduce((a, b) => a + b, 0) / 8) }}%</span>
                  <span>CLOCK: 4.20 GHz</span>
                </div>
              </div>
            </template>

            <!-- View 3: Log streams -->
            <template v-else-if="currentView === 'log'">
              <div class="w-full h-full flex flex-col justify-between pt-1">
                <div
                  class="text-[8px] text-primary uppercase tracking-widest border-b border-border/40 pb-1 mb-1"
                >
                  SYS TELEMETRY STREAM
                </div>
                <div
                  class="flex-1 flex flex-col gap-1 overflow-hidden p-2 rounded-lg bg-slate-950/90 text-cyan-400 select-none font-mono text-[7px] leading-tight border border-cyan-950/30"
                >
                  <div
                    v-for="(log, idx) in consoleLogs"
                    :key="idx"
                    class="truncate font-bold tracking-tight text-[7px]"
                    :class="idx === 0 ? 'text-primary' : 'text-cyan-400/70'"
                  >
                    &gt; {{ log }}
                  </div>
                </div>
                <div
                  class="text-[7px] text-muted-foreground border-t border-border/40 pt-1.5 flex justify-between"
                >
                  <span>PACKETS: IN/OUT</span>
                  <span class="tabular-nums">SYNC: 100%</span>
                </div>
              </div>
            </template>
          </div>

          <!-- Interaction HUD Controls -->
          <div class="flex gap-1.5 mb-3.5">
            <button
              :aria-pressed="currentView === 'radar'"
              class="flex-1 py-1.5 px-2 border transition-all rounded-md text-[8px] font-bold text-center tracking-wider cursor-pointer uppercase flex items-center justify-center gap-1"
              :class="
                currentView === 'radar'
                  ? 'border-primary bg-primary/10 text-primary shadow-[0_0_8px_var(--glow-color)]'
                  : 'border-border text-muted-foreground bg-muted/20 hover:bg-muted/60 hover:text-foreground'
              "
              @click="
                currentView = 'radar';
                playClick();
              "
              @mouseenter="playTick()"
            >
              <Activity class="size-2.5" />
              Radar
            </button>
            <button
              class="flex-1 py-1.5 px-2 border transition-all rounded-md text-[8px] font-bold text-center tracking-wider cursor-pointer uppercase flex items-center justify-center gap-1"
              :class="
                currentView === 'cpu'
                  ? 'border-primary bg-primary/10 text-primary shadow-[0_0_8px_var(--glow-color)]'
                  : 'border-border text-muted-foreground bg-muted/20 hover:bg-muted/60 hover:text-foreground'
              "
              @click="
                currentView = 'cpu';
                playClick();
              "
              @mouseenter="playTick()"
            >
              <Cpu class="size-2.5" />
              Cores
            </button>
            <button
              class="flex-1 py-1.5 px-2 border transition-all rounded-md text-[8px] font-bold text-center tracking-wider cursor-pointer uppercase flex items-center justify-center gap-1"
              :class="
                currentView === 'log'
                  ? 'border-primary bg-primary/10 text-primary shadow-[0_0_8px_var(--glow-color)]'
                  : 'border-border text-muted-foreground bg-muted/20 hover:bg-muted/60 hover:text-foreground'
              "
              @click="
                currentView = 'log';
                playClick();
              "
              @mouseenter="playTick()"
            >
              <ShieldCheck class="size-2.5" />
              Logs
            </button>
          </div>

          <button
            class="w-full py-2 bg-primary/10 border border-primary/40 hover:border-primary/80 hover:bg-primary/20 transition-all rounded-lg text-[9px] font-bold text-center tracking-widest cursor-pointer uppercase flex items-center justify-center gap-1.5"
            :disabled="isScanning"
            @click="triggerScan"
            @mouseenter="playTick()"
          >
            <RefreshCw class="size-3" :class="isScanning ? 'animate-spin' : ''" />
            {{ isScanning ? 'RUNNING SECURITY DIAGNOSTIC...' : 'ENGAGE SECURITY SCAN' }}
          </button>

          <div
            class="space-y-1.5 border-t border-border/60 pt-3.5 mt-3.5 text-[9px] sm:text-[10px]"
          >
            <div class="flex justify-between">
              <span class="text-muted-foreground">OPERATOR:</span>
              <span class="font-bold text-foreground">A_DEWAN</span>
            </div>
            <div class="flex justify-between">
              <span class="text-muted-foreground">NODE_IP:</span>
              <span class="text-primary font-bold">127.0.0.1</span>
            </div>
            <div class="flex justify-between">
              <span class="text-muted-foreground">UPLINK:</span>
              <span class="text-green-500 dark:text-green-400 font-bold animate-pulse"
                >ACTIVE_TUNNEL</span
              >
            </div>
            <div class="flex justify-between">
              <span class="text-muted-foreground">CORES:</span>
              <span class="text-foreground">8x_VIRTUAL</span>
            </div>
          </div>
        </div>

        <!-- Bio Content -->
        <div class="col-span-1 md:col-span-2 space-y-5">
          <div class="space-y-2">
            <h3
              class="text-xs font-bold uppercase tracking-wider text-primary flex items-center gap-2 font-mono"
            >
              <span class="inline-block w-1.5 h-3 bg-primary rounded-sm"></span>
              BIO_READOUT
            </h3>
            <p class="text-sm leading-relaxed text-foreground/90 font-sans">
              Mainly a full-stack developer with a deep interest and expertise in backend systems.
              Initiated commercial operations in the year 2021. Designed and deployed multiple
              high-performance database architectures, server nodes, and terminal dashboards.
            </p>
          </div>

          <div class="border-t border-dashed border-border pt-4 space-y-3 font-mono text-xs">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div class="bg-card/40 p-2.5 rounded-lg border border-border">
                <span class="text-muted-foreground uppercase text-[9px] block mb-0.5">Role:</span>
                <span class="font-bold text-foreground">Backend & Full-Stack Engineer</span>
              </div>
              <div class="bg-card/40 p-2.5 rounded-lg border border-border">
                <span class="text-muted-foreground uppercase text-[9px] block mb-0.5"
                  >Experience:</span
                >
                <span class="font-bold text-foreground"
                  >Since 2021 ({{ new Date().getFullYear() - 2021 }}+ Years)</span
                >
              </div>
              <div class="bg-card/40 p-2.5 rounded-lg border border-border">
                <span class="text-muted-foreground uppercase text-[9px] block mb-0.5"
                  >Location:</span
                >
                <span class="font-bold text-foreground">Dhaka, Bangladesh</span>
              </div>
              <div class="bg-card/40 p-2.5 rounded-lg border border-border">
                <span class="text-muted-foreground uppercase text-[9px] block mb-0.5"
                  >Primary Status:</span
                >
                <span class="font-bold text-green-500 dark:text-green-400 animate-pulse"
                  >ACTIVE_FOR_HIRE</span
                >
              </div>
            </div>
          </div>

          <div class="bg-primary/5 border-l-2 border-primary p-3 rounded-r-lg">
            <p class="text-xs font-mono text-muted-foreground italic leading-normal">
              "We build clean paths through complex data. In backend, we trust. Security,
              optimization, and maintainability are not choices, they are the baseline
              configuration."
            </p>
          </div>

          <div class="pt-3">
            <a
              href="/resume"
              target="_blank"
              class="w-full py-3 bg-cyan-500/10 border border-cyan-500/40 hover:border-cyan-500/80 hover:bg-cyan-500/20 text-cyan-400 hover:text-white transition-all rounded-xl text-[10px] font-bold text-center tracking-widest font-mono uppercase flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_15px_rgba(6,182,212,0.08)]"
              @click="playClick()"
              @mouseenter="playTick()"
            >
              <svg
                class="size-3.5"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <span>EXPORT RESUME (PDF)</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
