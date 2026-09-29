import Link from 'next/link';
import { StatusChip } from '@/components/StatusChip';

export default function MyPatentsPage() {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 32 }}>
        <div>
          <h1 style={{ fontSize: 'clamp(28px, 4vw, 36px)', margin: '0 0 12px' }}>My Patents</h1>
          <p className="muted" style={{ margin: 0 }}>Manage your patent records and verification status.</p>
        </div>
        <button className="btn primary">Submit New Patent</button>
      </div>
      
      <div className="research-card">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          
          <div style={{ padding: 16, border: '1px solid var(--line)', borderRadius: 8 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
              <span className="mono" style={{ color: 'var(--muted)' }}>US-2026-0192834-A1</span>
              <StatusChip type="ok" label="Verified" />
            </div>
            <h3 style={{ fontSize: 20, margin: '0 0 8px' }}>Multi-Tenant Cryptographic Verification Protocol for Institutional Research Records</h3>
            <p className="muted" style={{ margin: '0 0 16px' }}>Software Security & Cryptography · Granted: 10 Aug 2026</p>
            <div style={{ display: 'flex', gap: 12 }}>
              <Link href="/patents/pat-01" className="btn" style={{ minHeight: 36, fontSize: 14 }}>View Public Record</Link>
            </div>
          </div>

          <div style={{ padding: 16, border: '1px solid var(--line)', borderRadius: 8 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
              <span className="mono" style={{ color: 'var(--muted)' }}>IN-2025-4100982-B2</span>
              <StatusChip type="ok" label="Verified" />
            </div>
            <h3 style={{ fontSize: 20, margin: '0 0 8px' }}>Low-Power Hydro-Acoustic Ground Sensor Array for Sub-surface Flow Tracking</h3>
            <p className="muted" style={{ margin: '0 0 16px' }}>Environmental Hardware Sensors · Granted: 20 Jan 2026</p>
            <div style={{ display: 'flex', gap: 12 }}>
              <Link href="/patents/pat-02" className="btn" style={{ minHeight: 36, fontSize: 14 }}>View Public Record</Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
