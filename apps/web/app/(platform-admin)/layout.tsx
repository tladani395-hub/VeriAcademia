import Link from 'next/link';
export default function PlatformAdminLayout({ children }: { children: React.ReactNode }) {
  return <div className="dashboard"><aside className="dash-nav"><Link href="/platform/admin/universities">Universities</Link><Link href="/platform/admin/domains">Domains</Link><Link href="/platform/admin/duplicates">Duplicates</Link><Link href="/platform/admin/research">Research</Link><Link href="/platform/admin/security">Security</Link><Link href="/platform/admin/audit">Audit</Link><Link href="/platform/admin/backups">Backups</Link></aside><div className="dash-main">{children}</div></div>;
}
