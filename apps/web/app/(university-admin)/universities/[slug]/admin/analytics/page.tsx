export default function AdminAnalyticsPage() {
  const metrics = [
    ['1,284', 'Researchers'], ['8,421', 'Publications'], ['346', 'Patents'],
    ['214', 'Access grants'],
  ];
  return (
    <div>
      <section className="page-hero">
        <div className="wrap">
          <p className="eyebrow mono">UNIVERSITY ADMIN · ANALYTICS</p>
          <h1>University analytics</h1>
          <p className="lede">Research activity, output trends and access metrics for this institution.</p>
        </div>
      </section>
      <section>
        <div className="wrap">
          <div className="metric-grid">
            {metrics.map(([v, l]) => (
              <div className="metric-card" key={l}><b>{v}</b><span>{l}</span></div>
            ))}
          </div>
          <div className="analytics-grid" style={{ marginTop: 24 }}>
            <div className="chart-card">
              <span className="mono">PUBLICATIONS BY YEAR</span>
              <div className="bars">
                {[32, 48, 55, 62, 78, 100].map((h, i) => (
                  <div className="bar-wrap" key={i}>
                    <div className="bar" style={{ height: `${h}%` }} />
                    <small>{2021 + i}</small>
                  </div>
                ))}
              </div>
            </div>
            <div className="chart-card">
              <span className="mono">TOP RESEARCH AREAS</span>
              <div className="area-list">
                <p><span>Artificial Intelligence</span><b style={{ width: '88%' }} /></p>
                <p><span>Signal Processing</span><b style={{ width: '62%' }} /></p>
                <p><span>Data Science</span><b style={{ width: '45%' }} /></p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
