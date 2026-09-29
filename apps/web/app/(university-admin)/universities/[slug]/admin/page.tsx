export default function UniversityAdminPage() {
  return (
    <div>
      <section className="page-hero">
        <div className="wrap">
          <p className="eyebrow mono">UNIVERSITY ADMIN</p>
          <h1>CHARUSAT University</h1>
          <p className="lede">Manage this institution&#39;s records, members and verification.</p>
        </div>
      </section>
      <section>
        <div className="wrap">
          <div className="metric-grid">
            <div className="metric-card"><b>1,284</b><span>Researchers</span></div>
            <div className="metric-card"><b>8,421</b><span>Publications</span></div>
            <div className="metric-card"><b>346</b><span>Patents</span></div>
            <div className="metric-card"><span className="chip ok">✓ Verified</span></div>
          </div>
          <div className="card-top" style={{ marginTop: 24 }}>
            <h3>Quick actions</h3>
            <p className="muted">Add researchers, submit publications, review access requests, and manage domains from the sidebar.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
