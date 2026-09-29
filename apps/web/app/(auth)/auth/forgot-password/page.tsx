'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function ForgotPasswordPage() {
  const [status, setStatus] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('If an account exists with this email, a password reset link has been sent.');
  };

  return (
    <div className="auth-card">
      <p className="eyebrow mono" style={{ marginBottom: 12 }}>RECOVER ACCOUNT</p>
      <h1 style={{ fontSize: 'clamp(28px, 4vw, 36px)', margin: '0 0 12px' }}>Reset your password</h1>
      <p className="muted" style={{ marginBottom: 24 }}>Enter your email address and we will send you a link to reset your password.</p>
      
      {!status ? (
        <form onSubmit={handleSubmit}>
          <label>
            Email
            <input type="email" required placeholder="you@example.edu" />
          </label>
          <button className="btn primary" type="submit" style={{ width: '100%', marginTop: 16 }}>
            Send reset link
          </button>
        </form>
      ) : (
        <div style={{ padding: 20, background: 'var(--paper)', border: '1px solid var(--success)', borderRadius: 8, textAlign: 'center' }}>
          <span className="chip ok" style={{ marginBottom: 16 }}>✓ Success</span>
          <p style={{ margin: 0, fontWeight: 600 }}>{status}</p>
        </div>
      )}

      <p className="auth-switch" style={{ marginTop: 24, textAlign: 'center' }}>
        <Link href="/auth/sign-in" style={{ color: 'var(--brand)', fontWeight: 600 }}>← Back to sign in</Link>
      </p>
    </div>
  );
}
