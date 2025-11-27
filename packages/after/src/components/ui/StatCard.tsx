import { forwardRef, type HTMLAttributes } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const statCardVariants = cva('rounded border p-3', {
  variants: {
    variant: {
      default: 'border-blue-300 bg-blue-50',
      success: 'border-green-400 bg-green-50',
      warning: 'border-orange-300 bg-orange-50',
      danger: 'border-red-300 bg-red-50',
      gray: 'border-gray-400 bg-gray-100',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

const statLabelVariants = cva('mb-1 text-xs text-gray-600');

const statValueVariants = cva('text-2xl font-bold', {
  variants: {
    variant: {
      default: 'text-blue-700',
      success: 'text-green-700',
      warning: 'text-orange-600',
      danger: 'text-red-700',
      gray: 'text-gray-700',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

export interface StatCardProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof statCardVariants> {
  label: string;
  value: string | number;
}

export const StatCard = forwardRef<HTMLDivElement, StatCardProps>(
  ({ className, variant, label, value, ...props }, ref) => {
    return (
      <div ref={ref} className={cn(statCardVariants({ variant }), className)} {...props}>
        <div className={statLabelVariants()}>{label}</div>
        <div className={statValueVariants({ variant })}>{value}</div>
      </div>
    );
  }
);

StatCard.displayName = 'StatCard';
