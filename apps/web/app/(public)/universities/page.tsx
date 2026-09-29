import Link from 'next/link';
import { StatusChip } from '@/components/StatusChip';
import { INITIAL_UNIVERSITIES, UniversitySeed } from '@/lib/initialData';

export default async function UniversitiesPage({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const params = await searchParams;
  const q = params.query || '';

  let universities: UniversitySeed[] = INITIAL_UNIVERSITIES;

  try {
    const res = await fetch(`http://localhost:4000/api/v1/universities${q ? `?query=${encodeURIComponent(q)}` : ''}`, {
      cache: 'no-store',
    });
    if (res.ok) {
      const json = await res.json();
      if (json && json.data) {
        universities = json.data;
      }
    } else if (q) {
      universities = INITIAL_UNIVERSITIES.filter(
        (u: UniversitySeed) =>
          u.name.toLowerCase().includes(q.toLowerCase()) ||
          u.city.toLowerCase().includes(q.toLowerCase()) ||
          u.country.toLowerCase().includes(q.toLowerCase())
      );
    }
  } catch (_err) {
    if (q) {
      universities = INITIAL_UNIVERSITIES.filter(
        (u: UniversitySeed) =>
          u.name.toLowerCase().includes(q.toLowerCase()) ||
          u.city.toLowerCase().includes(q.toLowerCase()) ||
          u.country.toLowerCase().includes(q.toLowerCase())
      );
    }
  }

  return (
    <main>
      <section className="page-hero">
        <div className="wrap">
          <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', margin: '0 0 16px', fontFamily: 'var(--display)' }}>
            Discover Universities
          </h1>
          <p className="lede" style={{ fontSize: '20px', maxWidth: '70ch' }}>
            Explore institutions, researchers, departments and academic contributions across the global VeriAcademia research ecosystem.
          </p>
          <div className="search" style={{ marginTop: 40, maxWidth: 800 }}>
            <form action="/universities" style={{ display: 'flex', width: '100%' }}>
              <div className="search-row" style={{ flex: 1, padding: 16 }}>
                <span>🔍</span>
                <input
                  name="query"
                  type="search"
                  placeholder="Search universities by name, city, country, or research area..."
                  defaultValue={q}
                />
              </div>
              <button type="submit" className="btn primary" style={{ borderRadius: 0, height: '100%' }}>
                Search
              </button>
            </form>
          </div>
        </div>
      </section>

      <section style={{ padding: '40px 0' }} className="band">
        <div className="wrap" style={{ display: 'flex', gap: 16 }}>
          <select className="input-like" style={{ padding: '8px 16px', borderRadius: 8, border: '1px solid var(--line)' }}>
            <option>Country</option>
          </select>
          <select className="input-like" style={{ padding: '8px 16px', borderRadius: 8, border: '1px solid var(--line)' }}>
            <option>Research Area</option>
          </select>
          <select className="input-like" style={{ padding: '8px 16px', borderRadius: 8, border: '1px solid var(--line)' }}>
            <option>Status</option>
          </select>
        </div>
      </section>
      <section>
        <div className="wrap">
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
            <span className="mono" style={{ fontWeight: 600 }}>
              {universities.length} UNIVERSITIES
            </span>
            <span className="muted">Sorted by activity</span>
          </div>
          <div
            className="directory-grid"
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(450px, 1fr))', gap: 20 }}
          >
            {universities.map((u: UniversitySeed) => (
              <Link href={`/universities/${u.slug}`} className="directory-card" key={u.id} style={{ display: 'block' }}>
                <div className="card-top" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
                  <div
                    className="university-mark"
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: 8,
                      background: 'var(--brand)',
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 'bold',
                      fontSize: 20,
                    }}
                  >
                    {u.name.slice(0, 1)}
                  </div>
                  <StatusChip type={u.status === 'VERIFIED' ? 'ok' : 'pend'} label={u.status} />
                </div>
                <h3 style={{ fontSize: 22, margin: '0 0 6px' }}>{u.name}</h3>
                <p className="muted" style={{ margin: 0 }}>
                  {u.city} · {u.country}
                </p>
                <div
                  className="mini-stats"
                  style={{ display: 'flex', gap: 24, marginTop: 24, paddingTop: 16, borderTop: '1px solid var(--line)' }}
                >
                  <span>
                    <b style={{ display: 'block', fontSize: 20 }}>{u.researchersCount || 0}</b>
                    <span className="muted" style={{ fontSize: 14 }}>
                      Researchers
                    </span>
                  </span>
                  <span>
                    <b style={{ display: 'block', fontSize: 20 }}>{u.publicationsCount || 0}</b>
                    <span className="muted" style={{ fontSize: 14 }}>
                      Publications
                    </span>
                  </span>
                </div>
              </Link>
            ))}

            {universities.length === 0 && (
              <div style={{ gridColumn: '1 / -1', padding: '60px 0', textAlign: 'center', color: 'var(--muted)' }}>
                No universities found for &quot;{q}&quot;.
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
