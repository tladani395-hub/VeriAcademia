export default function PlatformAuditPage() {
  const logs = [
    { ts: '2026-09-28 15:01', actor: 'Platform', action: 'University application received', target: 'Seoul National University', result: 'Created' },
    { ts: '2026-09-28 14:32', actor: 'Dr. Ananya Patel', action: 'Publication submitted', target: '10.0000/smart-campus.2026', result: 'Created' },
    { ts: '2026-09-27 11:05', actor: 'Platform', action: 'Domain re-verified', target: 'charusat.edu', result: 'Confirmed' },
    { ts: '2026-09-26 09:18', actor: 'Prof. R. Mehta', action: 'Access request approved', target: 'Dr. Mira Chen', result: 'Granted' },
    { ts: '2026-09-25 16:44', actor: 'Admin', action: 'Backup completed', target: 'Full database', result: 'Success' },
    { ts: '2026-09-24 08:30', actor: 'Platform', action: 'Rate limit triggered', target: '203.0.113.42', result: 'Blocked' },
  ];
  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <p className="eyebrow mono">PLATFORM ADMIN · AUDIT</p>
          <h1>Platform audit log</h1>
          <p className="lede">Immutable record of all platform-wide state-changing operations.</p>
        </div>
      </section>
      <section>
        <div className="wrap">
          <div className="publication-list">
            {logs.map((l, i) => (
              <div className="publication-card" key={i}>
                <div className="card-top">
                  <span className="mono">{l.ts}</span>
                  <span className="chip ok">{l.result}</span>
                </div>
                <h2>{l.action}</h2>
                <p>{l.actor} → <span className="mono">{l.target}</span></p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
