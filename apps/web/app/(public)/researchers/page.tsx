import Link from 'next/link';
import { INITIAL_RESEARCHERS, ResearcherSeed } from '@/lib/initialData';

export default async function ResearchersPage({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const params = await searchParams;
  const q = params.query || '';

  let researchers: ResearcherSeed[] = INITIAL_RESEARCHERS;

  try {
    const res = await fetch(`http://localhost:4000/api/v1/researchers${q ? `?query=${encodeURIComponent(q)}` : ''}`, {
      cache: 'no-store',
    });
    if (res.ok) {
      const json = await res.json();
      if (json && json.data) {
        researchers = json.data;
      }
    } else if (q) {
      researchers = INITIAL_RESEARCHERS.filter(
        (r: ResearcherSeed) =>
          r.name.toLowerCase().includes(q.toLowerCase()) ||
          r.interests.some((i: string) => i.toLowerCase().includes(q.toLowerCase())) ||
          r.universityName.toLowerCase().includes(q.toLowerCase())
      );
    }
  } catch (_err) {
    if (q) {
      researchers = INITIAL_RESEARCHERS.filter(
        (r: ResearcherSeed) =>
          r.name.toLowerCase().includes(q.toLowerCase()) ||
          r.interests.some((i: string) => i.toLowerCase().includes(q.toLowerCase())) ||
          r.universityName.toLowerCase().includes(q.toLowerCase())
      );
    }
  }

  return (
    <main>
      <section className="page-hero">
        <div className="wrap">
          <p className="eyebrow mono">DISCOVER · RESEARCHERS</p>
          <h1>People behind the research.</h1>
          <p className="lede">
            Find verified researchers, their affiliations, areas of interest, publications and patents.
          </p>
          <div className="filter-row search-row" style={{ maxWidth: 600, marginTop: 30 }}>
            <form action="/researchers" style={{ display: 'flex', width: '100%', gap: '8px' }}>
              <input
                name="query"
                type="search"
                className="filter-input"
                placeholder="Search by name, interest, or university"
                defaultValue={q}
                style={{ flex: 1 }}
              />
              <button type="submit" className="btn primary">
                Search
              </button>
            </form>
          </div>
        </div>
      </section>
      <section>
        <div className="wrap">
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
            <span className="mono" style={{ fontWeight: 600 }}>
              {researchers.length} RESEARCHERS
            </span>
            <span className="muted">Sorted by activity</span>
          </div>
          <div
            className="directory-grid"
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(450px, 1fr))', gap: 20 }}
          >
            {researchers.map((r: ResearcherSeed) => (
              <Link href={`/researchers/${r.id}`} className="directory-card researcher-card" key={r.id} style={{ display: 'block' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
                  <div
                    className="avatar"
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: '50%',
                      background: 'var(--ink)',
                      color: 'var(--surface)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 'bold',
                    }}
                  >
                    {r.name
                      .split(' ')
                      .map((x: string) => x[0])
                      .join('')
                      .slice(0, 2)}
                  </div>
                  <span className="chip ok" style={{ alignSelf: 'flex-start' }}>
                    ✓ Verified researcher
                  </span>
                </div>
                <h3 style={{ fontSize: 22, margin: '0 0 4px' }}>{r.name}</h3>
                <p style={{ margin: 0 }}>{r.title || 'Researcher'}</p>
                <p className="muted" style={{ margin: '4px 0 0' }}>
                  {r.universityName || r.universitySlug}
                </p>
                <div
                  className="mini-stats"
                  style={{ display: 'flex', gap: 24, marginTop: 24, paddingTop: 16, borderTop: '1px solid var(--line)' }}
                >
                  <span>
                    <b style={{ display: 'block', fontSize: 20 }}>{r.publicationsCount || 0}</b>
                    <span className="muted" style={{ fontSize: 14 }}>
                      Publications
                    </span>
                  </span>
                  <span>
                    <b style={{ display: 'block', fontSize: 20 }}>{r.patentsCount || 0}</b>
                    <span className="muted" style={{ fontSize: 14 }}>
                      Patents
                    </span>
                  </span>
                </div>
              </Link>
            ))}

            {researchers.length === 0 && (
              <div style={{ gridColumn: '1 / -1', padding: '60px 0', textAlign: 'center', color: 'var(--muted)' }}>
                No researchers found for &quot;{q}&quot;.
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
