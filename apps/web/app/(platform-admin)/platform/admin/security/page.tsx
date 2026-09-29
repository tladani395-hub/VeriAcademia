export default function PlatformSecurityPage() {
  const metrics = [
    ['0', 'Active incidents'], ['2,184', 'Blocked requests (30d)'], ['48', 'Rate-limited IPs (30d)'],
    ['312', 'Failed logins (30d)'],
  ];
  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <p className="eyebrow mono">PLATFORM ADMIN · SECURITY</p>
          <h1>Security overview</h1>
          <p className="lede">Monitor threats, rate limits and authentication activity.</p>
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
            <h3>Security controls</h3>
            <table style={{ width: '100%' }}>
              <tbody>
                <tr><td>CSRF protection</td><td className="chip ok">✓ Active</td></tr>
                <tr><td>Rate limiting</td><td className="chip ok">✓ Active</td></tr>
                <tr><td>Secure headers</td><td className="chip ok">✓ Active</td></tr>
                <tr><td>File scanning</td><td className="chip ok">✓ Active</td></tr>
                <tr><td>Signed URLs</td><td className="chip ok">✓ Active</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
}
