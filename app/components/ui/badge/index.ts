import { cva, type VariantProps } from 'class-variance-authority';
export { default as Badge } from './Badge.vue';

export const badgeVariants = cva(
  'inline-flex items-center border-2 border-black dark:border-white px-2.5 py-0.5 text-xs font-black uppercase font-mono tracking-wider transition-colors shadow-[2px_2px_0px_0px_#000] dark:shadow-[2px_2px_0px_0px_#ffffff]',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground',
        secondary: 'bg-secondary text-secondary-foreground',
        destructive: 'bg-destructive text-destructive-foreground',
        outline: 'bg-card text-foreground',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export type BadgeVariants = VariantProps<typeof badgeVariants>;
