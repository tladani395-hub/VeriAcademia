import { StatusChip } from '@/components/StatusChip';

export default function UniversityOverviewPage() {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 32 }}>
        <div>
          <h1 style={{ fontSize: 'clamp(28px, 4vw, 36px)', margin: '0 0 12px' }}>University Admin Overview</h1>
          <p className="muted" style={{ margin: 0 }}>Manage charusat-university&apos;s research profiles, verifications, and platform settings.</p>
        </div>
        <StatusChip type="ok" label="Verified Institution" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24, marginBottom: 40 }}>
        <div className="research-card" style={{ padding: 24, textAlign: 'center' }}>
          <b style={{ display: 'block', fontSize: 36, color: 'var(--brand)', marginBottom: 8 }}>42</b>
          <span className="muted" style={{ fontWeight: 600 }}>Verification Tasks</span>
        </div>
        <div className="research-card" style={{ padding: 24, textAlign: 'center' }}>
          <b style={{ display: 'block', fontSize: 36, color: 'var(--brand)', marginBottom: 8 }}>1,284</b>
          <span className="muted" style={{ fontWeight: 600 }}>Researchers</span>
        </div>
        <div className="research-card" style={{ padding: 24, textAlign: 'center' }}>
          <b style={{ display: 'block', fontSize: 36, color: 'var(--brand)', marginBottom: 8 }}>8,421</b>
          <span className="muted" style={{ fontWeight: 600 }}>Publications</span>
        </div>
        <div className="research-card" style={{ padding: 24, textAlign: 'center' }}>
          <b style={{ display: 'block', fontSize: 36, color: 'var(--brand)', marginBottom: 8 }}>12</b>
          <span className="muted" style={{ fontWeight: 600 }}>Pending Access</span>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 24 }}>
        <div className="research-card">
          <h3 style={{ margin: '0 0 20px' }}>Recent Verification Queue</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 16, borderBottom: '1px solid var(--line)' }}>
              <div>
                <p style={{ margin: '0 0 4px', fontWeight: 600 }}>Researcher Registration: Dr. Amit Patel</p>
                <p className="muted" style={{ margin: 0, fontSize: 14 }}>Department of Computer Engineering</p>
              </div>
              <button className="btn primary" style={{ minHeight: 32, padding: '4px 12px', fontSize: 13 }}>Review</button>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 16, borderBottom: '1px solid var(--line)' }}>
              <div>
                <p style={{ margin: '0 0 4px', fontWeight: 600 }}>Publication Upload: &quot;Novel NLP Architectures&quot;</p>
                <p className="muted" style={{ margin: 0, fontSize: 14 }}>Submitted by Dr. R. Mehta</p>
              </div>
              <button className="btn primary" style={{ minHeight: 32, padding: '4px 12px', fontSize: 13 }}>Review</button>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <p style={{ margin: '0 0 4px', fontWeight: 600 }}>Access Request: req-889</p>
                <p className="muted" style={{ margin: 0, fontSize: 14 }}>MIT researcher requesting protected data file.</p>
              </div>
              <button className="btn primary" style={{ minHeight: 32, padding: '4px 12px', fontSize: 13 }}>Review</button>
            </div>
          </div>
        </div>

        <div className="research-card">
          <h3 style={{ margin: '0 0 20px' }}>System Health</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                <span style={{ fontWeight: 600, fontSize: 14 }}>Domain Ownership (.edu.in)</span>
                <span className="chip ok" style={{ fontSize: 11 }}>Valid</span>
              </div>
            </div>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                <span style={{ fontWeight: 600, fontSize: 14 }}>Identity Provider (SAML)</span>
                <span className="chip ok" style={{ fontSize: 11 }}>Syncing</span>
              </div>
            </div>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                <span style={{ fontWeight: 600, fontSize: 14 }}>Storage Quota</span>
                <span className="mono" style={{ fontSize: 12 }}>42%</span>
              </div>
              <div style={{ width: '100%', height: 6, background: 'var(--line)', borderRadius: 3 }}>
                <div style={{ width: '42%', height: '100%', background: 'var(--brand)', borderRadius: 3 }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
