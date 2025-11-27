import { forwardRef, type ButtonHTMLAttributes } from 'react';
import { useTheme } from '@/hooks/useTheme';
import { cn } from '@/lib/utils';

export interface ThemeToggleProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'icon' | 'text';
}

export const ThemeToggle = forwardRef<HTMLButtonElement, ThemeToggleProps>(
  ({ className, variant = 'icon', ...props }, ref) => {
    const { theme, setTheme, actualTheme } = useTheme();

    const handleToggle = () => {
      if (theme === 'system') {
        // If currently system, switch to opposite of current actual theme
        setTheme(actualTheme === 'dark' ? 'light' : 'dark');
      } else if (theme === 'light') {
        setTheme('dark');
      } else {
        setTheme('system');
      }
    };

    const getIcon = () => {
      if (theme === 'system') {
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect width="20" height="14" x="2" y="3" rx="2" />
            <line x1="8" x2="16" y1="21" y2="21" />
            <line x1="12" x2="12" y1="17" y2="21" />
          </svg>
        );
      }

      if (actualTheme === 'dark') {
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
          </svg>
        );
      }

      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2" />
          <path d="M12 20v2" />
          <path d="m4.93 4.93 1.41 1.41" />
          <path d="m17.66 17.66 1.41 1.41" />
          <path d="M2 12h2" />
          <path d="M20 12h2" />
          <path d="m6.34 17.66-1.41 1.41" />
          <path d="m19.07 4.93-1.41 1.41" />
        </svg>
      );
    };

    const getLabel = () => {
      if (theme === 'system') return '시스템';
      if (actualTheme === 'dark') return '다크';
      return '라이트';
    };

    if (variant === 'text') {
      return (
        <button
          ref={ref}
          type="button"
          onClick={handleToggle}
          className={cn(
            'inline-flex items-center justify-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors',
            'hover:bg-accent hover:text-accent-foreground',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
            className
          )}
          {...props}
        >
          {getIcon()}
          <span>{getLabel()}</span>
        </button>
      );
    }

    return (
      <button
        ref={ref}
        type="button"
        onClick={handleToggle}
        className={cn(
          'inline-flex h-10 w-10 items-center justify-center rounded-md transition-colors',
          'hover:bg-accent hover:text-accent-foreground',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
          className
        )}
        aria-label={`테마 변경 (현재: ${getLabel()})`}
        {...props}
      >
        {getIcon()}
      </button>
    );
  }
);

ThemeToggle.displayName = 'ThemeToggle';
