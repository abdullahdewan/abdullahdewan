<script setup lang="ts">
import { ref } from 'vue';
import { Badge } from '~/components/ui/badge';
import { ExternalLink, Cpu, CheckCircle2, Play } from 'lucide-vue-next';

interface Skill {
  name: string;
  level: number;
  category: 'languages' | 'backend' | 'frontend';
  comment: string;
  officialUrl: string;
  details: string[];
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
    <div class="border-b-3 border-black dark:border-white pb-4">
      <h2
        class="text-lg font-black font-mono tracking-tight flex items-center gap-2 text-foreground uppercase"
      >
        <span class="w-3 h-5 bg-primary border border-black dark:border-white"></span>
        SYS_SKILLS_MATRIX.exe
      </h2>
      <p class="text-[10px] text-foreground font-mono font-bold uppercase mt-1">
        Skill metrics based on commercial operations since 2021 // Click on any skill card to
        analyze
      </p>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start font-sans">
      <!-- Skills Matrix Column -->
      <div class="lg:col-span-2 space-y-6">
        <!-- Languages Section -->
        <div class="space-y-3">
          <h3
            class="text-[10px] font-black uppercase tracking-widest bg-primary text-primary-foreground px-2.5 py-1 inline-block border-2 border-black dark:border-white font-mono shadow-[2px_2px_0px_0px_#000] dark:shadow-[2px_2px_0px_0px_#ffffff]"
          >
            01 // CORE_LANGUAGES
          </h3>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div
              v-for="skill in skills.filter((s) => s.category === 'languages')"
              :key="skill.name"
              class="bg-card border-3 border-black dark:border-white p-4 flex flex-col justify-between gap-3 shadow-[3px_3px_0px_0px_#000000] dark:shadow-[3px_3px_0px_0px_#06b6d4] transition-all duration-150 cursor-pointer"
              :class="
                selectedSkill.name === skill.name
                  ? 'bg-yellow-100 dark:bg-slate-900 border-3 border-black dark:border-cyan-400 shadow-[5px_5px_0px_0px_#000] -translate-y-0.5'
                  : 'hover:-translate-y-0.5'
              "
              @click="selectSkill(skill)"
              @mouseenter="playTick()"
            >
              <div class="flex justify-between items-start">
                <div>
                  <div
                    class="font-black text-foreground text-sm flex items-center gap-1.5 font-mono uppercase"
                  >
                    <span>{{ skill.name }}</span>
                  </div>
                  <span class="text-[9px] text-muted-foreground font-mono font-bold mt-0.5 block"
                    >// {{ skill.comment }}</span
                  >
                </div>
                <span
                  class="text-[10px] font-black text-primary-foreground font-mono bg-primary px-2 py-0.5 border border-black dark:border-white shadow-[1px_1px_0px_0px_#000]"
                  >{{ skill.level * 10 }}%</span
                >
              </div>
              <div
                class="w-full bg-slate-900 border-2 border-black dark:border-white h-3.5 p-0.5 flex gap-0.5"
              >
                <div
                  v-for="barIdx in 10"
                  :key="barIdx"
                  class="h-full flex-1 border border-black"
                  :class="barIdx <= skill.level ? 'bg-primary' : 'bg-slate-800'"
                ></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Backend Section -->
        <div class="space-y-3">
          <h3
            class="text-[10px] font-black uppercase tracking-widest bg-secondary text-secondary-foreground px-2.5 py-1 inline-block border-2 border-black dark:border-white font-mono shadow-[2px_2px_0px_0px_#000] dark:shadow-[2px_2px_0px_0px_#ffffff]"
          >
            02 // DATABASE_&&_BACKEND
          </h3>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div
              v-for="skill in skills.filter((s) => s.category === 'backend')"
              :key="skill.name"
              class="bg-card border-3 border-black dark:border-white p-4 flex flex-col justify-between gap-3 shadow-[3px_3px_0px_0px_#000000] dark:shadow-[3px_3px_0px_0px_#06b6d4] transition-all duration-150 cursor-pointer"
              :class="
                selectedSkill.name === skill.name
                  ? 'bg-cyan-100 dark:bg-slate-900 border-3 border-black dark:border-yellow-400 shadow-[5px_5px_0px_0px_#000] -translate-y-0.5'
                  : 'hover:-translate-y-0.5'
              "
              @click="selectSkill(skill)"
              @mouseenter="playTick()"
            >
              <div class="flex justify-between items-start">
                <div>
                  <div
                    class="font-black text-foreground text-sm flex items-center gap-1.5 font-mono uppercase"
                  >
                    <span>{{ skill.name }}</span>
                  </div>
                  <span class="text-[9px] text-muted-foreground font-mono font-bold mt-0.5 block"
                    >// {{ skill.comment }}</span
                  >
                </div>
                <span
                  class="text-[10px] font-black text-secondary-foreground font-mono bg-secondary px-2 py-0.5 border border-black dark:border-white shadow-[1px_1px_0px_0px_#000]"
                  >{{ skill.level * 10 }}%</span
                >
              </div>
              <div
                class="w-full bg-slate-900 border-2 border-black dark:border-white h-3.5 p-0.5 flex gap-0.5"
              >
                <div
                  v-for="barIdx in 10"
                  :key="barIdx"
                  class="h-full flex-1 border border-black"
                  :class="barIdx <= skill.level ? 'bg-secondary' : 'bg-slate-800'"
                ></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Frontend Section -->
        <div class="space-y-3">
          <h3
            class="text-[10px] font-black uppercase tracking-widest bg-pink-700 text-white px-2.5 py-1 inline-block border-2 border-black dark:border-white font-mono shadow-[2px_2px_0px_0px_#000] dark:shadow-[2px_2px_0px_0px_#ffffff]"
          >
            03 // CLIENT_FRAMEWORKS
          </h3>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div
              v-for="skill in skills.filter((s) => s.category === 'frontend')"
              :key="skill.name"
              class="bg-card border-3 border-black dark:border-white p-4 flex flex-col justify-between gap-3 shadow-[3px_3px_0px_0px_#000000] dark:shadow-[3px_3px_0px_0px_#06b6d4] transition-all duration-150 cursor-pointer"
              :class="
                selectedSkill.name === skill.name
                  ? 'bg-pink-100 dark:bg-slate-900 border-3 border-black dark:border-pink-500 shadow-[5px_5px_0px_0px_#000] -translate-y-0.5'
                  : 'hover:-translate-y-0.5'
              "
              @click="selectSkill(skill)"
              @mouseenter="playTick()"
            >
              <div class="flex justify-between items-start">
                <div>
                  <div
                    class="font-black text-foreground text-sm flex items-center gap-1.5 font-mono uppercase"
                  >
                    <span>{{ skill.name }}</span>
                  </div>
                  <span class="text-[9px] text-muted-foreground font-mono font-bold mt-0.5 block"
                    >// {{ skill.comment }}</span
                  >
                </div>
                <span
                  class="text-[10px] font-black text-white font-mono bg-pink-700 px-2 py-0.5 border border-black dark:border-white shadow-[1px_1px_0px_0px_#000]"
                  >{{ skill.level * 10 }}%</span
                >
              </div>
              <div
                class="w-full bg-slate-900 border-2 border-black dark:border-white h-3.5 p-0.5 flex gap-0.5"
              >
                <div
                  v-for="barIdx in 10"
                  :key="barIdx"
                  class="h-full flex-1 border border-black"
                  :class="barIdx <= skill.level ? 'bg-pink-600' : 'bg-slate-800'"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Skill Analyzer HUD Column -->
      <div class="lg:col-span-1 space-y-4 font-mono">
        <div
          class="border-3 border-black dark:border-white bg-card p-4 text-[10px] leading-relaxed select-none relative shadow-[4px_4px_0px_0px_#000000] dark:shadow-[4px_4px_0px_0px_#06b6d4]"
        >
          <div
            class="border-b-2 border-black dark:border-white pb-2 mb-3 flex items-center justify-between bg-primary text-primary-foreground p-2 border border-black"
          >
            <span class="font-black uppercase flex items-center gap-1.5">
              <Cpu class="size-4" />
              SKILL ANALYZER HUD
            </span>
            <span class="text-[9px] font-black bg-black text-white px-1.5 py-0.5"
              >ID: 0{{ selectedSkill.level }}</span
            >
          </div>

          <!-- Display Box -->
          <div class="space-y-4">
            <div>
              <span class="text-[8px] text-muted-foreground block uppercase font-bold"
                >SELECTED NODE:</span
              >
              <div class="flex items-center justify-between mt-0.5">
                <span class="text-sm font-black text-foreground uppercase">{{
                  selectedSkill.name
                }}</span>
                <a
                  :href="selectedSkill.officialUrl"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-[9px] font-black bg-secondary text-secondary-foreground px-2 py-0.5 border border-black dark:border-white shadow-[1px_1px_0px_0px_#000] flex items-center gap-0.5"
                >
                  DOCS
                  <ExternalLink class="size-2.5" />
                </a>
              </div>
            </div>

            <!-- Proficiency details load -->
            <div>
              <span class="text-[8px] text-muted-foreground block uppercase font-bold"
                >SYS LOAD CAPACITY:</span
              >
              <div class="flex items-center gap-2 mt-1">
                <div class="flex gap-1 flex-1 bg-slate-900 border-2 border-black p-1">
                  <div
                    v-for="idx in 10"
                    :key="idx"
                    class="h-3.5 flex-1 border border-black"
                    :class="idx <= selectedSkill.level ? 'bg-primary' : 'bg-slate-800'"
                  ></div>
                </div>
                <span class="font-black text-foreground text-xs"
                  >{{ selectedSkill.level * 10 }}%</span
                >
              </div>
            </div>

            <!-- Tech Details Bullet points -->
            <div
              class="bg-muted p-3 border-2 border-black dark:border-white shadow-[2px_2px_0px_0px_#000]"
            >
              <span class="text-[8px] text-foreground font-black block uppercase mb-1.5"
                >// TECH_INTEGRATION_METRIC:</span
              >
              <ul class="space-y-1 text-foreground font-bold">
                <li
                  v-for="(detail, i) in selectedSkill.details"
                  :key="i"
                  class="flex items-start gap-1"
                >
                  <span class="text-primary font-black">»</span>
                  <span class="leading-tight">{{ detail }}</span>
                </li>
              </ul>
            </div>

            <!-- Compiling Sanity Checker -->
            <div class="border-t-2 border-black dark:border-white pt-3">
              <button
                class="w-full py-2.5 bg-secondary text-secondary-foreground border-2 border-black dark:border-white shadow-[3px_3px_0px_0px_#000] hover:-translate-y-0.5 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none text-[9px] font-black text-center tracking-widest cursor-pointer uppercase flex items-center justify-center gap-1.5 transition-all"
                :disabled="isTesting"
                @click="runSanityCheck"
                @mouseenter="playTick()"
              >
                <Play v-if="!isTesting" class="size-3 fill-black dark:fill-white" />
                <span v-else class="size-2 bg-amber-400 border border-black animate-ping"></span>
                {{ isTesting ? 'RUNNING COMPILE SCAN...' : 'RUN AST SANITY CHECK' }}
              </button>

              <!-- Tester Logs Output -->
              <div
                v-if="testLogs.length > 0"
                class="mt-2.5 bg-slate-950 text-cyan-400 p-2.5 border-2 border-black font-mono text-[8px] leading-relaxed max-h-[100px] overflow-y-auto"
              >
                <div v-for="(log, i) in testLogs" :key="i" class="truncate font-bold">
                  <span class="text-yellow-400">&gt;</span> {{ log }}
                </div>
                <div
                  v-if="testSuccess"
                  class="text-green-400 font-black flex items-center gap-1 mt-1.5 uppercase text-[9px] border-t border-green-500/30 pt-1.5"
                >
                  <CheckCircle2 class="size-3.5 text-green-400" />
                  STATUS: COMPILE NOMINAL (0 ERRORS)
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Meta Tags / Environment keywords -->
    <div class="border-t-3 border-black dark:border-white pt-5 font-sans">
      <div class="text-[10px] text-foreground font-mono font-black uppercase mb-3 tracking-wider">
        ADDITIONAL_ENVIRONMENT_KEYWORDS:
      </div>
      <div class="flex flex-wrap gap-2">
        <a href="https://en.wikipedia.org/wiki/REST" target="_blank" rel="noopener noreferrer">
          <Badge
            variant="outline"
            class="hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer"
            >REST_APIS</Badge
          >
        </a>
        <a href="https://www.docker.com/" target="_blank" rel="noopener noreferrer">
          <Badge
            variant="outline"
            class="hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer"
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
            class="hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer"
            >WEBSOCKETS</Badge
          >
        </a>
        <a href="https://git-scm.com/" target="_blank" rel="noopener noreferrer">
          <Badge
            variant="outline"
            class="hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer"
            >GIT</Badge
          >
        </a>
        <a href="https://www.debian.org/" target="_blank" rel="noopener noreferrer">
          <Badge
            variant="outline"
            class="hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer"
            >LINUX_DEBIAN</Badge
          >
        </a>
        <a href="https://en.wikipedia.org/wiki/CI/CD" target="_blank" rel="noopener noreferrer">
          <Badge
            variant="outline"
            class="hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer"
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
            class="hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer"
            >SQL_OPTIMIZATION</Badge
          >
        </a>
      </div>
    </div>
  </div>
</template>
