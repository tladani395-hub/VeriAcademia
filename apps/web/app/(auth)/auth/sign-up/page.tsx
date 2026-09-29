'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function SignUpPage() {
  const [accountType, setAccountType] = useState<'scholar' | 'admin'>('scholar');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [terms, setTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match. Please re-enter.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setTimeout(() => {
        router.push('/dashboard');
      }, 1500);
    }, 800);
  };

  return (
    <div style={{ maxWidth: 460 }}>
      {/* Header */}
      <h1 style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', margin: '0 0 12px' }}>
        Create Your Academic Profile
      </h1>
      <p className="muted" style={{ marginBottom: 32, fontSize: 17 }}>
        Join a growing community of students, researchers, educators, and innovators.
      </p>

      {/* Role Tabs */}
      <div
        style={{
          display: 'flex',
          gap: 4,
          background: 'var(--surface)',
          padding: 4,
          borderRadius: 12,
          border: '1px solid var(--line)',
          marginBottom: 32,
        }}
      >
        {(['scholar', 'admin'] as const).map(type => (
          <button
            key={type}
            type="button"
            onClick={() => setAccountType(type)}
            style={{
              flex: 1,
              padding: '12px 16px',
              borderRadius: 8,
              border: 'none',
              fontSize: 15,
              fontWeight: 600,
              textTransform: 'capitalize',
              background: accountType === type ? 'var(--surface)' : 'transparent',
              color: accountType === type ? 'var(--ink)' : 'var(--muted)',
              boxShadow: accountType === type ? '0 2px 4px var(--shadow)' : 'none',
              cursor: 'pointer',
              transition: '0.2s',
            }}
          >
            {type}
          </button>
        ))}
      </div>

      {!submitted ? (
        <form onSubmit={handleSignUp} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {/* Name & University */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 20 }}>
            <div>
              <label style={{ display: 'block', fontWeight: 600, fontSize: 14, marginBottom: 8 }}>Full Name</label>
              <input type="text" required value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Dr. Jane Doe"
                style={{ width: '100%', padding: '14px 16px', borderRadius: 8, border: '1px solid var(--line)', fontSize: 15 }} />
            </div>
            <div>
              <label style={{ display: 'block', fontWeight: 600, fontSize: 14, marginBottom: 8 }}>University</label>
              <select required style={{ width: '100%', padding: '14px 16px', borderRadius: 8, border: '1px solid var(--line)', background: 'var(--surface)', fontSize: 15 }}>
                <option value="">Select your institution</option>
                <option value="other">Example University A</option>
              </select>
            </div>
          </div>

          {/* Email */}
          <div>
            <label style={{ display: 'block', fontWeight: 600, fontSize: 14, marginBottom: 8 }}>Institutional Email</label>
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@university.edu"
              style={{ width: '100%', padding: '14px 16px', borderRadius: 8, border: '1px solid var(--line)', fontSize: 15 }} />
          </div>

          {/* Passwords */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div>
              <label style={{ display: 'block', fontWeight: 600, fontSize: 14, marginBottom: 8 }}>Password</label>
              <input type="password" required minLength={8} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••"
                style={{ width: '100%', padding: '14px 16px', borderRadius: 8, border: '1px solid var(--line)', fontSize: 15 }} />
            </div>
            <div>
              <label style={{ display: 'block', fontWeight: 600, fontSize: 14, marginBottom: 8 }}>Confirm Password</label>
              <input type="password" required minLength={8} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="••••••••"
                style={{ width: '100%', padding: '14px 16px', borderRadius: 8, border: '1px solid var(--line)', fontSize: 15 }} />
            </div>
          </div>

          {error && <div style={{ padding: 12, borderRadius: 8, background: 'rgba(220, 38, 38, 0.05)', color: 'var(--danger)', fontSize: 14 }}>{error}</div>}

          {/* Terms */}
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
            <input type="checkbox" id="terms" required checked={terms} onChange={(e) => setTerms(e.target.checked)} style={{ marginTop: 5 }} />
            <label htmlFor="terms" style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.5 }}>
              I agree to the <Link href="/terms" style={{ color: 'var(--brand)', fontWeight: 600 }}>Terms & Conditions</Link> and <Link href="/privacy" style={{ color: 'var(--brand)', fontWeight: 600 }}>Privacy Policy</Link>.
            </label>
          </div>

          <button type="submit" className="btn primary" disabled={loading} style={{ width: '100%', height: 50, fontSize: 16, marginTop: 10 }}>
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>
      ) : (
        <div style={{ padding: 40, background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: 16, textAlign: 'center' }}>
          <div style={{ fontSize: 40, marginBottom: 16 }}>✨</div>
          <h3 style={{ fontSize: 24, margin: '0 0 12px' }}>Registration Successful</h3>
          <p style={{ color: 'var(--muted)', fontSize: 16 }}>Redirecting you to your secure dashboard...</p>
        </div>
      )}

      <p style={{ marginTop: 32, textAlign: 'center', fontSize: 15, color: 'var(--muted)' }}>
        Already have an account? <Link href="/auth/sign-in" style={{ color: 'var(--brand)', fontWeight: 600 }}>Sign in</Link>
      </p>
    </div>
  );
}
