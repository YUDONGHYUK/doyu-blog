import { Heading } from './ui/heading';
import { cn } from '../lib/utils';

export default function PageTitle({
  title,
  className,
}: {
  title: string;
  className?: string;
}) {
  return (
    <Heading as="h2" className={cn('mt-10', className)}>
      {title}
    </Heading>
  );
}
