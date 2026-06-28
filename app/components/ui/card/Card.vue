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
    :class="cn('bg-card text-card-foreground text-sm flex flex-col', props.class)"
  >
    <slot />
  </div>
</template>
