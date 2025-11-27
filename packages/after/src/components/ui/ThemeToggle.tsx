import { forwardRef, type ButtonHTMLAttributes } from 'react';
import { Monitor, Moon, Sun } from 'lucide-react';
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
        return <Monitor className="h-5 w-5" />;
      }

      if (actualTheme === 'dark') {
        return <Moon className="h-5 w-5" />;
      }

      return <Sun className="h-5 w-5" />;
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
