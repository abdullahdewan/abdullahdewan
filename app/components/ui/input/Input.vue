<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import { useVModel } from '@vueuse/core';
import { cn } from '~/lib/utils';

const props = defineProps<{
  defaultValue?: string | number;
  modelValue?: string | number;
  class?: HTMLAttributes['class'];
}>();

const emits = defineEmits<{
  (e: 'update:modelValue', payload: string | number): void;
}>();

const modelValue = useVModel(props, 'modelValue', emits, {
  passive: true,
  defaultValue: props.defaultValue,
});
</script>

<template>
  <input
    v-model="modelValue"
    data-slot="input"
    :class="
      cn(
        'h-10 w-full min-w-0 bg-card border-2 border-black dark:border-white px-3 py-2 text-sm font-mono text-foreground placeholder:text-muted-foreground shadow-[3px_3px_0px_0px_#000000] dark:shadow-[3px_3px_0px_0px_#06b6d4] focus:outline-none focus:shadow-[5px_5px_0px_0px_#000000] dark:focus:shadow-[5px_5px_0px_0px_#06b6d4] transition-all disabled:pointer-events-none disabled:opacity-50',
        props.class
      )
    "
  />
</template>
