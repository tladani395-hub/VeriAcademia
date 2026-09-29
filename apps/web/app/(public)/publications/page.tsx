import Link from 'next/link';
import { INITIAL_PUBLICATIONS, PublicationSeed } from '@/lib/initialData';

export default async function PublicationsPage({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const params = await searchParams;
  const q = params.query || '';

  let publications: PublicationSeed[] = INITIAL_PUBLICATIONS;

  try {
    const res = await fetch(`http://localhost:4000/api/v1/publications${q ? `?query=${encodeURIComponent(q)}` : ''}`, {
      cache: 'no-store',
    });
    if (res.ok) {
      const json = await res.json();
      if (json && json.data) {
        publications = json.data;
      }
    } else if (q) {
      publications = INITIAL_PUBLICATIONS.filter(
        (p: PublicationSeed) =>
          p.title.toLowerCase().includes(q.toLowerCase()) ||
          p.authors.some((a: string) => a.toLowerCase().includes(q.toLowerCase())) ||
          p.doi.toLowerCase().includes(q.toLowerCase())
      );
    }
  } catch (_err) {
    if (q) {
      publications = INITIAL_PUBLICATIONS.filter(
        (p: PublicationSeed) =>
          p.title.toLowerCase().includes(q.toLowerCase()) ||
          p.authors.some((a: string) => a.toLowerCase().includes(q.toLowerCase())) ||
          p.doi.toLowerCase().includes(q.toLowerCase())
      );
    }
  }

  return (
    <main>
      <section className="page-hero">
        <div className="wrap">
          <p className="eyebrow mono">DISCOVER · PUBLICATIONS</p>
          <h1>Research you can trace.</h1>
          <p className="lede">
            Search canonical publication records, verified affiliations and the evidence behind each record.
          </p>
          <div className="filter-row search-row" style={{ maxWidth: 600, marginTop: 30 }}>
            <form action="/publications" style={{ display: 'flex', width: '100%', gap: '8px' }}>
              <input
                name="query"
                type="search"
                className="filter-input"
                placeholder="Search by title, author, DOI, or keyword"
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
              {publications.length} PUBLICATIONS
            </span>
            <span className="muted">Sorted by date</span>
          </div>

          <div className="publication-list" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {publications.map((p: PublicationSeed) => (
              <Link className="publication-card" href={`/publications/${p.id}`} key={p.id} style={{ display: 'block' }}>
                <div className="card-top" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
                  <span className="mono" style={{ color: 'var(--muted)' }}>
                    {p.doi}
                  </span>
                  <span className={`chip ${p.verificationStatus === 'VERIFIED' ? 'ok' : 'request'}`}>
                    {p.verificationStatus === 'VERIFIED' ? '✓ Verified' : '🔒 Request required'}
                  </span>
                </div>
                <h3 style={{ fontSize: 22, margin: '0 0 8px' }}>{p.title}</h3>
                <p style={{ margin: '0 0 4px', fontWeight: 600 }}>{p.authors.join(', ')}</p>
                <p className="muted" style={{ margin: 0 }}>
                  {p.universityName || p.universitySlug} · {p.publicationYear}
                </p>
              </Link>
            ))}

            {publications.length === 0 && (
              <div style={{ padding: '60px 0', textAlign: 'center', color: 'var(--muted)' }}>
                No publications found for &quot;{q}&quot;. Try a different search term.
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
