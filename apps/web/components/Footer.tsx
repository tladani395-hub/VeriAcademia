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
          <Link href="/about">About Us</Link>
          <Link href="/analytics">Analytics</Link>
          <Link href="/universities">Universities</Link>
        </div>
        <div>
          <h4>Resources</h4>
          <Link href="/publications">Publications</Link>
          <Link href="/patents">Patents</Link>
          <Link href="/researchers">Researchers</Link>
        </div>
        <div>
          <h4>Legal</h4>
          <Link href="/terms">Terms & Conditions</Link>
          <Link href="/privacy">Privacy Policy</Link>
        </div>
        <div>
          <h4>Account</h4>
          <Link href="/auth/sign-in">Sign In</Link>
          <Link href="/dashboard">Dashboard</Link>
        </div>
      </div>
      <div className="wrap" style={{ marginTop: 40, borderTop: '1px solid var(--line)', paddingTop: 24, fontSize: 13, textAlign: 'center', color: 'var(--muted)', display: 'flex', justifyContent: 'space-between' }}>
        <p>© 2026 VeriAcademia. All rights reserved.</p>
        <p>Built for verifiable institutional research data.</p>
      </div>
    </footer>
  );
}
