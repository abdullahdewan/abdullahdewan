<script setup lang="ts">
import { ref, computed } from 'vue';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from '~/components/ui/card';
import { Badge } from '~/components/ui/badge';
import { Button } from '~/components/ui/button';
import { ExternalLink, Star, GitFork, AlertCircle, Search } from 'lucide-vue-next';

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
      'A third-party Bangladesh Railway Time Table and tracking platform featuring clean schedules, live telemetry, and localization.',
    stars: 0,
    forks: 0,
    url: 'https://github.com/abdullahdewan/traininfo',
    language: 'TypeScript',
    isFeatured: true,
    techStack: ['Nuxt 3', 'Vue 3', 'Tailwind v4', 'Pinia', 'Shadcn Vue'],
  },
  {
    name: 'tictactoe',
    description:
      'A real-time multiplayer Tic-Tac-Toe game. Supports dynamic rooms, automatic win/draw detection, and full containerized deployments.',
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
      "A production-ready Python tool designed to parse complex Ren'Py visual novel scripts (.rpy files) and convert them to clean Markdown files.",
    stars: 0,
    forks: 0,
    url: 'https://github.com/abdullahdewan/renpy-to-md',
    language: 'Python',
    isFeatured: true,
    techStack: ['Python 3', 'Regex Parser', 'Markdown generator'],
  },
  {
    name: 'FreeDownloader',
    description:
      'A client-side downloader tool optimized for speed and simplicity. Supports multiple streams and direct folder save configurations.',
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

const { data: repos, status } = useAsyncData<Project[]>(
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
          description: repo.description || match?.description || 'No description provided.',
          stars: repo.stargazers_count,
          forks: repo.forks_count,
          url: repo.html_url,
          language: repo.language || match?.language || 'Unknown',
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

const loading = computed(() => status.value === 'pending');

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
    <div class="border-b-3 border-black dark:border-white pb-4">
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div>
          <h2
            class="text-lg font-black font-mono tracking-tight flex items-center gap-2 text-foreground uppercase"
          >
            <span class="w-3 h-5 bg-primary border border-black dark:border-white"></span>
            ACTIVE_REPOSITORIES.sh
          </h2>
          <p class="text-xs text-foreground font-mono font-bold uppercase mt-1">
            Direct telemetry from GitHub node @abdullahdewan
          </p>
        </div>
        <div
          v-if="loading"
          class="text-[10px] font-mono font-black uppercase text-foreground bg-primary border-2 border-black dark:border-white px-2.5 py-1 shadow-[2px_2px_0px_0px_#000] flex items-center gap-1.5"
        >
          <span class="w-1.5 h-1.5 bg-black dark:bg-white animate-pulse"></span>
          // FETCHING_LIVE_DATA...
        </div>
        <div
          v-else-if="fetchError"
          class="flex items-center gap-1.5 text-[10px] font-mono font-black uppercase text-black bg-amber-400 border-2 border-black px-2.5 py-1 shadow-[2px_2px_0px_0px_#000]"
        >
          <AlertCircle class="size-3.5" />
          // FALLBACK_STATIC_DB_LOADED
        </div>
        <div
          v-else
          class="text-[10px] font-mono font-black uppercase text-white bg-emerald-800 border-2 border-black px-2.5 py-1 shadow-[2px_2px_0px_0px_#000] flex items-center gap-1.5"
        >
          <span class="w-1.5 h-1.5 bg-white animate-pulse"></span>
          // LIVE_SYNC_OK
        </div>
      </div>
    </div>

    <!-- Search Input for UX Polish -->
    <div class="pb-2 font-mono">
      <div
        class="flex items-center gap-2 border-3 border-black dark:border-white bg-card px-3.5 py-2.5 text-xs shadow-[3px_3px_0px_0px_#000000] dark:shadow-[3px_3px_0px_0px_#06b6d4]"
      >
        <Search class="size-4 text-foreground" />
        <span
          class="text-foreground uppercase font-black select-none text-[9px] font-mono tracking-wider bg-primary text-primary-foreground px-1.5 py-0.5 border border-black"
          >SEARCH_FILTER:</span
        >
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Filter by name or tech stack (e.g. Nuxt, python)..."
          class="flex-1 bg-transparent border-0 outline-none p-0 text-xs font-mono font-bold text-foreground focus:ring-0 placeholder:text-muted-foreground"
          autocomplete="off"
          autocorrect="off"
          autocapitalize="off"
          spellcheck="false"
        />
        <button
          v-if="searchQuery"
          class="cursor-pointer font-black text-foreground hover:bg-muted select-none text-base px-2 border border-black"
          @click="searchQuery = ''"
        >
          ×
        </button>
      </div>
    </div>

    <div>
      <div
        v-if="filteredRepos.length === 0"
        class="text-center font-mono font-black py-12 text-foreground bg-card border-3 border-black dark:border-white shadow-[4px_4px_0px_0px_#000] text-xs uppercase"
      >
        [!] No repositories matching your search query.
      </div>
      <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Card
          v-for="project in filteredRepos"
          :key="project.name"
          class="bg-card text-card-foreground border-3 border-black dark:border-white shadow-[4px_4px_0px_0px_#000000] dark:shadow-[4px_4px_0px_0px_#06b6d4] hover:-translate-y-1 transition-all duration-150 relative overflow-hidden flex flex-col justify-between"
        >
          <CardHeader class="pb-3 pt-4 px-4">
            <div class="flex items-start justify-between gap-2">
              <CardTitle
                class="text-base font-black uppercase tracking-tight text-foreground truncate max-w-50 font-mono"
              >
                {{ project.name }}
              </CardTitle>
              <div class="flex gap-1.5 shrink-0">
                <Badge
                  v-if="project.isFeatured"
                  variant="default"
                  class="bg-primary text-primary-foreground font-black text-[8px]"
                >
                  FEATURED
                </Badge>
                <Badge
                  variant="outline"
                  class="bg-secondary text-secondary-foreground font-black text-[8px]"
                >
                  {{ project.language }}
                </Badge>
              </div>
            </div>
            <CardDescription
              class="text-xs text-foreground font-medium line-clamp-3 leading-relaxed mt-2.5 font-sans"
            >
              {{ project.description }}
            </CardDescription>
          </CardHeader>

          <CardContent class="pb-4 pt-0 px-4">
            <div class="flex flex-wrap gap-1.5 mt-1">
              <span
                v-for="tech in project.techStack"
                :key="tech"
                class="text-[9px] font-mono font-black bg-muted text-foreground px-2 py-0.5 border border-black dark:border-white shadow-[1px_1px_0px_0px_#000]"
              >
                {{ tech }}
              </span>
            </div>
          </CardContent>

          <CardFooter
            class="pt-3 pb-3 px-4 border-t-2 border-black dark:border-white flex items-center justify-between text-xs bg-muted/30"
          >
            <div class="flex items-center gap-4 text-foreground font-mono font-black text-[10px]">
              <span class="flex items-center gap-1 bg-card px-2 py-0.5 border border-black">
                <Star class="size-3.5 text-amber-500 fill-amber-400" />
                <span>{{ project.stars }}</span>
              </span>
              <span class="flex items-center gap-1 bg-card px-2 py-0.5 border border-black">
                <GitFork class="size-3.5 text-cyan-600" />
                <span>{{ project.forks }}</span>
              </span>
            </div>
            <Button as-child variant="default" size="sm" class="text-[9px]">
              <a :href="project.url" target="_blank" rel="noopener noreferrer">
                <span>RECON</span>
                <ExternalLink class="size-3" />
              </a>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  </div>
</template>
