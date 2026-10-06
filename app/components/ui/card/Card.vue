<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import { cn } from '~/lib/utils';

const props = withDefaults(
  defineProps<{
    class?: HTMLAttributes['class'];
  }>(),
  {
    class: '',
  }
);
</script>

<template>
  <div
    data-slot="card"
    :class="
      cn(
        'bg-[#181819] text-card-foreground rounded-2xl border border-white/5 shadow-lg hover:border-white/10 transition-all duration-200',
        props.class
      )
    "
  >
    <slot />
  </div>
</template>
