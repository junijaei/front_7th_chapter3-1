import { forwardRef, type HTMLAttributes } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const logoVariants = cva('flex items-center justify-center rounded-lg font-bold text-white', {
  variants: {
    size: {
      sm: 'h-8 w-8 text-base',
      md: 'h-10 w-10 text-xl',
      lg: 'h-12 w-12 text-2xl',
    },
    variant: {
      primary: 'bg-primary',
      secondary: 'bg-secondary',
      accent: 'bg-accent',
    },
  },
  defaultVariants: {
    size: 'md',
    variant: 'primary',
  },
});

const logoTextVariants = cva('m-0 font-bold leading-none text-gray-900 dark:text-neutral-100', {
  variants: {
    size: {
      sm: 'text-base',
      md: 'text-lg',
      lg: 'text-xl',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

const logoSubtextVariants = cva('m-0 leading-none text-gray-600 dark:text-neutral-400', {
  variants: {
    size: {
      sm: 'text-[10px] mt-0',
      md: 'text-[11px] mt-0.5',
      lg: 'text-xs mt-1',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

export interface LogoProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'children'>,
    VariantProps<typeof logoVariants> {
  text: string;
  companyName?: string;
  projectName?: string;
}

export const Logo = forwardRef<HTMLDivElement, LogoProps>(
  ({ className, size, variant, text, companyName, projectName, ...props }, ref) => {
    return (
      <div ref={ref} className={cn('flex items-center gap-3', className)} {...props}>
        <div className={cn(logoVariants({ size, variant }))}>{text}</div>
        {(companyName || projectName) && (
          <div>
            {companyName && <h1 className={cn(logoTextVariants({ size }))}>{companyName}</h1>}
            {projectName && <p className={cn(logoSubtextVariants({ size }))}>{projectName}</p>}
          </div>
        )}
      </div>
    );
  }
);

Logo.displayName = 'Logo';
