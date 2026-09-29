import Link from 'next/link';
import { universities } from '../../../lib/mock-data';

export default function UniversitiesPage() {
  return (
    <main>
      <section className="page-hero">
        <div className="wrap">
          <p className="eyebrow mono">DISCOVER · UNIVERSITIES</p>
          <h1>Verified universities.</h1>
          <p className="lede">
            Explore institutions with confirmed domains, accountable administrators and traceable research records.
          </p>
          <div className="filter-row">
            <input className="filter-input" placeholder="Search by university, city, or country" />
            <select className="filter-select">
              <option>All statuses</option>
              <option>Verified</option>
              <option>Pending review</option>
            </select>
          </div>
        </div>
      </section>
      <section>
        <div className="wrap">
          <div className="result-head">
            <span className="mono">{universities.length} UNIVERSITIES</span>
            <span className="muted">Sorted by activity</span>
          </div>
          <div className="directory-grid">
            {universities.map((u) => (
              <Link href={`/universities/${u.slug}`} className="directory-card" key={u.name}>
                <div className="card-top">
                  <span className="university-mark">{u.name.slice(0, 1)}</span>
                  <span className={`chip ${u.status === 'Verified' ? 'ok' : 'pending'}`}>
                    {u.status === 'Verified' ? '✓' : '◔'} {u.status}
                  </span>
                </div>
                <h2>{u.name}</h2>
                <p className="muted">
                  {u.city} · {u.country}
                </p>
                <div className="mini-stats">
                  <span>
                    <b>{u.researchers.toLocaleString()}</b> researchers
                  </span>
                  <span>
                    <b>{u.publications.toLocaleString()}</b> publications
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
