import Link from 'next/link';

export default function AccessRequestsPage() {
  const reqs = [
    { title: 'Groundwater recovery in semi-arid basins', doi: '10.0000/groundwater.2026', status: 'Request required' },
    { title: 'Privacy-preserving model training system', doi: '10.0000/trust-ml.2025', status: 'Request required' },
  ];

  return (
    <div>
      <section className="page-hero">
        <div className="wrap">
          <p className="eyebrow mono">ACCESS REQUESTS</p>
          <h1>Access requests</h1>
          <p className="lede">Track your requests for protected publications and patents.</p>
        </div>
      </section>
      <section>
        <div className="wrap">
          <div className="publication-list">
            {reqs.map((r) => (
              <Link className="publication-card" href={`/publications/${r.doi}`} key={r.doi}>
                <div className="card-top">
                  <span className="mono">REQUEST</span>
                  <span className="chip request">📋 {r.status}</span>
                </div>
                <h2>{r.title}</h2>
                <p className="mono muted">{r.doi}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
