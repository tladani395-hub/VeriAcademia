import { cn } from '../';

export const Badge = ({ status = 'neutral', children }: { status?: 'verified' | 'pending' | 'request' | 'neutral'; children: React.ReactNode }) => (
  <span className={cn('chip', status === 'verified' && 'ok', status === 'pending' && 'pending', status === 'request' && 'request')}>{children}</span>
);
