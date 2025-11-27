import { forwardRef, type SelectHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export interface Option {
  value: string;
  label: string;
}

export interface FormSelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  options: Option[];
  label?: string;
  placeholder?: string;
  error?: string;
  helpText?: string;
}

export const FormSelect = forwardRef<HTMLSelectElement, FormSelectProps>(
  ({ className, options, label, placeholder = 'Select an option...', error, helpText, required, id, name, ...props }, ref) => {
    const selectId = id || name;

    return (
      <div className="mb-4">
        {label && (
          <label htmlFor={selectId} className="mb-1.5 block text-xs font-bold text-foreground">
            {label}
            {required && <span className="text-destructive">*</span>}
          </label>
        )}

        <select
          id={selectId}
          name={name}
          ref={ref}
          required={required}
          className={cn(
            'w-full rounded border border-input bg-background px-2.5 py-2 text-sm text-foreground outline-none',
            'focus:border-ring focus:ring-2 focus:ring-ring',
            error && 'border-destructive',
            'disabled:cursor-not-allowed disabled:opacity-50',
            className
          )}
          {...props}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        {error && <span className="mt-1 block text-xs text-destructive">{error}</span>}
        {helpText && !error && (
          <span className="mt-1 block text-xs text-muted-foreground">{helpText}</span>
        )}
      </div>
    );
  }
);

FormSelect.displayName = 'FormSelect';
