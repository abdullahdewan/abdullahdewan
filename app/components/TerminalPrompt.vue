<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { Terminal } from 'lucide-vue-next';

const { playClick, playTick, playSuccessLog, playErrorLog } = useAudio();

const logs = ref<{ text: string; type: 'input' | 'output' | 'error' | 'success' }[]>([
  { text: 'DEWAN INTERACTIVE SHELL [v4.3.0-secure]', type: 'success' },
  { text: 'Type "help" or "neofetch" to explore system node.', type: 'output' },
]);

const commandInput = ref('');
const terminalContainer = ref<HTMLDivElement | null>(null);
const matrixActive = ref(false);

const handleCommand = (e: Event) => {
  e.preventDefault();
  const rawCmd = commandInput.value.trim();
  if (!rawCmd) return;

  const cmd = rawCmd.toLowerCase();
  logs.value.push({ text: `visitor@dewan:~$ ${rawCmd}`, type: 'input' });
  commandInput.value = '';

  const knownCommands = [
    'help',
    'neofetch',
    'about',
    'skills',
    'projects',
    'contact',
    'coffee',
    'matrix',
    'clear',
  ];
  if (knownCommands.includes(cmd)) {
    if (cmd === 'clear') {
      playClick();
    } else {
      playSuccessLog();
    }
  } else if (cmd.startsWith('sudo ')) {
    playErrorLog();
    logs.value.push({
      text: 'Permission denied: visitor is not in sudoers file. Incident logged.',
      type: 'error',
    });
    scrollToBottom();
    return;
  } else {
    playErrorLog();
  }

  switch (cmd) {
    case 'help':
      logs.value.push({ text: 'COMMAND INDEX:', type: 'success' });
      logs.value.push({
        text: '  neofetch   - Display operator system profile',
        type: 'output',
      });
      logs.value.push({ text: '  about      - Read operator biography', type: 'output' });
      logs.value.push({
        text: '  skills     - View technical capabilities matrix',
        type: 'output',
      });
      logs.value.push({ text: '  projects   - Show indexed repositories', type: 'output' });
      logs.value.push({
        text: '  contact    - Retrieve direct transmission channels',
        type: 'output',
      });
      logs.value.push({ text: '  coffee     - Brew caffeine packet', type: 'output' });
      logs.value.push({ text: '  matrix     - Execute digital stream', type: 'output' });
      logs.value.push({ text: '  clear      - Purge console screen', type: 'output' });
      break;
    case 'sudo':
      logs.value.push({ text: 'usage: sudo <command>', type: 'error' });
      break;
    case 'neofetch':
      logs.value.push({
        text: `   .::::::::::.     visitor@dewan-node-4.3
 .::::::::::::::::.   ----------------------
.::::::::::::::::::.  OS: Arch Linux x86_64
::::::::::::::::::::  Kernel: 6.12.3-dewan
::::::::::::::::::::  Uptime: Since 2021
::::'   '::'   '::::  Shell: zsh 5.9
::::     ::     ::::  DE: Monospace-Terminal
::::.   .::.   .::::  WM: Sway / Wayland
::::::::::::::::::::  CPU: AMD Ryzen 7 @ 4.2GHz
'::::::::::::::::::'  Memory: 8192MB / 16384MB
  '::::::::::::::'    Accent: Cyber Cyan (#00fff5)
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
      logs.value.push({ text: 'OPERATOR: Abdullah Dewan', type: 'success' });
      logs.value.push({
        text: 'ROLE: Full-Stack Engineer & Backend Systems Architect',
        type: 'output',
      });
      logs.value.push({ text: 'LOCATION: Dhaka, Bangladesh', type: 'output' });
      logs.value.push({
        text: 'FOCUS: Scalable web architecture, Nuxt/Vue, Node.js, and relational database systems.',
        type: 'output',
      });
      break;
    case 'skills':
      logs.value.push({ text: 'LANGUAGES: TypeScript, JavaScript, PHP, SQL', type: 'output' });
      logs.value.push({ text: 'DATABASES: PostgreSQL, MySQL, MongoDB, Redis', type: 'output' });
      logs.value.push({
        text: 'FRAMEWORKS: Vue 3, Nuxt 3, TailwindCSS, Express',
        type: 'output',
      });
      break;
    case 'projects':
      logs.value.push({ text: 'REPOSITORIES:', type: 'success' });
      logs.value.push({
        text: '  * traininfo    - Railway transit scheduling & information platform',
        type: 'output',
      });
      logs.value.push({
        text: '  * tictactoe    - Real-time multiplayer game (Socket.IO + Vue)',
        type: 'output',
      });
      logs.value.push({
        text: '  * renpy-to-md  - Novel script compiler & markdown engine',
        type: 'output',
      });
      break;
    case 'contact':
      logs.value.push({ text: 'GITHUB: https://github.com/abdullahdewan', type: 'success' });
      logs.value.push({
        text: 'Direct transmission form available in TRANSMIT section below.',
        type: 'output',
      });
      break;
    case 'matrix':
      matrixActive.value = true;
      logs.value.push({ text: 'STARTING MATRIX RAIN STREAM...', type: 'success' });
      setTimeout(() => {
        matrixActive.value = false;
        logs.value.push({ text: 'STREAM COMPLETE.', type: 'success' });
        scrollToBottom();
      }, 3500);
      break;
    case 'clear':
      logs.value = [];
      break;
    default:
      logs.value.push({
        text: `zsh: command not found: ${rawCmd}. Type "help" for valid commands.`,
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
    class="border border-border-dim bg-background/95 text-foreground font-mono text-xs overflow-hidden flex flex-col justify-between h-[340px] terminal-screen select-none rounded-[2px]"
  >
    <!-- Top terminal window bar -->
    <div
      class="bg-card/80 backdrop-blur-sm text-foreground px-3 py-2 flex items-center justify-between border-b border-border-dim"
    >
      <div class="flex items-center gap-2 uppercase tracking-wider text-[10px] text-primary">
        <Terminal class="size-3.5 text-primary" />
        <span class="font-bold">terminal@abdullah-host</span>
      </div>
      <div class="flex gap-1.5 items-center">
        <div class="size-2 rounded-full bg-rose-500/80"></div>
        <div class="size-2 rounded-full bg-amber-500/80"></div>
        <div class="size-2 rounded-full bg-emerald-500/80"></div>
      </div>
    </div>

    <!-- Terminal Output Area -->
    <div ref="terminalContainer" class="flex-1 p-3 overflow-y-auto space-y-1.5 relative">
      <!-- Simulated Digital Rain Code -->
      <div
        v-if="matrixActive"
        class="absolute inset-0 bg-background/95 flex items-center justify-center overflow-hidden text-primary text-[10px] leading-tight select-none z-10"
      >
        <div class="grid grid-cols-6 gap-2 w-full h-full p-2 select-none opacity-85 font-mono">
          <div v-for="i in 18" :key="i" class="flex flex-col text-center">
            <span
              v-for="j in 12"
              :key="j"
              class="animate-pulse select-none text-primary"
              :style="`animation-delay: ${j * 60 + i * 30}ms`"
            >
              {{ String.fromCharCode(33 + Math.floor(Math.random() * 93)) }}
            </span>
          </div>
        </div>
      </div>

      <div
        v-for="(log, index) in logs"
        :key="index"
        class="leading-relaxed whitespace-pre-wrap break-all text-[11px]"
      >
        <template v-if="log.type === 'input'">
          <span class="text-primary font-bold">visitor@dewan</span>
          <span class="text-muted-foreground">:</span>
          <span class="text-emerald-400 font-bold">~$</span>
          <span class="text-foreground ml-1.5">{{
            log.text.replace('visitor@dewan:~$ ', '')
          }}</span>
        </template>
        <template v-else>
          <span
            :class="{
              'text-primary': log.type === 'output',
              'text-rose-400': log.type === 'error',
              'text-emerald-400 font-bold': log.type === 'success',
            }"
          >
            {{ log.text }}
          </span>
        </template>
      </div>
    </div>

    <!-- Terminal Command Input Bar -->
    <form
      class="border-t border-border-dim p-2.5 flex items-center gap-2 bg-card/60"
      @submit="handleCommand"
    >
      <span class="text-emerald-400 font-bold text-xs select-none">$</span>
      <input
        v-model="commandInput"
        type="text"
        placeholder="Type command... ('help', 'neofetch')"
        class="flex-1 bg-transparent border-0 text-foreground outline-none focus:ring-0 p-0 text-xs font-mono placeholder:text-muted-foreground"
        autocomplete="off"
        autocorrect="off"
        autocapitalize="off"
        spellcheck="false"
        @keydown="playTick()"
      />
      <span class="blink-cursor select-none text-primary"></span>
    </form>
  </div>
</template>
