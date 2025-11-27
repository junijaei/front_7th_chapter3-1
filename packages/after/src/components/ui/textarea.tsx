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

export const FormTextarea = ({
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
}: FormTextareaProps) => {
  return (
    <div className="mb-4">
      {label && (
        <label className="mb-1.5 block text-xs font-bold text-foreground">
          {label}
          {required && <span className="text-destructive">*</span>}
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
          'w-full resize-y rounded border px-3.5 py-4 text-base font-normal leading-tight text-foreground outline-none transition-all placeholder:text-muted-foreground',
          'border-input bg-background',
          'focus:border-ring focus:ring-2 focus:ring-ring focus:px-[13px] focus:py-[15px]',
          error && 'border-destructive',
          disabled && 'cursor-not-allowed opacity-50'
        )}
      />

      {error && <span className="mt-1 block text-xs text-destructive">{error}</span>}
      {helpText && !error && (
        <span className="mt-1 block text-xs text-muted-foreground">{helpText}</span>
      )}
    </div>
  );
};
