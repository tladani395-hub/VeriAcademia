'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ThemeToggle } from '@/components/ThemeToggle';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const links = [
    { href: '/dashboard', label: 'Overview' },
    { href: '/my-profile', label: 'My profile' },
    { href: '/researcher/publications', label: 'My publications' },
    { href: '/researcher/patents', label: 'My patents' },
    { href: '/dashboard/analytics', label: 'Analytics' },
    { href: '/requests/access', label: 'Access requests' },
    { href: '/notifications', label: 'Notifications' },
    { href: '/settings', label: 'Settings' }
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
        </div>
        
        <nav style={{ padding: '24px 16px', display: 'flex', flexDirection: 'column', gap: 8, flex: 1 }}>
          {links.map(link => {
            const isActive = pathname === link.href || pathname.startsWith(link.href + '/');
            return (
              <Link 
                key={link.href} 
                href={link.href}
                style={{
                  padding: '10px 16px',
                  borderRadius: 6,
                  color: isActive ? 'var(--brand)' : 'var(--ink)',
                  background: isActive ? 'color-mix(in srgb, var(--brand) 10%, transparent)' : 'transparent',
                  fontWeight: isActive ? 600 : 400,
                  transition: 'background 0.2s',
                  textDecoration: 'none'
                }}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
        
        <div style={{ padding: '24px', borderTop: '1px solid var(--line)' }}>
          <Link href="/auth/sign-in" className="btn" style={{ width: '100%' }}>Sign out</Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
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

        <main style={{ padding: '40px 32px', maxWidth: 1000, flex: 1 }}>
          {children}
        </main>
      </div>
    </div>
  );
}
