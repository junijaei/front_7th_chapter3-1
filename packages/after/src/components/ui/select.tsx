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

export const FormSelect = ({
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
}: FormSelectProps) => {
  void size; // Keep for API consistency

  return (
    <div className="mb-4">
      {label && (
        <label className="mb-1.5 block text-xs font-bold text-foreground">
          {label}
          {required && <span className="text-destructive">*</span>}
        </label>
      )}

      <select
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        disabled={disabled}
        className={cn(
          'w-full rounded border border-input bg-background px-2.5 py-2 text-sm text-foreground outline-none',
          'focus:border-ring focus:ring-2 focus:ring-ring',
          error && 'border-destructive',
          disabled && 'cursor-not-allowed opacity-50'
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

      {error && <span className="mt-1 block text-xs text-destructive">{error}</span>}
      {helpText && !error && (
        <span className="mt-1 block text-xs text-muted-foreground">{helpText}</span>
      )}
    </div>
  );
};
