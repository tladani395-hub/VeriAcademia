'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ThemeToggle } from '@/components/ThemeToggle';

export default function PlatformAdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const links = [
    { href: '/platform/admin/overview', label: 'Overview' },
    { href: '/platform/admin/universities', label: 'Universities' },
    { href: '/platform/admin/domains', label: 'Domains' },
    { href: '/platform/admin/duplicates', label: 'Duplicates' },
    { href: '/platform/admin/research', label: 'Research' },
    { href: '/platform/admin/security', label: 'Security' },
    { href: '/platform/admin/audit', label: 'Audit Log' },
    { href: '/platform/admin/backups', label: 'Backups' }
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
          <div className="mono" style={{ fontSize: 11, marginTop: 4, color: 'var(--danger)', fontWeight: 600 }}>PLATFORM ADMIN</div>
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
                <div style={{ fontWeight: 600, fontSize: 14 }}>System Root</div>
                <div className="muted" style={{ fontSize: 12 }}>PlatformAdmin</div>
              </div>
              <div className="avatar" style={{ width: 36, height: 36, fontSize: 16, background: 'var(--danger)' }}>R</div>
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
