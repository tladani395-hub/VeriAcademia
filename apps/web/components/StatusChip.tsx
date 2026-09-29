interface StatusChipProps {
  type: 'ok' | 'verified' | 'pend' | 'pending' | 'req' | 'request' | 'error';
  label?: string;
}

export function StatusChip({ type, label }: StatusChipProps) {
  if (type === 'ok' || type === 'verified') {
    return <span className="chip ok">✔ {label || 'Verified'}</span>;
  }
  if (type === 'pend' || type === 'pending') {
    return <span className="chip pend">◔ {label || 'Pending review'}</span>;
  }
  if (type === 'error') {
    return <span className="chip error" style={{ color: 'var(--danger)', borderColor: 'var(--danger)' }}>✖ {label || 'Rejected'}</span>;
  }
  return <span className="chip req">🔒 {label || 'Request required'}</span>;
}
