import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const headVariants = cva('', {
  variants: {
    variant: {
      h1: 'text-4xl md:text-5xl font-bold',
      h2: 'text-3xl md:text-4xl font-semibold',
      h3: 'text-2xl md:text-3xl font-semibold',
      h4: 'text-xl md:text-2xl font-semibold',
      h5: 'text-base md:text-xl font-semibold',
    },
  },
  defaultVariants: { variant: 'h1' },
});

interface HeadProps extends React.HTMLAttributes<HTMLHeadingElement> {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5';
}

function Heading({ children, as = 'h1', className }: HeadProps) {
  const Comp = as;
  return (
    <Comp className={cn(headVariants({ variant: Comp, className }))}>
      {children}
    </Comp>
  );
}

export { Heading };
