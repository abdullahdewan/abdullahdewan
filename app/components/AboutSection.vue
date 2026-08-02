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
      const change = Math.floor(Math.random() * 21) - 10;
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
    <div class="border-b-3 border-black dark:border-white pb-4">
      <h2
        class="text-lg font-black font-mono tracking-tight flex items-center gap-2 text-foreground uppercase"
      >
        <span class="w-3 h-5 bg-primary border border-black dark:border-white"></span>
        OPERATOR_PROFILE.md
      </h2>
      <p
        class="text-[10px] text-foreground font-mono font-bold uppercase mt-1 flex flex-wrap items-center gap-2"
      >
        <span>STATUS:</span>
        <span
          class="font-black px-2 py-0.5 border border-black dark:border-white"
          :class="{
            'bg-primary text-primary-foreground': systemStatus === 'ONLINE',
            'bg-amber-400 text-black animate-pulse': systemStatus === 'SCANNING',
            'bg-emerald-400 text-black': systemStatus === 'OPTIMIZED',
          }"
        >
          {{ systemStatus }}
        </span>
        <span class="text-black dark:text-white font-black">|</span>
        <span>CLEARANCE:</span>
        <span
          class="text-foreground font-black bg-muted px-2 py-0.5 border border-black dark:border-white"
          >GUEST_ACCESS</span
        >
      </p>
    </div>

    <div class="space-y-6">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
        <!-- HUD Diagnostics Panel -->
        <div
          class="border-3 border-black dark:border-white bg-card p-4 font-mono text-[10px] leading-relaxed select-none col-span-1 shadow-[4px_4px_0px_0px_#000000] dark:shadow-[4px_4px_0px_0px_#06b6d4] relative"
        >
          <!-- Display Box -->
          <div
            class="w-full aspect-square bg-slate-950 text-white border-2 border-black dark:border-white relative overflow-hidden flex flex-col items-center justify-center p-3 mb-3 shadow-[2px_2px_0px_0px_#000]"
          >
            <!-- Scanning Bar overlay -->
            <div
              v-if="isScanning"
              class="absolute top-0 left-0 right-0 h-1 bg-amber-400 border-b border-black"
              :style="`transform: translateY(${scanProgress * 2.2}px)`"
            ></div>

            <!-- View 1: Radar HUD -->
            <template v-if="currentView === 'radar'">
              <!-- Tech HUD Circle -->
              <div
                class="w-24 h-24 rounded-none border-2 border-cyan-400 flex items-center justify-center animate-[spin_30s_linear_infinite] relative"
              >
                <div
                  class="w-20 h-20 rounded-none border-2 border-yellow-400 flex items-center justify-center"
                >
                  <div
                    class="w-16 h-16 rounded-none border-2 border-pink-500 flex items-center justify-center"
                  ></div>
                </div>
              </div>

              <!-- Terminal Operator Code overlay -->
              <div class="absolute text-[8px] text-cyan-400 font-black top-2 left-2">
                LOC: DHAKA_BD
              </div>
              <div class="absolute text-[8px] text-yellow-400 font-black bottom-2 right-2">
                SYS: {{ systemStatus }}
              </div>

              <div class="absolute text-center mt-1 z-10">
                <TerminalIcon class="size-5 text-yellow-400 mx-auto animate-pulse" />
                <div class="text-[9px] uppercase font-black tracking-wider text-cyan-400 mt-1">
                  DEV_CORE
                </div>
              </div>
            </template>

            <!-- View 2: CPU Load Core -->
            <template v-else-if="currentView === 'cpu'">
              <div class="w-full h-full flex flex-col justify-between pt-1">
                <div
                  class="text-[8px] text-yellow-400 font-black uppercase tracking-widest border-b border-white/20 pb-1 mb-1 flex items-center justify-between"
                >
                  <span>CORE LOAD METRICS</span>
                  <span class="text-emerald-400 font-black">● LIVE</span>
                </div>
                <div class="grid grid-cols-4 gap-1.5 flex-1 items-end pb-1.5 pt-1">
                  <div
                    v-for="(load, index) in cpuLoads.slice(0, 4)"
                    :key="index"
                    class="flex flex-col items-center"
                  >
                    <div
                      class="w-3 h-16 bg-slate-900 border border-white/40 rounded-none relative overflow-hidden flex flex-col justify-end"
                    >
                      <div
                        class="w-full bg-cyan-400 border-t border-black transition-all duration-300"
                        :style="`height: ${load}%`"
                      ></div>
                    </div>
                    <span class="text-[7px] text-slate-300 font-bold mt-1">C0{{ index + 1 }}</span>
                  </div>
                  <div
                    v-for="(load, index) in cpuLoads.slice(4, 8)"
                    :key="index"
                    class="flex flex-col items-center"
                  >
                    <div
                      class="w-3 h-16 bg-slate-900 border border-white/40 rounded-none relative overflow-hidden flex flex-col justify-end"
                    >
                      <div
                        class="w-full bg-yellow-400 border-t border-black transition-all duration-300"
                        :style="`height: ${load}%`"
                      ></div>
                    </div>
                    <span class="text-[7px] text-slate-300 font-bold mt-1">C0{{ index + 5 }}</span>
                  </div>
                </div>
                <div
                  class="text-[7px] text-slate-300 font-bold flex justify-between border-t border-white/20 pt-1"
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
                  class="text-[8px] text-cyan-400 font-black uppercase tracking-widest border-b border-white/20 pb-1 mb-1"
                >
                  SYS TELEMETRY STREAM
                </div>
                <div
                  class="flex-1 flex flex-col gap-1 overflow-hidden p-1.5 bg-black text-cyan-400 select-none font-mono text-[7px] leading-tight border border-white/20"
                >
                  <div
                    v-for="(log, idx) in consoleLogs"
                    :key="idx"
                    class="truncate font-black tracking-tight text-[7px]"
                    :class="idx === 0 ? 'text-yellow-400' : 'text-cyan-400'"
                  >
                    &gt; {{ log }}
                  </div>
                </div>
                <div
                  class="text-[7px] text-slate-300 font-bold border-t border-white/20 pt-1 flex justify-between"
                >
                  <span>PACKETS: IN/OUT</span>
                  <span class="tabular-nums">SYNC: 100%</span>
                </div>
              </div>
            </template>
          </div>

          <!-- Interaction HUD Controls -->
          <div class="flex gap-1.5 mb-3">
            <button
              :aria-pressed="currentView === 'radar'"
              class="flex-1 py-1.5 px-2 border-2 border-black dark:border-white font-black text-center tracking-wider cursor-pointer uppercase flex items-center justify-center gap-1 text-[8px] transition-all"
              :class="
                currentView === 'radar'
                  ? 'bg-primary text-primary-foreground shadow-[2px_2px_0px_0px_#000] dark:shadow-[2px_2px_0px_0px_#fff] -translate-y-0.5'
                  : 'bg-card text-foreground shadow-[2px_2px_0px_0px_#000] dark:shadow-[2px_2px_0px_0px_#06b6d4] hover:bg-muted'
              "
              @click="
                currentView = 'radar';
                playClick();
              "
              @mouseenter="playTick()"
            >
              <Activity class="size-3" />
              Radar
            </button>
            <button
              class="flex-1 py-1.5 px-2 border-2 border-black dark:border-white font-black text-center tracking-wider cursor-pointer uppercase flex items-center justify-center gap-1 text-[8px] transition-all"
              :class="
                currentView === 'cpu'
                  ? 'bg-primary text-primary-foreground shadow-[2px_2px_0px_0px_#000] dark:shadow-[2px_2px_0px_0px_#fff] -translate-y-0.5'
                  : 'bg-card text-foreground shadow-[2px_2px_0px_0px_#000] dark:shadow-[2px_2px_0px_0px_#06b6d4] hover:bg-muted'
              "
              @click="
                currentView = 'cpu';
                playClick();
              "
              @mouseenter="playTick()"
            >
              <Cpu class="size-3" />
              Cores
            </button>
            <button
              class="flex-1 py-1.5 px-2 border-2 border-black dark:border-white font-black text-center tracking-wider cursor-pointer uppercase flex items-center justify-center gap-1 text-[8px] transition-all"
              :class="
                currentView === 'log'
                  ? 'bg-primary text-primary-foreground shadow-[2px_2px_0px_0px_#000] dark:shadow-[2px_2px_0px_0px_#fff] -translate-y-0.5'
                  : 'bg-card text-foreground shadow-[2px_2px_0px_0px_#000] dark:shadow-[2px_2px_0px_0px_#06b6d4] hover:bg-muted'
              "
              @click="
                currentView = 'log';
                playClick();
              "
              @mouseenter="playTick()"
            >
              <ShieldCheck class="size-3" />
              Logs
            </button>
          </div>

          <button
            class="w-full py-2 bg-secondary text-secondary-foreground border-2 border-black dark:border-white shadow-[3px_3px_0px_0px_#000] dark:shadow-[3px_3px_0px_0px_#ffffff] hover:-translate-y-0.5 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none text-[9px] font-black text-center tracking-widest cursor-pointer uppercase flex items-center justify-center gap-1.5 transition-all"
            :disabled="isScanning"
            @click="triggerScan"
            @mouseenter="playTick()"
          >
            <RefreshCw class="size-3.5" :class="isScanning ? 'animate-spin' : ''" />
            {{ isScanning ? 'RUNNING SECURITY DIAGNOSTIC...' : 'ENGAGE SECURITY SCAN' }}
          </button>

          <div
            class="space-y-1.5 border-t-2 border-black dark:border-white pt-3 mt-3 text-[9px] font-mono font-bold"
          >
            <div class="flex justify-between">
              <span class="text-muted-foreground">OPERATOR:</span>
              <span class="font-black text-foreground">A_DEWAN</span>
            </div>
            <div class="flex justify-between">
              <span class="text-muted-foreground">NODE_IP:</span>
              <span
                class="text-foreground font-black bg-primary text-primary-foreground px-1 border border-black dark:border-white"
                >127.0.0.1</span
              >
            </div>
            <div class="flex justify-between">
              <span class="text-muted-foreground">UPLINK:</span>
              <span
                class="bg-green-400 text-black px-1 border border-black font-black animate-pulse"
                >ACTIVE_TUNNEL</span
              >
            </div>
            <div class="flex justify-between">
              <span class="text-muted-foreground">CORES:</span>
              <span class="text-foreground font-black">8x_VIRTUAL</span>
            </div>
          </div>
        </div>

        <!-- Bio Content -->
        <div class="col-span-1 md:col-span-2 space-y-5">
          <div class="space-y-2">
            <h3
              class="text-xs font-black uppercase tracking-wider text-foreground flex items-center gap-2 font-mono"
            >
              <span
                class="inline-block w-3 h-3 bg-primary border border-black dark:border-white"
              ></span>
              BIO_READOUT
            </h3>
            <p
              class="text-sm leading-relaxed text-foreground font-sans bg-card p-4 border-2 border-black dark:border-white shadow-[3px_3px_0px_0px_#000] dark:shadow-[3px_3px_0px_0px_#06b6d4] font-medium"
            >
              Mainly a full-stack developer with a deep interest and expertise in backend systems.
              Initiated commercial operations in the year 2021. Designed and deployed multiple
              high-performance database architectures, server nodes, and terminal dashboards.
            </p>
          </div>

          <div class="border-t-2 border-black dark:border-white pt-4 space-y-3 font-mono text-xs">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div
                class="bg-yellow-100 dark:bg-yellow-950/60 p-3 border-2 border-black dark:border-white shadow-[3px_3px_0px_0px_#000] dark:shadow-[3px_3px_0px_0px_#facc15]"
              >
                <span
                  class="text-black dark:text-yellow-300 font-black uppercase text-[9px] block mb-0.5"
                  >Role:</span
                >
                <span class="font-black text-black dark:text-white text-xs"
                  >Backend & Full-Stack Engineer</span
                >
              </div>
              <div
                class="bg-cyan-100 dark:bg-cyan-950/60 p-3 border-2 border-black dark:border-white shadow-[3px_3px_0px_0px_#000] dark:shadow-[3px_3px_0px_0px_#06b6d4]"
              >
                <span
                  class="text-black dark:text-cyan-300 font-black uppercase text-[9px] block mb-0.5"
                  >Experience:</span
                >
                <span class="font-black text-black dark:text-white text-xs"
                  >Since 2021 ({{ new Date().getFullYear() - 2021 }}+ Years)</span
                >
              </div>
              <div
                class="bg-pink-100 dark:bg-pink-950/60 p-3 border-2 border-black dark:border-white shadow-[3px_3px_0px_0px_#000] dark:shadow-[3px_3px_0px_0px_#ec4899]"
              >
                <span
                  class="text-black dark:text-pink-300 font-black uppercase text-[9px] block mb-0.5"
                  >Location:</span
                >
                <span class="font-black text-black dark:text-white text-xs">Dhaka, Bangladesh</span>
              </div>
              <div
                class="bg-emerald-100 dark:bg-emerald-950/60 p-3 border-2 border-black dark:border-white shadow-[3px_3px_0px_0px_#000] dark:shadow-[3px_3px_0px_0px_#10b981]"
              >
                <span
                  class="text-black dark:text-emerald-300 font-black uppercase text-[9px] block mb-0.5"
                  >Primary Status:</span
                >
                <span
                  class="font-black text-emerald-700 dark:text-emerald-300 text-xs animate-pulse"
                  >ACTIVE_FOR_HIRE</span
                >
              </div>
            </div>
          </div>

          <div
            class="bg-primary text-primary-foreground border-3 border-black dark:border-white p-4 shadow-[4px_4px_0px_0px_#000] dark:shadow-[4px_4px_0px_0px_#ffffff]"
          >
            <p class="text-xs font-mono font-black italic leading-relaxed">
              "We build clean paths through complex data. In backend, we trust. Security,
              optimization, and maintainability are not choices, they are the baseline
              configuration."
            </p>
          </div>

          <div class="pt-2">
            <a
              href="/resume"
              target="_blank"
              class="w-full py-3.5 bg-secondary text-secondary-foreground border-3 border-black dark:border-white shadow-[4px_4px_0px_0px_#000000] dark:shadow-[4px_4px_0px_0px_#ffffff] hover:-translate-y-0.5 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all text-[10px] font-black text-center tracking-widest font-mono uppercase flex items-center justify-center gap-2 cursor-pointer"
              @click="playClick()"
              @mouseenter="playTick()"
            >
              <svg
                class="size-4"
                fill="none"
                stroke="currentColor"
                stroke-width="2.5"
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
