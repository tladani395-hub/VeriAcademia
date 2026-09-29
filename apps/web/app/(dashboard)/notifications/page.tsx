export default function NotificationsPage() {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 32 }}>
        <h1 style={{ fontSize: 'clamp(28px, 4vw, 36px)', margin: 0 }}>Notifications</h1>
        <button className="btn" style={{ minHeight: 36, fontSize: 14 }}>Mark all as read</button>
      </div>
      
      <div className="research-card" style={{ padding: 0, overflow: 'hidden' }}>
        
        <div style={{ padding: 24, borderBottom: '1px solid var(--line)', background: 'color-mix(in srgb, var(--brand) 5%, transparent)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
            <span className="eyebrow mono">VERIFICATION</span>
            <span className="mono" style={{ fontSize: 13, color: 'var(--muted)' }}>28 Sep 2026, 14:30</span>
          </div>
          <h3 style={{ fontSize: 18, margin: '0 0 8px' }}>Publication Verified</h3>
          <p className="muted" style={{ margin: 0 }}>
            Your publication &quot;AI-Based Smart Campus Infrastructure&quot; was verified by the CHARUSAT Research Administrator. It is now publicly accessible.
          </p>
        </div>

        <div style={{ padding: 24, borderBottom: '1px solid var(--line)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
            <span className="eyebrow mono" style={{ color: 'var(--gold)' }}>ACCESS REQUEST</span>
            <span className="mono" style={{ fontSize: 13, color: 'var(--muted)' }}>26 Sep 2026, 09:15</span>
          </div>
          <h3 style={{ fontSize: 18, margin: '0 0 8px' }}>Access Granted</h3>
          <p className="muted" style={{ margin: 0 }}>
            Your request to access &quot;Fault-Tolerant Superconducting Quantum Logic Circuits&quot; was approved. You have access for 30 days.
          </p>
        </div>

      </div>
    </div>
  );
}
