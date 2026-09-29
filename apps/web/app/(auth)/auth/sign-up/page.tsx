'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function SignUpPage() {
  const [ok, setOk] = useState(false);
  return (
    <div className="auth-card">
      <p className="eyebrow mono">CREATE ACCOUNT</p>
      <h1>Register</h1>
      <p className="muted">Start your verified research profile.</p>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setOk(true);
        }}
      >
        {!ok ? (
          <>
            <label>
              Name
              <input required placeholder="Your name" />
            </label>
            <label>
              Email
              <input type="email" required placeholder="you@example.edu" />
            </label>
            <label>
              Password
              <input type="password" required minLength={8} placeholder="Min 8 characters" />
            </label>
            <label className="check">
              <input type="checkbox" required /> I agree to the terms
            </label>
            <button className="btn primary" type="submit">
              Create account
            </button>
          </>
        ) : (
          <p className="form-success">
            Account created! <Link href="/auth/verify-email">Verify your email</Link>
          </p>
        )}
      </form>
      <p className="auth-switch">
        Already have an account? <Link href="/auth/sign-in">Sign in</Link>
      </p>
    </div>
  );
}
