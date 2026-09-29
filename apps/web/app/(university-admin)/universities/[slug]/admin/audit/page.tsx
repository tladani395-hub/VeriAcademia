export default function AdminAuditPage() {
  const logs = [
    { ts: '2026-09-28 14:32', actor: 'Dr. Ananya Patel', action: 'Submitted publication', target: '10.0000/smart-campus.2026', result: 'Created' },
    { ts: '2026-09-27 11:05', actor: 'Platform', action: 'Domain re-verified', target: 'charusat.edu', result: 'Confirmed' },
    { ts: '2026-09-26 09:18', actor: 'Prof. R. Mehta', action: 'Approved access request', target: 'Dr. Mira Chen', result: 'Granted' },
    { ts: '2026-09-25 16:44', actor: 'Dr. Ananya Patel', action: 'Updated profile', target: 'CHARUSAT University', result: 'Modified' },
    { ts: '2026-09-24 08:30', actor: 'Platform', action: 'Membership invitation sent', target: 'pshah@charusat.ac.in', result: 'Sent' },
  ];
  return (
    <div>
      <section className="page-hero">
        <div className="wrap">
          <p className="eyebrow mono">UNIVERSITY ADMIN · AUDIT</p>
          <h1>Audit log</h1>
          <p className="lede">Immutable record of all state-changing operations for this institution.</p>
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
    </div>
  );
}
