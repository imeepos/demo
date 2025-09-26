import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const cardVariants = cva(
  'rounded-lg border bg-card text-card-foreground transition-all duration-300',
  {
    variants: {
      variant: {
        default: 'shadow-sm hover:shadow-md',
        elevated: 'shadow-md hover:shadow-lg hover:-translate-y-1',
        glass:
          'bg-white/10 backdrop-blur-md border-white/20 shadow-lg hover:shadow-xl hover:bg-white/15',
        gradient:
          'bg-gradient-to-br from-card via-card/95 to-card/90 shadow-lg hover:shadow-xl hover:-translate-y-0.5',
        floating:
          'shadow-lg hover:shadow-2xl hover:-translate-y-2 hover:scale-[1.02]',
        glow: 'shadow-lg hover:shadow-primary/25 hover:shadow-2xl hover:-translate-y-1 hover:border-primary/30',
        outlined: 'border-2 shadow-sm hover:shadow-md hover:border-primary/30',
        soft: 'shadow-sm bg-gradient-to-br from-card to-muted/20 hover:shadow-lg hover:-translate-y-0.5',
      },
      size: {
        default: '',
        sm: 'text-sm',
        lg: 'text-lg',
      },
      padding: {
        default: '',
        none: '[&>*]:p-0',
        sm: '[&>*]:p-4',
        lg: '[&>*]:p-8',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      padding: 'default',
    },
  }
);

interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  hover?: boolean;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, size, padding, hover = true, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        cardVariants({ variant, size, padding }),
        !hover && 'hover:transform-none hover:shadow-sm',
        className
      )}
      {...props}
    />
  )
);
Card.displayName = 'Card';

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex flex-col space-y-1.5 p-6', className)}
    {...props}
  />
));
CardHeader.displayName = 'CardHeader';

const CardTitle = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'text-2xl font-semibold leading-none tracking-tight',
      className
    )}
    {...props}
  />
));
CardTitle.displayName = 'CardTitle';

const CardDescription = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('text-sm text-muted-foreground', className)}
    {...props}
  />
));
CardDescription.displayName = 'CardDescription';

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('p-6 pt-0', className)} {...props} />
));
CardContent.displayName = 'CardContent';

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex items-center p-6 pt-0', className)}
    {...props}
  />
));
CardFooter.displayName = 'CardFooter';

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
  cardVariants,
  type CardProps,
};
