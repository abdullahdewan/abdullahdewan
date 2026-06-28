<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { Terminal } from 'lucide-vue-next';

const logs = ref<{ text: string; type: 'input' | 'output' | 'error' | 'success' }[]>([
  { text: 'DEWAN INTERACTIVE SHELL [VER 4.3.0]', type: 'success' },
  { text: 'READY. TYPE "help" OR "neofetch" TO START.', type: 'output' },
]);

const commandInput = ref('');
const terminalContainer = ref<HTMLDivElement | null>(null);
const matrixActive = ref(false);

const handleCommand = (e: Event) => {
  e.preventDefault();
  const rawCmd = commandInput.value.trim();
  if (!rawCmd) return;

  const cmd = rawCmd.toLowerCase();
  logs.value.push({ text: `guest@dewan:~# ${rawCmd}`, type: 'input' });
  commandInput.value = '';

  if (cmd.startsWith('sudo ')) {
    logs.value.push({
      text: 'guest is not in the sudoers file. This incident will be reported.',
      type: 'error',
    });
    scrollToBottom();
    return;
  }

  switch (cmd) {
    case 'help':
      logs.value.push({ text: 'AVAILABLE COMMANDS:', type: 'success' });
      logs.value.push({
        text: '  neofetch   - Fetch operator system specifications',
        type: 'output',
      });
      logs.value.push({ text: '  about      - Display operator profile info', type: 'output' });
      logs.value.push({ text: '  skills     - Check operator tech stack matrix', type: 'output' });
      logs.value.push({ text: '  projects   - Show repositories sync status', type: 'output' });
      logs.value.push({
        text: '  contact    - Retrieve secure transmission channels',
        type: 'output',
      });
      logs.value.push({ text: '  coffee     - Fuel the operator with caffeine', type: 'output' });
      logs.value.push({ text: '  matrix     - Activate matrix code stream', type: 'output' });
      logs.value.push({ text: '  clear      - Clear terminal logs output', type: 'output' });
      break;
    case 'sudo':
      logs.value.push({ text: 'usage: sudo <command>', type: 'error' });
      break;
    case 'neofetch':
      logs.value.push({
        text: `   .::::::::::.     guest@dewan-node-4.3
 .::::::::::::::::.   --------------------
.::::::::::::::::::.  OS: Arch Linux x86_64
::::::::::::::::::::  Kernel: 6.12.3-dewan-host
::::::::::::::::::::  Uptime: Since 2021
::::'   '::'   '::::  Shell: bash 5.2.15
::::     ::     ::::  Resolution: 1920x1080
::::.   .::.   .::::  DE: Monospace-TUI
:::::::;;;;;;:::::::  Theme: CRT-Amber-Glow
::::::::::::::::::::  Terminal: Dewan-SH
'::::::::::::::::::'  CPU: AMD Ryzen 7 (16) @ 4.2GHz
  '::::::::::::::'    Memory: 8192MB / 16384MB
     '::::::::'
       '::::'`,
        type: 'output',
      });
      break;
    case 'coffee':
      logs.value.push({
        text: `    (  )   (   )
     ) (    ) (
     ( )    ( )
    .___________-
    |           | )
    |  COFFEE   |/
    |   FUEL    |
    \\___________/`,
        type: 'success',
      });
      break;
    case 'about':
      logs.value.push({ text: 'OPERATOR: ABDULLAH DEWAN', type: 'success' });
      logs.value.push({ text: 'ROLE: FULL-STACK ENGINEER (BACKEND SPECIALIST)', type: 'output' });
      logs.value.push({ text: 'COMMERCIAL OPERATIONS INITIATED: 2021', type: 'output' });
      logs.value.push({
        text: 'BIO: EXPERT IN ROBUST APIS, SQL QUERY OPTIMIZATION AND VUE/NUXT CLIENT CONFIGS.',
        type: 'output',
      });
      break;
    case 'skills':
      logs.value.push({ text: 'SYS_LANGUAGES: JS, TS, PHP (80%+ LOAD)', type: 'output' });
      logs.value.push({ text: 'SYS_DATABASES: MYSQL, POSTGRES, MONGODB', type: 'output' });
      logs.value.push({
        text: 'SYS_CLIENT: VUE 3, NUXT 3 (EXPERT), REACT (BASIC)',
        type: 'output',
      });
      break;
    case 'projects':
      logs.value.push({ text: 'SYNCED_NODES:', type: 'success' });
      logs.value.push({
        text: '  - traininfo: Nuxt-based railway timetables platform',
        type: 'output',
      });
      logs.value.push({
        text: '  - tictactoe: Real-time Socket.IO multiplayer game',
        type: 'output',
      });
      logs.value.push({
        text: '  - renpy-to-md: Python visual novels branching compiler',
        type: 'output',
      });
      break;
    case 'contact':
      logs.value.push({ text: 'GITHUB: https://github.com/abdullahdewan', type: 'success' });
      logs.value.push({
        text: 'SECURE_CHANNEL: TRANSMIT PACKET FORM IN CONTROLS AREA',
        type: 'output',
      });
      break;
    case 'matrix':
      matrixActive.value = true;
      logs.value.push({ text: 'STREAMING MATRIX CODE STREAM...', type: 'success' });
      setTimeout(() => {
        matrixActive.value = false;
        logs.value.push({ text: 'MATRIX FLOW COMPLETED.', type: 'success' });
        scrollToBottom();
      }, 4000);
      break;
    case 'clear':
      logs.value = [];
      break;
    default:
      logs.value.push({
        text: `SHELL: COMMAND NOT FOUND: "${rawCmd}". TYPE "help" FOR HELP.`,
        type: 'error',
      });
  }

  scrollToBottom();
};

const scrollToBottom = () => {
  setTimeout(() => {
    if (terminalContainer.value) {
      terminalContainer.value.scrollTop = terminalContainer.value.scrollHeight;
    }
  }, 50);
};

onMounted(() => {
  scrollToBottom();
});
</script>

<template>
  <div
    class="border-2 border-foreground bg-black text-green-400 font-mono text-xs overflow-hidden flex flex-col justify-between h-[360px] terminal-screen select-none"
  >
    <!-- Top terminal window bar -->
    <div
      class="bg-foreground text-background px-3 py-1 flex items-center justify-between border-b border-foreground"
    >
      <div class="flex items-center gap-2 font-bold uppercase tracking-wider text-[10px]">
        <Terminal class="size-3.5" />
        <span>GUEST_CONSOLE:~#</span>
      </div>
      <div class="flex gap-1.5">
        <div class="size-2 bg-background"></div>
        <div class="size-2 bg-background"></div>
        <div class="size-2 bg-background"></div>
      </div>
    </div>

    <!-- Terminal Output Area -->
    <div
      ref="terminalContainer"
      class="flex-1 p-4 overflow-y-auto space-y-1.5 scrollbar-thin scrollbar-thumb-green-400 scrollbar-track-transparent relative"
    >
      <!-- Simulated Digital Rain Code -->
      <div
        v-if="matrixActive"
        class="absolute inset-0 bg-black/95 flex items-center justify-center overflow-hidden text-green-500 text-[10px] leading-tight select-none"
      >
        <div
          class="grid grid-cols-6 gap-2 w-full h-full p-2 select-none opacity-80 animate-pulse font-mono"
        >
          <div v-for="i in 18" :key="i" class="flex flex-col text-center">
            <span
              v-for="j in 10"
              :key="j"
              class="animate-bounce select-none"
              :style="`animation-delay: ${j * 80 + i * 20}ms`"
            >
              {{ String.fromCharCode(33 + Math.floor(Math.random() * 93)) }}
            </span>
          </div>
        </div>
      </div>

      <div
        v-for="(log, index) in logs"
        :key="index"
        class="leading-relaxed whitespace-pre-wrap break-all"
      >
        <span v-if="log.type === 'input'" class="text-white font-bold">$ </span>
        <span
          :class="{
            'text-white': log.type === 'input',
            'text-green-400': log.type === 'output',
            'text-red-500 font-bold': log.type === 'error',
            'text-green-300 font-bold': log.type === 'success',
          }"
        >
          {{ log.text }}
        </span>
      </div>
    </div>

    <!-- Terminal Command Input Bar -->
    <form
      class="border-t border-foreground p-3 flex items-center gap-2 bg-black"
      @submit="handleCommand"
    >
      <span class="text-green-500 font-bold select-none">$</span>
      <input
        v-model="commandInput"
        type="text"
        placeholder="Type command... (try 'neofetch', 'coffee')"
        class="flex-1 bg-transparent border-0 text-white outline-none focus:ring-0 p-0 text-xs font-mono placeholder:text-green-800"
        autocomplete="off"
        autocorrect="off"
        autocapitalize="off"
        spellcheck="false"
      />
      <span class="blink-cursor select-none"></span>
    </form>
  </div>
</template>
