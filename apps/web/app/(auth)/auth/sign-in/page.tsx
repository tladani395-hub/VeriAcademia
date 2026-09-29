'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function SignInPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Simulate authentication check
    setTimeout(() => {
      setLoading(false);
      router.push('/dashboard');
    }, 600);
  };

  const fillDemo = (role: 'scholar' | 'admin') => {
    if (role === 'scholar') {
      setEmail('researcher@example.edu');
      setPassword('scholarPassword123');
    } else {
      setEmail('admin@veriacademia.edu');
      setPassword('adminPassword123');
    }
  };

  return (
    <div style={{ maxWidth: 460 }}>
      {/* Header */}
      <h1 style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', margin: '0 0 12px' }}>
        Sign in to VeriAcademia
      </h1>
      <p className="muted" style={{ marginBottom: 32, fontSize: 17 }}>
        Access your research workspace, institutional affiliations, and pending access requests.
      </p>

      {/* Form */}
      <form onSubmit={handleSignIn} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        <div>
          <label style={{ display: 'block', fontWeight: 600, fontSize: 14, marginBottom: 8 }}>Institutional Email</label>
          <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@university.edu"
            style={{ width: '100%', padding: '14px 16px', borderRadius: 8, border: '1px solid var(--line)', fontSize: 15 }} />
        </div>

        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <label style={{ fontWeight: 600, fontSize: 14 }}>Password</label>
            <Link href="/auth/forgot-password" style={{ color: 'var(--brand)', fontSize: 13, fontWeight: 600 }}>
              Forgot password?
            </Link>
          </div>
          <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••"
            style={{ width: '100%', padding: '14px 16px', borderRadius: 8, border: '1px solid var(--line)', fontSize: 15 }} />
        </div>

        {error && <div style={{ padding: 12, borderRadius: 8, background: 'rgba(220, 38, 38, 0.05)', color: 'var(--danger)', fontSize: 14 }}>{error}</div>}

        <button type="submit" className="btn primary" disabled={loading} style={{ width: '100%', height: 50, fontSize: 16, marginTop: 10 }}>
          {loading ? 'Authenticating...' : 'Sign In'}
        </button>
      </form>

      {/* Trust message */}
      <div style={{ marginTop: 32, padding: 20, borderRadius: 12, background: 'var(--surface)', border: '1px solid var(--line)', display: 'flex', alignItems: 'center', gap: 12 }}>
         <span style={{ fontSize: 20 }}>🛡️</span>
         <p style={{ fontSize: 13.5, color: 'var(--muted)', margin: 0 }}>
            Your account information is protected and used only to provide your platform experience.
         </p>
      </div>

      <p style={{ marginTop: 32, textAlign: 'center', fontSize: 15, color: 'var(--muted)' }}>
        New to VeriAcademia? <Link href="/auth/sign-up" style={{ color: 'var(--brand)', fontWeight: 600 }}>Create an account</Link>
      </p>

      {/* Minimalistic Demo Switcher (if needed, make it really small) */}
      <div style={{ marginTop: 40, textAlign: 'center' }}>
         <button type="button" onClick={() => fillDemo('scholar')} className="mono" style={{ fontSize: 11, background: 'none', border: 'none', color: 'var(--muted)', cursor: 'pointer', opacity: 0.5 }}>[Scholar Demo]</button>
      </div>
    </div>
  );
}
