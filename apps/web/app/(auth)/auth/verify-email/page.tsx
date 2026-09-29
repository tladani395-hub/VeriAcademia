'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function VerifyEmailPage() {
  const [resendStatus, setResendStatus] = useState('');

  return (
    <div className="auth-card" style={{ textAlign: 'center' }}>
      <p className="eyebrow mono" style={{ marginBottom: 12 }}>VERIFY ACCOUNT</p>
      <h1 style={{ fontSize: 'clamp(28px, 4vw, 36px)', margin: '0 0 12px' }}>Check your email</h1>
      <p className="muted" style={{ marginBottom: 24 }}>
        We sent a verification link to your email address. Please click the link to activate your account.
      </p>
      
      <div style={{ padding: 24, background: 'var(--paper)', border: '1px solid var(--line)', borderRadius: 8, marginBottom: 24 }}>
        <p style={{ margin: 0, fontWeight: 600 }}>Didn&apos;t receive the email?</p>
        <p className="muted" style={{ margin: '8px 0 16px', fontSize: 14 }}>
          Check your spam folder or request a new link.
        </p>
        <button 
          className="btn" 
          onClick={() => setResendStatus('Verification link resent!')}
          style={{ width: '100%' }}
        >
          Resend link
        </button>
        {resendStatus && <p style={{ color: 'var(--success)', marginTop: 12, fontSize: 14, fontWeight: 600 }}>{resendStatus}</p>}
      </div>

      <Link href="/auth/sign-in" className="btn primary" style={{ width: '100%' }}>
        Return to sign in
      </Link>
    </div>
  );
}
