import Link from 'next/link';

export default function PlatformUniversitiesPage() {
  const universities = [
    { name: 'CHARUSAT University', slug: 'charusat-university', country: 'India', status: 'Verified', researchers: 1284 },
    { name: 'Example University', slug: 'example-university', country: 'United States', status: 'Verified', researchers: 3920 },
    { name: 'Northbridge Institute of Technology', slug: 'northbridge-institute-of-technology', country: 'United Kingdom', status: 'Verified', researchers: 876 },
    { name: 'Pacific Research University', slug: 'pacific-research-university', country: 'Canada', status: 'Pending review', researchers: 642 },
  ];
  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <p className="eyebrow mono">PLATFORM ADMIN · UNIVERSITIES</p>
          <h1>All universities</h1>
          <p className="lede">Review, verify and manage registered institutions.</p>
          <div className="filter-row">
            <input className="filter-input" placeholder="Search by name or country" />
            <select className="filter-select">
              <option>All statuses</option>
              <option>Verified</option>
              <option>Pending review</option>
              <option>Rejected</option>
            </select>
          </div>
        </div>
      </section>
      <section>
        <div className="wrap">
          <div className="directory-grid">
            {universities.map((u) => (
              <a href={`/universities/${u.slug}/admin/overview`} className="directory-card" key={u.slug}>
                <div className="card-top">
                  <span className="university-mark">{u.name.slice(0, 1)}</span>
                  <span className={`chip ${u.status === 'Verified' ? 'ok' : 'pending'}`}>
                    {u.status === 'Verified' ? '✓' : '◔'} {u.status}
                  </span>
                </div>
                <h2>{u.name}</h2>
                <p className="muted">{u.country}</p>
                <div className="mini-stats">
                  <span><b>{u.researchers.toLocaleString()}</b> researchers</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
