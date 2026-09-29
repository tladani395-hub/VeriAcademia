export default function PublicAnalyticsPage() {
  return (
    <div className="wrap" style={{ padding: '80px 0' }}>
      <header style={{ marginBottom: 40, textAlign: 'center' }}>
        <h1 style={{ fontSize: 'clamp(2.5rem, 4vw, 3.5rem)' }}>Platform Analytics</h1>
        <p className="lede" style={{ fontSize: 1.25, maxWidth: 700, margin: '16px auto 0' }}>
          Real-time visibility into the growth of academic knowledge being fostered and discovered on VeriAcademia.
        </p>
      </header>

      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24, marginBottom: 60 }}>
        {[
          { label: 'Total Publications', value: '1,280+' },
          { label: 'Active Researchers', value: '450+' },
          { label: 'Member Institutions', value: '25+' },
          { label: 'Patents Filed', value: '185+' },
        ].map(stat => (
          <div key={stat.label} style={{ background: 'var(--surface)', padding: 32, borderRadius: 16, border: '1px solid var(--line)', textAlign: 'center' }}>
            <div style={{ fontSize: 18, fontWeight: 600, color: 'var(--muted)', marginBottom: 12 }}>{stat.label}</div>
            <div style={{ fontSize: 40, fontWeight: 700, color: 'var(--brand)' }}>{stat.value}</div>
          </div>
        ))}
      </section>

      <section style={{ background: 'var(--surface)', padding: 40, borderRadius: 16, border: '1px solid var(--line)' }}>
        <h2>Research Area Distribution</h2>
        <div style={{ height: 400, marginTop: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--paper)', borderRadius: 12, border: '1px dashed var(--line)', color: 'var(--muted)' }}>
          [Interactive Research Area Chart Placeholder]
        </div>
      </section>
    </div>
  );
}
