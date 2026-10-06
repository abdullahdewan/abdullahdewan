<script setup lang="ts">
import { ArrowUpRight } from 'lucide-vue-next';

interface Skill {
  name: string;
  icon: string;
  category: string;
  url: string;
}

const skills: Skill[] = [
  {
    name: 'Vue.js',
    icon: '/tech/vue.svg',
    category: 'Frontend',
    url: 'https://vuejs.org',
  },
  {
    name: 'Nuxt',
    icon: '/tech/nuxt.svg',
    category: 'Fullstack',
    url: 'https://nuxt.com',
  },
  {
    name: 'TypeScript',
    icon: '/tech/typescript.svg',
    category: 'Languages',
    url: 'https://www.typescriptlang.org',
  },
  {
    name: 'JavaScript',
    icon: '/tech/javascript.svg',
    category: 'Languages',
    url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
  },
  {
    name: 'Node.js',
    icon: '/tech/nodejs.svg',
    category: 'Backend',
    url: 'https://nodejs.org',
  },
  {
    name: 'PHP',
    icon: '/tech/php.svg',
    category: 'Languages',
    url: 'https://www.php.net',
  },
  {
    name: 'PostgreSQL',
    icon: '/tech/postgresql.svg',
    category: 'Database',
    url: 'https://www.postgresql.org',
  },
  {
    name: 'MySQL',
    icon: '/tech/mysql.svg',
    category: 'Database',
    url: 'https://www.mysql.com',
  },
  {
    name: 'MongoDB',
    icon: '/tech/mongodb.svg',
    category: 'Database',
    url: 'https://www.mongodb.com',
  },
  {
    name: 'Tailwind CSS',
    icon: '/tech/tailwindcss.svg',
    category: 'Styling',
    url: 'https://tailwindcss.com',
  },
  {
    name: 'Docker',
    icon: '/tech/docker.svg',
    category: 'DevOps',
    url: 'https://www.docker.com',
  },
  {
    name: 'Git',
    icon: '/tech/git.svg',
    category: 'Tools',
    url: 'https://git-scm.com',
  },
];
</script>

<template>
  <div class="space-y-8">
    <div class="text-center max-w-xl mx-auto space-y-2">
      <span
        class="text-xs uppercase tracking-widest text-zinc-400 font-medium inline-flex items-center gap-2"
      >
        <span class="w-1.5 h-1.5 rounded-full bg-primary"></span>
        Core Capabilities
      </span>
      <h2 class="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">My Skills</h2>
    </div>

    <!-- Tech Grid with Official 1:1 Logos and External Links -->
    <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
      <a
        v-for="skill in skills"
        :key="skill.name"
        :href="skill.url"
        target="_blank"
        rel="noopener noreferrer"
        :title="`Visit official ${skill.name} website`"
        class="group relative bg-[#18181a] hover:bg-[#1f1f22] border border-white/5 hover:border-orange-500/40 rounded-2xl p-4 flex flex-col items-center justify-center text-center gap-3 transition-all duration-300 shadow-sm hover:shadow-lg hover:-translate-y-0.5 cursor-pointer"
      >
        <!-- External link indicator on hover -->
        <div
          class="absolute top-2.5 right-2.5 text-zinc-600 group-hover:text-primary transition-colors opacity-0 group-hover:opacity-100"
        >
          <ArrowUpRight class="size-3.5" />
        </div>

        <!-- 1:1 Logo Container with subtle glow on hover -->
        <div
          class="w-12 h-12 rounded-xl bg-white/[0.03] group-hover:bg-primary/[0.08] border border-white/5 group-hover:border-primary/20 flex items-center justify-center p-2.5 transition-all duration-300 group-hover:scale-105"
        >
          <img
            :src="skill.icon"
            :alt="`${skill.name} logo`"
            class="w-full h-full object-contain filter grayscale contrast-125 brightness-110 group-hover:grayscale-0 group-hover:contrast-100 transition-all duration-300"
            loading="lazy"
          />
        </div>

        <div class="space-y-0.5">
          <div
            class="text-xs sm:text-sm font-semibold text-white group-hover:text-orange-400 transition-colors"
          >
            {{ skill.name }}
          </div>
          <div class="text-[10px] text-zinc-400 font-mono">{{ skill.category }}</div>
        </div>
      </a>
    </div>
  </div>
</template>
