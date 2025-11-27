import React from 'react';
import { cn } from '@/lib/utils';

interface Option {
  value: string;
  label: string;
}

interface FormSelectProps {
  name: string;
  value: string;
  onChange: (value: string) => void;
  options: Option[];
  label?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  error?: string;
  helpText?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const FormSelect: React.FC<FormSelectProps> = ({
  name,
  value,
  onChange,
  options,
  label,
  placeholder = 'Select an option...',
  required = false,
  disabled = false,
  error,
  helpText,
  size = 'md',
}) => {
  void size; // Keep for API consistency

  return (
    <div className="mb-4">
      {label && (
        <label className="mb-1.5 block text-xs font-bold text-gray-800 dark:text-neutral-200">
          {label}
          {required && <span className="text-red-600 dark:text-red-400">*</span>}
        </label>
      )}

      <select
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        disabled={disabled}
        className={cn(
          'w-full rounded border border-gray-400 dark:border-neutral-600 bg-white dark:bg-neutral-800 px-2.5 py-2 text-sm text-gray-900 dark:text-neutral-100 outline-none',
          'focus:border-blue-700 dark:focus:border-blue-400',
          error && 'border-red-600 dark:border-red-400',
          disabled && 'cursor-not-allowed bg-gray-100 dark:bg-neutral-700'
        )}
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

      {error && <span className="mt-1 block text-xs text-red-600 dark:text-red-400">{error}</span>}
      {helpText && !error && <span className="mt-1 block text-xs text-gray-600 dark:text-neutral-400">{helpText}</span>}
    </div>
  );
};
