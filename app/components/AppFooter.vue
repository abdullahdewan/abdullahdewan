<script setup lang="ts">
import { ArrowUp } from '@lucide/vue';

const { scrollTo } = useNavigation();
const currentYear = new Date().getFullYear();
</script>

<template>
  <footer class="py-14 border-t border-white/5 bg-canvas text-center text-sm text-zinc-400">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
      <div class="flex items-center justify-center gap-2 select-none group">
        <div class="brand-monogram brand-monogram-sm">AD</div>
        <span class="text-xl font-bold text-white tracking-tight font-heading">
          Abdullah Dewan
        </span>
      </div>
      <p>© {{ currentYear }} Abdullah Dewan. All rights reserved.</p>
      <div>
        <button
          type="button"
          class="text-zinc-400 hover:text-white transition-colors inline-flex items-center gap-1.5 font-medium cursor-pointer"
          @click="scrollTo('home')"
        >
          <span>Back to top</span>
          <ArrowUp class="size-4" />
        </button>
      </div>
    </div>
  </footer>
</template>
