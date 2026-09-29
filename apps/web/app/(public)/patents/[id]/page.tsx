import { notFound } from 'next/navigation';
import { patents } from '../../../../lib/mock-data';

export default async function PatentDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const patent = patents.find((p) => p.slug === id);
  if (!patent) notFound();

  return (
    <main>
      <section className="page-hero">
        <div className="wrap">
          <p className="eyebrow mono">PATENT</p>
          <div className="card-top">
            <h1>{patent.title}</h1>
            <span className="chip ok">✓ Verified</span>
          </div>
          <p className="muted">
            {patent.inventors} · {patent.university} · {patent.date}
          </p>
        </div>
      </section>
      <section>
        <div className="wrap detail-grid">
          <div className="detail-main">
            <div className="research-card">
              <h3>Metadata</h3>
              <p className="mono">Number: {patent.number}</p>
              <p>Area: {patent.techArea}</p>
            </div>
          </div>
          <div className="detail-side">
            <div className="research-card">
              <h3>Access</h3>
              <p className="muted">Patent documentation is protected under university control.</p>
              <a className="btn" href="/auth/sign-in">
                Request access
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
