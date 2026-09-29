import { notFound } from 'next/navigation';
import { universities } from '../../../../lib/mock-data';

export default async function UniversityDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const university = universities.find((u) => u.slug === slug);
  if (!university) notFound();

  return (
    <main>
      <section className="page-hero">
        <div className="wrap">
          <p className="eyebrow mono">UNIVERSITY</p>
          <div className="card-top">
            <h1>{university.name}</h1>
            <span className="chip ok">✓ Verified</span>
          </div>
          <p className="muted">
            {university.city} · {university.country}
          </p>
        </div>
      </section>
      <section>
        <div className="wrap detail-grid">
          <div className="detail-main">
            <div className="research-card">
              <h3>Overview</h3>
              <p>Verified data for this institution.</p>
              <div className="mini-stats">
                <span>
                  <b>{university.researchers.toLocaleString()}</b> researchers
                </span>
                <span>
                  <b>{university.publications.toLocaleString()}</b> publications
                </span>
              </div>
            </div>
          </div>
          <div className="detail-side">
            <div className="research-card">
              <h3>Verification</h3>
              <p className="muted">This university has completed platform review.</p>
              <span className="chip ok">✓ Active</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
