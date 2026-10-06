<script setup lang="ts">
import { ArrowUpRight } from 'lucide-vue-next';

interface Post {
  title: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
}

const posts: Post[] = [
  {
    title: 'Architecting High-Throughput WebSockets with Node.js and Redis',
    category: 'Backend Architecture',
    date: 'Jan 2026',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?fit=crop&w=600&h=400&q=80',
  },
  {
    title: 'Migrating Enterprise Applications to Nuxt 4 & Tailwind v4',
    category: 'Frontend Engineering',
    date: 'Feb 2026',
    readTime: '4 min read',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?fit=crop&w=600&h=400&q=80',
  },
  {
    title: 'Zero-Downtime Database Indexing Strategies in PostgreSQL',
    category: 'Databases & Ops',
    date: 'Mar 2026',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?fit=crop&w=600&h=400&q=80',
  },
];
</script>

<template>
  <div class="space-y-8">
    <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
      <div>
        <span
          class="text-xs uppercase tracking-widest text-zinc-400 font-medium inline-flex items-center gap-2 mb-2"
        >
          <span class="w-1.5 h-1.5 rounded-full bg-primary"></span>
          Insights & Writing
        </span>
        <h2 class="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">Blog Posts</h2>
      </div>
      <span class="text-xs text-zinc-400 font-medium"
        >Technical articles and engineering notes</span
      >
    </div>

    <!-- Blog Posts 3-card Grid -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div
        v-for="post in posts"
        :key="post.title"
        class="group bg-[#18181a] hover:bg-[#1d1d20] rounded-2xl overflow-hidden border border-white/5 hover:border-orange-500/30 transition-all duration-300 flex flex-col"
      >
        <div class="relative h-44 w-full overflow-hidden bg-zinc-900">
          <img
            :src="post.image"
            :alt="post.title"
            class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100"
            loading="lazy"
          />
          <div
            class="absolute top-3 left-3 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-mono text-zinc-300 border border-white/10"
          >
            {{ post.category }}
          </div>
        </div>

        <div class="p-5 flex-1 flex flex-col justify-between space-y-4">
          <h3
            class="text-base font-bold text-white group-hover:text-orange-400 transition-colors line-clamp-2 leading-snug"
          >
            {{ post.title }}
          </h3>

          <div
            class="pt-3 border-t border-white/5 flex items-center justify-between text-xs text-zinc-400 font-mono"
          >
            <span>{{ post.date }}</span>
            <span class="flex items-center gap-1 group-hover:text-primary transition-colors">
              {{ post.readTime }}
              <ArrowUpRight class="size-3.5" />
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
