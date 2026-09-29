export default function AdminAccessRequestsPage() {
  const requests = [
    { requester: 'Dr. Mira Chen', email: 'mchen@northbridge.ac.uk', resource: 'Smart Campus paper (full text)', date: '2026-09-26', status: 'Pending' },
    { requester: 'Prof. James Okafor', email: 'jokafor@example.edu', resource: 'Signal processing patent (claims)', date: '2026-09-24', status: 'Pending' },
    { requester: 'Dr. L. Zhang', email: 'lzhang@example.edu', resource: 'Federated learning dataset', date: '2026-09-20', status: 'Approved' },
  ];
  return (
    <div>
      <section className="page-hero">
        <div className="wrap">
          <p className="eyebrow mono">UNIVERSITY ADMIN · ACCESS REQUESTS</p>
          <h1>Incoming access requests</h1>
          <p className="lede">Review and respond to requests for protected resources.</p>
        </div>
      </section>
      <section>
        <div className="wrap">
          <div className="publication-list">
            {requests.map((r) => (
              <div className="publication-card" key={r.email + r.resource}>
                <div className="card-top">
                  <span className="mono">REQUEST · {r.date}</span>
                  <span className={`chip ${r.status === 'Approved' ? 'ok' : 'pending'}`}>
                    {r.status === 'Approved' ? '✓ Approved' : '◔ Pending'}
                  </span>
                </div>
                <h2>{r.resource}</h2>
                <p>{r.requester}</p>
                <p className="mono muted">{r.email}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
