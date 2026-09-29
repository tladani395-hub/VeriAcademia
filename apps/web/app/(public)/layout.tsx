import Link from 'next/link';

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return <><div className="public-bar"><div className="wrap"><Link href="/">← VeriAcademia</Link><span className="mono">PUBLIC RESEARCH DIRECTORY</span></div></div>{children}</>;
}
