import Link from 'next/link';

export default function AdminResearchersPage() {
  const researchers = [
    { name: 'Dr. Ananya Patel', slug: 'dr-ananya-patel', area: 'Artificial Intelligence', pubs: 42, status: 'Verified' },
    { name: 'Prof. R. Mehta', slug: 'r-mehta', area: 'Signal Processing', pubs: 28, status: 'Verified' },
    { name: 'Dr. S. Kumar', slug: 's-kumar', area: 'Data Science', pubs: 15, status: 'Pending review' },
  ];
  return (
    <div>
      <section className="page-hero">
        <div className="wrap">
          <p className="eyebrow mono">UNIVERSITY ADMIN · RESEARCHERS</p>
          <h1>Researchers</h1>
          <p className="lede">Manage affiliated researchers and their verification status.</p>
        </div>
      </section>
      <section>
        <div className="wrap">
          <div className="directory-grid">
            {researchers.map((r) => (
              <Link href={`/researchers/${r.slug}`} className="directory-card researcher-card" key={r.slug}>
                <div className="avatar">{r.name.split(' ').map((x) => x[0]).join('').slice(0, 2)}</div>
                <span className={`chip ${r.status === 'Verified' ? 'ok' : 'pending'}`}>
                  {r.status === 'Verified' ? '✓ Verified' : '◔ Pending'}
                </span>
                <h2>{r.name}</h2>
                <p>{r.area}</p>
                <p className="muted"><b>{r.pubs}</b> publications</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
