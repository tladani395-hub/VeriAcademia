import Link from 'next/link';
import { patents } from '../../../lib/initialData';
import { StatusChip } from '../../../components/StatusChip';

export default function PatentsPage() {
  return (
    <main>
      <section className="page-hero" style={{ padding: '64px 0 80px', background: 'var(--surface)' }}>
        <div className="wrap">
          <div style={{ maxWidth: 800 }}>
            <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', margin: '0 0 16px' }}>Patents & Innovation</h1>
            <p className="lede" style={{ fontSize: '1.25rem', margin: '0 0 32px' }}>
              Discover, showcase, and track academic innovations and intellectual property. Explore patents linked to inventors, institutions, technologies, and research contributions.
            </p>
          </div>

          <div style={{ background: 'var(--surface)', padding: 24, borderRadius: 16, border: '1px solid var(--line)', boxShadow: '0 10px 40px -10px var(--shadow-lg)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 12, marginBottom: 20 }}>
              <input type="text" placeholder="Search by title, inventor, or patent ID..."
                     style={{ padding: '14px 20px', borderRadius: 8, border: '1px solid var(--line)', fontSize: 16 }} />
              <button className="btn primary">Search Patents</button>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
                {['Technology', 'Institution', 'Year', 'Status', 'Inventor'].map(f => (
                    <select key={f} style={{ padding: '10px 16px', borderRadius: 8, border: '1px solid var(--line)', background: 'var(--paper)', fontSize: 14 }}>
                        <option>{f}</option>
                    </select>
                ))}
                <button style={{ padding: '10px 16px', borderRadius: 8, border: 'none', background: 'transparent', color: 'var(--muted)', cursor: 'pointer' }}>Clear Filters</button>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="wrap">
          <h2 style={{ fontSize: 28, marginBottom: 24 }}>Featured Patents</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: 24 }}>
            {patents.map((p) => (
              <div key={p.number} className="research-card" style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                    <span className="mono" style={{ fontSize: 12, color: 'var(--brand)' }}>{p.number}</span>
                    <StatusChip
                        type={p.status === 'GRANTED' ? 'ok' : 'pend'}
                        label={p.status}
                    />
                </div>
                <h3 style={{ fontSize: 20, margin: '0 0 8px' }}>{p.title}</h3>
                <p className="muted" style={{ fontSize: 14, margin: '0 0 16px' }}>{p.inventors}</p>
                <div style={{ marginTop: 'auto', display: 'flex', gap: 10 }}>
                    <Link href={`/patents/${p.slug}`} className="btn" style={{ fontSize: 13, minHeight: 36 }}>View Details</Link>
                    <button className="btn" style={{ fontSize: 13, minHeight: 36 }}>Bookmark</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
