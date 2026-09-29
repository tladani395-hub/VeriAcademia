import Link from 'next/link';
import { StatusChip } from '@/components/StatusChip';

export default function DashboardOverviewPage() {
  return (
    <div>
      {/* Top Banner Header */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 16,
          marginBottom: 32,
        }}
      >
        <div>
          <p className="eyebrow mono" style={{ marginBottom: 4 }}>RESEARCH WORKSPACE</p>
          <h1 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', margin: 0, fontFamily: 'var(--display)' }}>
            Welcome back, Dr. Tirth Ladani
          </h1>
        </div>

        <div style={{ display: 'flex', gap: 12 }}>
          <Link href="/researcher/publications/new" className="btn primary">
            + New Publication
          </Link>
          <Link href="/universities/charusat/admin" className="btn">
            Admin Portal
          </Link>
        </div>
      </div>

      {/* Grid of Key Metric 3D Glass Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24, marginBottom: 36 }}>
        {/* Card 1: Institution */}
        <div
          className="research-card"
          style={{
            position: 'relative',
            overflow: 'hidden',
            borderTop: '4px solid var(--brand)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
            <span className="eyebrow mono">PRIMARY AFFILIATION</span>
            <StatusChip type="ok" label="Verified Domain" />
          </div>
          <h3 style={{ fontSize: 20, margin: '0 0 6px', fontWeight: 700 }}>
            Charotar University of Science & Tech
          </h3>
          <p className="muted" style={{ fontSize: 14, margin: '0 0 16px' }}>
            Faculty of Technology & Engineering · CS Department
          </p>
          <div className="mono" style={{ fontSize: 12, color: 'var(--brand)', background: 'var(--paper)', padding: '6px 10px', borderRadius: 6 }}>
            Domain Key: charusat.edu.in
          </div>
        </div>

        {/* Card 2: Metrics */}
        <div
          className="research-card"
          style={{
            position: 'relative',
            overflow: 'hidden',
            borderTop: '4px solid var(--gold)',
          }}
        >
          <span className="eyebrow mono" style={{ display: 'block', marginBottom: 12 }}>RESEARCH OUTPUT</span>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, textAlign: 'center' }}>
            <div style={{ background: 'var(--paper)', padding: 12, borderRadius: 10 }}>
              <b style={{ display: 'block', fontSize: 26, color: 'var(--brand)', fontFamily: 'var(--display)' }}>12</b>
              <span className="mono" style={{ fontSize: 11, color: 'var(--muted)' }}>PAPERS</span>
            </div>
            <div style={{ background: 'var(--paper)', padding: 12, borderRadius: 10 }}>
              <b style={{ display: 'block', fontSize: 26, color: 'var(--gold)', fontFamily: 'var(--display)' }}>2</b>
              <span className="mono" style={{ fontSize: 11, color: 'var(--muted)' }}>PATENTS</span>
            </div>
            <div style={{ background: 'var(--paper)', padding: 12, borderRadius: 10 }}>
              <b style={{ display: 'block', fontSize: 26, color: 'var(--success)', fontFamily: 'var(--display)' }}>483</b>
              <span className="mono" style={{ fontSize: 11, color: 'var(--muted)' }}>CITATIONS</span>
            </div>
          </div>
        </div>

        {/* Card 3: Trust Score */}
        <div
          className="research-card"
          style={{
            position: 'relative',
            overflow: 'hidden',
            borderTop: '4px solid var(--success)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <span className="eyebrow mono">PROVENANCE SCORE</span>
            <span className="mono" style={{ fontSize: 13, color: 'var(--success)', fontWeight: 700 }}>100/100</span>
          </div>
          <h3 style={{ fontSize: 24, margin: '0 0 6px', color: 'var(--success)' }}>
            Cryptographically Clean
          </h3>
          <p className="muted" style={{ fontSize: 14, margin: 0 }}>
            All 14 linked evidence files pass institutional SHA-256 validation.
          </p>
        </div>
      </div>

      {/* Activity & Verification Stream */}
      <div className="research-card" style={{ padding: 32 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
          <h2 style={{ fontSize: 22, margin: 0, fontFamily: 'var(--display)' }}>Institutional Activity Stream</h2>
          <span className="mono" style={{ fontSize: 13, color: 'var(--brand)' }}>Live Audit Trail</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start', paddingBottom: 18, borderBottom: '1px solid var(--line)' }}>
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: 'var(--success)', marginTop: 6, flexShrink: 0 }} />
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <strong style={{ fontSize: 16 }}>Publication Evidence Verified</strong>
                <span className="mono" style={{ fontSize: 12.5, color: 'var(--muted)' }}>28 Sep 2026</span>
              </div>
              <p className="muted" style={{ margin: '4px 0 0', fontSize: 14 }}>
                &quot;Groundwater Recovery & AI Sensor Networks&quot; was verified by CHARUSAT Department Reviewer.
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start', paddingBottom: 18, borderBottom: '1px solid var(--line)' }}>
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: 'var(--gold)', marginTop: 6, flexShrink: 0 }} />
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <strong style={{ fontSize: 16 }}>Patent Peer Review in Progress</strong>
                <span className="mono" style={{ fontSize: 12.5, color: 'var(--muted)' }}>27 Sep 2026</span>
              </div>
              <p className="muted" style={{ margin: '4px 0 0', fontSize: 14 }}>
                &quot;Multi-Tenant Cryptographic Verification Protocol&quot; submitted to platform registrar queue.
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: 'var(--success)', marginTop: 6, flexShrink: 0 }} />
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <strong style={{ fontSize: 16 }}>Institutional Role Assigned</strong>
                <span className="mono" style={{ fontSize: 12.5, color: 'var(--muted)' }}>20 Sep 2026</span>
              </div>
              <p className="muted" style={{ margin: '4px 0 0', fontSize: 14 }}>
                Granted UniversityAdmin rights for CHARUSAT domain (charusat.edu.in).
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
