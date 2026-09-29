import Link from 'next/link';
import { patents } from '../../../lib/mock-data';

export default function PatentsPage() {
  return (
    <main>
      <section className="page-hero">
        <div className="wrap">
          <p className="eyebrow mono">DISCOVER · PATENTS</p>
          <h1>Applied research, accounted for.</h1>
          <p className="lede">Explore patents linked to verified inventors and university affiliations.</p>
          <div className="filter-row">
            <input className="filter-input" placeholder="Search by title, inventor, or patent number" />
            <select className="filter-select">
              <option>All technology areas</option>
              <option>Artificial Intelligence</option>
              <option>Engineering</option>
            </select>
          </div>
        </div>
      </section>
      <section>
        <div className="wrap">
          <div className="publication-list">
            {patents.map((p) => (
              <Link className="publication-card" href={`/patents/${p.slug}`} key={p.number}>
                <div className="card-top">
                  <span className="mono">PATENT · {p.date}</span>
                  <span className="chip ok">✓ Verified</span>
                </div>
                <h2>{p.title}</h2>
                <p>{p.inventors}</p>
                <p className="muted">
                  {p.university} · <span className="mono">{p.number}</span>
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
