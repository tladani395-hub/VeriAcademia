'use client';
import Link from 'next/link';
import { usePathname, useParams } from 'next/navigation';
import { ThemeToggle } from '@/components/ThemeToggle';

export default function UniversityAdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const params = useParams();
  const slug = params.slug || 'charusat-university'; // Fallback if rendered outside

  const links = [
    { href: `/universities/${slug}/admin/overview`, label: 'Overview' },
    { href: `/universities/${slug}/admin/profile`, label: 'Profile' },
    { href: `/universities/${slug}/admin/domains`, label: 'Domains' },
    { href: `/universities/${slug}/admin/members`, label: 'Members' },
    { href: `/universities/${slug}/admin/researchers`, label: 'Researchers' },
    { href: `/universities/${slug}/admin/publications`, label: 'Publications' },
    { href: `/universities/${slug}/admin/patents`, label: 'Patents' },
    { href: `/universities/${slug}/admin/verification`, label: 'Verification Queue' },
    { href: `/universities/${slug}/admin/access-requests`, label: 'Access requests' },
    { href: `/universities/${slug}/admin/analytics`, label: 'Analytics' },
    { href: `/universities/${slug}/admin/audit`, label: 'Audit Log' }
  ];

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--paper)' }}>
      {/* Sidebar */}
      <aside style={{ 
        width: '260px', 
        borderRight: '1px solid var(--line)', 
        background: 'var(--surface)', 
        display: 'flex', 
        flexDirection: 'column'
      }}>
        <div style={{ padding: '24px', borderBottom: '1px solid var(--line)' }}>
          <Link href="/" className="logo" style={{ fontSize: 20 }}>
            VeriAcademia
          </Link>
          <div className="mono" style={{ fontSize: 11, marginTop: 4, color: 'var(--brand)', fontWeight: 600 }}>UNIVERSITY ADMIN</div>
        </div>
        
        <nav style={{ padding: '24px 16px', display: 'flex', flexDirection: 'column', gap: 4, flex: 1, overflowY: 'auto' }}>
          {links.map(link => {
            const isActive = pathname === link.href || pathname.startsWith(link.href + '/');
            return (
              <Link 
                key={link.href} 
                href={link.href}
                style={{
                  padding: '8px 16px',
                  borderRadius: 6,
                  color: isActive ? 'var(--brand)' : 'var(--ink)',
                  background: isActive ? 'color-mix(in srgb, var(--brand) 10%, transparent)' : 'transparent',
                  fontWeight: isActive ? 600 : 400,
                  transition: 'background 0.2s',
                  textDecoration: 'none',
                  fontSize: 14
                }}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
        
        <div style={{ padding: '24px', borderTop: '1px solid var(--line)' }}>
          <Link href="/dashboard" className="btn" style={{ width: '100%', marginBottom: 12 }}>User Dashboard</Link>
          <Link href="/auth/sign-in" className="btn" style={{ width: '100%' }}>Sign out</Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <header style={{ 
          height: 64, 
          borderBottom: '1px solid var(--line)', 
          background: 'var(--surface)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          padding: '0 32px',
          position: 'sticky',
          top: 0,
          zIndex: 10
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <ThemeToggle />
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontWeight: 600, fontSize: 14 }}>Dr. Tirth Ladani</div>
                <div className="muted" style={{ fontSize: 12 }}>UniversityAdmin</div>
              </div>
              <div className="avatar" style={{ width: 36, height: 36, fontSize: 16 }}>TL</div>
            </div>
          </div>
        </header>

        <main style={{ padding: '40px 32px', maxWidth: 1200, flex: 1 }}>
          {children}
        </main>
      </div>
    </div>
  );
}
