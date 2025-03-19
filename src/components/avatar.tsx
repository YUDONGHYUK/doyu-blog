import React from 'react';
import Image from 'next/image';
import { cn } from '../lib/utils';

const Avatar = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        'relative rounded-full overflow-hidden shadow-sm w-10 h-10',
        className
      )}
      {...props}
    />
  );
});

const AvatarImage = React.forwardRef<
  React.ElementRef<typeof Image>,
  React.ComponentPropsWithoutRef<typeof Image>
>(({ className, ...props }, ref) => {
  return (
    <Image ref={ref} className={cn('aspect-square', className)} {...props} />
  );
});

export { Avatar, AvatarImage };
