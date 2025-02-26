import React from 'react';
import Link from 'next/link';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

// Define button variants using class-variance-authority
const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-whimsical transition-all duration-300 font-medium focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none',
  {
    variants: {
      variant: {
        primary: 'bg-secondary text-primary-dark hover:bg-secondary-light',
        secondary: 'bg-primary text-white hover:bg-primary-light',
        accent: 'bg-accent text-white hover:bg-accent-purple',
        outline: 'bg-transparent border-2 border-secondary text-secondary hover:bg-secondary/10',
        ghost: 'bg-transparent hover:bg-secondary/10 text-secondary',
      },
      size: {
        sm: 'h-9 px-3 text-sm',
        md: 'h-11 px-6 text-base',
        lg: 'h-14 px-8 text-lg',
        icon: 'h-10 w-10',
      },
      fullWidth: {
        true: 'w-full',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

// Define the Button props by extending HTML button attributes and our variants
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  href?: string;
  icon?: React.ReactNode;
}

// Create the Button component
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, children, variant, size, fullWidth, href, icon, ...props }, ref) => {
    // If href is provided, render as a Link
    if (href) {
      return (
        <Link
          href={href}
          className={cn(buttonVariants({ variant, size, fullWidth, className }))}
        >
          {icon && <span className="mr-2">{icon}</span>}
          {children}
        </Link>
      );
    }

    // Otherwise, render as a button
    return (
      <button
        className={cn(buttonVariants({ variant, size, fullWidth, className }))}
        ref={ref}
        {...props}
      >
        {icon && <span className="mr-2">{icon}</span>}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button, buttonVariants }; 