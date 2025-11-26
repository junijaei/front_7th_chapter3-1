import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';

const modalVariants = cva('', {
  variants: {
    size: {
      small: 'sm:max-w-sm',
      medium: 'sm:max-w-lg',
      large: 'sm:max-w-2xl',
    },
  },
  defaultVariants: {
    size: 'medium',
  },
});

export interface ModalProps
  extends Omit<React.ComponentProps<typeof Dialog>, 'open'>,
    VariantProps<typeof modalVariants> {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: React.ReactNode;
  showFooter?: boolean;
  footerContent?: React.ReactNode;
  showCloseButton?: boolean;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  description,
  children,
  size = 'medium',
  showFooter = false,
  footerContent,
  showCloseButton = true,
  ...props
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()} {...props}>
      <DialogContent
        className={cn(modalVariants({ size }))}
        showCloseButton={showCloseButton}
        onPointerDownOutside={(e) => {
          e.preventDefault();
          onClose();
        }}
        onEscapeKeyDown={(e) => {
          e.preventDefault();
          onClose();
        }}
      >
        {(title || description) && (
          <DialogHeader>
            {title && <DialogTitle>{title}</DialogTitle>}
            {description && <DialogDescription>{description}</DialogDescription>}
          </DialogHeader>
        )}
        <div className="modal-body">{children}</div>
        {showFooter && footerContent && <DialogFooter>{footerContent}</DialogFooter>}
      </DialogContent>
    </Dialog>
  );
};
