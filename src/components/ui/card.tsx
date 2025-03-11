import React from 'react';
import { cn } from '../../lib/utils';
import Image from 'next/image';

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn('border rounded-md border-border', className)}
      {...props}
    />
  );
});
Card.displayName = 'Card';

const CardImage = React.forwardRef<
  HTMLImageElement,
  React.ComponentPropsWithoutRef<typeof Image>
>(({ className, alt, ...props }, ref) => {
  return <Image ref={ref} className={cn('', className)} alt={alt} {...props} />;
});
CardImage.displayName = 'CardImage';

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return <div ref={ref} className={cn('p-6', className)} {...props} />;
});
CardContent.displayName = 'CardContent';

const CardTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => {
  return (
    <h3
      ref={ref}
      className={cn('mt-4 text-2xl font-semibold', className)}
      {...props}
    />
  );
});
CardTitle.displayName = 'CardTitle';

export { Card, CardImage, CardContent, CardTitle };
