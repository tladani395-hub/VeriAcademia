import Link from 'next/link';
import './globals.css';
import '../globals-admin.css';

export const metadata = { title: 'VeriAcademia — Verified university research', description: 'A trusted, traceable home for university research.' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en" suppressHydrationWarning><body><div className="site"><a className="skip-link" href="#main">Skip to content</a><header className="header"><div className="wrap nav"><Link className="logo" href="/"><span className="logo-mark">✓</span>VeriAcademia</Link><nav className="nav-links" aria-label="Primary"><Link href="/universities">Universities</Link><Link href="/researchers">Researchers</Link><Link href="/publications">Publications</Link><Link href="/patents">Patents</Link><Link href="/analytics">Analytics</Link><Link href="/trust">Trust</Link></nav><div className="nav-actions"><Link className="btn signin" href="/auth/sign-in">Sign in</Link><Link className="btn primary" href="/auth/sign-up">Register</Link></div></div></header><main id="main">{children}</main><footer><div className="wrap footer-grid"><div><div className="logo"><span className="logo-mark">✓</span>VeriAcademia</div><p className="muted">Verified universities. Traceable research. Controlled access.</p></div><div><h4>Discover</h4><Link href="/universities">Universities</Link><Link href="/researchers">Researchers</Link><Link href="/publications">Publications</Link><Link href="/patents">Patents</Link></div><div><h4>Platform</h4><Link href="/trust">How verification works</Link><Link href="/analytics">Public analytics</Link></div><div><h4>Support</h4><Link href="/help">Help</Link><Link href="/trust">Privacy</Link></div></div></footer></div></body></html>;
}
