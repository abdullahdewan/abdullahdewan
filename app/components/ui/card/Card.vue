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
        'bg-card text-card-foreground text-sm flex flex-col border border-border-dim rounded-[2px] transition-all duration-200 hover:border-primary/40 hover:shadow-[0_0_15px_rgba(0,255,245,0.06)]',
        props.class
      )
    "
  >
    <slot />
  </div>
</template>
