export default function DashboardPage() {
  const items = [['12', 'Publications'], ['4', 'Patents'], ['3', 'Pending reviews'], ['1', 'Access granted']];
  return (
    <div>
      <section className="page-hero">
        <div className="wrap">
          <p className="eyebrow mono">DASHBOARD</p>
          <h1>Your research workspace</h1>
          <p className="lede">Overview of your activity, submissions and requests.</p>
        </div>
      </section>
      <section>
        <div className="wrap">
          <div className="metric-grid">
            {items.map(([v, l]) => (
              <div className="metric-card" key={l}>
                <b>{v}</b>
                <span>{l}</span>
              </div>
            ))}
          </div>
          <div className="card-top" style={{ marginTop: 24 }}>
            <h3>Recent activity</h3>
            <p className="muted">No recent activity yet. Submit publications or request access to get started.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
