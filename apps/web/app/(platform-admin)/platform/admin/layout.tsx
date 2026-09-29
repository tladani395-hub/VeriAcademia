import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Platform Admin',
};

export default function PlatformAdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="layout-sidebar">
      <aside className="sidebar">
        <nav>
          <p className="eyebrow mono">PLATFORM ADMIN</p>
          <Link href="/platform/admin/universities">Universities</Link>
          <Link href="/platform/admin/domains">Domains</Link>
          <Link href="/platform/admin/duplicates">Duplicates</Link>
          <Link href="/platform/admin/research">Research</Link>
          <Link href="/platform/admin/security">Security</Link>
          <Link href="/platform/admin/audit">Audit</Link>
          <Link href="/platform/admin/backups">Backups</Link>
        </nav>
      </aside>
      <main className="content">
        {children}
      </main>
    </div>
  );
}
