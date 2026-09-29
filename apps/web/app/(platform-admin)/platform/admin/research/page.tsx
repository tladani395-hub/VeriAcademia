export default function PlatformResearchPage() {
  const metrics = [
    ['84,921', 'Publications'], ['6,342', 'Patents'], ['12,482', 'Researchers'],
    ['1,204', 'Pending reviews'],
  ];
  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <p className="eyebrow mono">PLATFORM ADMIN · RESEARCH</p>
          <h1>Research records</h1>
          <p className="lede">Platform-wide oversight of publications, patents and researcher profiles.</p>
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
            <h3>Flagged records</h3>
            <p className="muted">No flagged records at this time. Records with missing affiliations or conflicting metadata will appear here.</p>
          </div>
        </div>
      </section>
    </>
  );
}
