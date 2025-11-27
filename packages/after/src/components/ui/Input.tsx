import { forwardRef, type InputHTMLAttributes } from 'react';

import { cn } from '@/lib/utils';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helpText?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, error, helpText, required, id, name, ...props }, ref) => {
    const inputId = id || name;

    if (label || error || helpText) {
      return (
        <div className="mb-4">
          {label && (
            <label htmlFor={inputId} className="mb-1.5 block text-xs font-bold text-foreground">
              {label}
              {required && <span className="text-destructive">*</span>}
            </label>
          )}
          <input
            id={inputId}
            name={name}
            type={type}
            ref={ref}
            required={required}
            className={cn(
              'flex h-10 w-full rounded-md border px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
              'border-input bg-background text-foreground placeholder:text-muted-foreground',
              'focus-visible:ring-ring',
              error && 'border-destructive',
              className
            )}
            {...props}
          />
          {error && <span className="mt-1 block text-xs text-destructive">{error}</span>}
          {helpText && !error && (
            <span className="mt-1 block text-xs text-muted-foreground">{helpText}</span>
          )}
        </div>
      );
    }

    return (
      <input
        id={inputId}
        name={name}
        type={type}
        ref={ref}
        required={required}
        className={cn(
          'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        {...props}
      />
    );
  }
);
Input.displayName = 'Input';

export { Input };
