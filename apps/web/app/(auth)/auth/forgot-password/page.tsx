'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function ForgotPasswordPage() {
  const [sent, setSent] = useState(false);

  return (
    <div className="auth-card">
      <p className="eyebrow mono">RECOVER ACCESS</p>
      <h1>Forgot password?</h1>
      <p className="muted">Enter your email and we&#39;ll send a reset link.</p>
      <form onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
        {!sent ? (
          <>
            <label>
              Email
              <input type="email" required placeholder="you@example.edu" />
            </label>
            <button className="btn primary" type="submit">Send reset link</button>
          </>
        ) : (
          <p className="form-success">If that email is registered, a reset link has been sent.</p>
        )}
      </form>
      <p className="auth-switch">
        Remember your password? <Link href="/auth/sign-in">Sign in</Link>
      </p>
    </div>
  );
}
