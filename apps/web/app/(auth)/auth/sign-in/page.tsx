'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function SignInPage() {
  const [error, setError] = useState('');
  return (
    <div className="auth-card">
      <p className="eyebrow mono">WELCOME BACK</p>
      <h1>Sign in to VeriAcademia</h1>
      <p className="muted">Access your research workspace and university memberships.</p>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setError('Authentication will connect to the VeriAcademia API in the next phase.');
        }}
      >
        <label>
          Email
          <input type="email" required placeholder="you@example.edu" />
        </label>
        <label>
          Password
          <input type="password" required placeholder="Enter your password" />
        </label>
        <div className="form-row">
          <label className="check">
            <input type="checkbox" /> Remember me
          </label>
          <Link href="/auth/forgot-password">Forgot password?</Link>
        </div>
        {error && <p className="form-error">{error}</p>}
        <button className="btn primary" type="submit">
          Sign in
        </button>
      </form>
      <p className="auth-switch">
        New to VeriAcademia? <Link href="/auth/sign-up">Create an account</Link>
      </p>
    </div>
  );
}
