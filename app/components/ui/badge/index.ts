import { cva, type VariantProps } from 'class-variance-authority';
export { default as Badge } from './Badge.vue';

export const badgeVariants = cva(
  'inline-flex items-center rounded-full px-3 py-1 text-xs font-medium tracking-wide transition-colors',
  {
    variants: {
      variant: {
        default: 'bg-primary/10 text-primary border border-primary/20',
        secondary: 'bg-white/5 text-zinc-300 border border-white/10',
        destructive: 'bg-destructive/10 text-destructive border border-destructive/20',
        outline: 'bg-transparent text-foreground border border-white/10',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export type BadgeVariants = VariantProps<typeof badgeVariants>;
