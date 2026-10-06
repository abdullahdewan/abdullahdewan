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
  (e: 'input', event: Event): void;
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
        'h-9 w-full min-w-0 bg-background/80 border border-border-dim rounded-[2px] px-3 py-2 text-xs font-mono text-foreground placeholder:text-muted-foreground transition-all focus:outline-none focus:border-primary focus:shadow-[0_0_10px_rgba(0,255,245,0.2)] disabled:pointer-events-none disabled:opacity-40',
        props.class
      )
    "
    @input="emits('input', $event)"
  />
</template>
