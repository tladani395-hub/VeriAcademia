export default function AdminPatentsPage() {
  const patents = [
    { title: 'Adaptive signal processing for smart learning environments', number: 'US-2026-01284', inventor: 'Dr. Ananya Patel', status: 'Verified' },
    { title: 'IoT-based campus monitoring system', number: 'IN-2026-00412', inventor: 'Prof. R. Mehta', status: 'Pending review' },
  ];
  return (
    <div>
      <section className="page-hero">
        <div className="wrap">
          <p className="eyebrow mono">UNIVERSITY ADMIN · PATENTS</p>
          <h1>Patent review queue</h1>
          <p className="lede">Review and verify submitted patent records.</p>
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
            {patents.map((p) => (
              <div className="publication-card" key={p.number}>
                <div className="card-top">
                  <span className="mono">PATENT</span>
                  <span className={`chip ${p.status === 'Verified' ? 'ok' : 'pending'}`}>
                    {p.status === 'Verified' ? '✓ Verified' : '◔ Pending review'}
                  </span>
                </div>
                <h2>{p.title}</h2>
                <p>{p.inventor}</p>
                <p className="mono muted">{p.number}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
