import Link from 'next/link';
import { StatusChip } from '@/components/StatusChip';

export default function AccessRequestsPage() {
  return (
    <div>
      <h1 style={{ fontSize: 'clamp(28px, 4vw, 36px)', margin: '0 0 12px' }}>Access Requests</h1>
      <p className="muted" style={{ margin: '0 0 32px' }}>Track your requests for protected academic resources.</p>
      
      <div className="research-card">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          
          <div style={{ padding: 16, border: '1px solid var(--line)', borderRadius: 8 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
              <span className="mono" style={{ color: 'var(--muted)' }}>REQUEST: req-101</span>
              <StatusChip type="ok" label="Approved" />
            </div>
            <h3 style={{ fontSize: 20, margin: '0 0 8px' }}>Groundwater recovery in semi-arid basins</h3>
            <p className="muted" style={{ margin: '0 0 16px' }}>Purpose: Academic Research</p>
            <div style={{ padding: '12px 16px', background: 'var(--paper)', borderRadius: 6, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <p style={{ margin: '0 0 4px', fontWeight: 600 }}>Access Granted</p>
                <p className="muted" style={{ margin: 0, fontSize: 13 }}>Expires: 28 Oct 2026</p>
              </div>
              <button className="btn primary" style={{ minHeight: 36, fontSize: 14 }}>Download PDF</button>
            </div>
          </div>

          <div style={{ padding: 16, border: '1px solid var(--line)', borderRadius: 8 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
              <span className="mono" style={{ color: 'var(--muted)' }}>REQUEST: req-102</span>
              <StatusChip type="pend" label="Pending" />
            </div>
            <h3 style={{ fontSize: 20, margin: '0 0 8px' }}>Fault-Tolerant Superconducting Quantum Logic Circuits</h3>
            <p className="muted" style={{ margin: '0 0 16px' }}>Purpose: Institutional Research</p>
            <div style={{ padding: '12px 16px', background: 'var(--paper)', borderRadius: 6 }}>
              <p style={{ margin: 0, fontSize: 14 }} className="muted">Waiting for review by MIT Office of Sponsored Research.</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
