import React from 'react';
import { cn } from '@/lib/utils';

interface FormTextareaProps {
  name: string;
  value: string;
  onChange: (value: string) => void;
  label?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  error?: string;
  helpText?: string;
  rows?: number;
}

export const FormTextarea: React.FC<FormTextareaProps> = ({
  name,
  value,
  onChange,
  label,
  placeholder,
  required = false,
  disabled = false,
  error,
  helpText,
  rows = 4,
}) => {
  return (
    <div className="mb-4">
      {label && (
        <label className="mb-1.5 block text-xs font-bold text-gray-800 dark:text-neutral-200">
          {label}
          {required && <span className="text-red-600 dark:text-red-400">*</span>}
        </label>
      )}

      <textarea
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        rows={rows}
        className={cn(
          'w-full resize-y rounded border px-3.5 py-4 text-base font-normal leading-tight text-gray-900 dark:text-neutral-100 outline-none transition-all placeholder:text-gray-400 dark:placeholder:text-neutral-500',
          'border-gray-400 dark:border-neutral-600 bg-white dark:bg-neutral-800',
          'focus:border-blue-700 dark:focus:border-blue-400 focus:border-2 focus:px-[13px] focus:py-[15px]',
          error && 'border-red-600 dark:border-red-400',
          disabled && 'cursor-not-allowed bg-gray-200 dark:bg-neutral-700'
        )}
      />

      {error && <span className="mt-1 block text-xs text-red-600 dark:text-red-400">{error}</span>}
      {helpText && !error && (
        <span className="mt-1 block text-xs text-gray-600 dark:text-neutral-400">{helpText}</span>
      )}
    </div>
  );
};
