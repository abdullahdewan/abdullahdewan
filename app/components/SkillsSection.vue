<script setup lang="ts">
import { ref } from 'vue';
import { Badge } from '~/components/ui/badge';
import { ExternalLink, Cpu, CheckCircle2, Play } from 'lucide-vue-next';

interface Skill {
  name: string;
  level: number; // 1 to 10
  category: 'languages' | 'backend' | 'frontend';
  comment: string;
  officialUrl: string;
  details: string[]; // Tech items they know in this
}

const skills: Skill[] = [
  {
    name: 'JavaScript',
    level: 9,
    category: 'languages',
    comment: 'Full-stack standard',
    officialUrl: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
    details: ['ESNext Specs', 'Asynchronous Promise Pipelines', 'V8 Engine Profiling'],
  },
  {
    name: 'TypeScript',
    level: 9,
    category: 'languages',
    comment: 'Type-safe production systems',
    officialUrl: 'https://www.typescriptlang.org/',
    details: ['Strict Compiler Configs', 'Generics & Utility Types', 'Incremental Compilation'],
  },
  {
    name: 'PHP',
    level: 8,
    category: 'languages',
    comment: 'Legacy & Modern Laravel/Custom',
    officialUrl: 'https://www.php.net/',
    details: ['PHP 8.x Type safety', 'Composer Dependency Trees', 'OPcache Optimization'],
  },
  {
    name: 'MySQL',
    level: 8,
    category: 'backend',
    comment: 'Relational design & optimization',
    officialUrl: 'https://www.mysql.com/',
    details: ['Execution Plan Analysis', 'Indexing (B-Tree/Hash)', 'ACID Transactions'],
  },
  {
    name: 'PostgreSQL',
    level: 8,
    category: 'backend',
    comment: 'Advanced queries & indexing',
    officialUrl: 'https://www.postgresql.org/',
    details: ['JSONB Document Queries', 'CTE Complex Queries', 'Connection Pooling'],
  },
  {
    name: 'MongoDB',
    level: 8,
    category: 'backend',
    comment: 'NoSQL collections & scaling',
    officialUrl: 'https://www.mongodb.com/',
    details: ['Aggregation Frameworks', 'Sharding & Replication', 'Index Tuning'],
  },
  {
    name: 'Vue.js',
    level: 9,
    category: 'frontend',
    comment: 'Advanced component architectures',
    officialUrl: 'https://vuejs.org/',
    details: ['Composition API v3', 'Pinia State Orchestration', 'Virtual DOM Diffing'],
  },
  {
    name: 'Nuxt.js',
    level: 9,
    category: 'frontend',
    comment: 'Server-side rendering & SEO optimization',
    officialUrl: 'https://nuxt.com/',
    details: ['Server-Side Rendering (SSR)', 'Nitro Server Routing', 'Hybrid Rendering Strategies'],
  },
  {
    name: 'React.js',
    level: 6,
    category: 'frontend',
    comment: 'Basic SPA integrations',
    officialUrl: 'https://react.dev/',
    details: ['React Hooks Pattern', 'Functional Components', 'Virtual DOM basics'],
  },
];

const selectedSkill = ref<Skill>(skills[0] as Skill);
const isTesting = ref(false);
const testLogs = ref<string[]>([]);
const testSuccess = ref(false);

const { playClick, playTick, playScan, playSuccessLog } = useAudio();

const runSanityCheck = () => {
  if (isTesting.value) return;
  isTesting.value = true;
  testSuccess.value = false;
  testLogs.value = [];

  playScan();
  const scanSoundInterval = setInterval(() => {
    if (!isTesting.value) {
      clearInterval(scanSoundInterval);
    } else {
      playScan();
    }
  }, 350);

  const steps = [
    `LOADING ${selectedSkill.value.name.toUpperCase()} COMPILER ENVIRONMENT...`,
    `PARSING SOURCE FILES & GENERATING AST...`,
    `AST VALID: OK. COMPILING SYNTAX TREE...`,
    `VERIFYING MEMORY ALLOCATION MATRIX...`,
    `SANITY CHECK COMPLETED: NOMINAL ERROR RATIO.`,
  ];

  let currentStep = 0;
  const interval = setInterval(() => {
    testLogs.value.push(steps[currentStep] || '');
    playTick();
    currentStep++;
    if (currentStep >= steps.length) {
      clearInterval(interval);
      isTesting.value = false;
      testSuccess.value = true;
      playSuccessLog();
    }
  }, 600);
};

// Reset tester on skill change
const selectSkill = (skill: Skill) => {
  playClick();
  selectedSkill.value = skill;
  isTesting.value = false;
  testSuccess.value = false;
  testLogs.value = [];
};
</script>

<template>
  <div class="space-y-6">
    <div class="border-b border-border/60 pb-4">
      <h2
        class="text-lg font-bold font-heading tracking-tight flex items-center gap-2 text-foreground"
      >
        <span class="w-1 h-5 bg-primary rounded-full"></span>
        SYS_SKILLS_MATRIX.exe
      </h2>
      <p class="text-[10px] text-muted-foreground uppercase font-mono mt-1">
        Skill metrics based on commercial operations since 2021 // Click on any skill card to
        analyze
      </p>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start font-sans">
      <!-- Skills Matrix Column (2/3 width on desktop) -->
      <div class="lg:col-span-2 space-y-6">
        <!-- Languages Section -->
        <div class="space-y-3">
          <h3
            class="text-[10px] font-bold uppercase tracking-widest text-primary border-b border-border/40 pb-1 font-mono"
          >
            01 // CORE_LANGUAGES
          </h3>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div
              v-for="skill in skills.filter((s) => s.category === 'languages')"
              :key="skill.name"
              class="bg-card/35 border rounded-xl p-4 flex flex-col justify-between gap-3.5 shadow-sm transition-all duration-300 cursor-pointer"
              :class="
                selectedSkill.name === skill.name
                  ? 'border-primary/80 bg-primary/5 shadow-[0_0_12px_rgba(6,182,212,0.1)]'
                  : 'border-border/85 hover:border-primary/40'
              "
              @click="selectSkill(skill)"
              @mouseenter="playTick()"
            >
              <div class="flex justify-between items-start">
                <div>
                  <div class="font-bold text-foreground text-sm flex items-center gap-1.5">
                    <span>{{ skill.name }}</span>
                  </div>
                  <span class="text-[9px] text-muted-foreground font-mono mt-0.5 block"
                    >// {{ skill.comment }}</span
                  >
                </div>
                <span
                  class="text-[10px] font-bold text-primary font-mono bg-primary/10 px-2 py-0.5 rounded-md"
                  >{{ skill.level * 10 }}%</span
                >
              </div>
              <div class="w-full bg-muted/65 rounded-full h-1.5 overflow-hidden relative">
                <div
                  class="bg-gradient-to-r from-primary to-cyan-400 h-full rounded-full"
                  :style="`width: ${skill.level * 10}%`"
                ></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Backend Section -->
        <div class="space-y-3">
          <h3
            class="text-[10px] font-bold uppercase tracking-widest text-primary border-b border-border/40 pb-1 font-mono"
          >
            02 // DATABASE_&&_BACKEND
          </h3>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div
              v-for="skill in skills.filter((s) => s.category === 'backend')"
              :key="skill.name"
              class="bg-card/35 border rounded-xl p-4 flex flex-col justify-between gap-3.5 shadow-sm transition-all duration-300 cursor-pointer"
              :class="
                selectedSkill.name === skill.name
                  ? 'border-primary/80 bg-primary/5 shadow-[0_0_12px_rgba(6,182,212,0.1)]'
                  : 'border-border/85 hover:border-primary/40'
              "
              @click="selectSkill(skill)"
              @mouseenter="playTick()"
            >
              <div class="flex justify-between items-start">
                <div>
                  <div class="font-bold text-foreground text-sm flex items-center gap-1.5">
                    <span>{{ skill.name }}</span>
                  </div>
                  <span class="text-[9px] text-muted-foreground font-mono mt-0.5 block"
                    >// {{ skill.comment }}</span
                  >
                </div>
                <span
                  class="text-[10px] font-bold text-primary font-mono bg-primary/10 px-2 py-0.5 rounded-md"
                  >{{ skill.level * 10 }}%</span
                >
              </div>
              <div class="w-full bg-muted/65 rounded-full h-1.5 overflow-hidden relative">
                <div
                  class="bg-gradient-to-r from-primary to-cyan-400 h-full rounded-full"
                  :style="`width: ${skill.level * 10}%`"
                ></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Frontend Section -->
        <div class="space-y-3">
          <h3
            class="text-[10px] font-bold uppercase tracking-widest text-primary border-b border-border/40 pb-1 font-mono"
          >
            03 // CLIENT_FRAMEWORKS
          </h3>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div
              v-for="skill in skills.filter((s) => s.category === 'frontend')"
              :key="skill.name"
              class="bg-card/35 border rounded-xl p-4 flex flex-col justify-between gap-3.5 shadow-sm transition-all duration-300 cursor-pointer"
              :class="
                selectedSkill.name === skill.name
                  ? 'border-primary/80 bg-primary/5 shadow-[0_0_12px_rgba(6,182,212,0.1)]'
                  : 'border-border/85 hover:border-primary/40'
              "
              @click="selectSkill(skill)"
              @mouseenter="playTick()"
            >
              <div class="flex justify-between items-start">
                <div>
                  <div class="font-bold text-foreground text-sm flex items-center gap-1.5">
                    <span>{{ skill.name }}</span>
                  </div>
                  <span class="text-[9px] text-muted-foreground font-mono mt-0.5 block"
                    >// {{ skill.comment }}</span
                  >
                </div>
                <span
                  class="text-[10px] font-bold text-primary font-mono bg-primary/10 px-2 py-0.5 rounded-md"
                  >{{ skill.level * 10 }}%</span
                >
              </div>
              <div class="w-full bg-muted/65 rounded-full h-1.5 overflow-hidden relative">
                <div
                  class="bg-gradient-to-r from-primary to-cyan-400 h-full rounded-full"
                  :style="`width: ${skill.level * 10}%`"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Skill Analyzer HUD Column (1/3 width on desktop) -->
      <div class="lg:col-span-1 space-y-4">
        <div
          class="border border-border bg-card/45 backdrop-blur-md p-4 rounded-xl font-mono text-[10px] leading-relaxed select-none relative"
        >
          <!-- HUD corners decoration -->
          <div class="absolute top-0 left-0 w-2 h-2 border-t border-l border-primary/60"></div>
          <div class="absolute top-0 right-0 w-2 h-2 border-t border-r border-primary/60"></div>
          <div class="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-primary/60"></div>
          <div class="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-primary/60"></div>

          <div class="border-b border-border/60 pb-2.5 mb-3 flex items-center justify-between">
            <span class="font-bold text-primary uppercase flex items-center gap-1.5">
              <Cpu class="size-3.5 text-primary" />
              SKILL ANALYZER HUD
            </span>
            <span class="text-[8px] text-muted-foreground">ID: 0{{ selectedSkill.level }}</span>
          </div>

          <!-- Display Box -->
          <div class="space-y-4">
            <div>
              <span class="text-[8px] text-muted-foreground block uppercase">SELECTED NODE:</span>
              <div class="flex items-center justify-between mt-0.5">
                <span class="text-sm font-bold text-foreground">{{ selectedSkill.name }}</span>
                <a
                  :href="selectedSkill.officialUrl"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-[9px] text-primary hover:underline flex items-center gap-0.5"
                >
                  DOCS
                  <ExternalLink class="size-2.5" />
                </a>
              </div>
            </div>

            <!-- Proficiency details load -->
            <div>
              <span class="text-[8px] text-muted-foreground block uppercase"
                >SYS LOAD CAPACITY:</span
              >
              <div class="flex items-center gap-2 mt-1">
                <!-- Segmented block indicators -->
                <div class="flex gap-0.5 flex-1">
                  <div
                    v-for="idx in 10"
                    :key="idx"
                    class="h-3 flex-1 rounded-xs"
                    :class="
                      idx <= selectedSkill.level
                        ? 'bg-primary'
                        : 'bg-muted/70 dark:bg-slate-900 border border-border/40'
                    "
                  ></div>
                </div>
                <span class="font-bold text-foreground">{{ selectedSkill.level * 10 }}%</span>
              </div>
            </div>

            <!-- Tech Details Bullet points -->
            <div class="bg-muted/30 dark:bg-slate-950/80 p-2.5 rounded-lg border border-border">
              <span class="text-[8px] text-primary block uppercase mb-1.5 font-bold"
                >// TECH_INTEGRATION_METRIC:</span
              >
              <ul class="space-y-1 text-muted-foreground dark:text-slate-300">
                <li
                  v-for="(detail, i) in selectedSkill.details"
                  :key="i"
                  class="flex items-start gap-1"
                >
                  <span class="text-primary font-bold">»</span>
                  <span class="leading-tight">{{ detail }}</span>
                </li>
              </ul>
            </div>

            <!-- Compiling Sanity Checker -->
            <div class="border-t border-dashed border-border pt-3">
              <button
                class="w-full py-2 bg-muted/40 border border-border hover:bg-muted/80 hover:border-primary/50 text-foreground transition-all rounded-lg text-[9px] font-bold text-center tracking-widest cursor-pointer uppercase flex items-center justify-center gap-1.5"
                :disabled="isTesting"
                @click="runSanityCheck"
                @mouseenter="playTick()"
              >
                <Play v-if="!isTesting" class="size-2.5 text-primary fill-primary" />
                <span v-else class="size-2 rounded-full bg-amber-500 animate-ping"></span>
                {{ isTesting ? 'RUNNING COMPILE SCAN...' : 'RUN AST SANITY CHECK' }}
              </button>

              <!-- Tester Logs Output -->
              <div
                v-if="testLogs.length > 0"
                class="mt-2.5 bg-slate-950 text-cyan-400 p-2.5 rounded-lg border border-cyan-900/30 font-mono text-[7px] leading-relaxed max-h-[90px] overflow-y-auto"
              >
                <div v-for="(log, i) in testLogs" :key="i" class="truncate">
                  <span class="text-cyan-600/60">&gt;</span> {{ log }}
                </div>
                <div
                  v-if="testSuccess"
                  class="text-green-400 font-bold flex items-center gap-1 mt-1.5 uppercase text-[8px] border-t border-green-500/20 pt-1.5"
                >
                  <CheckCircle2 class="size-3 text-green-400" />
                  STATUS: COMPILE NOMINAL (0 ERRORS)
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Meta Tags / Environment tags -->
    <div class="border-t border-border pt-5 font-sans">
      <div class="text-[10px] text-muted-foreground font-mono uppercase mb-3 tracking-wider">
        ADDITIONAL_ENVIRONMENT_KEYWORDS:
      </div>
      <div class="flex flex-wrap gap-2">
        <a href="https://en.wikipedia.org/wiki/REST" target="_blank" rel="noopener noreferrer">
          <Badge
            variant="outline"
            class="rounded-lg border-border bg-card/40 text-foreground text-[10px] font-mono font-bold px-3 py-1 hover:border-primary/50 hover:text-primary transition-colors cursor-pointer"
            >REST_APIS</Badge
          >
        </a>
        <a href="https://www.docker.com/" target="_blank" rel="noopener noreferrer">
          <Badge
            variant="outline"
            class="rounded-lg border-border bg-card/40 text-foreground text-[10px] font-mono font-bold px-3 py-1 hover:border-primary/50 hover:text-primary transition-colors cursor-pointer"
            >DOCKER</Badge
          >
        </a>
        <a
          href="https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Badge
            variant="outline"
            class="rounded-lg border-border bg-card/40 text-foreground text-[10px] font-mono font-bold px-3 py-1 hover:border-primary/50 hover:text-primary transition-colors cursor-pointer"
            >WEBSOCKETS</Badge
          >
        </a>
        <a href="https://git-scm.com/" target="_blank" rel="noopener noreferrer">
          <Badge
            variant="outline"
            class="rounded-lg border-border bg-card/40 text-foreground text-[10px] font-mono font-bold px-3 py-1 hover:border-primary/50 hover:text-primary transition-colors cursor-pointer"
            >GIT</Badge
          >
        </a>
        <a href="https://www.debian.org/" target="_blank" rel="noopener noreferrer">
          <Badge
            variant="outline"
            class="rounded-lg border-border bg-card/40 text-foreground text-[10px] font-mono font-bold px-3 py-1 hover:border-primary/50 hover:text-primary transition-colors cursor-pointer"
            >LINUX_DEBIAN</Badge
          >
        </a>
        <a href="https://en.wikipedia.org/wiki/CI/CD" target="_blank" rel="noopener noreferrer">
          <Badge
            variant="outline"
            class="rounded-lg border-border bg-card/40 text-foreground text-[10px] font-mono font-bold px-3 py-1 hover:border-primary/50 hover:text-primary transition-colors cursor-pointer"
            >CI_CD</Badge
          >
        </a>
        <a
          href="https://en.wikipedia.org/wiki/Query_optimization"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Badge
            variant="outline"
            class="rounded-lg border-border bg-card/40 text-foreground text-[10px] font-mono font-bold px-3 py-1 hover:border-primary/50 hover:text-primary transition-colors cursor-pointer"
            >SQL_OPTIMIZATION</Badge
          >
        </a>
      </div>
    </div>
  </div>
</template>
