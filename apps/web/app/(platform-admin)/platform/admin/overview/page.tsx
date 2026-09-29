export default function PlatformOverviewPage() {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 32 }}>
        <div>
          <h1 style={{ fontSize: 'clamp(28px, 4vw, 36px)', margin: '0 0 12px' }}>Platform Admin Overview</h1>
          <p className="muted" style={{ margin: 0 }}>Super-user dashboard for the entire VeriAcademia instance.</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24, marginBottom: 40 }}>
        <div className="research-card" style={{ padding: 24, textAlign: 'center' }}>
          <b style={{ display: 'block', fontSize: 36, color: 'var(--brand)', marginBottom: 8 }}>2</b>
          <span className="muted" style={{ fontWeight: 600 }}>Universities Pending Verification</span>
        </div>
        <div className="research-card" style={{ padding: 24, textAlign: 'center' }}>
          <b style={{ display: 'block', fontSize: 36, color: 'var(--brand)', marginBottom: 8 }}>48</b>
          <span className="muted" style={{ fontWeight: 600 }}>Active Universities</span>
        </div>
        <div className="research-card" style={{ padding: 24, textAlign: 'center' }}>
          <b style={{ display: 'block', fontSize: 36, color: 'var(--brand)', marginBottom: 8 }}>14M</b>
          <span className="muted" style={{ fontWeight: 600 }}>Total Records</span>
        </div>
        <div className="research-card" style={{ padding: 24, textAlign: 'center' }}>
          <b style={{ display: 'block', fontSize: 36, color: 'var(--brand)', marginBottom: 8 }}>0</b>
          <span className="muted" style={{ fontWeight: 600 }}>Security Alerts</span>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 24 }}>
        <div className="research-card">
          <h3 style={{ margin: '0 0 20px' }}>Global Verification Queue</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 16, borderBottom: '1px solid var(--line)' }}>
              <div>
                <p style={{ margin: '0 0 4px', fontWeight: 600 }}>University Application: Pacific Research University</p>
                <p className="muted" style={{ margin: 0, fontSize: 14 }}>Waiting for domain verification evidence.</p>
              </div>
              <button className="btn primary" style={{ minHeight: 32, padding: '4px 12px', fontSize: 13 }}>Review</button>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 16, borderBottom: '1px solid var(--line)' }}>
              <div>
                <p style={{ margin: '0 0 4px', fontWeight: 600 }}>Duplicate Profile Resolution</p>
                <p className="muted" style={{ margin: 0, fontSize: 14 }}>Possible duplicate: Dr. John Smith (MIT) and Dr. J. Smith (Stanford)</p>
              </div>
              <button className="btn primary" style={{ minHeight: 32, padding: '4px 12px', fontSize: 13 }}>Review</button>
            </div>
          </div>
        </div>

        <div className="research-card">
          <h3 style={{ margin: '0 0 20px' }}>Infrastructure</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                <span style={{ fontWeight: 600, fontSize: 14 }}>PostgreSQL Primary</span>
                <span className="chip ok" style={{ fontSize: 11 }}>Healthy</span>
              </div>
            </div>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                <span style={{ fontWeight: 600, fontSize: 14 }}>Redis Cache</span>
                <span className="chip ok" style={{ fontSize: 11 }}>Healthy</span>
              </div>
            </div>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                <span style={{ fontWeight: 600, fontSize: 14 }}>S3 Object Storage</span>
                <span className="chip ok" style={{ fontSize: 11 }}>Healthy</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
