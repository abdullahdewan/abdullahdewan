<script setup lang="ts">
import { Badge } from '~/components/ui/badge';

interface Skill {
  name: string;
  level: number; // 1 to 10
  category: 'languages' | 'backend' | 'frontend';
  comment: string;
}

const skills: Skill[] = [
  { name: 'JavaScript', level: 9, category: 'languages', comment: 'Full-stack standard' },
  { name: 'TypeScript', level: 9, category: 'languages', comment: 'Type-safe production systems' },
  { name: 'PHP', level: 8, category: 'languages', comment: 'Legacy & Modern Laravel/Custom' },
  { name: 'MySQL', level: 8, category: 'backend', comment: 'Relational design & optimization' },
  { name: 'PostgreSQL', level: 8, category: 'backend', comment: 'Advanced queries & indexing' },
  { name: 'MongoDB', level: 8, category: 'backend', comment: 'NoSQL collections & scaling' },
  {
    name: 'Vue.js',
    level: 9,
    category: 'frontend',
    comment: 'Advanced component architectures (Good)',
  },
  {
    name: 'Nuxt.js',
    level: 9,
    category: 'frontend',
    comment: 'Server-side rendering & SEO (Good)',
  },
  { name: 'React.js', level: 6, category: 'frontend', comment: 'Basic SPA integrations' },
];

const getProgressBar = (level: number) => {
  const filled = '█'.repeat(level);
  const empty = '░'.repeat(10 - level);
  return `[${filled}${empty}]`;
};
</script>

<template>
  <div class="space-y-6">
    <div class="border-b-2 border-foreground pb-4">
      <h2 class="text-xl uppercase font-bold tracking-tight">SYS_SKILLS_MATRIX.exe</h2>
      <p class="text-xs text-muted-foreground uppercase font-mono mt-1">
        Skill metrics based on commercial operations since 2021
      </p>
    </div>
    <div class="space-y-6 font-mono">
      <!-- Languages Section -->
      <div class="space-y-3">
        <h3
          class="text-sm font-bold uppercase tracking-wider text-muted-foreground border-b border-foreground/20 pb-1"
        >
          01/ CORE_LANGUAGES
        </h3>
        <div class="space-y-3">
          <div
            v-for="skill in skills.filter((s) => s.category === 'languages')"
            :key="skill.name"
            class="flex flex-col sm:flex-row sm:items-center justify-between text-xs gap-2"
          >
            <div class="flex items-center gap-2">
              <span class="text-foreground font-bold">{{ skill.name }}</span>
              <span class="text-muted-foreground">// {{ skill.comment }}</span>
            </div>
            <div class="flex items-center gap-3 text-right">
              <span class="text-foreground select-none">{{ getProgressBar(skill.level) }}</span>
              <span class="font-bold text-foreground/80">{{ skill.level * 10 }}%</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Backend Section -->
      <div class="space-y-3">
        <h3
          class="text-sm font-bold uppercase tracking-wider text-muted-foreground border-b border-foreground/20 pb-1"
        >
          02/ DATABASE_&&_BACKEND
        </h3>
        <div class="space-y-3">
          <div
            v-for="skill in skills.filter((s) => s.category === 'backend')"
            :key="skill.name"
            class="flex flex-col sm:flex-row sm:items-center justify-between text-xs gap-2"
          >
            <div class="flex items-center gap-2">
              <span class="text-foreground font-bold">{{ skill.name }}</span>
              <span class="text-muted-foreground">// {{ skill.comment }}</span>
            </div>
            <div class="flex items-center gap-3 text-right">
              <span class="text-foreground select-none">{{ getProgressBar(skill.level) }}</span>
              <span class="font-bold text-foreground/80">{{ skill.level * 10 }}%</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Frontend Section -->
      <div class="space-y-3">
        <h3
          class="text-sm font-bold uppercase tracking-wider text-muted-foreground border-b border-foreground/20 pb-1"
        >
          03/ CLIENT_FRAMEWORKS
        </h3>
        <div class="space-y-3">
          <div
            v-for="skill in skills.filter((s) => s.category === 'frontend')"
            :key="skill.name"
            class="flex flex-col sm:flex-row sm:items-center justify-between text-xs gap-2"
          >
            <div class="flex items-center gap-2">
              <span class="text-foreground font-bold">{{ skill.name }}</span>
              <span class="text-muted-foreground">// {{ skill.comment }}</span>
            </div>
            <div class="flex items-center gap-3 text-right">
              <span class="text-foreground select-none">{{ getProgressBar(skill.level) }}</span>
              <span class="font-bold text-foreground/80">{{ skill.level * 10 }}%</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Meta Tags / Environment tags -->
      <div class="border-t border-foreground/20 pt-4">
        <div class="text-[10px] text-muted-foreground uppercase mb-2">
          ADDITIONAL_ENVIRONMENT_KEYWORDS:
        </div>
        <div class="flex flex-wrap gap-1.5">
          <Badge
            variant="outline"
            class="rounded-none border-foreground text-[10px] font-bold px-2 py-0.5"
            >REST_APIS</Badge
          >
          <Badge
            variant="outline"
            class="rounded-none border-foreground text-[10px] font-bold px-2 py-0.5"
            >DOCKER</Badge
          >
          <Badge
            variant="outline"
            class="rounded-none border-foreground text-[10px] font-bold px-2 py-0.5"
            >WEBSOCKETS</Badge
          >
          <Badge
            variant="outline"
            class="rounded-none border-foreground text-[10px] font-bold px-2 py-0.5"
            >GIT</Badge
          >
          <Badge
            variant="outline"
            class="rounded-none border-foreground text-[10px] font-bold px-2 py-0.5"
            >LINUX_DEBIAN</Badge
          >
          <Badge
            variant="outline"
            class="rounded-none border-foreground text-[10px] font-bold px-2 py-0.5"
            >CI_CD</Badge
          >
          <Badge
            variant="outline"
            class="rounded-none border-foreground text-[10px] font-bold px-2 py-0.5"
            >SQL_OPTIMIZATION</Badge
          >
        </div>
      </div>
    </div>
  </div>
</template>
