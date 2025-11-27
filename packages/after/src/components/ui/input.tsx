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
            <label
              htmlFor={inputId}
              className="mb-1.5 block text-xs font-bold text-gray-800 dark:text-neutral-200"
            >
              {label}
              {required && <span className="text-red-600 dark:text-red-400">*</span>}
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
              'border-gray-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 text-gray-900 dark:text-neutral-100 placeholder:text-gray-400 dark:placeholder:text-neutral-500',
              'focus-visible:ring-blue-500 dark:focus-visible:ring-blue-400',
              error && 'border-red-600 dark:border-red-400',
              className
            )}
            {...props}
          />
          {error && (
            <span className="mt-1 block text-xs text-red-600 dark:text-red-400">{error}</span>
          )}
          {helpText && !error && (
            <span className="mt-1 block text-xs text-gray-600 dark:text-neutral-400">
              {helpText}
            </span>
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
          'flex h-10 w-full rounded-md border border-gray-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 px-3 py-2 text-sm text-gray-900 dark:text-neutral-100 ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-gray-400 dark:placeholder:text-neutral-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:focus-visible:ring-blue-400 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        {...props}
      />
    );
  }
);
Input.displayName = 'Input';

export { Input };
