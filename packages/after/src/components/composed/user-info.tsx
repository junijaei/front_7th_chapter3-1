import { createContext, useContext, forwardRef, type HTMLAttributes } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { Avatar } from '@/components/ui';

const userInfoVariants = cva('flex items-center', {
  variants: {
    size: {
      sm: 'gap-2',
      md: 'gap-3',
      lg: 'gap-4',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

const userTextVariants = cva('flex flex-col text-right', {
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

const userNameVariants = cva('font-semibold text-gray-900 dark:text-neutral-100', {
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

const userEmailVariants = cva('text-gray-600 dark:text-neutral-400', {
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

type UserInfoContextValue = {
  size?: 'sm' | 'md' | 'lg' | null;
  name?: string;
  email?: string;
};

const UserInfoContext = createContext<UserInfoContextValue>({});

const useUserInfoContext = () => {
  const context = useContext(UserInfoContext);
  return context;
};

export interface UserInfoProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof userInfoVariants> {
  name?: string;
  email?: string;
}

const UserInfoRoot = forwardRef<HTMLDivElement, UserInfoProps>(
  ({ className, size, name, email, children, ...props }, ref) => {
    // If name or email is provided but no children, render default structure
    const shouldRenderDefault = (name || email) && !children;

    return (
      <UserInfoContext.Provider value={{ size, name, email }}>
        <div ref={ref} className={cn(userInfoVariants({ size }), className)} {...props}>
          {shouldRenderDefault ? (
            <UserInfoText>
              <UserInfoName />
              <UserInfoEmail />
            </UserInfoText>
          ) : (
            children
          )}
        </div>
      </UserInfoContext.Provider>
    );
  }
);

UserInfoRoot.displayName = 'UserInfo';

export interface UserInfoAvatarProps {
  src?: string;
  alt?: string;
  fallback?: string;
}

const UserInfoAvatar = forwardRef<HTMLDivElement, UserInfoAvatarProps>(
  ({ src, alt, fallback }, ref) => {
    const { size } = useUserInfoContext();
    return (
      <Avatar ref={ref} src={src} alt={alt} size={size}>
        {fallback}
      </Avatar>
    );
  }
);

UserInfoAvatar.displayName = 'UserInfo.Avatar';

export type UserInfoTextProps = HTMLAttributes<HTMLDivElement>;

const UserInfoText = forwardRef<HTMLDivElement, UserInfoTextProps>(
  ({ className, children, ...props }, ref) => {
    const { size } = useUserInfoContext();
    return (
      <div ref={ref} className={cn(userTextVariants({ size }), className)} {...props}>
        {children}
      </div>
    );
  }
);

UserInfoText.displayName = 'UserInfo.Text';

export type UserInfoNameProps = HTMLAttributes<HTMLDivElement>;

const UserInfoName = forwardRef<HTMLDivElement, UserInfoNameProps>(
  ({ className, children, ...props }, ref) => {
    const { size, name } = useUserInfoContext();
    return (
      <div ref={ref} className={cn(userNameVariants({ size }), className)} {...props}>
        {children || name}
      </div>
    );
  }
);

UserInfoName.displayName = 'UserInfo.Name';

export type UserInfoEmailProps = HTMLAttributes<HTMLDivElement>;

const UserInfoEmail = forwardRef<HTMLDivElement, UserInfoEmailProps>(
  ({ className, children, ...props }, ref) => {
    const { size, email } = useUserInfoContext();
    return (
      <div ref={ref} className={cn(userEmailVariants({ size }), className)} {...props}>
        {children || email}
      </div>
    );
  }
);

UserInfoEmail.displayName = 'UserInfo.Email';

export const UserInfo = Object.assign(UserInfoRoot, {
  Avatar: UserInfoAvatar,
  Text: UserInfoText,
  Name: UserInfoName,
  Email: UserInfoEmail,
});
