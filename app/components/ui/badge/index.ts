import { cva, type VariantProps } from 'class-variance-authority';
export { default as Badge } from './Badge.vue';

export const badgeVariants = cva(
  'inline-flex items-center border border-border-dim px-2 py-0.5 text-xs font-mono tracking-wider transition-colors rounded-[2px]',
  {
    variants: {
      variant: {
        default: 'bg-primary/10 border-primary/40 text-primary',
        secondary: 'bg-muted border-border-dim text-muted-foreground',
        destructive: 'bg-destructive/10 border-destructive/40 text-destructive',
        outline: 'bg-transparent border-border text-foreground',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export type BadgeVariants = VariantProps<typeof badgeVariants>;
