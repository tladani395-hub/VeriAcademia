import { notFound } from 'next/navigation';
import { INITIAL_UNIVERSITIES, INITIAL_RESEARCHERS, INITIAL_PUBLICATIONS } from '../../../../lib/initialData';

export default async function UniversityDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const university = INITIAL_UNIVERSITIES.find((u) => u.slug === slug || u.id === slug);
  if (!university) notFound();

  return (
    <main>
      <section className="page-hero">
        <div className="wrap">
          <p className="eyebrow mono">UNIVERSITY</p>
          <div className="card-top">
            <h1>{university.name}</h1>
            <span className={`chip ${university.status === 'VERIFIED' ? 'ok' : ''}`}>
              {university.status === 'VERIFIED' ? '✓ Verified Institution' : '⏳ Pending Review'}
            </span>
          </div>
          <p className="muted">
            {university.city}, {university.state} · {university.country} | <a href={university.website} target="_blank" rel="noreferrer" style={{ color: 'var(--primary)', textDecoration: 'underline' }}>{university.website}</a>
          </p>
        </div>
      </section>
      <section>
        <div className="wrap detail-grid">
          <div className="detail-main">
            <div className="research-card">
              <h3>Academic Overview</h3>
              <p>Official verified institutional metrics and academic portfolio.</p>
              <div className="mini-stats" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginTop: '1rem' }}>
                <div style={{ background: 'var(--surface-hover)', padding: '1rem', borderRadius: '8px' }}>
                  <b style={{ fontSize: '1.4rem', display: 'block', color: 'var(--primary)' }}>{university.researchersCount.toLocaleString()}</b>
                  <span className="muted" style={{ fontSize: '0.85rem' }}>Researchers</span>
                </div>
                <div style={{ background: 'var(--surface-hover)', padding: '1rem', borderRadius: '8px' }}>
                  <b style={{ fontSize: '1.4rem', display: 'block', color: 'var(--primary)' }}>{university.publicationsCount.toLocaleString()}</b>
                  <span className="muted" style={{ fontSize: '0.85rem' }}>Publications</span>
                </div>
                <div style={{ background: 'var(--surface-hover)', padding: '1rem', borderRadius: '8px' }}>
                  <b style={{ fontSize: '1.4rem', display: 'block', color: 'var(--primary)' }}>{university.patentsCount.toLocaleString()}</b>
                  <span className="muted" style={{ fontSize: '0.85rem' }}>Patents</span>
                </div>
                <div style={{ background: 'var(--surface-hover)', padding: '1rem', borderRadius: '8px' }}>
                  <b style={{ fontSize: '1.4rem', display: 'block', color: 'var(--primary)' }}>{university.departmentsCount}</b>
                  <span className="muted" style={{ fontSize: '0.85rem' }}>Departments</span>
                </div>
              </div>
            </div>
          </div>
          <div className="detail-side">
            <div className="research-card">
              <h3>Verification Status</h3>
              <p className="muted">Verified multi-tenant academic database member.</p>
              <span className="chip ok">✓ Platform Active</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
