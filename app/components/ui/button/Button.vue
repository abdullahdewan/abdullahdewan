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
    'bg-primary text-primary-foreground font-bold hover:bg-primary/90 hover:shadow-[0_0_12px_rgba(0,255,245,0.4)] active:opacity-90',
  destructive:
    'bg-destructive text-destructive-foreground font-bold hover:bg-destructive/90 hover:shadow-[0_0_12px_rgba(255,51,102,0.4)] active:opacity-90',
  outline:
    'border border-border-dim bg-transparent text-foreground hover:border-primary hover:text-primary hover:shadow-[0_0_10px_rgba(0,255,245,0.2)]',
  secondary: 'bg-muted text-foreground border border-border-dim hover:border-muted-foreground',
  ghost: 'bg-transparent text-foreground hover:bg-muted hover:text-primary',
  link: 'text-primary underline-offset-4 hover:underline',
};

const sizes: Record<ButtonSize, string> = {
  default: 'h-9 px-4 py-2 text-xs',
  sm: 'h-7 px-2.5 text-xs',
  lg: 'h-10 px-6 text-sm',
  icon: 'h-8 w-8',
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
        'inline-flex items-center justify-center gap-1.5 font-mono uppercase tracking-wider rounded-[2px] transition-all duration-150 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary disabled:pointer-events-none disabled:opacity-40 cursor-pointer select-none',
        variants[variant],
        sizes[size],
        props.class
      )
    "
  >
    <slot />
  </Primitive>
</template>
