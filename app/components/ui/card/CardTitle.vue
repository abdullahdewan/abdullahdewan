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
  <div data-slot="card-title" :class="cn('text-sm font-semibold', props.class)">
    <slot />
  </div>
</template>
