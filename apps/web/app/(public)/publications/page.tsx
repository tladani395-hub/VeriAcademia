import Link from 'next/link';
import { publications } from '../../../lib/mock-data';

export default function PublicationsPage() {
  return (
    <main>
      <section className="page-hero">
        <div className="wrap">
          <p className="eyebrow mono">DISCOVER · PUBLICATIONS</p>
          <h1>Research you can trace.</h1>
          <p className="lede">
            Search canonical publication records, verified affiliations and the evidence behind each record.
          </p>
          <div className="filter-row">
            <input className="filter-input" placeholder="Search by title, author, DOI, or keyword" />
            <select className="filter-select">
              <option>All years</option>
              <option>2026</option>
              <option>2025</option>
            </select>
          </div>
        </div>
      </section>
      <section>
        <div className="wrap">
          <div className="publication-list">
            {publications.map((p) => (
              <Link className="publication-card" href={`/publications/${p.slug}`} key={p.doi}>
                <div className="card-top">
                  <span className="mono">PUBLICATION · {p.year}</span>
                  <span className={`chip ${p.status === 'Verified' ? 'ok' : 'request'}`}>
                    {p.status === 'Verified' ? '✓ Verified' : '🔒 Request required'}
                  </span>
                </div>
                <h2>{p.title}</h2>
                <p>{p.authors}</p>
                <p className="muted">
                  {p.university} · <span className="mono">{p.doi}</span>
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
