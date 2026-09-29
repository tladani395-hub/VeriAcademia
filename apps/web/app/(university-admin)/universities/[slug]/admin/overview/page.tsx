export default function AdminOverviewPage() {
  const metrics = [
    ['1,284', 'Researchers'], ['8,421', 'Publications'], ['346', 'Patents'],
    ['12', 'Pending reviews'], ['3', 'Verified domains'], ['96', 'Members'],
  ];
  return (
    <div>
      <section className="page-hero">
        <div className="wrap">
          <p className="eyebrow mono">UNIVERSITY ADMIN · OVERVIEW</p>
          <h1>CHARUSAT University</h1>
          <p className="lede">Institution overview and key metrics at a glance.</p>
        </div>
      </section>
      <section>
        <div className="wrap">
          <div className="metric-grid">
            {metrics.map(([v, l]) => (
              <div className="metric-card" key={l}><b>{v}</b><span>{l}</span></div>
            ))}
          </div>
          <div className="research-card" style={{ marginTop: 24 }}>
            <h3>Recent activity</h3>
            <table style={{ width: '100%' }}>
              <tbody>
                <tr><td className="mono muted">2026-09-28</td><td>Dr. Ananya Patel submitted a new publication</td></tr>
                <tr><td className="mono muted">2026-09-27</td><td>Domain charusat.edu re-verified</td></tr>
                <tr><td className="mono muted">2026-09-25</td><td>2 access requests approved</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}
