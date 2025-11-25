import { forwardRef, type HTMLAttributes } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const avatarVariants = cva(
  'flex items-center justify-center rounded-full font-semibold',
  {
    variants: {
      size: {
        sm: 'h-8 w-8 text-sm',
        md: 'h-10 w-10 text-base',
        lg: 'h-12 w-12 text-lg',
        xl: 'h-16 w-16 text-xl',
      },
      variant: {
        default: 'bg-blue-50 text-primary',
        primary: 'bg-primary text-primary-foreground',
        secondary: 'bg-secondary text-secondary-foreground',
        success: 'bg-green-50 text-green-600',
        warning: 'bg-yellow-50 text-yellow-600',
        error: 'bg-red-50 text-red-600',
      },
    },
    defaultVariants: {
      size: 'md',
      variant: 'default',
    },
  }
);

export interface AvatarProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof avatarVariants> {
  src?: string;
  alt?: string;
}

export const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
  ({ className, size, variant, src, alt, children, ...props }, ref) => {
    if (src) {
      return (
        <div ref={ref} className={cn(avatarVariants({ size, variant }), 'overflow-hidden p-0', className)} {...props}>
          <img src={src} alt={alt || 'Avatar'} className="h-full w-full object-cover" />
        </div>
      );
    }

    return (
      <div ref={ref} className={cn(avatarVariants({ size, variant }), className)} {...props}>
        {children}
      </div>
    );
  }
);

Avatar.displayName = 'Avatar';
