<script setup lang="ts">
import { Calendar } from 'lucide-vue-next';

interface TechLink {
  name: string;
  url: string;
}

interface Experience {
  period: string;
  role: string;
  company: string;
  location: string;
  type: string;
  highlights: string[];
  skills: TechLink[];
}

const experiences: Experience[] = [
  {
    period: '2025 — Present',
    role: 'Senior Systems Architect & Full-Stack Engineer',
    company: 'Independent Client Deployments',
    location: 'Remote / Dhaka, BD',
    type: 'Full-Time / Contract',
    highlights: [
      'Architected and delivered high-performance full-stack web applications utilizing Nuxt 3, Vue 3, and Node.js microservices.',
      'Constructed optimized transit data parsers and web scraping engines parsing live transport feeds with low-latency caching.',
      'Tuned relational database indexes and queries across PostgreSQL and MySQL for high concurrent workload efficiency.',
    ],
    skills: [
      { name: 'Nuxt 3', url: 'https://nuxt.com/' },
      { name: 'TypeScript', url: 'https://www.typescriptlang.org/' },
      { name: 'PostgreSQL', url: 'https://www.postgresql.org/' },
      { name: 'Redis', url: 'https://redis.io/' },
      { name: 'Node.js', url: 'https://nodejs.org/' },
      { name: 'Nitro', url: 'https://nitro.unjs.io/' },
    ],
  },
  {
    period: '2023 — 2024',
    role: 'Full-Stack Systems Consultant',
    company: 'Client Engineering & Product Teams',
    location: 'Dhaka, Bangladesh',
    type: 'Commercial Projects',
    highlights: [
      'Built real-time multiplayer systems utilizing Socket.IO and clustered Express backend architectures.',
      'Containerized full application stacks with Docker and automated staging workflows via Git pipelines.',
      'Assisted in data modeling migrations from legacy relational schemas into optimized hybrid document and SQL stores.',
    ],
    skills: [
      { name: 'Vue 3', url: 'https://vuejs.org/' },
      { name: 'Socket.IO', url: 'https://socket.io/' },
      { name: 'Express', url: 'https://expressjs.com/' },
      { name: 'MongoDB', url: 'https://www.mongodb.com/' },
      { name: 'Docker', url: 'https://www.docker.com/' },
      { name: 'REST APIs', url: 'https://en.wikipedia.org/wiki/REST' },
    ],
  },
  {
    period: '2021 — 2022',
    role: 'Full-Stack Web Developer',
    company: 'Commercial Systems Initiation',
    location: 'Dhaka, Bangladesh',
    type: 'Early Career',
    highlights: [
      'Engineered custom administrative dashboards and database-driven web platforms using raw PHP and JavaScript.',
      'Implemented responsive SPAs with Vue.js, streamlining API payload structures and improving client load times.',
      'Configured Apache/Nginx web server hosting and maintained operational uptime across production Linux environments.',
    ],
    skills: [
      { name: 'PHP 8', url: 'https://www.php.net/' },
      { name: 'JavaScript', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript' },
      { name: 'MySQL', url: 'https://www.mysql.com/' },
      { name: 'Vue.js', url: 'https://vuejs.org/' },
      { name: 'HTML/CSS', url: 'https://developer.mozilla.org/en-US/docs/Web/HTML' },
      { name: 'Linux', url: 'https://www.kernel.org/' },
    ],
  },
];
</script>

<template>
  <div class="space-y-6">
    <div class="space-y-6">
      <div
        v-for="exp in experiences"
        :key="exp.period"
        class="bg-card border border-border rounded-xl p-5 md:p-6 space-y-4 hover:border-border-hover transition-colors"
      >
        <div
          class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border/60 pb-3"
        >
          <div>
            <h4 class="text-base font-bold text-foreground font-heading">{{ exp.role }}</h4>
            <div class="flex items-center gap-2 text-xs text-muted-foreground mt-0.5 font-mono">
              <span class="text-foreground font-medium">{{ exp.company }}</span>
              <span>·</span>
              <span>{{ exp.location }}</span>
            </div>
          </div>
          <div class="flex items-center gap-2 text-xs font-mono text-muted-foreground shrink-0">
            <Calendar class="size-3.5 text-accent" />
            <span>{{ exp.period }}</span>
          </div>
        </div>

        <ul class="space-y-2 text-xs md:text-sm text-muted-foreground leading-relaxed">
          <li v-for="(highlight, i) in exp.highlights" :key="i" class="flex items-start gap-2">
            <span class="text-accent mt-1 text-xs">›</span>
            <span>{{ highlight }}</span>
          </li>
        </ul>

        <div class="flex flex-wrap gap-1.5 pt-2">
          <a
            v-for="skill in exp.skills"
            :key="skill.name"
            :href="skill.url"
            target="_blank"
            rel="noopener noreferrer"
            class="text-[10px] font-mono text-muted-foreground hover:text-accent bg-secondary hover:border-accent/40 px-2 py-0.5 rounded-md border border-border/60 transition-colors inline-flex items-center gap-0.5"
          >
            <span>{{ skill.name }}</span>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
