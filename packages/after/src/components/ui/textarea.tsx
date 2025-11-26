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
        <label className="mb-1.5 block text-xs font-bold text-gray-800">
          {label}
          {required && <span className="text-red-600">*</span>}
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
          'w-full resize-y rounded border px-3.5 py-4 text-base font-normal leading-tight text-gray-900 outline-none transition-all',
          'border-gray-400 bg-white',
          'focus:border-blue-700 focus:border-2 focus:px-[13px] focus:py-[15px]',
          error && 'border-red-600',
          disabled && 'cursor-not-allowed bg-gray-200'
        )}
      />

      {error && <span className="mt-1 block text-xs text-red-600">{error}</span>}
      {helpText && !error && <span className="mt-1 block text-xs text-gray-600">{helpText}</span>}
    </div>
  );
};
