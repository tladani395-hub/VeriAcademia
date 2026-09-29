import Link from 'next/link';

export function Footer() {
  return (
    <footer>
      <div className="wrap fgrid">
        <div>
          <div className="logo" style={{ fontSize: 20, color: 'var(--ink)', marginBottom: 10 }}>
            VeriAcademia
          </div>
          <p style={{ maxWidth: '34ch', color: 'var(--muted)' }}>
            Verified universities. Traceable research. Controlled access.
          </p>
        </div>
        <div>
          <h4>Discover</h4>
          <Link href="/universities">Universities</Link>
          <Link href="/researchers">Researchers</Link>
          <Link href="/publications">Publications</Link>
          <Link href="/patents">Patents</Link>
        </div>
        <div>
          <h4>Platform</h4>
          <Link href="/trust">How verification works</Link>
          <Link href="/analytics">Public analytics</Link>
          <Link href="/auth/sign-up">Register a university</Link>
        </div>
        <div>
          <h4>Support</h4>
          <Link href="/help">Help Center</Link>
          <Link href="/trust">Privacy Policy</Link>
          <Link href="/trust">Accessibility</Link>
        </div>
      </div>
      <div className="wrap" style={{ marginTop: 30, borderTop: '1px solid var(--line)', paddingTop: 20, fontSize: 14, textAlign: 'center', color: 'var(--muted)' }}>
        © 2026 VeriAcademia. All rights reserved. Built for verifiable institutional research data.
      </div>
    </footer>
  );
}
