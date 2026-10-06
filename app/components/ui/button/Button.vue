<script setup lang="ts">
import type { PrimitiveProps } from 'reka-ui';
import { Primitive } from 'reka-ui';
import type { HTMLAttributes } from 'vue';
import { cn } from '~/lib/utils';

type ButtonVariant = 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
type ButtonSize = 'default' | 'sm' | 'lg' | 'icon';

interface Props extends PrimitiveProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  class?: HTMLAttributes['class'];
}

const props = withDefaults(defineProps<Props>(), {
  as: 'button',
  variant: 'default',
  size: 'default',
  class: undefined,
});

const variants: Record<ButtonVariant, string> = {
  default:
    'bg-primary text-primary-foreground font-semibold rounded-full shadow-[0_4px_16px_rgba(249,115,22,0.35)] hover:bg-orange-600 hover:shadow-[0_6px_20px_rgba(249,115,22,0.45)] hover:-translate-y-0.5 active:translate-y-0 transition-all',
  destructive:
    'bg-destructive text-destructive-foreground font-semibold rounded-full hover:bg-red-600 transition-all',
  outline:
    'border border-white/10 bg-white/5 text-foreground hover:bg-white/10 hover:border-white/20 rounded-full transition-all',
  secondary:
    'bg-secondary text-secondary-foreground font-medium rounded-full hover:bg-zinc-700 transition-all',
  ghost: 'text-zinc-400 hover:text-white hover:bg-white/5 rounded-full transition-all',
  link: 'text-primary underline-offset-4 hover:underline',
};

const sizes: Record<ButtonSize, string> = {
  default: 'h-11 px-7 text-sm',
  sm: 'h-9 px-4 text-xs',
  lg: 'h-13 px-9 text-base',
  icon: 'h-10 w-10 p-0',
};
</script>

<template>
  <Primitive
    data-slot="button"
    :data-variant="variant"
    :data-size="size"
    :as="as"
    :as-child="asChild"
    :class="
      cn(
        'inline-flex items-center justify-center gap-2 font-sans tracking-wide transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:pointer-events-none disabled:opacity-50 cursor-pointer select-none',
        variants[variant],
        sizes[size],
        props.class
      )
    "
  >
    <slot />
  </Primitive>
</template>
