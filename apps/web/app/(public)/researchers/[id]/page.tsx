import { notFound } from 'next/navigation';
import { researchers } from '../../../../lib/mock-data';

export default async function ResearcherDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const researcher = researchers.find((r) => r.slug === id);
  if (!researcher) notFound();

  return (
    <main>
      <section className="page-hero">
        <div className="wrap">
          <p className="eyebrow mono">RESEARCHER</p>
          <div className="card-top">
            <h1>{researcher.name}</h1>
            <span className="chip ok">✓ Verified researcher</span>
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
              <p>Active researcher with verified affiliation and published record.</p>
              <div className="mini-stats">
                <span>
                  <b>{researcher.publications}</b> publications
                </span>
                <span>
                  <b>{researcher.pastents}</b> patents
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
