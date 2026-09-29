import Link from 'next/link';
import { researchers } from '../../../lib/mock-data';

export default function ResearchersPage() {
  return (
    <main>
      <section className="page-hero">
        <div className="wrap">
          <p className="eyebrow mono">DISCOVER · RESEARCHERS</p>
          <h1>People behind the research.</h1>
          <p className="lede">
            Find verified researchers, their affiliations, areas of interest, publications and patents.
          </p>
          <div className="filter-row">
            <input className="filter-input" placeholder="Search by name, interest, or university" />
            <select className="filter-select">
              <option>All research areas</option>
              <option>Artificial Intelligence</option>
              <option>Sustainable Systems</option>
            </select>
          </div>
        </div>
      </section>
      <section>
        <div className="wrap">
          <div className="directory-grid">
            {researchers.map((r) => (
              <Link href={`/researchers/${r.slug}`} className="directory-card researcher-card" key={r.name}>
                <div className="avatar">
                  {r.name
                    .split(' ')
                    .map((x) => x[0])
                    .join('')
                    .slice(0, 2)}
                </div>
                <span className="chip ok">✓ Verified researcher</span>
                <h2>{r.name}</h2>
                <p>{r.role}</p>
                <p className="muted">{r.university}</p>
                <div className="mini-stats">
                  <span>
                    <b>{r.publications}</b> publications
                  </span>
                  <span>
                    <b>{r.pastents}</b> patents
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
