import Link from 'next/link';

export default function MyPublicationsPage() {
  const pubs = [
    { title: 'AI-Based Smart Campus: A Framework for Adaptive Learning', doi: '10.0000/smart-campus.2026', status: 'Verified' },
    { title: 'Federated learning for education', doi: '10.0000/fed-edu.2025', status: 'Pending review' },
  ];

  return (
    <div>
      <section className="page-hero">
        <div className="wrap">
          <p className="eyebrow mono">PUBLICATIONS</p>
          <h1>My publications</h1>
          <p className="lede">Track and manage your submitted publications.</p>
        </div>
      </section>
      <section>
        <div className="wrap">
          <div className="publication-list">
            {pubs.map((p) => (
              <Link className="publication-card" href={`/publications/${p.doi}`} key={p.doi}>
                <div className="card-top">
                  <span className="mono">PUBLICATION</span>
                  <span className={`chip ${p.status === 'Verified' ? 'ok' : 'pending'}`}>
                    {p.status === 'Verified' ? '✓ Verified' : '⏳ Pending'}
                  </span>
                </div>
                <h2>{p.title}</h2>
                <p className="mono muted">{p.doi}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
