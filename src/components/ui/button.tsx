import React from 'react';
import { cva, VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center text-sm rounded-md',
  {
    variants: {
      variant: {
        default: 'bg-primary text-bg',
        outline: 'border border-accent bg-bg hover:bg-accent-lighter',
      },
      size: {
        default: 'h-9 px-4 py-2',
        fix: 'h-9 w-32',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      />
    );
  }
);

export { Button };
