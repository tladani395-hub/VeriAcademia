export default function PlatformDomainsPage() {
  const domains = [
    { domain: 'newuni.edu.sg', university: 'National University of Singapore', status: 'Pending', submitted: '2026-09-27' },
    { domain: 'research.ox.ac.uk', university: 'Oxford Research Labs', status: 'Pending', submitted: '2026-09-25' },
    { domain: 'charusat.ac.in', university: 'CHARUSAT University', status: 'Verified', submitted: '2025-11-02' },
  ];
  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <p className="eyebrow mono">PLATFORM ADMIN · DOMAINS</p>
          <h1>Domain verification queue</h1>
          <p className="lede">Review and approve institutional domain ownership claims.</p>
        </div>
      </section>
      <section>
        <div className="wrap">
          <div className="publication-list">
            {domains.map((d) => (
              <div className="publication-card" key={d.domain}>
                <div className="card-top">
                  <span className="mono">{d.submitted}</span>
                  <span className={`chip ${d.status === 'Verified' ? 'ok' : 'pending'}`}>
                    {d.status === 'Verified' ? '✓ Verified' : '◔ Pending'}
                  </span>
                </div>
                <h2 className="mono">{d.domain}</h2>
                <p>{d.university}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
