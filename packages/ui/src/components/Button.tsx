import { cn } from '../';

export const Button = ({ className, variant = 'primary', ...props }: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'secondary' }) => (
  <button className={cn('btn', variant === 'primary' && 'primary', className)} {...props} />
);
