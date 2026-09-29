interface StatusChipProps {
  type: 'ok' | 'verified' | 'pend' | 'pending' | 'req' | 'request';
  label?: string;
}

export function StatusChip({ type, label }: StatusChipProps) {
  if (type === 'ok' || type === 'verified') {
    return <span className="chip ok">✔ {label || 'Verified'}</span>;
  }
  if (type === 'pend' || type === 'pending') {
    return <span className="chip pend">◔ {label || 'Pending review'}</span>;
  }
  return <span className="chip req">🔒 {label || 'Request required'}</span>;
}
