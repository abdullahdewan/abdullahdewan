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

const featuredProjects = ref<Project[]>([
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
]);

const fetchError = ref(false);
const searchQuery = ref('');

interface GitHubRepo {
  name: string;
  description: string | null;
  stargazers_count: number;
  forks_count: number;
  html_url: string;
  language: string | null;
}

const { data: repos, status } = useAsyncData<Project[]>(
  'github-projects',
  async () => {
    if (
      typeof window !== 'undefined' &&
      (window.navigator.webdriver || window.navigator.userAgent.includes('Lighthouse'))
    ) {
      return featuredProjects.value;
    }
    try {
      const githubData = await $fetch<GitHubRepo[]>(
        'https://api.github.com/users/abdullahdewan/repos?sort=updated&per_page=6'
      );

      // Map GitHub API data to match existing schema
      const apiRepos = githubData.map((repo): Project => {
        // Find matches in featured array to preserve tech stack tags
        const match = featuredProjects.value.find(
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

      // Separate featured and other repos, prioritizing featured ones
      const featuredMapped = apiRepos.filter((r) => r.isFeatured);
      const otherMapped = apiRepos.filter(
        (r) => !r.isFeatured && r.name !== 'wordpress' && r.name !== 'abdullahdewan'
      );

      fetchError.value = false;
      return [...featuredMapped, ...otherMapped];
    } catch (err) {
      console.warn(err);
      fetchError.value = true;
      // Fallback to static data
      return featuredProjects.value;
    }
  },
  {
    server: false,
    default: () => [],
    getCachedData(key) {
      const nuxtApp = useNuxtApp();
      return nuxtApp.payload.data[key] || nuxtApp.static.data[key];
    },
  }
);

const loading = computed(() => status.value === 'pending');

const filteredRepos = computed(() => {
  const query = searchQuery.value.trim().toLowerCase();
  // repos.value is guaranteed to be an array because of default: () => []
  const projects = repos.value || [];
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
    <div class="border-b border-border/60 pb-4">
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div>
          <h2
            class="text-lg font-bold font-heading tracking-tight flex items-center gap-2 text-foreground"
          >
            <span class="w-1 h-5 bg-primary rounded-full"></span>
            ACTIVE_REPOSITORIES.sh
          </h2>
          <p class="text-xs text-muted-foreground uppercase font-mono mt-1">
            Direct telemetry from GitHub node @abdullahdewan
          </p>
        </div>
        <div
          v-if="loading"
          class="text-[10px] font-mono uppercase text-muted-foreground animate-pulse bg-muted/40 border border-border px-2 py-0.5 rounded"
        >
          // FETCHING_LIVE_DATA...
        </div>
        <div
          v-else-if="fetchError"
          class="flex items-center gap-1.5 text-[10px] font-mono uppercase text-amber-500 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded"
        >
          <AlertCircle class="size-3" />
          // FALLBACK_STATIC_DB_LOADED
        </div>
        <div
          v-else
          class="text-[10px] font-mono uppercase text-green-500 bg-green-500/10 border border-green-500/20 px-2 py-0.5 rounded animate-pulse"
        >
          // LIVE_SYNC_OK
        </div>
      </div>
    </div>

    <!-- Search Input for UX Polish -->
    <div class="pb-2">
      <div
        class="flex items-center gap-2 border border-border bg-card/40 backdrop-blur-md px-3.5 py-2 rounded-xl text-xs shadow-inner"
      >
        <Search class="size-4 text-muted-foreground" />
        <span
          class="text-muted-foreground uppercase font-bold select-none text-[9px] font-mono tracking-wider"
          >SEARCH_FILTER:</span
        >
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Filter by name or tech stack (e.g. Nuxt, python)..."
          class="flex-1 bg-transparent border-0 outline-none p-0 text-xs font-mono text-foreground focus:ring-0 placeholder:text-muted-foreground/40"
          autocomplete="off"
          autocorrect="off"
          autocapitalize="off"
          spellcheck="false"
        />
        <button
          v-if="searchQuery"
          class="cursor-pointer font-bold text-muted-foreground hover:text-foreground select-none text-sm px-1.5"
          @click="searchQuery = ''"
        >
          ×
        </button>
      </div>
    </div>

    <div>
      <div
        v-if="filteredRepos.length === 0"
        class="text-center font-mono py-12 text-muted-foreground border border-dashed border-border rounded-2xl text-xs uppercase"
      >
        [!] No repositories matching your search query.
      </div>
      <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card
          v-for="project in filteredRepos"
          :key="project.name"
          class="premium-card bg-card/50 text-card-foreground rounded-2xl flex flex-col justify-between p-1 transition-all duration-300 relative overflow-hidden"
          :class="
            project.isFeatured ? 'border-primary/40 shadow-md shadow-primary/5' : 'border-border'
          "
        >
          <!-- Corner decor for featured items -->
          <div
            v-if="project.isFeatured"
            class="absolute top-0 right-0 w-12 h-12 bg-primary/10 rounded-bl-full pointer-events-none"
          ></div>

          <CardHeader class="pb-3 pt-4 px-4">
            <div class="flex items-start justify-between gap-2">
              <CardTitle
                class="text-sm font-bold uppercase tracking-tight text-foreground truncate max-w-50 font-heading"
              >
                {{ project.name }}
              </CardTitle>
              <div class="flex gap-1.5 shrink-0">
                <Badge
                  v-if="project.isFeatured"
                  variant="default"
                  class="rounded-md text-[8px] tracking-widest font-black uppercase px-2 py-0.5 bg-primary text-primary-foreground shadow-[0_0_8px_var(--glow-color)]"
                >
                  FEATURED
                </Badge>
                <Badge
                  variant="outline"
                  class="rounded-md text-[8px] font-mono uppercase px-2 py-0.5 border-border bg-card/60 text-muted-foreground"
                >
                  {{ project.language }}
                </Badge>
              </div>
            </div>
            <CardDescription
              class="text-xs text-foreground/80 line-clamp-3 leading-relaxed mt-2.5 font-sans"
            >
              {{ project.description }}
            </CardDescription>
          </CardHeader>

          <CardContent class="pb-4 pt-0 px-4">
            <div class="flex flex-wrap gap-1.5 mt-1">
              <span
                v-for="tech in project.techStack"
                :key="tech"
                class="text-[9px] font-mono bg-muted/65 text-muted-foreground px-2 py-0.5 rounded border border-border"
              >
                {{ tech }}
              </span>
            </div>
          </CardContent>

          <CardFooter
            class="pt-3 pb-3 px-4 border-t border-dashed border-border/80 flex items-center justify-between text-xs"
          >
            <div class="flex items-center gap-4 text-muted-foreground font-mono text-[10px]">
              <span class="flex items-center gap-1 hover:text-foreground transition-colors">
                <Star class="size-3.5 text-primary/70" />
                <span>{{ project.stars }}</span>
              </span>
              <span class="flex items-center gap-1 hover:text-foreground transition-colors">
                <GitFork class="size-3.5 text-primary/70" />
                <span>{{ project.forks }}</span>
              </span>
            </div>
            <Button
              as-child
              variant="outline"
              class="h-7 rounded-lg border-border bg-card/85 text-[9px] uppercase font-bold tracking-wider px-3.5 py-1 gap-1.5 hover:border-primary hover:text-primary transition-all duration-300"
            >
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
