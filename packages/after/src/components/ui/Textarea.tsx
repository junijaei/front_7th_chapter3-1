import { forwardRef, type TextareaHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export interface FormTextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helpText?: string;
}

export const FormTextarea = forwardRef<HTMLTextAreaElement, FormTextareaProps>(
  ({ className, label, error, helpText, required, id, name, rows = 4, ...props }, ref) => {
    const textareaId = id || name;

    return (
      <div className="mb-4">
        {label && (
          <label htmlFor={textareaId} className="mb-1.5 block text-xs font-bold text-foreground">
            {label}
            {required && <span className="text-destructive">*</span>}
          </label>
        )}

        <textarea
          id={textareaId}
          name={name}
          ref={ref}
          required={required}
          rows={rows}
          className={cn(
            'w-full resize-y rounded border px-3.5 py-4 text-base font-normal leading-tight text-foreground outline-none transition-all placeholder:text-muted-foreground',
            'border-input bg-background',
            'focus:border-ring focus:ring-2 focus:ring-ring focus:px-[13px] focus:py-[15px]',
            error && 'border-destructive',
            'disabled:cursor-not-allowed disabled:opacity-50',
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
);

FormTextarea.displayName = 'FormTextarea';
