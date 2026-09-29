import { notFound } from 'next/navigation';
import { publications } from '../../../../lib/mock-data';

export default async function PublicationDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const publication = publications.find((p) => p.slug === id);
  if (!publication) notFound();

  return (
    <main>
      <section className="page-hero">
        <div className="wrap">
          <p className="eyebrow mono">PUBLICATION</p>
          <div className="card-top">
            <h1>{publication.title}</h1>
            <span className={`chip ${publication.status === 'Verified' ? 'ok' : 'request'}`}>
              {publication.status === 'Verified' ? '✓ Verified' : '🔒 Access required'}
            </span>
          </div>
          <p className="muted">
            {publication.authors} · {publication.university} · {publication.year}
          </p>
        </div>
      </section>
      <section>
        <div className="wrap detail-grid">
          <div className="detail-main">
            <div className="research-card">
              <h3>Metadata</h3>
              <p className="mono">DOI: {publication.doi}</p>
              <p>Year: {publication.year}</p>
            </div>
          </div>
          <div className="detail-side">
            <div className="research-card">
              <h3>Access</h3>
              <p className="muted">This file is protected.</p>
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
