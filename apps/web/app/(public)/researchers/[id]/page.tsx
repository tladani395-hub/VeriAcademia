import { notFound } from 'next/navigation';
import { INITIAL_RESEARCHERS, researchers } from '../../../../lib/initialData';

export default async function ResearcherDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const initialResearcher = INITIAL_RESEARCHERS.find((r) => r.id === id);
  const researcher = initialResearcher
    ? {
        name: initialResearcher.name,
        slug: initialResearcher.id,
        role: `${initialResearcher.title} · ${initialResearcher.department}`,
        university: initialResearcher.universityName,
        publications: initialResearcher.publicationsCount,
        patents: initialResearcher.patentsCount,
        bio: initialResearcher.bio,
        interests: initialResearcher.interests,
        orcid: initialResearcher.orcid,
        isVerified: initialResearcher.isVerified,
      }
    : researchers.find((r) => r.slug === id);

  if (!researcher) notFound();

  return (
    <main>
      <section className="page-hero">
        <div className="wrap">
          <p className="eyebrow mono">RESEARCHER</p>
          <div className="card-top">
            <h1>{researcher.name}</h1>
            <span className={`chip ${'isVerified' in researcher && researcher.isVerified ? 'ok' : 'ok'}`}>
              ✓ Verified researcher
            </span>
          </div>
          <p className="muted">
            {researcher.role} · {researcher.university}
          </p>
        </div>
      </section>
      <section>
        <div className="wrap detail-grid">
          <div className="detail-main">
            <div className="research-card">
              <h3>Overview</h3>
              <p>{'bio' in researcher ? researcher.bio : 'Active researcher with verified affiliation and published record.'}</p>
              {'interests' in researcher && researcher.interests && (
                <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  {researcher.interests.map(i => (
                    <span key={i} className="chip" style={{ background: 'var(--surface-hover)', borderColor: 'var(--line)' }}>{i}</span>
                  ))}
                </div>
              )}
              <div className="mini-stats" style={{ marginTop: '1.5rem' }}>
                <span>
                  <b>{researcher.publications}</b> publications
                </span>
                <span>
                  <b>{researcher.patents}</b> patents
                </span>
              </div>
            </div>
          </div>
          <div className="detail-side">
            <div className="research-card">
              <h3>Identifiers</h3>
              <p className="muted" style={{ marginBottom: '0.5rem' }}>ORCID iD</p>
              <div className="mono" style={{ fontSize: '0.9rem' }}>
                {'orcid' in researcher ? researcher.orcid : '0000-0000-0000-0000'}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
