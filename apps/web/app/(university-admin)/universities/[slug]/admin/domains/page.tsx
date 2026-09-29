'use client';
import { useState } from 'react';

export default function AdminDomainsPage() {
  const [domains] = useState([
    { domain: 'charusat.ac.in', status: 'Verified', verified: '2025-11-02' },
    { domain: 'charusat.edu', status: 'Verified', verified: '2026-01-15' },
  ]);
  return (
    <div>
      <section className="page-hero">
        <div className="wrap">
          <p className="eyebrow mono">UNIVERSITY ADMIN · DOMAINS</p>
          <h1>Verified domains</h1>
          <p className="lede">Manage email domains that prove institutional affiliation.</p>
        </div>
      </section>
      <section>
        <div className="wrap">
          <div className="publication-list">
            {domains.map((d) => (
              <div className="publication-card" key={d.domain}>
                <div className="card-top">
                  <span className="mono">{d.domain}</span>
                  <span className="chip ok">✓ {d.status}</span>
                </div>
                <p className="muted">Verified on {d.verified}</p>
              </div>
            ))}
          </div>
          <form className="research-card" style={{ marginTop: 24 }} onSubmit={(e) => e.preventDefault()}>
            <h3>Add domain</h3>
            <label>Domain name<input className="filter-input" placeholder="e.g. dept.charusat.ac.in" /></label>
            <div className="form-row">
              <button className="btn primary" type="submit">Submit for verification</button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}
