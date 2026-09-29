import { cn } from '../';

export const Card = ({ className, children }: { className?: string; children: React.ReactNode }) => (
  <div className={cn('bg-surface border border-line rounded-lg p-5', className)}>{children}</div>
);
