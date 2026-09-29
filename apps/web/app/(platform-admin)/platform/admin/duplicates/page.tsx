export default function PlatformDuplicatesPage() {
  const candidates = [
    { type: 'Publication', a: 'AI-Based Smart Campus (10.0000/smart-campus.2026)', b: 'Smart Campus AI Framework (10.0000/sc-ai.2026)', confidence: '92%' },
    { type: 'Researcher', a: 'Dr. A. Patel (CHARUSAT)', b: 'Ananya Patel (charusat.ac.in)', confidence: '88%' },
  ];
  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <p className="eyebrow mono">PLATFORM ADMIN · DUPLICATES</p>
          <h1>Duplicate detection</h1>
          <p className="lede">Review potential duplicate records flagged by the platform.</p>
        </div>
      </section>
      <section>
        <div className="wrap">
          {candidates.length === 0 ? (
            <div className="research-card"><p className="muted">No duplicates detected.</p></div>
          ) : (
            <div className="publication-list">
              {candidates.map((c, i) => (
                <div className="publication-card" key={i}>
                  <div className="card-top">
                    <span className="mono">{c.type.toUpperCase()}</span>
                    <span className="chip pending">◔ {c.confidence} match</span>
                  </div>
                  <h2>Potential duplicate</h2>
                  <p><b>A:</b> {c.a}</p>
                  <p><b>B:</b> {c.b}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
