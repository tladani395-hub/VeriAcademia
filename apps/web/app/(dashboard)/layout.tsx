import Link from 'next/link';
export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return <div className="dashboard"><aside className="dash-nav"><Link href="/dashboard">Overview</Link><Link href="/my-profile">My profile</Link><Link href="/researcher/publications">My publications</Link><Link href="/researcher/patents">My patents</Link><Link href="/requests/access">Access requests</Link><Link href="/notifications">Notifications</Link><Link href="/settings">Settings</Link></aside><div className="dash-main">{children}</div></div>;
}
