import Link from 'next/link';

export default function MyPatentsPage() {
  const pats = [
    { title: 'Adaptive signal processing for smart learning environments', number: 'US-2026-01284', status: 'Verified' },
    { title: 'Low-energy membrane for groundwater recovery', number: 'EP-2025-88310', status: 'Pending review' },
  ];

  return (
    <div>
      <section className="page-hero">
        <div className="wrap">
          <p className="eyebrow mono">PATENTS</p>
          <h1>My patents</h1>
          <p className="lede">Track and manage your submitted patents.</p>
        </div>
      </section>
      <section>
        <div className="wrap">
          <div className="publication-list">
            {pats.map((p) => (
              <Link className="publication-card" href={`/patents/${p.number}`} key={p.number}>
                <div className="card-top">
                  <span className="mono">PATENT</span>
                  <span className={`chip ${p.status === 'Verified' ? 'ok' : 'pending'}`}>
                    {p.status === 'Verified' ? '✓ Verified' : '⏳ Pending'}
                  </span>
                </div>
                <h2>{p.title}</h2>
                <p className="mono muted">{p.number}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
