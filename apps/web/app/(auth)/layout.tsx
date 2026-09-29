'use client';

import Link from 'next/link';
import { Hero3DCanvas } from '../../components/Hero3DCanvas';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
        minHeight: '100vh',
        background: 'var(--paper)',
      }}
    >
      {/* Left Column: Form Shell */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '40px min(60px, 8vw)',
          zIndex: 2,
        }}
      >
        <div>
          <Link href="/" className="logo" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
            <svg viewBox="0 0 32 32" fill="none" width="32" height="32">
              <path d="M16 2 4 7v8c0 7.5 5 12.6 12 15 7-2.4 12-7.5 12-15V7L16 2Z" fill="var(--brand)" />
              <path d="m10.5 16 4 4 7.5-8" stroke="var(--onbrand)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span style={{ fontSize: 24, fontWeight: 700, fontFamily: 'var(--display)', color: 'var(--ink)' }}>
              VeriAcademia
            </span>
          </Link>
        </div>

        <div style={{ margin: '40px 0' }}>{children}</div>

        <div className="mono" style={{ fontSize: 13, color: 'var(--muted)' }}>
          © 2026 VeriAcademia Inc. · Institutional Cryptographic Research Protocol
        </div>
      </div>

      {/* Right Column: 3D Showcase Panel */}
      <div
        style={{
          position: 'relative',
          background: 'linear-gradient(135deg, #072635 0%, #031520 100%)',
          color: '#ffffff',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '60px min(60px, 8vw)',
          overflow: 'hidden',
        }}
      >
        <Hero3DCanvas />

        <div style={{ position: 'relative', zIndex: 2, maxWidth: 480 }}>
          <span
            className="mono"
            style={{
              display: 'inline-block',
              padding: '6px 14px',
              borderRadius: 20,
              background: 'rgba(2, 132, 199, 0.25)',
              border: '1px solid rgba(56, 189, 248, 0.4)',
              color: '#38bdf8',
              fontSize: 12,
              fontWeight: 600,
              marginBottom: 20,
            }}
          >
            VERIFIED INSTITUTIONAL NETWORK
          </span>

          <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', color: '#ffffff', lineHeight: 1.2, margin: '0 0 16px' }}>
            Trust, provenance, and open academic discovery.
          </h2>

          <p style={{ color: '#a8babd', fontSize: 17, lineHeight: 1.6, margin: '0 0 32px' }}>
            Join over 140 top research institutions maintaining cryptographically verified records, department rosters, and peer-reviewed outputs.
          </p>

          {/* Floating Proof Metric Card */}
          <div
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(16px)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              borderRadius: 16,
              padding: 24,
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <span className="mono" style={{ fontSize: 12, color: '#38bdf8' }}>CANONICAL AUDIT SIGNATURE</span>
              <span className="chip ok" style={{ background: 'rgba(22, 163, 74, 0.2)', color: '#4ade80', borderColor: '#4ade80' }}>
                ✓ Immutable
              </span>
            </div>
            <div style={{ fontSize: 15, fontWeight: 600, color: '#e2e8f0', marginBottom: 6 }}>
              Charotar University of Science & Technology Node
            </div>
            <div className="mono" style={{ fontSize: 13, color: '#94a3b8' }}>
              SHA256: e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
