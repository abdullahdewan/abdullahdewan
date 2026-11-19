<script setup lang="ts">
import { ArrowUp } from '@lucide/vue';

const { showBackToTop, scrollTo } = useNavigation();
</script>

<template>
  <Transition name="fade">
    <button
      v-if="showBackToTop"
      type="button"
      aria-label="Scroll back to top"
      class="fixed bottom-6 right-6 z-40 w-11 h-11 rounded-full bg-surface border border-line hover:border-brand-muted text-zinc-300 hover:text-white flex items-center justify-center shadow-xl shadow-black/60 transition-all hover:scale-110 cursor-pointer"
      @click="scrollTo('home')"
    >
      <ArrowUp class="size-4" />
    </button>
  </Transition>
</template>
