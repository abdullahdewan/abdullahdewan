<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
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

const repos = ref<Project[]>([]);
const loading = ref(true);
const fetchError = ref(false);
const searchQuery = ref('');

const loadProjects = async () => {
  try {
    const res = await fetch(
      'https://api.github.com/users/abdullahdewan/repos?sort=updated&per_page=20'
    );
    if (!res.ok) throw new Error('API limit or network error');
    const githubData = await res.json();

    // Map GitHub API data to match existing schema
    const apiRepos = githubData.map((repo: any) => {
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
        techStack: match?.techStack || [repo.language].filter(Boolean),
      };
    });

    // Separate featured and other repos, prioritizing featured ones
    const featuredMapped = apiRepos.filter((r: any) => r.isFeatured);
    const otherMapped = apiRepos.filter(
      (r: any) => !r.isFeatured && r.name !== 'wordpress' && r.name !== 'abdullahdewan'
    );

    // Merge keeping featured first
    repos.value = [...featuredMapped, ...otherMapped];
    loading.value = false;
  } catch (err) {
    console.error(err);
    fetchError.value = true;
    // Fallback to static data
    repos.value = featuredProjects.value;
    loading.value = false;
  }
};

const filteredRepos = computed(() => {
  const query = searchQuery.value.trim().toLowerCase();
  if (!query) return repos.value;

  return repos.value.filter((project) => {
    const nameMatch = project.name.toLowerCase().includes(query);
    const descMatch = project.description.toLowerCase().includes(query);
    const langMatch = project.language.toLowerCase().includes(query);
    const stackMatch = project.techStack.some((tech) => tech.toLowerCase().includes(query));
    return nameMatch || descMatch || langMatch || stackMatch;
  });
});

onMounted(() => {
  loadProjects();
});
</script>

<template>
  <div class="space-y-6">
    <div class="border-b-2 border-foreground pb-4">
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div>
          <h2 class="text-xl uppercase font-bold tracking-tight">ACTIVE_REPOSITORIES.sh</h2>
          <p class="text-xs text-muted-foreground uppercase font-mono mt-1">
            Direct telemetry from GitHub node @abdullahdewan
          </p>
        </div>
        <div v-if="loading" class="text-xs font-mono uppercase text-muted-foreground animate-pulse">
          // FETCHING_LIVE_DATA...
        </div>
        <div
          v-else-if="fetchError"
          class="flex items-center gap-1.5 text-xs font-mono uppercase text-amber-600 dark:text-amber-400"
        >
          <AlertCircle class="size-3.5" />
          // FALLBACK_STATIC_DB_LOADED
        </div>
        <div v-else class="text-xs font-mono uppercase text-green-500 dark:text-green-400">
          // LIVE_SYNC_OK
        </div>
      </div>
    </div>

    <!-- Search Input for UX Polish -->
    <div class="pb-2">
      <div class="flex items-center gap-2 border border-foreground bg-background px-3 py-1 text-xs">
        <Search class="size-3.5 text-muted-foreground" />
        <span class="text-muted-foreground uppercase font-bold select-none text-[10px]"
          >SEARCH_FILTER:</span
        >
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Filter by name or tech stack (e.g. Nuxt, python)..."
          class="flex-1 bg-transparent border-0 outline-none p-0 text-xs font-mono text-foreground focus:ring-0 placeholder:text-muted-foreground/30"
          autocomplete="off"
          autocorrect="off"
          autocapitalize="off"
          spellcheck="false"
        />
        <button
          v-if="searchQuery"
          @click="searchQuery = ''"
          class="cursor-pointer font-bold text-foreground hover:text-red-500 select-none text-xs px-1"
        >
          ×
        </button>
      </div>
    </div>

    <div>
      <div
        v-if="filteredRepos.length === 0"
        class="text-center font-mono py-12 text-muted-foreground border border-dashed border-foreground/20 text-xs uppercase"
      >
        [!] No repositories matching your search query.
      </div>
      <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono">
        <Card
          v-for="project in filteredRepos"
          :key="project.name"
          class="border border-foreground bg-card text-card-foreground hover:border-foreground/80 transition-all flex flex-col justify-between p-2"
          :class="
            project.isFeatured
              ? 'border-2 border-foreground shadow-[2px_2px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_rgba(255,255,255,1)]'
              : ''
          "
        >
          <CardHeader class="pb-3">
            <div class="flex items-start justify-between gap-2">
              <CardTitle
                class="text-sm font-bold uppercase tracking-tight text-foreground truncate max-w-[200px]"
              >
                {{ project.name }}
              </CardTitle>
              <div class="flex gap-1.5 shrink-0">
                <Badge
                  v-if="project.isFeatured"
                  variant="default"
                  class="rounded-none text-[8px] tracking-widest font-black uppercase px-1 py-0 bg-foreground text-background"
                >
                  FEATURED
                </Badge>
                <Badge
                  variant="outline"
                  class="rounded-none text-[8px] uppercase px-1 py-0 border-foreground text-foreground"
                >
                  {{ project.language }}
                </Badge>
              </div>
            </div>
            <CardDescription class="text-xs text-foreground/80 line-clamp-3 leading-normal mt-2">
              {{ project.description }}
            </CardDescription>
          </CardHeader>
          <CardContent class="pb-3 pt-0">
            <div class="flex flex-wrap gap-1 mt-1">
              <span
                v-for="tech in project.techStack"
                :key="tech"
                class="text-[9px] bg-secondary text-secondary-foreground px-1.5 py-0.5 border border-dashed border-foreground/20"
              >
                {{ tech }}
              </span>
            </div>
          </CardContent>
          <CardFooter
            class="pt-3 border-t border-dashed border-foreground/20 flex items-center justify-between text-xs"
          >
            <div class="flex items-center gap-3 text-muted-foreground">
              <span class="flex items-center gap-1">
                <Star class="size-3.5" />
                <span>{{ project.stars }}</span>
              </span>
              <span class="flex items-center gap-1">
                <GitFork class="size-3.5" />
                <span>{{ project.forks }}</span>
              </span>
            </div>
            <Button
              asChild
              variant="outline"
              class="h-7 rounded-none border-foreground text-[10px] uppercase font-bold tracking-tight px-3 py-1 gap-1"
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
