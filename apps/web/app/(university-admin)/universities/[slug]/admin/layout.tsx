import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'University Admin',
};

export default function UniversityAdminLayout({ children, params }: { children: React.ReactNode, params: { slug: string } }) {
  const { slug } = params;
  return (
    <div className="layout-sidebar">
      <aside className="sidebar">
        <nav>
          <p className="eyebrow mono">UNI ADMIN · {slug.toUpperCase()}</p>
          <Link href={`/universities/${slug}/admin/overview`}>Overview</Link>
          <Link href={`/universities/${slug}/admin/profile`}>Profile</Link>
          <Link href={`/universities/${slug}/admin/domains`}>Domains</Link>
          <Link href={`/universities/${slug}/admin/members`}>Members</Link>
          <Link href={`/universities/${slug}/admin/researchers`}>Researchers</Link>
          <Link href={`/universities/${slug}/admin/publications`}>Publications</Link>
          <Link href={`/universities/${slug}/admin/patents`}>Patents</Link>
          <Link href={`/universities/${slug}/admin/verification`}>Verification</Link>
          <Link href={`/universities/${slug}/admin/access`}>Access requests</Link>
          <Link href={`/universities/${slug}/admin/analytics`}>Analytics</Link>
          <Link href={`/universities/${slug}/admin/audit`}>Audit</Link>
        </nav>
      </aside>
      <main className="content">
        {children}
      </main>
    </div>
  );
}
