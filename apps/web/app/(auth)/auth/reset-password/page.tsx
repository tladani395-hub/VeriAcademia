'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function ResetPasswordPage() {
  const [status, setStatus] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('Password reset successfully.');
  };

  return (
    <div className="auth-card">
      <p className="eyebrow mono" style={{ marginBottom: 12 }}>RECOVER ACCOUNT</p>
      <h1 style={{ fontSize: 'clamp(28px, 4vw, 36px)', margin: '0 0 12px' }}>Set new password</h1>
      <p className="muted" style={{ marginBottom: 24 }}>Enter your new password below.</p>
      
      {!status ? (
        <form onSubmit={handleSubmit}>
          <label>
            New Password
            <input type="password" required minLength={8} placeholder="Min 8 characters" />
          </label>
          <label>
            Confirm New Password
            <input type="password" required minLength={8} placeholder="Confirm your new password" />
          </label>
          <button className="btn primary" type="submit" style={{ width: '100%', marginTop: 16 }}>
            Update password
          </button>
        </form>
      ) : (
        <div style={{ padding: 20, background: 'var(--paper)', border: '1px solid var(--success)', borderRadius: 8, textAlign: 'center' }}>
          <span className="chip ok" style={{ marginBottom: 16 }}>✓ Success</span>
          <p style={{ margin: 0, fontWeight: 600 }}>{status}</p>
          <div style={{ marginTop: 16 }}>
            <Link href="/auth/sign-in" className="btn primary" style={{ width: '100%' }}>
              Sign in with new password
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
