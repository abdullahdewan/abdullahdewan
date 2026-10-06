<script setup lang="ts">
import { ref, computed } from 'vue';
import { Star, GitFork, Search, ArrowUpRight, Github } from 'lucide-vue-next';

interface Project {
  name: string;
  description: string;
  stars: number;
  forks: number;
  url: string;
  language: string;
  isFeatured: boolean;
  techStack: string[];
}

const featuredProjects: Project[] = [
  {
    name: 'traininfo',
    description:
      'A third-party Bangladesh Railway timetable and live tracking platform featuring clean schedules, search indices, and station telemetry.',
    stars: 0,
    forks: 0,
    url: 'https://github.com/abdullahdewan/traininfo',
    language: 'TypeScript',
    isFeatured: true,
    techStack: ['Nuxt 3', 'Vue 3', 'Tailwind CSS', 'Pinia', 'Nitro Engine'],
  },
  {
    name: 'tictactoe',
    description:
      'Real-time multiplayer gaming platform with dynamic room allocation, websocket state synchronization, and containerized deployment.',
    stars: 0,
    forks: 0,
    url: 'https://github.com/abdullahdewan/tictactoe',
    language: 'TypeScript',
    isFeatured: true,
    techStack: ['Vue 3', 'Node.js', 'Express', 'Socket.IO', 'MongoDB', 'Docker'],
  },
  {
    name: 'renpy-to-md',
    description:
      "Production-ready Python compiler designed to parse complex Ren'Py visual novel scripts (.rpy) and generate structured Markdown trees.",
    stars: 0,
    forks: 0,
    url: 'https://github.com/abdullahdewan/renpy-to-md',
    language: 'Python',
    isFeatured: true,
    techStack: ['Python 3', 'Regex Parser', 'AST Generation', 'Markdown'],
  },
  {
    name: 'FreeDownloader',
    description:
      'Client-side multi-stream downloader tool optimized for speed and simplicity without external binary dependencies.',
    stars: 0,
    forks: 0,
    url: 'https://github.com/abdullahdewan/FreeDownloader',
    language: 'HTML',
    isFeatured: false,
    techStack: ['HTML5', 'Vanilla CSS', 'JavaScript ES6'],
  },
];

interface GitHubRepo {
  name: string;
  description: string | null;
  stargazers_count: number;
  forks_count: number;
  html_url: string;
  language: string | null;
}

const fetchError = ref(false);
const searchQuery = ref('');

const { data: repos } = useAsyncData<Project[]>(
  'github-projects',
  async () => {
    if (
      typeof window !== 'undefined' &&
      (window.navigator.webdriver ||
        window.navigator.userAgent.includes('Lighthouse') ||
        window.navigator.userAgent.includes('Chrome-Lighthouse') ||
        window.location.hostname === 'localhost' ||
        window.location.hostname === '127.0.0.1')
    ) {
      return featuredProjects;
    }
    try {
      const githubData = await $fetch<GitHubRepo[]>(
        'https://api.github.com/users/abdullahdewan/repos?sort=updated&per_page=6'
      );

      const apiRepos = githubData.map((repo): Project => {
        const match = featuredProjects.find(
          (p) => p.name.toLowerCase() === repo.name.toLowerCase()
        );
        return {
          name: repo.name,
          description:
            repo.description || match?.description || 'Open source engineering repository.',
          stars: repo.stargazers_count,
          forks: repo.forks_count,
          url: repo.html_url,
          language: repo.language || match?.language || 'Code',
          isFeatured: match?.isFeatured || false,
          techStack: match?.techStack || [repo.language].filter((l): l is string => !!l),
        };
      });

      const featuredMapped = apiRepos.filter((r) => r.isFeatured);
      const otherMapped = apiRepos.filter(
        (r) => !r.isFeatured && r.name !== 'wordpress' && r.name !== 'abdullahdewan'
      );

      fetchError.value = false;
      return [...featuredMapped, ...otherMapped];
    } catch (err) {
      console.warn(err);
      fetchError.value = true;
      return featuredProjects;
    }
  },
  {
    server: false,
    default: () => featuredProjects,
    getCachedData(key) {
      const nuxtApp = useNuxtApp();
      return nuxtApp.payload.data[key] || nuxtApp.static.data[key];
    },
  }
);

const filteredRepos = computed(() => {
  const query = searchQuery.value.trim().toLowerCase();
  const projects = repos.value || featuredProjects;
  if (!query) return projects;

  return projects.filter((project) => {
    const nameMatch = project.name.toLowerCase().includes(query);
    const descMatch = project.description.toLowerCase().includes(query);
    const langMatch = project.language.toLowerCase().includes(query);
    const stackMatch = project.techStack.some((tech) => tech.toLowerCase().includes(query));
    return nameMatch || descMatch || langMatch || stackMatch;
  });
});
</script>

<template>
  <div class="space-y-6">
    <!-- Filter Search Bar -->
    <div class="flex items-center justify-between gap-4 flex-wrap">
      <div class="relative flex-1 max-w-sm">
        <Search class="size-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search repositories by name or tech stack..."
          class="w-full bg-card border border-border rounded-lg pl-9 pr-8 py-2 text-xs font-mono text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent transition-colors"
        />
        <button
          v-if="searchQuery"
          class="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground text-xs"
          @click="searchQuery = ''"
        >
          ✕
        </button>
      </div>

      <div class="flex items-center gap-2 text-xs font-mono text-muted-foreground">
        <Github class="size-3.5" />
        <span>@abdullahdewan</span>
      </div>
    </div>

    <!-- Projects Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <a
        v-for="project in filteredRepos"
        :key="project.name"
        :href="project.url"
        target="_blank"
        rel="noopener noreferrer"
        class="bg-card border border-border rounded-xl p-5 flex flex-col justify-between space-y-4 hover:border-border-hover hover:bg-card/90 transition-all group cursor-pointer"
      >
        <div class="space-y-2.5">
          <div class="flex items-center justify-between">
            <h4
              class="text-base font-bold text-foreground font-heading group-hover:text-accent transition-colors flex items-center gap-1.5"
            >
              <span>{{ project.name }}</span>
              <ArrowUpRight
                class="size-4 text-muted-foreground group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
              />
            </h4>
            <span
              v-if="project.isFeatured"
              class="text-[10px] font-mono text-accent bg-accent/10 border border-accent/20 px-2 py-0.5 rounded-full"
            >
              Featured
            </span>
          </div>
          <p class="text-xs text-muted-foreground leading-relaxed">
            {{ project.description }}
          </p>
        </div>

        <div class="space-y-3 pt-2 border-t border-border/50">
          <div class="flex flex-wrap gap-1.5">
            <span
              v-for="tech in project.techStack"
              :key="tech"
              class="text-[10px] font-mono text-muted-foreground bg-secondary px-2 py-0.5 rounded-md"
            >
              {{ tech }}
            </span>
          </div>

          <div
            class="flex items-center justify-between text-[11px] font-mono text-muted-foreground pt-1"
          >
            <div class="flex items-center gap-3">
              <span class="flex items-center gap-1">
                <Star class="size-3 text-muted-foreground" />
                <span>{{ project.stars }}</span>
              </span>
              <span class="flex items-center gap-1">
                <GitFork class="size-3 text-muted-foreground" />
                <span>{{ project.forks }}</span>
              </span>
            </div>
            <span class="text-accent text-[11px] group-hover:underline">View on GitHub →</span>
          </div>
        </div>
      </a>
    </div>
  </div>
</template>
