<script setup lang="ts">
import { Code2, Database, Layers, ArrowUpRight } from 'lucide-vue-next';

interface SkillItem {
  name: string;
  level: string;
  url: string;
  description: string;
  tags: { name: string; url: string }[];
}

interface SkillCategory {
  title: string;
  description: string;
  icon: typeof Code2;
  items: SkillItem[];
}

const categories: SkillCategory[] = [
  {
    title: 'Languages & Core Systems',
    description: 'Foundation and systems programming specifications',
    icon: Code2,
    items: [
      {
        name: 'TypeScript',
        level: 'Expert',
        url: 'https://www.typescriptlang.org/',
        description:
          'ESNext specs, asynchronous promise pipelines, strict compiler configurations, and generics.',
        tags: [
          { name: 'TypeScript', url: 'https://www.typescriptlang.org/' },
          { name: 'JavaScript', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript' },
          { name: 'Node.js', url: 'https://nodejs.org/' },
          { name: 'V8 Engine', url: 'https://v8.dev/' },
        ],
      },
      {
        name: 'PHP 8.x',
        level: 'Advanced',
        url: 'https://www.php.net/',
        description:
          'Type-safe object oriented architectures, Composer ecosystem, OPcache optimization, and modern APIs.',
        tags: [
          { name: 'PHP', url: 'https://www.php.net/' },
          { name: 'Composer', url: 'https://getcomposer.org/' },
          { name: 'PHP-FIG (PSR)', url: 'https://www.php-fig.org/' },
        ],
      },
      {
        name: 'SQL & Relational Querying',
        level: 'Advanced',
        url: 'https://en.wikipedia.org/wiki/SQL',
        description:
          'Query planning, complex CTEs, indexing optimizations, transactions, and performance tuning.',
        tags: [
          { name: 'Query Optimization', url: 'https://en.wikipedia.org/wiki/Query_optimization' },
          { name: 'B-Tree Indexing', url: 'https://en.wikipedia.org/wiki/B-tree' },
          { name: 'ACID', url: 'https://en.wikipedia.org/wiki/ACID' },
        ],
      },
    ],
  },
  {
    title: 'Databases & Infrastructure',
    description: 'Data persistence, caching, and database topologies',
    icon: Database,
    items: [
      {
        name: 'PostgreSQL & MySQL',
        level: 'Advanced',
        url: 'https://www.postgresql.org/',
        description:
          'Relational data modeling, connection pooling, complex JSONB document queries, and high concurrency.',
        tags: [
          { name: 'PostgreSQL', url: 'https://www.postgresql.org/' },
          { name: 'MySQL', url: 'https://www.mysql.com/' },
          { name: 'Prisma', url: 'https://www.prisma.io/' },
        ],
      },
      {
        name: 'MongoDB & Redis',
        level: 'Proficient',
        url: 'https://www.mongodb.com/',
        description:
          'High-speed distributed cache tiers, document collections, and aggregation frameworks.',
        tags: [
          { name: 'MongoDB', url: 'https://www.mongodb.com/' },
          { name: 'Redis', url: 'https://redis.io/' },
          { name: 'NoSQL', url: 'https://en.wikipedia.org/wiki/NoSQL' },
        ],
      },
      {
        name: 'Docker & Linux',
        level: 'Proficient',
        url: 'https://www.docker.com/',
        description:
          'Containerized staging environments, Debian/Arch configurations, Nginx reverse proxies, and CI/CD.',
        tags: [
          { name: 'Docker', url: 'https://www.docker.com/' },
          { name: 'Debian', url: 'https://www.debian.org/' },
          { name: 'Nginx', url: 'https://nginx.org/' },
          { name: 'Git', url: 'https://git-scm.com/' },
        ],
      },
    ],
  },
  {
    title: 'Frontend & Reactive Frameworks',
    description: 'Modern client architectures with server-side rendering',
    icon: Layers,
    items: [
      {
        name: 'Nuxt 3 & Vue 3',
        level: 'Expert',
        url: 'https://nuxt.com/',
        description:
          'Server-side rendering (SSR), Nitro server engines, Pinia state stores, and Vite hybrid builds.',
        tags: [
          { name: 'Nuxt 3', url: 'https://nuxt.com/' },
          { name: 'Vue.js', url: 'https://vuejs.org/' },
          { name: 'Nitro', url: 'https://nitro.unjs.io/' },
          { name: 'Vite', url: 'https://vite.dev/' },
        ],
      },
      {
        name: 'Tailwind CSS',
        level: 'Expert',
        url: 'https://tailwindcss.com/',
        description:
          'Component design systems, responsive utilities, custom tokens, and modern typography.',
        tags: [
          { name: 'Tailwind CSS', url: 'https://tailwindcss.com/' },
          { name: 'Reka UI', url: 'https://reka-ui.com/' },
          { name: 'shadcn-vue', url: 'https://www.shadcn-vue.com/' },
        ],
      },
      {
        name: 'WebSockets & Real-time',
        level: 'Proficient',
        url: 'https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API',
        description:
          'Bi-directional socket connections, room multiplexing, and low-latency state synchronization.',
        tags: [
          { name: 'Socket.IO', url: 'https://socket.io/' },
          {
            name: 'WebSockets',
            url: 'https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API',
          },
          { name: 'REST APIs', url: 'https://en.wikipedia.org/wiki/REST' },
        ],
      },
    ],
  },
];
</script>

<template>
  <div class="space-y-8">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div
        v-for="category in categories"
        :key="category.title"
        class="bg-card border border-border rounded-xl p-5 flex flex-col justify-between space-y-6 hover:border-border-hover transition-colors"
      >
        <div class="space-y-4">
          <div class="flex items-center gap-3">
            <div
              class="size-8 rounded-lg bg-secondary flex items-center justify-center text-foreground"
            >
              <component :is="category.icon" class="size-4 text-accent" />
            </div>
            <div>
              <h4 class="text-sm font-bold text-foreground font-heading">{{ category.title }}</h4>
              <p class="text-[11px] text-muted-foreground">{{ category.description }}</p>
            </div>
          </div>

          <div class="space-y-4 pt-2">
            <div
              v-for="item in category.items"
              :key="item.name"
              class="space-y-1.5 border-t border-border/50 pt-3 first:border-t-0 first:pt-0"
            >
              <div class="flex items-center justify-between">
                <a
                  :href="item.url"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-xs font-semibold text-foreground hover:text-accent flex items-center gap-1 transition-colors group"
                >
                  <span>{{ item.name }}</span>
                  <ArrowUpRight
                    class="size-3 text-muted-foreground group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
                  />
                </a>
                <span
                  class="text-[10px] font-mono text-muted-foreground bg-secondary px-2 py-0.5 rounded-full"
                >
                  {{ item.level }}
                </span>
              </div>
              <p class="text-[11px] text-muted-foreground leading-relaxed">
                {{ item.description }}
              </p>
              <div class="flex flex-wrap gap-1 pt-1">
                <a
                  v-for="tag in item.tags"
                  :key="tag.name"
                  :href="tag.url"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-[10px] font-mono text-muted-foreground hover:text-accent bg-background hover:border-accent/30 px-2 py-0.5 rounded-md border border-border/60 transition-colors inline-flex items-center gap-0.5"
                >
                  <span>{{ tag.name }}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
