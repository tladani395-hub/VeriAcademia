export default function PlatformBackupsPage() {
  const backups = [
    { date: '2026-09-28 03:00', size: '2.4 GB', type: 'Full', status: 'Completed' },
    { date: '2026-09-27 03:00', size: '2.3 GB', type: 'Full', status: 'Completed' },
    { date: '2026-09-26 03:00', size: '2.3 GB', type: 'Full', status: 'Completed' },
    { date: '2026-09-25 03:00', size: '2.2 GB', type: 'Full', status: 'Completed' },
  ];
  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <p className="eyebrow mono">PLATFORM ADMIN · BACKUPS</p>
          <h1>Backup management</h1>
          <p className="lede">Review backup history and schedule.</p>
        </div>
      </section>
      <section>
        <div className="wrap">
          <div className="research-card">
            <h3>Schedule</h3>
            <p>Full database backup runs daily at <span className="mono">03:00 UTC</span>.</p>
            <p className="muted">Retention: 30 days. Storage: S3-compatible object storage.</p>
          </div>
          <div className="publication-list" style={{ marginTop: 24 }}>
            {backups.map((b, i) => (
              <div className="publication-card" key={i}>
                <div className="card-top">
                  <span className="mono">{b.date}</span>
                  <span className="chip ok">✓ {b.status}</span>
                </div>
                <h2>{b.type} backup</h2>
                <p className="muted">{b.size}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
