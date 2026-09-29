import Link from 'next/link';
export default function AuthLayout({ children }: { children: React.ReactNode }) { return <main className="auth-shell"><Link className="logo" href="/"><span className="logo-mark">✓</span>VeriAcademia</Link>{children}</main>; }
