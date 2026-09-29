'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function MfaPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      router.push('/dashboard');
    }, 800);
  };

  return (
    <div className="auth-card" style={{ textAlign: 'center' }}>
      <p className="eyebrow mono" style={{ marginBottom: 12 }}>SECURITY</p>
      <h1 style={{ fontSize: 'clamp(28px, 4vw, 36px)', margin: '0 0 12px' }}>Two-Factor Authentication</h1>
      <p className="muted" style={{ marginBottom: 24 }}>Enter the 6-digit code from your authenticator app.</p>
      
      <form onSubmit={handleVerify}>
        <input 
          type="text" 
          required 
          maxLength={6}
          pattern="[0-9]{6}"
          placeholder="000000" 
          style={{ textAlign: 'center', fontSize: 24, letterSpacing: '0.2em' }}
        />
        <button className="btn primary" type="submit" disabled={loading} style={{ width: '100%', marginTop: 24 }}>
          {loading ? 'Verifying...' : 'Verify'}
        </button>
      </form>

      <p className="auth-switch" style={{ marginTop: 24, color: 'var(--muted)' }}>
        Having trouble? <Link href="/help" style={{ color: 'var(--brand)', fontWeight: 600 }}>Contact support</Link>
      </p>
    </div>
  );
}
