import { forwardRef, type HTMLAttributes } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const userInfoVariants = cva('text-right', {
  variants: {
    size: {
      sm: 'gap-0.5',
      md: 'gap-1',
      lg: 'gap-1.5',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

const userNameVariants = cva('font-semibold text-gray-900', {
  variants: {
    size: {
      sm: 'text-xs',
      md: 'text-sm',
      lg: 'text-base',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

const userEmailVariants = cva('text-gray-600', {
  variants: {
    size: {
      sm: 'text-[10px]',
      md: 'text-xs',
      lg: 'text-sm',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

export interface UserInfoProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof userInfoVariants> {
  name: string;
  email: string;
}

export const UserInfo = forwardRef<HTMLDivElement, UserInfoProps>(
  ({ className, size, name, email, ...props }, ref) => {
    return (
      <div ref={ref} className={cn(userInfoVariants({ size }), className)} {...props}>
        <div className={cn(userNameVariants({ size }))}>{name}</div>
        <div className={cn(userEmailVariants({ size }))}>{email}</div>
      </div>
    );
  }
);

UserInfo.displayName = 'UserInfo';
