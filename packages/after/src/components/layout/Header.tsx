import { createContext, forwardRef, useContext, type HTMLAttributes, type ReactNode } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { Logo, type LogoProps } from '@/components/ui/Logo';
import { Avatar, type AvatarProps } from '@/components/ui/Avatar';
import { UserInfo, type UserInfoProps } from '@/components/composed/UserInfo';
import { ThemeToggle } from '@/components/ui/ThemeToggle';

const headerVariants = cva('sticky top-0 z-1000 border-b bg-card border-border shadow-sm', {
  variants: {
    size: {
      sm: 'h-12',
      md: 'h-16',
      lg: 'h-20',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

const containerVariants = cva('mx-auto flex items-center justify-between px-6', {
  variants: {
    maxWidth: {
      sm: 'max-w-screen-sm',
      md: 'max-w-3xl',
      lg: 'max-w-5xl',
      xl: 'max-w-7xl',
      '2xl': 'max-w-[1400px]',
    },
    size: {
      sm: 'h-12',
      md: 'h-16',
      lg: 'h-20',
    },
  },
  defaultVariants: {
    maxWidth: '2xl',
    size: 'md',
  },
});

type HeaderContextValue = {
  size?: 'sm' | 'md' | 'lg';
};

const HeaderContext = createContext<HeaderContextValue | undefined>(undefined);

const useHeaderContext = () => {
  const context = useContext(HeaderContext);
  if (!context) {
    throw new Error('Header compound components must be used within Header');
  }
  return context;
};

export interface HeaderProps
  extends HTMLAttributes<HTMLElement>,
    VariantProps<typeof headerVariants> {
  maxWidth?: VariantProps<typeof containerVariants>['maxWidth'];
}

const HeaderRoot = forwardRef<HTMLElement, HeaderProps>(
  ({ className, size, maxWidth, children, ...props }, ref) => {
    return (
      <HeaderContext.Provider value={{ size: size || 'md' }}>
        <header ref={ref} className={cn(headerVariants({ size }), className)} {...props}>
          <div className={cn(containerVariants({ maxWidth, size }))}>{children}</div>
        </header>
      </HeaderContext.Provider>
    );
  }
);

HeaderRoot.displayName = 'Header';

interface HeaderLogoProps extends HTMLAttributes<HTMLDivElement> {
  logo: Omit<LogoProps, 'size'> & { size?: LogoProps['size'] };
}

const HeaderLogo = forwardRef<HTMLDivElement, HeaderLogoProps>(
  ({ className, logo, ...props }, ref) => {
    const { size: headerSize } = useHeaderContext();
    return (
      <div ref={ref} className={className} {...props}>
        <Logo {...logo} size={logo.size || headerSize} />
      </div>
    );
  }
);

HeaderLogo.displayName = 'Header.Logo';

interface HeaderUserProps extends HTMLAttributes<HTMLDivElement> {
  userInfo: Omit<UserInfoProps, 'size'> & { size?: UserInfoProps['size'] };
  avatar: Omit<AvatarProps, 'size'> & { size?: AvatarProps['size'] };
}

const HeaderUser = forwardRef<HTMLDivElement, HeaderUserProps>(
  ({ className, userInfo, avatar, ...props }, ref) => {
    const { size: headerSize } = useHeaderContext();
    return (
      <div ref={ref} className={cn('flex items-center gap-3', className)} {...props}>
        <ThemeToggle variant="icon" />
        <UserInfo {...userInfo} size={userInfo.size || headerSize} />
        <Avatar {...avatar} size={avatar.size || headerSize} />
      </div>
    );
  }
);

HeaderUser.displayName = 'Header.User';

interface HeaderActionsProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

const HeaderActions = forwardRef<HTMLDivElement, HeaderActionsProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div ref={ref} className={cn('flex items-center gap-2', className)} {...props}>
        {children}
      </div>
    );
  }
);

HeaderActions.displayName = 'Header.Actions';

export const Header = Object.assign(HeaderRoot, {
  Logo: HeaderLogo,
  User: HeaderUser,
  Actions: HeaderActions,
});
