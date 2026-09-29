'use client';
import Link from 'next/link';
import { useState } from 'react';
import { ThemeToggle } from './ThemeToggle';

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header>
      <div className="wrap nav">
        <Link href="/" className="logo" aria-label="VeriAcademia home">
          <svg viewBox="0 0 32 32" fill="none" width="30" height="30">
            <path d="M16 2 4 7v8c0 7.5 5 12.6 12 15 7-2.4 12-7.5 12-15V7L16 2Z" fill="var(--brand)" />
            <path d="m10.5 16 4 4 7.5-8" stroke="var(--onbrand)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          VeriAcademia
        </Link>

        <nav aria-label="Primary" style={{ flex: 1 }}>
          <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
            <li><Link href="/universities" onClick={() => setMenuOpen(false)}>Universities</Link></li>
            <li><Link href="/researchers" onClick={() => setMenuOpen(false)}>Researchers</Link></li>
            <li><Link href="/publications" onClick={() => setMenuOpen(false)}>Publications</Link></li>
            <li><Link href="/patents" onClick={() => setMenuOpen(false)}>Patents</Link></li>
            <li><Link href="/analytics" onClick={() => setMenuOpen(false)}>Analytics</Link></li>
            <li><Link href="/trust" onClick={() => setMenuOpen(false)}>About & Trust</Link></li>
          </ul>
        </nav>

        <div className="nav-actions">
          <ThemeToggle />
          <Link href="/auth/sign-in" className="btn signin">Sign in</Link>
          <Link href="/auth/sign-up" className="btn primary">Register</Link>
          <button
            className="icon-btn menu-btn"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation menu"
          >
            ☰
          </button>
        </div>
      </div>
    </header>
  );
}
