export default function AdminPublicationsPage() {
  const pubs = [
    { title: 'AI-Based Smart Campus: A Framework for Adaptive Learning', doi: '10.0000/smart-campus.2026', author: 'Dr. Ananya Patel', status: 'Verified' },
    { title: 'Federated learning for education systems', doi: '10.0000/fed-edu.2025', author: 'Prof. R. Mehta', status: 'Pending review' },
    { title: 'Neural architecture search for edge devices', doi: '10.0000/nas-edge.2026', author: 'Dr. S. Kumar', status: 'Pending review' },
  ];
  return (
    <div>
      <section className="page-hero">
        <div className="wrap">
          <p className="eyebrow mono">UNIVERSITY ADMIN · PUBLICATIONS</p>
          <h1>Publication review queue</h1>
          <p className="lede">Review, verify or return submitted publications.</p>
          <div className="filter-row">
            <select className="filter-select">
              <option>All statuses</option>
              <option>Pending review</option>
              <option>Verified</option>
              <option>Returned</option>
            </select>
          </div>
        </div>
      </section>
      <section>
        <div className="wrap">
          <div className="publication-list">
            {pubs.map((p) => (
              <div className="publication-card" key={p.doi}>
                <div className="card-top">
                  <span className="mono">PUBLICATION</span>
                  <span className={`chip ${p.status === 'Verified' ? 'ok' : 'pending'}`}>
                    {p.status === 'Verified' ? '✓ Verified' : '◔ Pending review'}
                  </span>
                </div>
                <h2>{p.title}</h2>
                <p>{p.author}</p>
                <p className="mono muted">{p.doi}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
